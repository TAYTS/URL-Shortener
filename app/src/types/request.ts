/////////////////////////////////////////
/*            import library           */
/////////////////////////////////////////
import { Request as HapiRequest } from '@hapi/hapi';

/////////////////////////////////////////
/*             definition              */
/////////////////////////////////////////
export interface Request extends Omit<Omit<HapiRequest, 'query'>, 'params'> {
  params: string | number;
  query: {
    [key: string]: string | number;
  };
}
