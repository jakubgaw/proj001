#! /usr/bin/env node

const CredentialManager = require('../lib/credential-manager');


async function main() {
    const creds = new CredentialManager('abc');
    let [key, secret] = await creds.getKeyAndSecret();
    console.log(key, secret);
}
main().catch(console.error);
