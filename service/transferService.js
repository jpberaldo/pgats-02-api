const transfers = require('../model/transferModel');
const users = require('../model/userModel');

function transfer({ from, to, amount }) {
  const sender = users.find(u => u.login === from);
  const recipient = users.find(u => u.login === to);
  if (!sender || !recipient) throw new Error('Usuário remetente ou destinatário não encontrado');
  const isFavorecido = sender.favorecidos && sender.favorecidos.includes(to);
  if (!isFavorecido && amount >= 5000) {
    throw new Error('Transferências acima de R$ 5.000,00 só podem ser feitas para favorecidos');
  }
  const transfer = { from, to, amount, date: new Date() };
  transfers.push(transfer);
  return transfer;
}

function getAllTransfers() {
  return transfers;
}

module.exports = { transfer, getAllTransfers };
