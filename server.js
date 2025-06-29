console.log( "Hello World!" );const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Token Bearer completo (peguei do seu exemplo acima)
const BEARER_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5ZjQ2MGRkOC04OTEzLTQyMDktYWYyNi00MmJkYjZkMWQxODgiLCJqdGkiOiI0MjhhODM3OTE0YTlhNjE4Y2MyZWQyODhiYzUwM2U1NzZjYWRhNzljYmRjNDhiYjc4Mzc1OTBkODBmMzNjMDdhM2QxMTE5NTNmNmZmMmUzZCIsImlhdCI6MTc1MTIzMjU5OS44MjkzMDEsIm5iZiI6MTc1MTIzMjU5OS44MjkzMDUsImV4cCI6MTc4Mjc2ODU5OS44MjEyMTUsInN1YiI6IiIsInNjb3BlcyI6W119.wKTzgoFAmYk367pyiV03eL8ktGCqngQztR1HKrv6pvwDIbHjQ9AoCMnBW4cOsXxncKrcZIMxOyJnxpcvOyAyHfdHgkeNxMnlgMDgMCqY2ofEm2vwoGqkQKj3nUOLFnQoXGO6TDzfTqTp7vt8pFSQo5VA4RggukXDasOE9neKFszdQ0RpvXbYiG-HZ9gGVT7f1tkQc5DFrZnK8vjkmqhukP_pUDvnu_T55E3kXC45DgrExuucB2Fs-ujAbJ8drEuvbWbL8q0GmEZZhE3AnTBYzaqZEjFFTWNVns_VznlwzhrdENJvl_fG3OluCBmVXs5m9t8vVKPiVmklCDLtcuq3tp5JbMX3gsnz4WWVQRzrvvPzQj3RNWUmZ79n44ZFkQgPNBNiseqFi2JfdaMMFm8hUj_S9Neia8S4daS7-fRaNvE8O1PniMW6Jt45IBYvl1Wk4CCM3KhR2Le3JR7LVWQa9ubFJ4n_bK72YoJX2_8DoVKv44CQeQAxQb2ZVTgLOVTMB8OkwLVZmJzOSam9-S7QKapXrlV0M03N6fk4VJn-K_G9Ax31Z7wckiLpbqd6W3rjM9Einn-eUgZ0_6q4fcndOCgATgFYD5VNn49Kzn0HGjsVZWLFhI-AiQYk4qbJo7hm_EJsJEPpBtkAGztYI9hgo8GdrC8gOrNwAj-MhFdgQJs';

// Endpoint C2B
app.post('/c2b', async (req, res) => {
  const { msisdn, amount } = req.body;

  try {
    const payload = {
      msisdn,
      amount,
      currency: 'MZN'
    };

    const response = await axios.post('https://e2payments.explicador.co.mz/api/c2b', payload, {
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Erro na requisição C2B:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Falha ao processar pagamento C2B' });
  }
});

// Inicializar o servidor
app.listen(PORT, () => {
  console.log(`Servidor Backend C2B rodando na porta ${PORT}`);
});