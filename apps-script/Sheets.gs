/**
 * Sheets.gs
 *
 * Thin helpers around the two sheets that make up the "database". Keeping
 * all direct Range/Sheet access in one file makes it easy to later add a
 * reviewer dashboard or export feature without touching Code.gs.
 */

var USERS_SHEET_NAME = 'Users';
var SUBMISSIONS_SHEET_NAME = 'Submissions';

var SUBMISSIONS_HEADERS = [
  'Submission ID',
  'Timestamp',
  'User email',
  'User name',
  'Source language',
  'Target language',
  'Source text',
  'Target text',
  'Difficulty explanation',
  'Category',
  'Difficulty (1-10)',
  'Tags',
  'Status',
  'Reviewer notes',
  'Application version',
  'Public dataset consent',
  'Additional information',
  'Submitted anonymously',
  'Public credit requested',
  'Public credit name',
];

function getSpreadsheet_() {
  // This script is expected to be bound to the spreadsheet (created via
  // Extensions > Apps Script from inside the Sheet). getActiveSpreadsheet
  // then just works with no configuration needed.
  return SpreadsheetApp.getActiveSpreadsheet();
}

function getUsersSheet_() {
  var sheet = getSpreadsheet_().getSheetByName(USERS_SHEET_NAME);
  if (!sheet) {
    throw new Error('The "Users" sheet is missing. See the README for the expected structure.');
  }
  return sheet;
}

function getOrCreateSubmissionsSheet_() {
  var ss = getSpreadsheet_();
  var sheet = ss.getSheetByName(SUBMISSIONS_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SUBMISSIONS_SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(SUBMISSIONS_HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/**
 * Looks up an email in the Users sheet (case-insensitive). Returns null if
 * not found, otherwise { email, name, role }.
 */
function findUser_(email) {
  var sheet = getUsersSheet_();
  var values = sheet.getDataRange().getValues();
  var target = String(email).trim().toLowerCase();

  // Row 0 is assumed to be the header row: Email | Name | Role.
  for (var i = 1; i < values.length; i++) {
    var row = values[i];
    var rowEmail = String(row[0] || '').trim().toLowerCase();
    if (rowEmail && rowEmail === target) {
      return { email: row[0], name: row[1] || row[0], role: row[2] || '' };
    }
  }
  return null;
}

/** Generates a short, sortable, unique submission ID, e.g. SUB-20260708-ab12cd. */
function generateSubmissionId_() {
  var now = new Date();
  var datePart = Utilities.formatDate(now, 'Etc/UTC', 'yyyyMMdd');
  var randomPart = Utilities.getUuid().split('-')[0];
  return 'SUB-' + datePart + '-' + randomPart;
}

/**
 * Appends a new row to the Submissions sheet and returns the generated
 * submission ID and server-side timestamp.
 */
function appendSubmission_(user, payload) {
  var sheet = getOrCreateSubmissionsSheet_();
  var submissionId = generateSubmissionId_();
  var timestamp = new Date().toISOString();

   sheet.appendRow([
    submissionId,
    timestamp,
    user.email,
    user.name,
    payload.sourceLanguage,
    payload.targetLanguage,
    payload.sourceText,
    payload.targetText,
    payload.explanation,
    payload.category,
    payload.difficulty,
    (payload.tags || []).join(', '),
    'Pending',
    '',
    payload.appVersion || '',
    payload.consentPublicDataset ? 'Yes' : 'No',
    payload.additionalInfo || '',
    payload.anonymous ? 'Yes' : 'No',
    payload.creditAsContributor ? 'Yes' : 'No',
    payload.creditAsContributor ? payload.creditName || '' : '',
  ]);

  return { submissionId: submissionId, timestamp: timestamp };
}
