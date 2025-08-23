const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

const app = require('../../app');

//mock
const transferService = require('../../service/transferService.js');

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

        it('Usando mocks: quando informar usuarios inexistentes receber status code 400', async () => {
            const transferServiceMock = sinon.stub(transferService, 'transfer')
            transferServiceMock.throws(new Error('Usuário remetente ou destinatário não encontrado'));

            const resposta = await request(app)
                .post('/transfers')
                .send({
                    from: "userTest1",
                    to: "userTest2",
                    amount: 400
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');

            sinon.restore();

        });

        it('Usando Mocks: Quando informo valores válidos eu tenho sucesso com 201 CREATED', async () => {

            const transferServiceMock = sinon.stub(transferService, 'transfer');
            transferServiceMock.returns({
                from: "joao",
                to: "pedro",
                amount: 100,
                date: new Date()
            });

            const resposta = await request(app)
                .post('/transfers')
                .send({
                    from: "joao",
                    to: "pedro",
                    amount: 100
                });

            expect(resposta.status).to.equal(201);

            // Um expect para comparar a Resposta.body com a String contida no arquivo
            expect(resposta.body.transfer).to.have.property('from', 'joao');
            expect(resposta.body.transfer).to.have.property('to', 'pedro');
            expect(resposta.body.transfer).to.have.property('amount', 100);

            console.log(resposta.body);

            // Reseto o Mock
            sinon.restore();

        });

        it.only('Usando Fixtures e Mocks e informo valores válidos eu tenho sucesso com 201 CREATED', async () => {

            const transferServiceMock = sinon.stub(transferService, 'transfer');
            transferServiceMock.returns({
                from: "joao",
                to: "pedro",
                amount: 100,
                date: new Date()
            });

            const resposta = await request(app)
                .post('/transfers')
                .send({
                    from: "joao",
                    to: "pedro",
                    amount: 100
                });

            console.log(resposta.body.transfer);
            expect(resposta.status).to.equal(201);

            const respostaEsperada = require('../fixture/respostas/validaEnvioDeDadosInvalidosERetornaStatus201.json');
            delete resposta.body.transfer.date;
            delete respostaEsperada.transfer.date;
            expect(resposta.body).to.deep.equal(respostaEsperada);

            // Um expect para comparar a Resposta.body com a String contida no arquivo
            // expect(resposta.body.transfer).to.have.property('from', 'joao');
            // expect(resposta.body.transfer).to.have.property('to', 'pedro');
            // expect(resposta.body.transfer).to.have.property('amount', 100);

            // Reseto o Mock
            sinon.restore();

        });

    });

});