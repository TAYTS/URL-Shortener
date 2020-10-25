/////////////////////////////////////////
/*            import library           */
/////////////////////////////////////////
import { Server } from '@hapi/hapi';
import { Sequelize } from 'sequelize';

/////////////////////////////////////////
/*            import models            */
/////////////////////////////////////////
import { InitModels } from 'models';

/////////////////////////////////////////
/*          plugin definition          */
/////////////////////////////////////////
const mysqldb = {
  name: 'mysqldb',
  version: '1.0.0',
  register: async function (server: Server): Promise<void> {
    const MYSQL_URL = process.env.MYSQL_URL;

    const sequelize = new Sequelize(MYSQL_URL);

    InitModels(sequelize);

    await sequelize.sync();
  },
};

export default mysqldb;
