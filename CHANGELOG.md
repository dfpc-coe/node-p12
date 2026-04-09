# CHANGELOG

## Emoji Cheatsheet
- :pencil2: doc updates
- :bug: when fixing a bug
- :rocket: when making general improvements
- :white_check_mark: when adding tests
- :arrow_up: when upgrading dependencies
- :tada: when adding new features

## Version History

### Pending Fixed

### v1.0.2 - 2026-04-08

- :rocket: Restore the root entrypoint for Node.js consumers and expose browser-safe `convertToPem` on `@tak-ps/node-p12/browser`
- :white_check_mark: Cover the browser subpath and the backward-compatible root entrypoint with fixture-backed tests

### v1.0.2 - 2026-04-08

- :bug: Fix `node-forge` import for pure ESM consumers so PKCS#12 parsing works at runtime
- :white_check_mark: Add real PKCS#12 fixture coverage for extraction and invalid password handling

### v1.0.1 - 2026-04-08

- :rocket: Small release changes

### v1.0.0 - 2026-04-08

- :tada: Initial Release
