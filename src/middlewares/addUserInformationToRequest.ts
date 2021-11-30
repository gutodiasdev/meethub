import decode from 'jwt-decode'
import { DecodedToken } from '../utils/types';

const addUserInformationToRequest = (handler) => {
  return async (request, response) => {
    const { authorization } = request.headers;

    if (!authorization) {
      return response
        .status(401)
        .json({ error: true, code: 'token.invalid', message: 'Token not present.' })
    }

    const [, token] = authorization?.split(' ');

    if (!token) {
      return response
        .status(401)
        .json({ error: true, code: 'token.invalid', message: 'Token not present.' })
    }

    try {
      //verify token
      const decoded = decode(token as string) as DecodedToken;

      request.user = decoded.sub;

      return handler(request, response)

    } catch (err) {

      return response
        .status(401)
        .json({ error: true, code: 'token.expired', message: 'Token invalid.' })
    }
  }
}

export default addUserInformationToRequest;