export type AuthState = {
  uid?: string;
  name?: string;
  email?: string;
  emailVerified?: boolean;
  verifyingEmail?: boolean;
};

export const authInitialState: AuthState = {};
