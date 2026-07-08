/**
 * Auth.gs
 *
 * Verifies Google Sign-In ID tokens sent from the React frontend.
 *
 * We deliberately verify the token server-side (rather than trusting the
 * frontend's decoded copy) using Google's tokeninfo endpoint: it confirms
 * the JWT signature, expiry, and audience match this app's OAuth client
 * ID, all without pulling in a JWT library. This keeps the script
 * dependency-free while still being cryptographically sound.
 */

/**
 * Reads the expected OAuth Client ID from Script Properties (Project
 * Settings > Script Properties in the Apps Script editor). Kept out of
 * source so the same code can be reused across environments/deployments
 * without editing the script.
 */
function getExpectedAudience_() {
  var clientId = PropertiesService.getScriptProperties().getProperty('GOOGLE_CLIENT_ID');
  if (!clientId) {
    throw new Error(
      'Script property GOOGLE_CLIENT_ID is not set. See the README deployment steps.',
    );
  }
  return clientId;
}

/**
 * Verifies a Google ID token and returns its payload ({ email, name,
 * picture, ... }) if valid. Throws an Error with a friendly message if
 * the token is missing, expired, malformed, or issued for a different
 * OAuth client.
 */
function verifyIdToken_(idToken) {
  if (!idToken) {
    throw new Error('Missing ID token.');
  }

  var response = UrlFetchApp.fetch(
    'https://oauth2.googleapis.com/tokeninfo?id_token=' + encodeURIComponent(idToken),
    { muteHttpExceptions: true },
  );

  if (response.getResponseCode() !== 200) {
    throw new Error('Your sign-in session has expired. Please sign in again.');
  }

  var payload = JSON.parse(response.getContentText());

  if (payload.aud !== getExpectedAudience_()) {
    throw new Error('This sign-in token was not issued for this application.');
  }

  if (payload.email_verified !== 'true' && payload.email_verified !== true) {
    throw new Error('Your Google account email is not verified.');
  }

  return {
    email: payload.email,
    name: payload.name || payload.email,
    picture: payload.picture || '',
  };
}
