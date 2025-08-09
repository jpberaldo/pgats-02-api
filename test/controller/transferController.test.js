const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

const app = require('../../app');

describe('Transfer controller tests', () => {

    describe('POST /transfers', () => {

        it('Quando informar usuarios inexistentes receber status code 400', async () => {
            const resposta = await request(app)
                .post('/transfers')
                .send({
                    from: "userTest1",
                    to: "userTest2",
                    amount: 400
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');
        });

    });

});