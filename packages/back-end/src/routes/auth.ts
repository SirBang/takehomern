import IRoute from '../types/IRoute';
import {Router} from 'express';
import {compareSync} from 'bcrypt';
import {attachSession,authMiddleware} from '../middleware/auth';
import {validate} from '../middleware/validate';
import {sequelize, Session, User} from '../services/db';
import {randomBytes} from 'crypto';

const AuthRouter: IRoute = {
  route: '/auth',
  router() {
    const router = Router();
    router.use(attachSession);

    // If we're authenticated, return basic user data.
    router.get('/', authMiddleware, (req, res) => {
        const {
          token: {token, ...session},
          user: {password, ...user},
        } = req.session;

        return res.json({
          success: true,
          message: 'Authenticated',
          data: {
            session,
            user,
          },
        });
    });
    router.use(['/login','/register'],validate);
    // Attempt to log in
    router.post('/login', async (req, res) => {
   
      const { username, password } = req.body;
   
      const user = await User.findOne({
        where: sequelize.where(
          sequelize.fn('lower', sequelize.col('username')),
          sequelize.fn('lower', username),
        ),
      }).catch(err => console.error('User lookup failed.', err));
     
      // Ensure the user exists. If not, return an error.
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid username/password.',
        });
      }

      // Ensure the password is correct. If not, return an error.
      if (!compareSync(password, user.dataValues.password)) {
        return res.status(401).json({
          success: false,
          message: 'Invalid username/password.',
        });
      }
   
      // We now know the user is valid so it's time to mint a new session token.
      const sessionToken = randomBytes(32).toString('hex');
      let session;
      try {
        // Persist the token to the database.
        session = await Session.create({
          token: sessionToken,
          user: user.dataValues.id,
        });
      } catch (e) {
        return passError('Failed to create session.', e, res);
      }

      if (!session) {
        // Something broke on the database side. Not much we can do.
        return passError('Returned session was nullish.', null, res);
      }

      // We set the cookie on the response so that browser sessions will
      // be able to use it.
      
      res.cookie('SESSION_TOKEN', sessionToken, {
        expires: new Date(Date.now() + (3600 * 24 * 7 * 1000)), // +7 days
        secure: false,
        httpOnly: true,
      });
      // We return the cookie to the consumer so that non-browser
      // contexts can utilize it easily. This is a convenience for the
      // take-home so you don't have to try and extract the cookie from
      // the response headers etc. Just know that this is a-standard
      // in non-oauth flows :)
      return res.json({
        success: true,
        message: 'Logined Successfully.',
        data: {
          token: sessionToken,
        },
      });
    });


    // Attempt to register
    router.post('/register',async (req, res) => {
      const {username,displayName,password } = req.body;

      try {
        // Persist the token to the database.
        await User.create({
          username: username,
          password: password,
          displayName:displayName,
          registered:Date.now()
        });


        return res.json({
          success: true,
          message: 'Authenticated Successfully.'
        });

      } catch (e) {
        return passError('Failed to create session.', e, res);
      }

    });

    // Log out
    router.get('/logout', async (req, res) => {

        const {SESSION_TOKEN} = req.cookies;

        res.clearCookie('SESSION_TOKEN');
        res.session = {};

        console.log(res.cookie);
        console.log(res.session);
        try {
            await Session.destroy({
              where: {
                token: SESSION_TOKEN,
              },
            });
        
            return res.json({
              success: true,
              message: 'Logout successful.',
            });

        } catch (error) {
            console.error('Failed to delete session:', error);
            return res.status(500).json({
              success: false,
              message: 'An error occurred while logging out.',
            });
        }


    });
    
    return router;
  },
};

export default AuthRouter;

function passError(message, error, response) {
  console.error(message, error);
  return response.status(500).json({
    success: false,
    message: `Internal: ${message}`,
  });
}
