/**
 * Anonymity.gs
 *
 * Generates a friendly, random nickname for anonymous submissions, and
 * reuses the same nickname for repeat submissions within the same
 * authenticated session — so the research team can tell "these three
 * submissions came from the same session" apart from other sessions,
 * without learning who that session belongs to.
 *
 * IMPORTANT — honest scope of this guarantee:
 * The nickname is derived from a hash of the caller's auth token
 * (the Google ID token or email-auth session token sent with the
 * request), NOT from their email address. This is deliberate: hashing
 * the email would let anyone with script access recompute the same hash
 * for every email on the Users sheet and match nicknames back to
 * people, since the invite list is a small, fully-known set. Hashing the
 * token instead means there is no calculation that recovers an identity
 * from a nickname — the mapping is only ever "nickname belongs to this
 * one session," never "nickname belongs to this person." This protects
 * contributors from casual reviewers (anyone with sheet access) and from
 * the admin's own code, since nothing here ever writes or derives from
 * the caller's email when `anonymous` is true.
 */

var NICKNAME_ADJECTIVES = [
  'Quiet', 'Amber', 'Brisk', 'Calm', 'Cedar', 'Coral', 'Dusty', 'Ember',
  'Fable', 'Gentle', 'Hazel', 'Ivory', 'Jolly', 'Keen', 'Lucid', 'Maple',
  'Nimble', 'Opal', 'Plucky', 'Quartz',
];

var NICKNAME_ANIMALS = [
  'Otter', 'Falcon', 'Heron', 'Lynx', 'Sparrow', 'Badger', 'Fennec',
  'Marten', 'Kestrel', 'Wren', 'Puffin', 'Vixen', 'Coyote', 'Egret',
  'Marmot', 'Tapir', 'Osprey', 'Ibis', 'Caracal', 'Loon',
];

/** SHA-256 hex digest of a string, used to turn a (potentially long)
 * auth token into a fixed-length, safe Script Properties key. */
function sha256Hex_(value) {
  var bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, value);
  return bytes
    .map(function (b) {
      var v = (b < 0 ? b + 256 : b).toString(16);
      return v.length === 1 ? '0' + v : v;
    })
    .join('');
}

/**
 * Returns a nickname for the given auth token, generating and persisting
 * a new random one the first time this token is seen, and returning the
 * same nickname on subsequent calls with the same token (i.e. repeat
 * anonymous submissions within one sign-in session get one consistent
 * label).
 */
function getOrCreateNickname_(authToken) {
  if (!authToken) {
    throw new Error('Missing auth token for anonymous submission.');
  }

  var props = PropertiesService.getScriptProperties();
  var key = 'nickname_' + sha256Hex_(authToken);
  var existing = props.getProperty(key);
  if (existing) {
    return existing;
  }

  var adjective = NICKNAME_ADJECTIVES[Math.floor(Math.random() * NICKNAME_ADJECTIVES.length)];
  var animal = NICKNAME_ANIMALS[Math.floor(Math.random() * NICKNAME_ANIMALS.length)];
  var suffix = Math.floor(Math.random() * 900) + 100; // 100-999
  var nickname = adjective + ' ' + animal + ' #' + suffix;

  props.setProperty(key, nickname);
  return nickname;
}