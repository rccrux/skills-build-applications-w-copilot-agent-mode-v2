const test = require('node:test');
const assert = require('node:assert/strict');
const { once } = require('node:events');

test('API routes return success responses', async () => {
  const { app } = require('../dist/server.js');
  const server = app.listen(0);
  await once(server, 'listening');

  const address = server.address();
  const baseUrl = `http://127.0.0.1:${address.port}`;
  const endpoints = [
    '/api/users/',
    '/api/teams/',
    '/api/activities/',
    '/api/leaderboard/',
    '/api/workouts/',
    '/api/health',
  ];

  try {
    for (const endpoint of endpoints) {
      const response = await fetch(`${baseUrl}${endpoint}`);
      assert.equal(response.status, 200, `${endpoint} should return 200`);
      const body = await response.json();
      assert.ok(body, `${endpoint} should return a JSON body`);

      if (endpoint === '/api/health') {
        assert.equal(body.status, 'ok');
      } else {
        assert.ok(body.count > 0, `${endpoint} should return seeded data`);
      }
    }
  } finally {
    server.close();
    await once(server, 'close');
  }
});
