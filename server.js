const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const CLIENT_ID = '9f460dd8-8913-4209-af26-42bdb6d1d188';
const CLIENT_SECRET = 'vHduN62cPBEM98IeTD83iIVMHXMrqz63BCpZNETS';
const WALLET_ID = '920873';

app.use(bodyParser.json());

async function getBearerToken() {
  try {
    const response = await axios.post('https://e2payments.explicador.co.mz/v1/oauth/token/', {
      grant_type: 'client_credentials',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Erro ao obter token:', error.response ? error.response.data : error.message);
    throw new Error('Falha na autenticação');
  }
}

app.post('/c2b', async (req, res) => {
  const { amount, phoneNumber, reference } = req.body;
  if (!amount || !phoneNumber || !reference) {
    return res.status(400).json({ error: 'Parâmetros obrigatórios faltando' });
  }

  try {
    const token = await getBearerToken();

    const endpoint = `https://e2payments.explicador.co.mz/v1/c2b/mpesa-payment/${WALLET_ID}`;
    const payload = {
      client_id: CLIENT_ID,
      amount,
      phone: phoneNumber,
      reference
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };

    const response = await axios.post(endpoint, payload, { headers });
    res.json(response.data);
  } catch (error) {
    console.error('Erro na transação C2B:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Falha ao processar pagamento C2B' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});