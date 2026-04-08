import { readFileSync } from 'node:fs';

import { convertToPem } from './lib/p12.js';

export const Name = (name: string) => `Hello ${name}`;

export function getPemFromP12(certPath: string, password: string) {
  const p12File = readFileSync(certPath, { encoding: 'binary' });
  return convertToPem(p12File, password);
}
