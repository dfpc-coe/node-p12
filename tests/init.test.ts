import assert from 'node:assert/strict';
import test from 'node:test';

import { Name } from '../src/index.ts';

test('Name returns a greeting', () => {
  assert.equal(Name('World'), 'Hello World');
});
