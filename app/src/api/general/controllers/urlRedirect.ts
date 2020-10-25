/////////////////////////////////////////
/*            import library           */
/////////////////////////////////////////
import { ResponseToolkit, ResponseObject } from '@hapi/hapi';
import { URLReference } from 'models';
import { URLRedirectRequest } from '../types';

/////////////////////////////////////////
/*        controller definition        */
/////////////////////////////////////////
export async function urlRedirect(request: URLRedirectRequest, h: ResponseToolkit): Promise<ResponseObject> {
  try {
    const urlHash = request.params.urlHash;

    const urlReference = await URLReference.findOne({
      where: {
        URLHash: urlHash,
      },
    });

    if (urlReference) {
      return h.redirect(urlReference.originalURL);
    }

    return h.redirect(process.env.DOMAIN);
  } catch (error) {
    /* istanbul ignore next */
    return h.redirect(process.env.DOMAIN);
  }
}
