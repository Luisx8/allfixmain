'use strict';

/**
 * Cognito User Pool PreSignUp trigger.
 *
 * Purpose:
 * - Auto-confirms users
 * - Auto-verifies email/phone when present
 * - Generates a deterministic dummy email when Cognito requires email but signup did not provide one
 *
 * Notes:
 * - Prefer username-only sign-in at the User Pool level when possible.
 * - This trigger cannot override required-schema attributes unless they are present in event.request.userAttributes.
 */
exports.handler = async (event) => {
  const attrs = event.request?.userAttributes || {};
  const username = event.userName || attrs.preferred_username || attrs.sub || 'user';

  // If no email was provided, inject a synthetic one so pools requiring email can still accept signup.
  if (!attrs.email || String(attrs.email).trim() === '') {
    const domain = process.env.DUMMY_EMAIL_DOMAIN || 'allfix.internal';
    const localPart = sanitizeLocalPart(username);
    attrs.email = `${localPart}@${domain}`;
    event.request.userAttributes = attrs;
  }

  // Auto-confirm and auto-verify to skip verification prompts.
  event.response.autoConfirmUser = true;
  event.response.autoVerifyEmail = true;

  // Only set autoVerifyPhone if a phone number is present.
  if (attrs.phone_number && String(attrs.phone_number).trim() !== '') {
    event.response.autoVerifyPhone = true;
  }

  return event;
};

function sanitizeLocalPart(value) {
  const normalized = String(value || 'user')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^[-_.]+/, '')
    .replace(/[-_.]+$/, '');

  return normalized.length > 0 ? normalized : 'user';
}
