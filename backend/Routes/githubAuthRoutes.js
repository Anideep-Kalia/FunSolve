import { Router } from 'express';
import passport from 'passport';

import { githubAuth } from '../Middleware/githubAuthMiddleware.js';
const router = Router();

router.get('/signin/github/', passport.authenticate('github'));

router.get('/signin/github/callback', githubAuth, (req, res) => {
  // console.log(req.user);
  res.redirect('/api/user/isGithubLogged');
});

router.get('/isGithubLogged', (req, res) => {
  if (req.user) {
    return res.status(200).json({
      success: true,
      message: 'Authorized',
      data: req.user,
    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'UnAuthorized',
    });
  }
});


router.get('/githubFailed', (req, res) => {
  return res.status(501).json({
    success: false,
    message: 'Failed',
  });
});

router.get('/githubLogout', (req, res) => {
  req.session = null;
  req.logOut();
  return res.status(200).json({
    success: true,
    message: 'Logged out',
  });
});

export default router;
