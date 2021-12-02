import pmClient from '../../../services/pagarme/pagarmeClient';

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(403).json({ message: 'Error. Method not allowed' })
  }

  try {
    pmClient.transactions.create({
      "amount": req.body.amount,
      "card_number": req.body.cardNumber,
      "card_cvv": req.body.card_cvv,
      "card_expiration_date": req.body.cardExpirationDate,
      "card_holder_name": req.body.cardHolderName,
      "payment_method": req.body.paymentMethod,
      "customer": {
        "external_id": req.body.userId,
        "name": req.body.userName,
        "type": req.body.userType,
        "country": req.body.country,
        "email": req.body.userEmail,
        "documents": [
          {
            "type": req.body.userName,
            "number": req.body.documentNumber
          }
        ],
        "phone_numbers": [req.body.phoneNumbers],
        "birthday": req.body.birthday,
      },
      "billing": {
        "name": req.body.billingName,
        "address": {
          "country": req.body.country,
          "state": req.body.stateShortname,
          "city": req.body.city,
          "neighborhood": req.body.neighborhood,
          "street": req.body.street,
          "street_number": req.body.streeNum,
          "zipcode": req.body.zipcode
        }
      },
      "items": [
        {
          "id": req.body.meetId,
          "title": req.body.meetName,
          "unit_price": req.body.unitPrice,
          "quantity": req.body.meetQuantity,
          "tangible": false,
        },
      ]
    })
  } catch (error) {
    console.log(error)
  }
}