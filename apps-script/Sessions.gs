/**
 * Sessions.gs
 *
 * Supports signing in with just an email address (no Google account
 * required) via a one-time "magic link" sent by email:
 *
 *   1. requestLink: user submits their email. If it's on the Users
 *      sheet, we generate a short-lived link token and email them a URL
 *      containing it. The response is identical either way, so the API
 *      never reveals who is on the invite list.
 *   2. exchangeToken: the frontend sends the link token back (extracted
 *      from the URL the user clicked). We consume it (one-time use) and
 *      issue a longer-lived session token for the rest of the visit.
 *
 * Tokens are stored in Script Properties as small JSON blobs. This avoids
 * any extra service or dependency, at the cost of manually checking
 * expiry ourselves (Script Properties don't expire on their own).
 */

var LINK_TOKEN_TTL_MS = 15 * 60 * 1000; // 15 minutes
var SESSION_TOKEN_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

function getAppBaseUrl_() {
  var url = PropertiesService.getScriptProperties().getProperty('APP_BASE_URL');
  if (!url) {
    throw new Error('Script property APP_BASE_URL is not set. See the README deployment steps.');
  }
  return url;
}

function createMagicLinkToken_(email) {
  var token = Utilities.getUuid();
  PropertiesService.getScriptProperties().setProperty(
    'link_' + token,
    JSON.stringify({ email: email, expiresAt: Date.now() + LINK_TOKEN_TTL_MS }),
  );
  return token;
}

function consumeMagicLinkToken_(token) {
  if (!token) {
    throw new Error('Missing sign-in link token.');
  }
  var props = PropertiesService.getScriptProperties();
  var key = 'link_' + token;
  var raw = props.getProperty(key);
  if (!raw) {
    throw new Error('This sign-in link is invalid or has already been used.');
  }
  props.deleteProperty(key);
  var data = JSON.parse(raw);
  if (Date.now() > data.expiresAt) {
    throw new Error('This sign-in link has expired. Please request a new one.');
  }
  return data.email;
}

function createSessionToken_(email) {
  var token = Utilities.getUuid();
  PropertiesService.getScriptProperties().setProperty(
    'session_' + token,
    JSON.stringify({ email: email, expiresAt: Date.now() + SESSION_TOKEN_TTL_MS }),
  );
  return token;
}

function verifySessionToken_(token) {
  if (!token) {
    throw new Error('Missing session token.');
  }
  var props = PropertiesService.getScriptProperties();
  var key = 'session_' + token;
  var raw = props.getProperty(key);
  if (!raw) {
    throw new Error('Your session has expired. Please sign in again.');
  }
  var data = JSON.parse(raw);
  if (Date.now() > data.expiresAt) {
    props.deleteProperty(key);
    throw new Error('Your session has expired. Please sign in again.');
  }
  return data.email;
}

function sendMagicLinkEmail_(email, token) {
  var link = getAppBaseUrl_() + '?authToken=' + encodeURIComponent(token);
  var subject = 'Your sign-in link for Difficult Translation Collection';
  var body =
    'Hi,\n\n' +
    'Click the link below to sign in to Difficult Translation Collection:\n\n' +
    link +
    '\n\n' +
    'This link expires in 15 minutes and can only be used once. If you did not ' +
    'request this, you can safely ignore this email.\n';
  MailApp.sendEmail(email, subject, body);
}

function cleanupExpiredTokens_() {
  var props = PropertiesService.getScriptProperties();
  var all = props.getProperties();
  var now = Date.now();
  Object.keys(all).forEach(function (key) {
    if (key.indexOf('link_') !== 0 && key.indexOf('session_') !== 0) return;
    try {
      var data = JSON.parse(all[key]);
      if (now > data.expiresAt) {
        props.deleteProperty(key);
      }
    } catch (err) {
      // Ignore malformed entries rather than failing the whole cleanup.
    }
  });
}