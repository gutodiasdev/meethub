import pagarme from 'pagarme';

const pmClient = pagarme.cliente.connect({ encryption_key: "ek_test_qZLIhncZIHTFIEkWHUQILzCmjqJbVk" })

export default pmClient