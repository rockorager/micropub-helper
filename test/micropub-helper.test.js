const mphelper = require('../src/micropub-helper');
var assert = require('assert');
const nock = require('nock');

// Data
const article = require('./data/article-with-photo.quill.json');
const note = require('./data/note.quill.json');
const config = require('./data/config.quill.json');
const event = require('./data/event.quill.json');
const bookmark = require('./data/bookmark.quill.json');
const like = require('./data/like.quill.json');
const noteWithPhoto = require('./data/note-with-photo.quill.json');
const badToken = require('./data/bad-token.json');
const noToken = require('./data/noToken.json');
describe('micropub-helper', function() {
  
	it('should return an article object', async function() {
		const data = {
		  "me": "https://www.timculverhouse.com/",
		  "client_id": "https://11ndieweb.com",
		  "scope": "create update delete",
		  "issued_at": 1399155608,
		  "nonce": 501884823
		};

		const scope = nock('https://tokens.indieauth.com')
	      .get('/token')
	      .reply(200, data);
	    const expected=['h-entry'];
	    const actual = await mphelper(article,'https://tokens.indieauth.com/token');
	    assert.deepEqual(actual.type,expected);
  	});
	it('should return a note object', async function() {
		const data = {
		  "me": "https://www.timculverhouse.com/",
		  "client_id": "https://11ndieweb.com",
		  "scope": "create update delete",
		  "issued_at": 1399155608,
		  "nonce": 501884823
		};

		const scope = nock('https://tokens.indieauth.com')
	      .get('/token')
	      .reply(200, data);
	    const expected=['h-entry'];
	    const actual = await mphelper(note,'https://tokens.indieauth.com/token');
	    assert.deepEqual(actual.type,expected);
  	});
	it('should return a config object', async function() {
		const data = {
		  "me": "https://www.timculverhouse.com/",
		  "client_id": "https://11ndieweb.com",
		  "scope": "create update delete",
		  "issued_at": 1399155608,
		  "nonce": 501884823
		};

		const scope = nock('https://tokens.indieauth.com')
	      .get('/token')
	      .reply(200, data);
	    const actual = await mphelper(config,'https://tokens.indieauth.com/token');
	    assert.equal(actual.statusCode,200);
  	});
	it('should return an event object', async function() {
		const data = {
		  "me": "https://www.timculverhouse.com/",
		  "client_id": "https://11ndieweb.com",
		  "scope": "create update delete",
		  "issued_at": 1399155608,
		  "nonce": 501884823
		};

		const scope = nock('https://tokens.indieauth.com')
	      .get('/token')
	      .reply(200, data);
	    const expected=['h-event'];
	    const actual = await mphelper(event,'https://tokens.indieauth.com/token');
	    assert.deepEqual(actual.type,expected);
  	});
	it('should return a bookmark object', async function() {
		const data = {
		  "me": "https://www.timculverhouse.com/",
		  "client_id": "https://11ndieweb.com",
		  "scope": "create update delete",
		  "issued_at": 1399155608,
		  "nonce": 501884823
		};

		const scope = nock('https://tokens.indieauth.com')
	      .get('/token')
	      .reply(200, data);
	    const actual = await mphelper(bookmark,'https://tokens.indieauth.com/token');
	    assert(actual.properties.hasOwnProperty('bookmark-of'));
  	});
	it('should return a like object', async function() {
		const data = {
		  "me": "https://www.timculverhouse.com/",
		  "client_id": "https://11ndieweb.com",
		  "scope": "create update delete",
		  "issued_at": 1399155608,
		  "nonce": 501884823
		};

		const scope = nock('https://tokens.indieauth.com')
	      .get('/token')
	      .reply(200, data);
	    const actual = await mphelper(like,'https://tokens.indieauth.com/token');
	    assert(actual.properties.hasOwnProperty("like-of"));
  	});
	it('should return a note with photo object', async function() {
		const data = {
		  "me": "https://www.timculverhouse.com/",
		  "client_id": "https://11ndieweb.com",
		  "scope": "create update delete",
		  "issued_at": 1399155608,
		  "nonce": 501884823
		};

		const scope = nock('https://tokens.indieauth.com')
	      .get('/token')
	      .reply(200, data);
	    const expected='image/jpeg';
	    const actual = await mphelper(noteWithPhoto,'https://tokens.indieauth.com/token');
	    assert.deepEqual(actual.files[0]['Content-Type'],expected);
  	});
  	it('should reject if bad token', async function() {
		const scope = nock('https://tokens.indieauth.com')
	      .get('/badtoken')
	      .reply(401, "Bad token");
	    const actual = await mphelper(badToken,'https://tokens.indieauth.com/badtoken');
	    assert.equal(actual.statusCode,403);
  	});
   	it('should reject if no token', async function() {
   		const data = {
		  "me": "https://www.timculverhouse.com/",
		  "client_id": "https://11ndieweb.com",
		  "scope": "create update delete",
		  "issued_at": 1399155608,
		  "nonce": 501884823
		};

		const scope = nock('https://tokens.indieauth.com')
	      .get('/noToken')
	      .reply(200, data);
	    const actual = await mphelper(noToken,'https://tokens.indieauth.com/noToken');
	    assert.equal(actual.statusCode,401);
  	});
});