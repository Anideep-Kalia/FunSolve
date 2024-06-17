import { Router } from 'express';
import {
  googleLogin,
  googleOauth,
  isGoogleLogged,
} from '../Middleware/googleAuthMiddleware.js';
const router = Router();

router.get('/google', googleLogin);
router.get('/google/callback', googleOauth);

router.get('/googleSuccess', isGoogleLogged, async (req, res) => {
  res
    .cookie('token', req.user.token)
    .redirect('http://localhost:3000/landingPage');
});

router.get('/googleFailed', (req, res) => {
  res.status(401).json({ message: 'Login Failed' });
});

router.get('/googleLogout', (req, res) => {
  req.session = null;
  req.logout();
  res.clearCookie('token');
  res.status(200).json({ message: 'Google logout success' });
});

export default router;
