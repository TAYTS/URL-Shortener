/////////////////////////////////////////
/*          import controllers         */
/////////////////////////////////////////
import { urlRedirect } from './controllers';

/////////////////////////////////////////
/*          import validator           */
/////////////////////////////////////////

/////////////////////////////////////////
/*           route definition          */
/////////////////////////////////////////
const swaggerTags = ['api', 'General'];
export const GeneralRoutes = [
  {
    method: 'GET',
    path: '/{urlHash}',
    options: {
      handler: urlRedirect,
      tags: swaggerTags,
      description: 'Redirect to the URL stored',
      plugins: {
        'hapi-swagger': {
          responses: {
            301: { description: 'Redirect to original URL' },
          },
        },
      },
    },
  },
];
