/////////////////////////////////////////
/*            import library           */
/////////////////////////////////////////
require('dotenv-flow').config();
import { serverInit } from './server';

/////////////////////////////////////////
/*            Server Setup             */
/////////////////////////////////////////
const start = async (): Promise<void> => {
  await serverInit();
};

start();
