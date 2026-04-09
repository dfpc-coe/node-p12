import assert from 'node:assert/strict';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { getPemFromP12 } from '../src/index.ts';

const fixturePath = fileURLToPath(new URL('./fixtures/node-p12-test.p12', import.meta.url));

test('getPemFromP12 extracts data from a real p12 file', () => {
  const { pemKey, pemCertificate, commonName } = getPemFromP12(fixturePath, 'test-password');

  assert.equal(commonName, 'node-p12.test');
  assert.match(pemKey, /-----BEGIN .*PRIVATE KEY-----/);
  assert.match(pemKey, /-----END .*PRIVATE KEY-----/);
  assert.match(pemCertificate, /-----BEGIN CERTIFICATE-----/);
  assert.match(pemCertificate, /-----END CERTIFICATE-----/);
});

test('getPemFromP12 throws with an invalid password', () => {
  assert.throws(() => getPemFromP12(fixturePath, 'wrong-password'));
});
