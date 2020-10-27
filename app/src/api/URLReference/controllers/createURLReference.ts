/////////////////////////////////////////
/*            import library           */
/////////////////////////////////////////
import { ResponseToolkit, ResponseObject } from '@hapi/hapi';
import { Boom, badImplementation } from '@hapi/boom';
import { URLReference } from 'models';
import { CreateURLReferenceRequest } from '../types';
import crypto from 'crypto';

/////////////////////////////////////////
/*        controller definition        */
/////////////////////////////////////////
export async function createURLReference(
  request: CreateURLReferenceRequest,
  h: ResponseToolkit,
): Promise<ResponseObject | Boom<unknown>> {
  try {
    const url = request.payload.url;

    const urlHash = crypto.randomBytes(url.length).toString('hex').slice(0, 15);

    await URLReference.create({
      originalURL: url,
      URLHash: urlHash,
    });

    return h
      .response({
        urlHash: urlHash,
      })
      .code(201);
  } catch (error) {
    /* istanbul ignore next */
    return badImplementation(error);
  }
}
