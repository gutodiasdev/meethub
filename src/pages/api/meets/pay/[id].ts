import axios from 'axios';
import pagarme from 'pagarme'
import nextConnect from 'next-connect'
import prisma from '../../../../lib/utils/prisma';
import { NextApiRequest, NextApiResponse } from 'next';


const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmFwcGVhci5pbiIsImF1ZCI6Imh0dHBzOi8vYXBpLmFwcGVhci5pbi92MSIsImV4cCI6OTAwNzE5OTI1NDc0MDk5MSwiaWF0IjoxNjMxODkxNDU1LCJvcmdhbml6YXRpb25JZCI6MTMxMzU3LCJqdGkiOiIyMTJhMDI3OC04OWI3LTRiM2QtYTE1OC1lZGNlYjM5OTExOWIifQ.MFcUOQDc3QhIz4qAan04RIce5BtiERrCwp6IeZZEXqw";

const api = axios.create({
  baseURL: "https://api.whereby.dev/v1/meetings",
  method: 'post',
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  }
})

// export default async (req, res) => {

//   if (req.method === 'POST') {
//     const {
//       amount,
//       cardNumber,
//       cardCvv,
//       cardExpirationDate,
//       cardHolderName,
//       userId,
//       userName,
//       type,
//       country,
//       userEmail,
//       documentType,
//       documentNumber,
//       phoneNumbers,
//       stateShortname,
//       city,
//       neighborhood,
//       street,
//       streetNumber,
//       zipcode,
//       meetId,
//       meetName,
//       unitPrice,
//       meetQuantity,
//       endDate,
//     } = req.body;

//     pagarme.client.connect({ api_key: 'ak_test_YEFfXjb6pcktWWpYys2PT1HZfBSqcs' })
//       .then(client => client.transactions.create({
//         "amount": amount,
//         "card_number": cardNumber,
//         "card_cvv": cardCvv,
//         "card_expiration_date": cardExpirationDate,
//         "card_holder_name": cardHolderName,
//         "customer": {
//           "external_id": userId,
//           "name": userName,
//           "type": type,
//           "country": country,
//           "email": userEmail,
//           "documents": [
//             {
//               "type": documentType,
//               "number": documentNumber
//             }
//           ],
//           "phone_numbers": [phoneNumbers]
//         },
//         "billing": {
//           "name": userName,
//           "address": {
//             "country": country,
//             "state": stateShortname,
//             "city": city,
//             "neighborhood": neighborhood,
//             "street": street,
//             "street_number": streetNumber,
//             "zipcode": zipcode
//           }
//         },
//         "items": [
//           {
//             "id": meetId,
//             "title": meetName,
//             "unit_price": amount,
//             "quantity": meetQuantity,
//             "tangible": false,
//           }
//         ]
//       }))
//       .then(async (transaction) => {

//         const {
//           acquirer_id,
//           acquirer_name,
//           acquirer_response_code,
//           amount,
//           antifraud_score,
//           authorization_code,
//           authorized_amount,
//           boleto_barcode,
//           boleto_expiration_date,
//           boleto_url,
//           capture_method,
//           card_brand,
//           card_first_digits,
//           card_holder_name,
//           card_last_digits,
//           card_pin_mode,
//           cost,
//           date_created,
//           date_updated,
//           email,
//           installments,
//           paid_amount,
//           payment_method,
//           postback_url,
//           referer,
//           refse_reason,
//           refunded_amount,
//           status,
//           status_reason,
//         } = transaction

//         const createMeetTransaction = await prisma.meetTransaction.create({
//           data: {
//             acquirer_id: acquirer_id,
//             acquirer_name: acquirer_name,
//             acquirer_response_code: acquirer_response_code,
//             amount: amount,
//             antifraud_score: antifraud_score,
//             authorization_code: authorization_code,
//             authorized_amount: authorized_amount,
//             boleto_barcode: boleto_barcode,
//             boleto_expiration_date: boleto_expiration_date,
//             boleto_url: boleto_url,
//             capture_method: capture_method,
//             card_brand: card_brand,
//             card_first_digits: card_first_digits,
//             card_holder_name: card_holder_name,
//             card_last_digits: card_last_digits,
//             card_pin_mode: card_pin_mode,
//             cost: cost,
//             date_created: date_created,
//             date_updated: date_updated,
//             email: email,
//             installments: installments,
//             paid_amount: paid_amount,
//             payment_method: payment_method,
//             postback_url: postback_url,
//             referer: referer,
//             refse_reason: refse_reason,
//             refunded_amount: refunded_amount,
//             status: status,
//             status_reason: status_reason,
//           }
//         })

//         const roomUrl = await api.post('/', { endDate })
//           .then(async (response) => {
//             const { roomUrl } = response.data;
//             await prisma.meetEnrollment.create({
//               data: {
//                 meetId: meetId,
//                 roles: 'user',
//                 room: roomUrl,
//                 userId: userId,
//               }
//             })
//           })

//         res.status(200).json(roomUrl, createMeetTransaction)
//       })
//       .catch(err => console.log(err))
//   }

//   if (req.method === 'GET') {
//     const client = await
//       pagarme.client.connect({ api_key: "ak_test_YEFfXjb6pcktWWpYys2PT1HZfBSqcs" })

//     const allTransactions = await client.transactions.all()


//     return res.status(200).json(allTransactions);
//   }
// }

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onNoMatch(req, res) {
    res.status(405).json({ mesage: `Method ${req.method} Not Allowed` });
  },
  onError(req, res) { }
})
  .post(async (req, res) => {
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
      meetQuantity,
      endDate,
      userProfession,
      userExpectation,
      userChoice,
      userMoreAbout
    } = req.body;

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
      .then(async (transaction) => {

        // const {
        //   acquirer_id,
        //   acquirer_name,
        //   acquirer_response_code,
        //   amount,
        //   antifraud_score,
        //   authorization_code,
        //   authorized_amount,
        //   boleto_barcode,
        //   boleto_expiration_date,
        //   boleto_url,
        //   capture_method,
        //   card_brand,
        //   card_first_digits,
        //   card_holder_name,
        //   card_last_digits,
        //   card_pin_mode,
        //   cost,
        //   date_created,
        //   date_updated,
        //   email,
        //   installments,
        //   paid_amount,
        //   payment_method,
        //   postback_url,
        //   referer,
        //   refse_reason,
        //   refunded_amount,
        //   status,
        //   status_reason,
        // } = transaction

        // const createMeetTransaction = await prisma.meetTransaction.create({
        //   data: {
        //     acquirer_id: acquirer_id,
        //     acquirer_name: acquirer_name,
        //     acquirer_response_code: acquirer_response_code,
        //     amount: amount,
        //     antifraud_score: antifraud_score,
        //     authorization_code: authorization_code,
        //     authorized_amount: authorized_amount,
        //     boleto_barcode: boleto_barcode,
        //     boleto_expiration_date: boleto_expiration_date,
        //     boleto_url: boleto_url,
        //     capture_method: capture_method,
        //     card_brand: card_brand,
        //     card_first_digits: card_first_digits,
        //     card_holder_name: card_holder_name,
        //     card_last_digits: card_last_digits,
        //     card_pin_mode: card_pin_mode,
        //     cost: cost,
        //     date_created: date_created,
        //     date_updated: date_updated,
        //     email: email,
        //     installments: installments,
        //     paid_amount: paid_amount,
        //     payment_method: payment_method,
        //     postback_url: postback_url,
        //     referer: referer,
        //     refse_reason: refse_reason,
        //     refunded_amount: refunded_amount,
        //     status: status,
        //     status_reason: status_reason,
        //   }
        // })

        const roomUrl = await api.post('/', { endDate })
          .then(async (response) => {
            const { roomUrl } = response.data;
            await prisma.meetEnrollment.create({
              data: {
                meetId: meetId,
                roles: 'user',
                room: roomUrl,
                userId: userId,
                userProfession: userProfession,
                userChoice: userChoice,
                userExpectation: userExpectation,
                userMoreAbout: userMoreAbout,
              }
            })
          })

        return res.status(200).json(roomUrl)
      })
      .catch(err => console.log(err))

  })

export default handler