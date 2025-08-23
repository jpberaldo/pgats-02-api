const request = require('supertest');
const { expect } = require('chai');

describe('Transfer controller tests - via HTTP', () => {
    before((done) => {
        // Espera um tempo curto para garantir que o servidor esteja 100% ativo
        setTimeout(done, 500); // 0.5s
    });

    it('Quando informar usuarios inexistentes receber status code 400 via http', async () => {
        const resposta = await request('http://localhost:3000')
            .post('/transfers')
            .send({
                from: "userTest1",
                to: "userTest2",
                amount: 400
            });

        console.log('Status:', resposta.status);
        console.log('Body:', resposta.body);

        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');
    });
});
