import pagarme from 'pagarme';

const pmClient = pagarme.cliente.connect({
  api_key: "ak_test_YEFfXjb6pcktWWpYys2PT1HZfBSqcs"
})

export default pmClient