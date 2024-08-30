import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Reading extends Model {
  public id!: number;
  public image_link!: string;
  public guid!: string;
  public recognized_value!: number;
  public customer_code!: string;
  public measure_datetime!: Date;
  public measure_type!: string;
  public confirmed_value?: number;
}

Reading.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  image_link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  guid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  recognized_value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  customer_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  measure_datetime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  measure_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  confimed_value: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'Readings',
});

export default Reading;
