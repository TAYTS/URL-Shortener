/////////////////////////////////////////
/*          import controllers         */
/////////////////////////////////////////
import { createURLReference, getURLReference } from './controllers';

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
    method: 'GET',
    path: '/{urlHash}',
    options: {
      handler: getURLReference,
      tags: swaggerTags,
      description: 'Get the original URL',
      validate: {
        params: validator.getURLReferencePayload,
      },
      response: {
        status: { 200: validator.getURLReferenceResponse },
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            200: { description: 'Original URL' },
            404: {},
            500: {},
          },
        },
      },
    },
  },
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
            500: {},
          },
        },
      },
    },
  },
];
