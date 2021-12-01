import pagarme from 'pagarme';

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(403).json({ message: 'Error. Method not allowed' })
  }

  const { meetId } = req.query.mid;

  const client = pagarme.cliente.connect({ encryption_key: process.env.PAGAR_ME_ENCRYPTION_KEY })
}