const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const inquirer = require('inquirer');
const CredentialManager = require('../lib/credential-manager');
const dirtyChai = require('dirty-chai');

chai.use(dirtyChai);
describe('test przechowalnia danych', () => {
    let creds;
    before( () => {
        creds = new CredentialManager('abc-test');
    });
    context('gdy nie ma danych', () =>{
        it('schould prompt user', async () => {
            sinon.stub(inquirer, 'prompt').resolves({key: 'foo', secret: 'bar'});
            let [key, secret] = await creds.getKeyAndSecret();
            expect(key).to.equal('foo');
            expect(secret).to.equal('bar');
            expect(inquirer.prompt.calledOnce).to.be.true();
            inquirer.prompt.restore();
        });
    });
    context('gdy są dane', () => {
        it('schould just return data', async () => {
            let [key, secret] = await creds.getKeyAndSecret();
            expect(key).to.equal('foo');
            expect(secret).to.equal('bar');
        });
    });
    after( async () => {
        await creds.clearPair();
    });
});
