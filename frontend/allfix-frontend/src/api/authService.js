import {
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  getCurrentUser,
  fetchAuthSession,
  resetPassword,
  confirmResetPassword,
  resendSignUpCode,
  fetchUserAttributes,
} from 'aws-amplify/auth';

/**
 * Sign up a new user with email and password
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise} Sign up result
 */
export async function signUpUser(email, password) {
  try {
    const result = await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
        },
        autoSignIn: true,
      },
    });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Confirm user signup with verification code
 * @param {string} email - User's email address
 * @param {string} code - Verification code from email
 * @returns {Promise} Confirmation result
 */
export async function confirmUserSignUp(email, code) {
  try {
    const result = await confirmSignUp({
      username: email,
      confirmationCode: code,
    });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Resend signup verification code
 * @param {string} email - User's email address
 * @returns {Promise} Resend result
 */
export async function resendVerificationCode(email) {
  try {
    const result = await resendSignUpCode({ username: email });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Sign in user with email and password
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise} Sign in result with user data and groups
 */
export async function signInUser(email, password) {
  try {
    const result = await signIn({
      username: email,
      password,
    });
    
    // Fetch groups immediately after sign in
    const session = await fetchAuthSession();
    const groups = session.tokens?.accessToken?.payload['cognito:groups'] || [];
    
    return { success: true, data: { ...result, groups } };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Sign out the current user
 * @returns {Promise} Sign out result
 */
export async function signOutUser() {
  try {
    await signOut();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Get the currently authenticated user
 * @returns {Promise} Current user or null
 */
export async function getAuthenticatedUser() {
  try {
    const user = await getCurrentUser();
    return { success: true, data: user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Get the current auth session (includes tokens and groups)
 * @returns {Promise} Session data with tokens and user groups
 */
export async function getAuthSession() {
  try {
    const session = await fetchAuthSession();
    const groups = session.tokens?.accessToken?.payload['cognito:groups'] || [];
    return {
      success: true,
      data: {
        tokens: session.tokens,
        groups,
        isAuthenticated: !!session.tokens,
      },
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Get user attributes (email, etc.)
 * @returns {Promise} User attributes
 */
export async function getUserAttributes() {
  try {
    const attributes = await fetchUserAttributes();
    return { success: true, data: attributes };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Initiate password reset flow
 * @param {string} email - User's email address
 * @returns {Promise} Reset password result
 */
export async function initiatePasswordReset(email) {
  try {
    const result = await resetPassword({ username: email });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Confirm password reset with code and new password
 * @param {string} email - User's email address
 * @param {string} code - Verification code from email
 * @param {string} newPassword - New password
 * @returns {Promise} Confirm reset result
 */
export async function confirmPasswordReset(email, code, newPassword) {
  try {
    await confirmResetPassword({
      username: email,
      confirmationCode: code,
      newPassword,
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Check if user belongs to a specific Cognito group
 * @param {string} groupName - Name of the group to check
 * @returns {Promise<boolean>} True if user is in the group
 */
export async function isUserInGroup(groupName) {
  const session = await getAuthSession();
  if (!session.success) return false;
  return session.data.groups.includes(groupName);
}

/**
 * Get all groups the current user belongs to
 * @returns {Promise<string[]>} Array of group names
 */
export async function getUserGroups() {
  const session = await getAuthSession();
  if (!session.success) return [];
  return session.data.groups;
}
