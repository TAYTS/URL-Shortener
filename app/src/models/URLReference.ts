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

export type URLReferenceCreationAttributes = Omit<URLReferenceAttributes, 'id' | 'createTimestamp'>;

export class URLReference
  extends Model<URLReferenceAttributes, URLReferenceCreationAttributes>
  implements URLReferenceAttributes {
  public id!: number;

  public originalURL!: string;

  public URLHash!: string;

  public readonly createTimestamp!: Date;
}

export default function InitModel(sequelize: Sequelize): void {
  URLReference.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      originalURL: {
        type: new DataTypes.STRING(255),
        allowNull: false,
      },
      URLHash: {
        type: new DataTypes.STRING(255),
        allowNull: false,
      },
      createTimestamp: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: 'url_reference',
    },
  );
}
