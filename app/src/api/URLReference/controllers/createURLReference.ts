/////////////////////////////////////////
/*            import library           */
/////////////////////////////////////////
import { ResponseToolkit, ResponseObject } from '@hapi/hapi';
import {} from '@hapi/boom';
import { URLReference } from 'models';
import { CreateURLReferenceRequest } from '../types';

/////////////////////////////////////////
/*        controller definition        */
/////////////////////////////////////////
export async function createURLReference(
  request: CreateURLReferenceRequest,
  h: ResponseToolkit,
): Promise<ResponseObject> {
  return h.response().code(201);
}
