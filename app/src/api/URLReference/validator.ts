/////////////////////////////////////////
/*            import library           */
/////////////////////////////////////////
import { object, string } from 'joi';

/////////////////////////////////////////
/*         validator definition        */
/////////////////////////////////////////
export const createURLReferencePayload = object({
  url: string().uri().required(),
}).label('Create URL Reference Payload');

export const createURLReferenceResponse = object({
  url: string().uri().required(),
}).label('Create URL Reference Response');
