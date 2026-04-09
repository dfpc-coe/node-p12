<h1 align=center>Node-P12</h1>
<p align=center>Extract PEM-encoded keys and certificates from PKCS#12 bundles</p>

Lightweight ESM utility for converting PKCS#12 bundles into a private key, certificate, and certificate common name. The root export preserves the Node.js file helper, and the browser-safe converter is exposed on a dedicated subpath.

## API Documentation

Generate the API documentation locally with:

```sh
npm run doc
```

## Installation

```bash
npm install @tak-ps/node-p12
```

## Usage

### Node.js

```ts
import { getPemFromP12 } from '@tak-ps/node-p12';

const { pemKey, pemCertificate, commonName } = getPemFromP12('./client.p12', 'password');

console.log(commonName);
console.log(pemKey);
console.log(pemCertificate);
```

### Browser / Bundler

```ts
import { convertToPem } from '@tak-ps/node-p12/browser';

const response = await fetch('/client.p12');
const buffer = await response.arrayBuffer();

const { pemKey, pemCertificate, commonName } = convertToPem(buffer, 'password');

console.log(commonName);
console.log(pemKey);
console.log(pemCertificate);
```

## API

### `convertToPem(p12input, password)`

Available from `@tak-ps/node-p12/browser`. Converts PKCS#12 data from a `string`, `ArrayBuffer`, or `Uint8Array` and returns:

- `pemKey`: the private key in PEM format
- `pemCertificate`: the certificate in PEM format
- `commonName`: the certificate subject common name

### `getPemFromP12(certPath, password)`

Node-only helper, available from `@tak-ps/node-p12` and `@tak-ps/node-p12/node`, that reads a PKCS#12 bundle from disk and returns:

- `pemKey`: the private key in PEM format
- `pemCertificate`: the certificate in PEM format
- `commonName`: the certificate subject common name
