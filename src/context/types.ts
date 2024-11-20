export type CustomUserData = {
  profileUrl: string;
  userId: string;
  username: string;
};

export type AuthResponse = { success: boolean; error?: string };

export enum AuthError {
  USERNAME_REQUIRED = 'Username is required',
  INVALID_EMAIL = 'Invalid email',
  EMAIL_EXISTS = 'This email is already in use',
  INVALID_PASSWORD = 'Invalid password',
  PROFILE_URL_REQUIRED = 'Profile URL is required',
}
