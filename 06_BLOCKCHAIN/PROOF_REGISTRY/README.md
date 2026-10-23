# NeoHaven Proof Registry — Prototype

A lightweight, browser-only proof-of-concept for checking whether a project document has changed. It uses the browser's Web Crypto API to calculate a SHA-256 digest. It does not connect to a blockchain, upload files, issue tokens, or establish that a document's contents are truthful.

## Scope

- Select a local file and calculate its SHA-256 digest.
- Export a JSON proof record that can be stored alongside the original document.
- Verify a file against a previously exported proof record.
- Keep file bytes in the browser; there is no backend or external dependency in this prototype.

## Run

Open `index.html` in a modern browser (Edge, Chrome, or Firefox). SHA-256 uses the browser's Web Crypto API. If the browser blocks that API for local files, serve this folder using an existing local development workflow or open it from a secure context; do not install new tooling just for this prototype.

## Proof record fields

- `schemaVersion`: format version.
- `algorithm`: `SHA-256`.
- `fileName`: original filename, for human reference only.
- `fileSizeBytes`: file size.
- `lastModified`: file metadata timestamp, not a trusted timestamp.
- `sha256`: content digest.
- `createdAt`: local browser clock time, not a trusted timestamp or blockchain proof.

## Safety and limitations

- This is a demo, not a production evidence-management or legal certification system.
- A matching digest indicates that the selected bytes match the digest in the proof record, assuming the record itself is trustworthy.
- A hash does not prove authorship, truth, ownership, or when a file existed.
- Do not hash or share sensitive documents unless you understand the privacy implications. The hash can itself reveal information about predictable documents.
- No private keys, wallet connections, token transfers, smart contracts, external APIs, telemetry, or network requests are used.
- Proof records can be edited; this prototype does not authenticate or sign them.
- Do not claim blockchain anchoring until a separate testnet integration is implemented and verified.

## Next steps

1. Review the UI and test locally with non-sensitive sample files.
2. Add automated test coverage and accessibility review.
3. Decide whether this should remain a standalone utility or become a NOVA OS module.
4. Only then consider optional testnet anchoring, with explicit network and cost controls.
