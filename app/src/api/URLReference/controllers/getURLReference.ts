/////////////////////////////////////////
/*            import library           */
/////////////////////////////////////////
import { ResponseToolkit, ResponseObject } from '@hapi/hapi';
import { Boom, notFound, badImplementation } from '@hapi/boom';
import { URLReference } from 'models';
import { GetURLReferenceRequest } from '../types';

/////////////////////////////////////////
/*        controller definition        */
/////////////////////////////////////////
export async function getURLReference(
  request: GetURLReferenceRequest,
  h: ResponseToolkit,
): Promise<ResponseObject | Boom<unknown>> {
  try {
    const urlHash = request.params.urlHash;

    const urlReference = await URLReference.findOne({
      where: {
        URLHash: urlHash,
      },
    });

    if (urlReference) {
      return h.response({
        url: urlReference.originalURL,
        urlHash: urlHash,
      });
    }

    return notFound('Invalid URL hash provided');
  } catch (error) {
    /* istanbul ignore next */
    return badImplementation();
  }
}
