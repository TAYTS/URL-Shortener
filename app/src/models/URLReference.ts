/////////////////////////////////////////
/*            import library           */
/////////////////////////////////////////
import { Sequelize, Model, DataTypes } from 'sequelize';

/////////////////////////////////////////
/*           model definition          */
/////////////////////////////////////////
export type URLReferenceAttributes = {
  id: number;
  originalURL: string;
  URLHash: string;
};

export type URLReferenceCreationAttributes = Omit<URLReferenceAttributes, 'id'>;

export class URLReference extends Model {
  public id!: number;

  public originalURL!: string;

  public URLHash!: string;

  public readonly createdAt!: Date;
}

export default function InitModel(sequelize: Sequelize): void {
  URLReference.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        field: 'ID',
      },
      originalURL: {
        type: new DataTypes.STRING(255),
        allowNull: false,
        field: 'ORIGINAL_URL',
      },
      URLHash: {
        type: new DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        field: 'URL_HASH',
      },
      createdAt: {
        type: new DataTypes.DATE(),
        allowNull: false,
        field: 'CREATED_AT',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    },
    {
      sequelize,
      tableName: 'url_reference',
      updatedAt: false,
    },
  );
}
