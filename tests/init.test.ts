import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { getPemFromP12 } from '../src/index.ts';
import { convertToPem } from '../src/browser.ts';

const fixturePath = fileURLToPath(new URL('./fixtures/node-p12-test.p12', import.meta.url));

test('convertToPem extracts data from a Uint8Array input', () => {
  const fixtureBytes = readFileSync(fixturePath);
  const { pemKey, pemCertificate, commonName } = convertToPem(fixtureBytes, 'test-password');

  assert.equal(commonName, 'node-p12.test');
  assert.match(pemKey, /-----BEGIN .*PRIVATE KEY-----/);
  assert.match(pemKey, /-----END .*PRIVATE KEY-----/);
  assert.match(pemCertificate, /-----BEGIN CERTIFICATE-----/);
  assert.match(pemCertificate, /-----END CERTIFICATE-----/);
});

test('getPemFromP12 extracts data from a file path via the root entrypoint', () => {
  const { commonName } = getPemFromP12(fixturePath, 'test-password');

  assert.equal(commonName, 'node-p12.test');
});

test('convertToPem throws with an invalid password', () => {
  const fixtureBytes = readFileSync(fixturePath);

  assert.throws(() => convertToPem(fixtureBytes, 'wrong-password'));
});

test('getPemFromP12 throws with an invalid password', () => {
  assert.throws(() => getPemFromP12(fixturePath, 'wrong-password'));
});
