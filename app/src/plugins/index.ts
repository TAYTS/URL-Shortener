/////////////////////////////////////////
/*            import library           */
/////////////////////////////////////////
import { Server } from '@hapi/hapi';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';

/////////////////////////////////////////
/*            import plugins           */
/////////////////////////////////////////
import CORS from './cors';
import Swagger from './swagger';
import MySQLDB from './mysqldb';

/////////////////////////////////////////
/*         plugins installation        */
/////////////////////////////////////////
const devBundle = [{ plugin: Vision }, Swagger];

export async function registerPlugins(server: Server): Promise<void> {
  // register custom plugins
  await server.register([MySQLDB]);

  // register public plugins
  await server.register([CORS, { plugin: Inert }, ...(process.env.NODE_ENV == 'development' ? devBundle : [])]);
}
