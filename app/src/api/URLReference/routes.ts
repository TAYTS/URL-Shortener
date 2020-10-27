/////////////////////////////////////////
/*          import controllers         */
/////////////////////////////////////////
import { createURLReference } from './controllers';

/////////////////////////////////////////
/*          import validator           */
/////////////////////////////////////////
import * as validator from './validator';

/////////////////////////////////////////
/*           route definition          */
/////////////////////////////////////////
const swaggerTags = ['api', 'URL Reference'];
export const URLReferenceRoutes = [
  {
    method: 'POST',
    path: '/',
    options: {
      handler: createURLReference,
      tags: swaggerTags,
      description: 'Create URL reference mapping.',
      validate: {
        payload: validator.createURLReferencePayload,
      },
      response: {
        status: { 201: validator.createURLReferenceResponse },
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            201: { description: 'Successfully created URL reference.' },
          },
        },
      },
    },
  },
];
