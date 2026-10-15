import React, { useState } from "react";
import { PageHeader } from "../../components/ui/RetroUI";
import { signUpUser } from "../../services/api";
//import {}: import 1 func, import no {}: import 1 file,

// --- SVG Icons ---
const EyeIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

// --- Helpers & Pure Functions ---
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEmail = (value: string): string => {
  if (!value.trim()) return "Email is required.";
  if (!EMAIL_REGEX.test(value.trim())) return "Invalid email format.";
  return "";
};

const validateUsername = (value: string): string => {
  if (!value.trim()) return "Username is required.";
  if (value.trim().length < 3)
    return "Username must be at least 3 characters long.";
  return "";
};

const validatePassword = (value: string): string => {
  if (!value.trim()) return "Password is required.";
  if (value.length < 6) return "Password must be at least 6 characters long.";
  return "";
};

const validateConfirmPassword = (
  confirmVal: string,
  passwordVal: string
): string => {
  if (!confirmVal.trim()) return "Please confirm your password.";
  if (confirmVal !== passwordVal) return "Passwords do not match.";
  return "";
};

const TOGGLE_BTN_STYLE: React.CSSProperties = {
  position: "absolute",
  right: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  padding: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#333",
  outline: "none",
};

interface FormFields {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const INITIAL_FORM_DATA: FormFields = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const INITIAL_ERRORS: FormFields = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const INITIAL_TOUCHED: Record<keyof FormFields, boolean> = {
  email: false,
  username: false,
  password: false,
  confirmPassword: false,
};

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState<FormFields>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormFields>(INITIAL_ERRORS);
  const [touched, setTouched] =
    useState<Record<keyof FormFields, boolean>>(INITIAL_TOUCHED);

  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const runAllValidations = (data: FormFields): FormFields => ({
    email: validateEmail(data.email),
    username: validateUsername(data.username),
    password: validatePassword(data.password),
    confirmPassword: validateConfirmPassword(
      data.confirmPassword,
      data.password
    ),
  });

  const isFormValid = Boolean(
    formData.email.trim() &&
    formData.username.trim() &&
    formData.password.trim() &&
    formData.confirmPassword.trim() &&
    !errors.email &&
    !errors.username &&
    !errors.password &&
    !errors.confirmPassword
  );

  const handleFieldChange = (field: keyof FormFields, value: string) => {
    const nextData = { ...formData, [field]: value };
    setFormData(nextData);
    setSuccess(false);
    setAuthError("");

    setTouched((prev) => ({ ...prev, [field]: true }));

    const updatedErrors = { ...errors };
    if (field === "email") updatedErrors.email = validateEmail(value);
    if (field === "username") updatedErrors.username = validateUsername(value);
    if (field === "password") {
      updatedErrors.password = validatePassword(value);
      if (formData.confirmPassword) {
        updatedErrors.confirmPassword = validateConfirmPassword(
          formData.confirmPassword,
          value
        );
      }
    }
    if (field === "confirmPassword") {
      updatedErrors.confirmPassword = validateConfirmPassword(
        value,
        formData.password
      );
    }
    setErrors(updatedErrors);
  };

  const handleFieldBlur = (field: keyof FormFields) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const currentVal = formData[field];
    let err = "";
    if (field === "email") err = validateEmail(currentVal);
    if (field === "username") err = validateUsername(currentVal);
    if (field === "password") err = validatePassword(currentVal);
    if (field === "confirmPassword")
      err = validateConfirmPassword(currentVal, formData.password);

    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setTouched({
      email: true,
      username: true,
      password: true,
      confirmPassword: true,
    });

    const validationResults = runAllValidations(formData);
    setErrors(validationResults);
    const hasErrors = Object.values(validationResults).some(
      (err) => err !== ""
    );

    if (hasErrors) {
      setSuccess(false);
      return;
    }

    setIsSubmitting(true);
    const { status, data } = await signUpUser({
      email: formData.email.trim(),
      username: formData.username.trim(),
      password: formData.password,
    });

    setIsSubmitting(false);

    if (status === 201) {
      setSuccess(true);
      return;
    }

    //handle error code from BE: erros status: create status code  by myself
    const code = data?.error?.code;
    const message = data?.error?.message;

    if (code === "EMAIL_ALREADY_REGISTERED") {
      setAuthError(message || "This email is already registered.");
    } else if (
      code === "USERNAME_ALREADY_REGISTERED" ||
      code === "USERNAME_ALREADY_EXISTS"
    ) {
      setAuthError(message || "This username is already taken.");
    } else if (status === 422) {
      setAuthError(message || "Please check your input and try again.");
    } else if (message) {
      setAuthError(message);
    } else {
      setAuthError("Unable to create your account. Please try again.");
    }
    setSuccess(false);
  };

  return (
    <div className="page-container">
      <div
        className="form-panel retro-panel"
        style={{ marginTop: 40, maxWidth: 480, width: "100%" }}
      >
        <PageHeader
          eyebrow="Sign Up"
          title="Create your account"
          description="Please fill in the form below to create a new account."
        />

        <form className="form-grid" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="field">
            <label className="field-label" htmlFor="email">
              Email
            </label>
            <input
              className={`retro-input ${touched.email && errors.email ? "input-error" : ""}`}
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              onBlur={() => handleFieldBlur("email")}
              required
            />
            {touched.email && errors.email && (
              <span className="field-error">{errors.email}</span>
            )}
          </div>

          {/* Username Field */}
          <div className="field">
            <label className="field-label" htmlFor="username">
              Username
            </label>
            <input
              className={`retro-input ${touched.username && errors.username ? "input-error" : ""}`}
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) => handleFieldChange("username", e.target.value)}
              onBlur={() => handleFieldBlur("username")}
              required
            />
            {touched.username && errors.username && (
              <span className="field-error">{errors.username}</span>
            )}
          </div>

          {/* Password Field */}
          <div className="field">
            <label className="field-label" htmlFor="password">
              Password
            </label>
            <div style={{ position: "relative", width: "100%" }}>
              <input
                className={`retro-input ${touched.password && errors.password ? "input-error" : ""}`}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                style={{ width: "100%", paddingRight: "40px" }}
                onChange={(e) => handleFieldChange("password", e.target.value)}
                onBlur={() => handleFieldBlur("password")}
                required
              />
              <button
                type="button"
                style={TOGGLE_BTN_STYLE}
                onClick={() => setShowPassword((prev) => !prev)}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {touched.password && errors.password && (
              <span className="field-error">{errors.password}</span>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="field">
            <label className="field-label" htmlFor="confirm-password">
              Confirm Password
            </label>
            <div style={{ position: "relative", width: "100%" }}>
              <input
                className={`retro-input ${touched.confirmPassword && errors.confirmPassword ? "input-error" : ""}`}
                id="confirm-password"
                name="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                style={{ width: "100%", paddingRight: "40px" }}
                onChange={(e) =>
                  handleFieldChange("confirmPassword", e.target.value)
                }
                onBlur={() => handleFieldBlur("confirmPassword")}
                required
              />
              <button
                type="button"
                style={TOGGLE_BTN_STYLE}
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                title={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {touched.confirmPassword && errors.confirmPassword && (
              <span className="field-error">{errors.confirmPassword}</span>
            )}
          </div>

          {success && (
            <div className="status-box success">
              <p>
                Account created! Please check your email to confirm your
                account.
              </p>
            </div>
          )}
          {authError && (
            <div className="status-box error">
              <p>{authError}</p>
            </div>
          )}

          <div className="form-actions">
            <button
              type="submit"
              className="retro-button retro-button-primary"
              disabled={isSubmitting || success || !isFormValid}
              aria-busy={isSubmitting}
              aria-disabled={isSubmitting || success || !isFormValid}
            >
              {isSubmitting ? "Creating account..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
