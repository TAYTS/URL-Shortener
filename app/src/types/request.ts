/////////////////////////////////////////
/*            import library           */
/////////////////////////////////////////
import { Request as HapiRequest } from '@hapi/hapi';

/////////////////////////////////////////
/*             definition              */
/////////////////////////////////////////
export interface Request extends Omit<HapiRequest, 'query'> {
  params: {
    [key: string]: string | number;
  };
  query: {
    [key: string]: string | number;
  };
}
