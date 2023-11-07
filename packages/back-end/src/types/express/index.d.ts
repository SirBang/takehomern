import {ISession, IUser} from '../../services/db';

declare global {
  namespace Express {
    export interface Request {
      services: {
        sequelize: import('sequelize').Sequelize;
      };
      session?: {
        token: ISession,
        user: IUser,
      },
    }
  }
}

// we need this file to be considered a module so that declaration merging can function as expected.
export {};
