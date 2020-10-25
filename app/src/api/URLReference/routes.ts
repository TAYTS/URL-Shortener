/////////////////////////////////////////
/*          import controllers         */
/////////////////////////////////////////
import { createURLReference } from './controllers';

/////////////////////////////////////////
/*          import validator           */
/////////////////////////////////////////
import { createURLReferencePayload, createURLReferenceResponse } from './validator';

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
        payload: createURLReferencePayload,
      },
      response: {
        status: { 201: createURLReferenceResponse },
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
