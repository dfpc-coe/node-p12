import forge from 'node-forge';

export type P12Input = string | ArrayBuffer | Uint8Array;

export interface ConvertToPemResult {
    pemKey: string;
    pemCertificate: string;
    commonName: string;
}

export function convertToPem(p12input: P12Input, password: string): ConvertToPemResult {
    const p12Asn1 = forge.asn1.fromDer(normalizeP12Input(p12input));
    const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, password);

    const pemKey = getKeyFromP12(p12);
    const { pemCertificate, commonName } = getCertificateFromP12(p12);

    return { pemKey, pemCertificate, commonName };
}

function normalizeP12Input(p12input: P12Input): string {
    if (typeof p12input === 'string') {
        return p12input;
    }

    const bytes = p12input instanceof Uint8Array ? p12input : new Uint8Array(p12input);
    let binary = '';

    for (const byte of bytes) {
        binary += String.fromCharCode(byte);
    }

    return binary;
}

function getKeyFromP12(p12: forge.pkcs12.Pkcs12Pfx): string {
    const keyData = p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag });
    const shroudedKeys = keyData[forge.pki.oids.pkcs8ShroudedKeyBag] ?? [];
    const fallbackKeys = keyData[forge.pki.oids.keyBag] ?? [];
    const pkcs8Key = shroudedKeys[0] ?? fallbackKeys[0];

    if (!pkcs8Key?.key) {
        throw new Error('Unable to get private key.');
    }

    let pemKey = forge.pki.privateKeyToPem(pkcs8Key.key);
    pemKey = pemKey.replace(/\r\n/g, '');

    return pemKey;
}

function getCertificateFromP12(p12: forge.pkcs12.Pkcs12Pfx): { pemCertificate: string; commonName: string } {
    const certData = p12.getBags({ bagType: forge.pki.oids.certBag });
    const certificate = certData[forge.pki.oids.certBag]?.[0];

    if (!certificate?.cert) {
        throw new Error('Unable to get certificate.');
    }

    let pemCertificate = forge.pki.certificateToPem(certificate.cert);
    pemCertificate = pemCertificate.replace(/\r\n/g, '');
    const commonName = certificate.cert.subject.attributes.find((attribute) => {
        return attribute.shortName === 'CN' || attribute.name === 'commonName';
    })?.value;

    if (typeof commonName !== 'string' || commonName.length === 0) {
        throw new Error('Unable to get certificate common name.');
    }

    return { pemCertificate, commonName };
}
