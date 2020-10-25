/////////////////////////////////////////
/*            import library           */
/////////////////////////////////////////
require('dotenv-flow').config();
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

export async function serverInit(): Promise<Server> {
  try {
    //  Setup Hapi Plugins
    await registerPlugins(server);

    // Setup APIs
    await registerAPIs(server);

    // Initialise Server
    await server.initialize();

    return server;
  } catch (err) {
    console.error('Error initialise server: ', err);
    throw err;
  }
}

export async function serverStart(): Promise<void> {
  try {
    const server = await serverInit();
    await server.start();
    console.log(`Server listening at ${SERVER_URL}:${PORT}`);
  } catch (err) {
    console.log('Error staring server:', err);
  }
}

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});
