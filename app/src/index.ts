/////////////////////////////////////////
/*            import library           */
/////////////////////////////////////////
require('dotenv-flow').config();
import { serverInit } from './server';

console.log('database host:', process.env.NODE_ENV);
/////////////////////////////////////////
/*            Server Setup             */
/////////////////////////////////////////
const start = async (): Promise<void> => {
  await serverInit();
};

start();
