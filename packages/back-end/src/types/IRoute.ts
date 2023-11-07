import {Router} from 'express';

export default interface IRoute {
  /**
   * The router's root. Passed directly to express.use(), so "/users" would map to
   * "localhost:50000/users"
   */
  route: string;

  /**
   * The actual router object.
   */
  router(): Router;
}
