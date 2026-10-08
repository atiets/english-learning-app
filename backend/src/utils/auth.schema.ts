export interface SignUpInput {
  email: string;
  username: string;
  password: string;
}

export type SignUpValidationError = {
  code: string;
  message: string;
};

const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const validateSignUpInput = (
  data: Partial<SignUpInput> | null
): SignUpValidationError | null => {
  // func có thể trả về string/null
  if (
    !data?.email?.trim() ||
    !data?.username?.trim() ||
    !data?.password?.trim()
  ) {
    return { code: 'REQUIRED', message: 'All fields are required.' };
  }
  if (!emailRegex.test(data?.email?.trim() as string)) {
    return { code: 'INVALID_EMAIL', message: 'Invalid email format.' };
  }
  if (data?.username?.trim()?.length < 3) {
    return {
      code: 'INVALID_USERNAME',
      message: 'Username must be at least 3 characters long.',
    };
  }
  if (data?.password?.trim()?.length < 6) {
    return {
      code: 'INVALID_PASSWORD',
      message: 'Password must be at least 6 characters long.',
    };
  }
  return null;
};
