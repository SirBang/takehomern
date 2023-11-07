import {sequelize} from '../services/db';

// whether or not we've run #authenticate() during this server's lifetime.
let didVerifySqlz = false;

/**
 * A middleware function that attaches sequelize when it's ready for consumption.
 *
 *
 *
 * @example
 * const app = express()
 * app.use(attachSequelize)
 *
 * app.get('/', (req, res) => {
 *   // do something with req.services.sequelize! this only fires once
 *   // #authenticate completes, so we know it's ready for consumption.
 * });
 */
export function attachSequelize(req, res, next) {
  verifySqlzMaybe()
    .then(sequelize => {
      if (!req.services) {
        req.services = {};
      }

      req.services.sequelize = sequelize;
      next();
    })
    .catch(err => {
      console.error('Failed to attach sequelize. Aborting request.', err);
      res.status(500).end();
    });
}

/**
 * Run sequelize#authenticate (at most once) to verify connection, then return sequelize for
 * consumption.
 */
async function verifySqlzMaybe() {
  if (!didVerifySqlz) {
    await sequelize.authenticate();
    didVerifySqlz = true;
  }

  return sequelize;
}
