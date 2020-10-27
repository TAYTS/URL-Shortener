/////////////////////////////////////////
/*            import utils             */
/////////////////////////////////////////
import api from 'apis/api';
import apiConfig from 'apis/apiConfig';
import { CreateURLReferencePayload, CreateURLReferenceSuccessResponse } from './types';
import { AxiosPromise } from 'axios';

/////////////////////////////////////////
/*            api definition           */
/////////////////////////////////////////
export function createURLReference(
  payload: CreateURLReferencePayload,
): AxiosPromise<CreateURLReferenceSuccessResponse> {
  return api.post<CreateURLReferenceSuccessResponse>({
    url: apiConfig.urlReference.createURL,
    body: {
      url: payload.url,
    },
  });
}
