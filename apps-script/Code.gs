/**
 * Code.gs
 *
 * Entry points for the Apps Script Web App. This is the only file with
 * doGet/doPost — everything else (auth, sheet access) is factored out so
 * this file stays a thin, readable router.
 *
 * API contract (all requests are POST with a JSON body):
 *
 *   { "action": "verify", "idToken": "..." }
 *     -> { ok: true, data: { authorized: bool, name?, role? } }
 *
 *   { "action": "submit", "idToken": "...", sourceLanguage, targetLanguage,
 *     sourceText, targetText, explanation, category, difficulty, tags,
 *     appVersion }
 *     -> { ok: true, data: { submissionId, timestamp } }
 *
 *   Any error -> { ok: false, error: "human readable message" }
 */

var REQUIRED_SUBMIT_FIELDS = [
  'sourceLanguage',
  'targetLanguage',
  'sourceText',
  'targetText',
  'explanation',
  'category',
  'difficulty',
];

function doGet() {
  // Visiting the Web App URL directly (e.g. to sanity-check the
  // deployment) shows a friendly message instead of a raw JSON blob.
  return HtmlService.createHtmlOutput(
    '<p style="font-family:sans-serif">This is the API endpoint for the ' +
      'Difficult Translation Collection app. It only accepts POST requests ' +
      'from the web application.</p>',
  );
}

function doPost(e) {
  var result;
  try {
    var body = parseRequestBody_(e);
    result = routeAction_(body);
  } catch (err) {
    result = { ok: false, error: err && err.message ? err.message : String(err) };
  }
  return jsonResponse_(result);
}

function parseRequestBody_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('Missing request body.');
  }
  try {
    return JSON.parse(e.postData.contents);
  } catch (err) {
    throw new Error('Request body was not valid JSON.');
  }
}

function routeAction_(body) {
  if (!body || !body.action) {
    throw new Error('Missing "action" in request.');
  }

  if (body.action === 'verify') {
    return { ok: true, data: handleVerify_(body) };
  }

  if (body.action === 'submit') {
    return { ok: true, data: handleSubmit_(body) };
  }

  throw new Error('Unknown action: ' + body.action);
}

function handleVerify_(body) {
  var googleUser = verifyIdToken_(body.idToken);
  var user = findUser_(googleUser.email);

  if (!user) {
    return { authorized: false };
  }
  return { authorized: true, name: user.name, role: user.role };
}

function handleSubmit_(body) {
  var googleUser = verifyIdToken_(body.idToken);
  var user = findUser_(googleUser.email);

  if (!user) {
    throw new Error('Your account is not authorized to submit examples.');
  }

  validateSubmissionPayload_(body);

  return appendSubmission_(user, body);
}

function validateSubmissionPayload_(body) {
  for (var i = 0; i < REQUIRED_SUBMIT_FIELDS.length; i++) {
    var field = REQUIRED_SUBMIT_FIELDS[i];
    var value = body[field];
    var isEmptyString = typeof value === 'string' && value.trim() === '';
    if (value === undefined || value === null || isEmptyString) {
      throw new Error('Missing required field: ' + field);
    }
  }

  var difficulty = Number(body.difficulty);
  if (!(difficulty >= 1 && difficulty <= 5)) {
    throw new Error('Difficulty must be a number between 1 and 5.');
  }

  if (body.tags && !Array.isArray(body.tags)) {
    throw new Error('Tags must be an array of strings.');
  }
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
