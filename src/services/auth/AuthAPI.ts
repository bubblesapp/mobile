/**
 * Represents a state of authentication.
 */
export type AuthState = {
  uid?: string;
  name?: string;
  email?: string;
  emailVerified?: boolean;
  verifyingEmail?: boolean;
};

/**
 * An interface that should be implemented by the service managing authentication and user identification data storage.
 */
export interface AuthAPI {
  /**
   * The current authentication state.
   */
  state: AuthState;

  /**
   * Signs the user in with the authentication provider.
   * @param {string} email - The user's email address
   * @param {string} password - The user's password
   * @param {boolean} remember - If true, the user will be remembered across sessions.
   * @return {Promise<string>} - A promise that resolves with user's id
   */
  signIn(email: string, password: string, remember: boolean): Promise<string>;

  /**
   * Signs the user up with the authentication provider and creates a basic profile in the data store.
   * @param {string} email - The user's email address
   * @param {string} password - The user's password
   * @return {Promise<string>} - A promise that resolves with new user's id
   */
  signUp(email: string, password: string): Promise<string>;

  /**
   * Signs the user out.
   */
  signOut(): Promise<void>;

  /**
   * Changes the user's name both in the authentication provider and the data store.
   * @param {string} name - The value to set the user's name to
   */
  changeName(name: string): Promise<void>;

  /**
   * Changes the user's email both in the authentication provider and the data store.
   * @param {string} email - The user's email address
   * @param {string} password - The user's password
   */
  changeEmail(email: string, password: string): Promise<void>;

  /**
   * Deletes the user account both from the authentication provider and the data store.
   * The user's password may be provided if required for security reasons.
   * @param {string} password - The user's password
   */
  deleteUser(password?: string): Promise<void>;

  /**
   * Initiates the password reset flow for a given user.
   * This method is typically used for users that are not currently signed in, in case they have forgotten their password.
   * An identity verification process can be started.
   * The flow is finalized with {@link finalizePasswordReset}
   * To change the password of a user that is currently signed in, use {@link changePassword}.
   * @see finalizePasswordReset
   * @see changePassword
   * @param {string} email - The user's email address
   */
  initiatePasswordReset(email: string): Promise<void>;

  /**
   * Finalizes the password reset flow that was initiated with {@link initiatePasswordReset}
   * @param {string} code - An identity verification code provided by the authentication provider
   * @param {string} password - The value to reset the user's password to
   * @see initiatePasswordReset
   */
  finalizePasswordReset(code: string, password: string): Promise<void>;

  /**
   * Change the password of the currently signed in user.
   * To reset the password of a user that is not currently signed in, use {@link initiatePasswordReset}.
   * @see initiatePasswordReset
   * @param {string} currentPassword - The user's current password, provided for security reasons
   * @param {string} newPassword - The value to set the user's password to
   */
  changePassword(currentPassword: string, newPassword: string): Promise<void>;
}
