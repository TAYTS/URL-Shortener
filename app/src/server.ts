/////////////////////////////////////////
/*            import library           */
/////////////////////////////////////////
import { Server } from '@hapi/hapi';
import { registerPlugins } from 'plugins';
import { registerAPIs } from 'api';

/////////////////////////////////////////
/*        server init function         */
/////////////////////////////////////////
// Configure Hapi Server
const PORT = process.env.PORT || 3001;
const SERVER_URL = process.env.SERVER || 'localhost';
export const server = new Server({
  debug: { request: ['error'] },
  host: SERVER_URL,
  port: PORT,
  routes: { cors: { origin: ['*'] } },
});

export async function serverInit(): Promise<void> {
  try {
    //  Setup Hapi Plugins
    await registerPlugins(server);

    // Setup APIs
    await registerAPIs(server);

    // Start Server
    await server.start();

    console.log('Server listening at %s:%s', SERVER_URL, PORT);
  } catch (err) {
    console.error('Error starting server: ', err);
    throw err;
  }
}
