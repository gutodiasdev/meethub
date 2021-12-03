import pagarme from 'pagarme';

const pmClient = pagarme.cliente.connect({
  api_key: process.env.PAGAR_ME_TEST_API_KEY
})

export default pmClient