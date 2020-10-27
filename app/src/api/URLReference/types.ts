/////////////////////////////////////////
/*           import utils              */
/////////////////////////////////////////
import { Request } from 'types';

/////////////////////////////////////////
/*             definition              */
/////////////////////////////////////////
export interface CreateURLReferenceRequest extends Request {
  payload: {
    url: string;
  };
}

export interface GetURLReferenceRequest extends Request {
  params: {
    urlHash: string;
  };
}
