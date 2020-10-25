/////////////////////////////////////////
/*            import library           */
/////////////////////////////////////////
import { Server } from '@hapi/hapi';
import { URLReferenceRoutes } from './routes';
import { URLReference } from 'models';

/////////////////////////////////////////
/*          plugin definition          */
/////////////////////////////////////////
export const URLReferenceRoutePlugin = {
  name: 'URL Reference Route',
  version: '1.0.0',
  register: async function (server: Server): Promise<void> {
    server.route(URLReferenceRoutes);
  },
};
