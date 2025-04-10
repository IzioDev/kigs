# KIGS - Kaspa Interactive Getting Started

## Intoduction

This app intent to be a learning plateform around Kaspa (and potentially its ecosystem) that is both easy to aprehend and "fun". It is not intended to provide scientific/exact contents but rather a digest introduction. However, when possible, links shall be provided to go futher for the audiance that want to push it out to the extreme.

## Motivation

I had a rough times when I discovered Kaspa, and I want this experience to benefit at least one other person :)

## Modules

1. Network
2. Wallet
3. Transaction
4. UTXO
5. BlockDAG

To come later:

- MultiSig Wallet (Waiting for wasm APIs)
- Accounts (multi receive/change)
- Transaction Payloads

# Contribute

If you have ideas or you want to fix existing content (that might be innacurate), you are free to either suggest it as an Issue or directly open a Pull Request.

## Running locally

Prerequiste: having NodeJs installed locally.

Steps:

1. Download the wasm build (tested with v1.0.0) and extract it to the existing folder ./wasm, from the [Rusty Kaspa Release Page](https://github.com/kaspanet/rusty-kaspa/releases), or build them from the source code there.
2. `npm i`
3. `npm run start`

Todo:

- share feature of your progress on the modules (socials share)
- completion state save per module
- share feedback tab (contact), to add new module or fix existing content

## Credits

- @Stellar(922121054908989440) on discord: for your precious content reviews
- @SudoSi 🇨🇦(303250860828262404) on discord: for your awesome logo editing
- @KaffinPX(961732366055915530) on discord: for your initial implementation of Kaspian on Wallet, Account and Transaction
