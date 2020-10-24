/////////////////////////////////////////
/*            import library           */
/////////////////////////////////////////
import { Sequelize } from 'sequelize';

export * from './URLReference';
import InitURLReference from './URLReference';

export function InitModels(sequelize: Sequelize): void {
  InitURLReference(sequelize);
}
