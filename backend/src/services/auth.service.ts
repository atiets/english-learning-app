import { supabase } from '../utils/supabase.js';
import { supabaseAdmin } from '../utils/supabaseAdmin.js';
import {
  validateSignUpInput,
  type SignUpInput,
  type SignUpValidationError,
} from '../utils/auth.schema.js';

export class AppError extends Error {
  public statusCode: number;
  public code: string;
  public message: string;
  constructor(statusCode: number, code: string, message: string) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.message = message;
  }
}

//helper
const checkEmailExists = async (email: string): Promise<boolean> => {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers();
  if (error) {
    console.log('Error in checking existing email:', error.message);
    return false;
  }
  return data?.users.some((user) => user.email === email) || false;
};

const checkUsernameExists = async (username: string): Promise<boolean> => {
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .select('username')
    .eq('username', username.trim())
    .maybeSingle();

  if (error) {
    console.error('Username check error:', error.message);
    return false;
  }
  return data !== null;
};

export const SignUpService = async (input: Partial<SignUpInput>) => {
  const { email, username, password } = input;
  const cleanEmail = email?.trim().toLowerCase();
  const cleanUsername = username?.trim();
  const cleanPassword = password?.trim();

  // 1. Validate input
  const validationError = validateSignUpInput(input);
  if (validationError) {
    throw new AppError(422, validationError.code, validationError.message);
  }

  //check dupplicate email
  const emailExists = await checkEmailExists(cleanEmail as string);
  if (emailExists) {
    throw new AppError(
      409,
      'EMAIL_ALREADY_REGISTERED',
      'This email is already registered.'
    );
  }

  //check dupplicate username
  const usernameExists = await checkUsernameExists(cleanUsername as string);
  if (usernameExists) {
    throw new AppError(
      409,
      'USERNAME_ALREADY_REGISTERED',
      'This username is already registered.'
    );
  }

  const { data, error } = await supabase.auth.signUp({
    email: cleanEmail as string,
    password: cleanPassword as string,
    options: {
      data: {
        username: cleanUsername as string,
      },
    },
  });

  if (error) {
    console.error('Supabase signUp error:', error.message);
    const status = error.status || (error.status === 429 ? 429 : 400);
    throw new AppError(
      status,
      'AUTH_PROVIDER_ERROR',
      error.message
    );
  }
  const requiresEmailConfirmation = data.session === null;

  return {
    message:
      'Account created! Please check your email to confirm your account.',
    requiresEmailConfirmation,
    user: {
      id: data.user?.id,
      email: data.user?.email,
    },
    session: data.session,
  };
};
