import { readFileSync } from 'node:fs';

import { convertToPem } from './lib/p12.js';
import type { ConvertToPemResult } from './lib/p12.js';

export function getPemFromP12(certPath: string, password: string): ConvertToPemResult {
    const p12File = readFileSync(certPath);
    return convertToPem(p12File, password);
}