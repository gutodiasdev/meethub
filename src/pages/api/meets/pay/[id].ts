import prisma from '../../../../lib/utils/prisma';
import axios from 'axios';
import pagarme from 'pagarme'

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmFwcGVhci5pbiIsImF1ZCI6Imh0dHBzOi8vYXBpLmFwcGVhci5pbi92MSIsImV4cCI6OTAwNzE5OTI1NDc0MDk5MSwiaWF0IjoxNjMxODkxNDU1LCJvcmdhbml6YXRpb25JZCI6MTMxMzU3LCJqdGkiOiIyMTJhMDI3OC04OWI3LTRiM2QtYTE1OC1lZGNlYjM5OTExOWIifQ.MFcUOQDc3QhIz4qAan04RIce5BtiERrCwp6IeZZEXqw";

const api = axios.create({
  baseURL: "https://api.whereby.dev/v1/meetings",
  method: 'post',
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  }
})

const client = pagarme.client.connect({ api_key: 'ak_test_YEFfXjb6pcktWWpYys2PT1HZfBSqcs' })


export default async (req, res) => {
  const {
    amount,
    cardNumber,
    cardCvv,
    cardExpirationDate,
    cardHolderName,
    userId,
    userName,
    type,
    country,
    userEmail,
    documentType,
    documentNumber,
    phoneNumbers,
    stateShortname,
    city,
    neighborhood,
    street,
    streetNumber,
    zipcode,
    meetId,
    meetName,
    unitPrice,
    meetQuantity
  } = req.body;

  if (req.method === 'POST') {

    pagarme.client.connect({ api_key: 'ak_test_YEFfXjb6pcktWWpYys2PT1HZfBSqcs' })
      .then(client => client.transactions.create({
        "amount": amount,
        "card_number": cardNumber,
        "card_cvv": cardCvv,
        "card_expiration_date": cardExpirationDate,
        "card_holder_name": cardHolderName,
        "customer": {
          "external_id": userId,
          "name": userName,
          "type": type,
          "country": country,
          "email": userEmail,
          "documents": [
            {
              "type": documentType,
              "number": documentNumber
            }
          ],
          "phone_numbers": [phoneNumbers]
        },
        "billing": {
          "name": userName,
          "address": {
            "country": country,
            "state": stateShortname,
            "city": city,
            "neighborhood": neighborhood,
            "street": street,
            "street_number": streetNumber,
            "zipcode": zipcode
          }
        },
        "items": [
          {
            "id": meetId,
            "title": meetName,
            "unit_price": amount,
            "quantity": meetQuantity,
            "tangible": false,
          }
        ]
      }))
      .then(transaction => {





        res.status(200).json(transaction)
      })
      .catch(err => console.log(err))
  }

  if (req.method === 'GET') {
    const client = await
      pagarme.client.connect({ api_key: "ak_test_YEFfXjb6pcktWWpYys2PT1HZfBSqcs" })

    const allTransactions = await client.transactions.all()


    return res.status(200).json(allTransactions);
  }
}