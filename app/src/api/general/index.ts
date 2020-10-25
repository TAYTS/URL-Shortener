/////////////////////////////////////////
/*            import library           */
/////////////////////////////////////////
import { Server } from '@hapi/hapi';
import { GeneralRoutes } from './routes';

/////////////////////////////////////////
/*          plugin definition          */
/////////////////////////////////////////
export const GeneralRoutePlugin = {
  name: 'General API Route',
  version: '1.0.0',
  register: async function (server: Server): Promise<void> {
    server.route(GeneralRoutes);
  },
};
