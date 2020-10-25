/////////////////////////////////////////
/*            import library           */
/////////////////////////////////////////
import { Server } from '@hapi/hapi';

/////////////////////////////////////////
/*         import routes plugin        */
/////////////////////////////////////////
import { URLReferenceRoutePlugin } from './URLReference';
import { GeneralRoutePlugin } from './general';

/////////////////////////////////////////
/*         function definition         */
/////////////////////////////////////////
export async function registerAPIs(server: Server): Promise<void> {
  await server.register({ plugin: URLReferenceRoutePlugin }, { routes: { prefix: '/url' } });
  await server.register({ plugin: GeneralRoutePlugin });
}
