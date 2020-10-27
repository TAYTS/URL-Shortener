/////////////////////////////////////////
/*            import utils             */
/////////////////////////////////////////
import api from 'apis/api';
import apiConfig from 'apis/apiConfig';
import { GetURLReferencePayload, GetURLReferenceResponse } from './types';
import { AxiosPromise } from 'axios';

/////////////////////////////////////////
/*            api definition           */
/////////////////////////////////////////
export function redirectPage(payload: GetURLReferencePayload): AxiosPromise<GetURLReferenceResponse> {
  return api.get<GetURLReferenceResponse>({
    url: apiConfig.urlReference.redirectPage.replace('{urlHash}', payload.url),
  });
}
