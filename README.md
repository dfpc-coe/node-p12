<h1 align=center>Node-P12</h1>
<p align=center>Extract PEM-encoded keys and certificates from PKCS#12 bundles</p>

Lightweight ESM utility for reading a `.p12` or `.pkcs12` file from disk and returning the private key, certificate, and certificate common name.

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

```ts
import { getPemFromP12 } from '@tak-ps/node-p12';

const { pemKey, pemCertificate, commonName } = getPemFromP12('./client.p12', 'password');

console.log(commonName);
console.log(pemKey);
console.log(pemCertificate);
```

## API

### `getPemFromP12(certPath, password)`

Reads a PKCS#12 bundle from disk and returns:

- `pemKey`: the private key in PEM format
- `pemCertificate`: the certificate in PEM format
- `commonName`: the certificate subject common name
