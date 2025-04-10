# KIGS - Kaspa Interactive Getting Started

## Introduction

This app aims to be a learning platform focused on Kaspa (and potentially its ecosystem) that is both easy to understand and engaging. It is designed to provide a digestible introduction rather than scientific or exact content. However, links to more in-depth resources will be provided for those who wish to explore further.

## Motivation

I had a challenging time when I first discovered Kaspa, and I want this experience to benefit at least one other person.

## Modules

1. **Network**
2. **Wallet**
3. **Transaction**
4. **UTXO**
5. **BlockDAG**

### Upcoming Modules:

- **MultiSig Wallet** (Waiting for WASM APIs)
- **Accounts** (Multiple receive/change addresses)
- **Transaction Payloads**

## Contribute

If you have ideas or want to fix existing content (which might be inaccurate), you are welcome to either suggest it as an issue or directly open a pull request.

## Running Locally

### Prerequisites:

- Ensure Node.js is installed locally.

### Steps:

1. Download the WASM build (tested with v1.0.0) and extract it to the existing folder `./wasm` from the [Rusty Kaspa Release Page](https://github.com/kaspanet/rusty-kaspa/releases), or build it from the source code there.
2. Run `npm install`
3. Run `npm start`

### To-Do:

- Implement a feature to share your progress on the modules (social share)
- Save completion state per module
- Add a feedback tab (contact) to suggest new modules or fix existing content

## Credits

- **@Stellar(922121054908989440)** on Discord: For your valuable content reviews
- **@SudoSi 🇨🇦(303250860828262404)** on Discord: For your awesome logo editing
- **@KaffinPX(961732366055915530)** on Discord: For your initial implementation of Kaspian on Wallet, Account, and Transaction
