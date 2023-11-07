import {DataTypes, Model, Sequelize} from 'sequelize';
import {join, resolve} from 'path';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.EXPRESS_SQLZ_DB || (resolve(join(__dirname, '../../../../database.db'))),
});

export type IUser = {
  id: number,
  registered: Date,
  username: string,
  password: string,
  displayName: string,
}

export class User extends Model<IUser> {
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  registered: {
    type: DataTypes.DATE,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  displayName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'User',
  indexes: [
    {
      unique: true,
      name: 'SESSION_UNAME_LOWER_IDX',
      fields: [sequelize.fn('lower', sequelize.col('username'))],
    },
  ],
});

export type ISession = {
  id: number,
  user: number,
  token: string,
}

export class Session extends Model<ISession> {
}

Session.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Session',
  indexes: [
    {
      name: 'SESSION_TOKEN_IDX',
      fields: ['token'],
    },
  ],
});

User.hasMany(Session);
