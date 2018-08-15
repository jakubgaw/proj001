const Configstore = require('configstore');
const inquirer = require('inquirer');
const keytar = require('keytar-prebuild');

class CredentialManager {
    constructor(name) {
        this.conf = new Configstore(name);
        this.service = name;
    }

    async getKeyAndSecret() {
        let key = this.conf.get('apiKey');
        if (key) {
            // let secret = this.conf.get('apiSecret');
            let secret = await keytar.getPassword(this.service, key);
            return [key, secret];
        } else {
            let answers = await inquirer.prompt(
                [{type: 'input', name: 'key', message: 'Twitter API KEY'},
                {type: 'password', name: 'secret', message: 'Twitter API SECRET'},
            ]
            );
            this.conf.set('apiKey', answers.key);
            // this.conf.set('apiSecret', answers.secret);
            await keytar.setPassword(this.service, answers.key, answers.secret);
            return [answers.key, answers.secret];
        }
    }
    async clearPair() {
        let key = this.conf.get('apiKey');
        this.conf.delete('apiKey');
        // this.conf.delete('apiSecret');
        await keytar.deletePassword(this.service, key);
    }
}
module.exports = CredentialManager;
