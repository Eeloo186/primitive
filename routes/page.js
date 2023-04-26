const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const {
  renderProfile, renderJoin, renderMain, renderHashtag, renderTestmain, renderNotice, renderInfo, renderCommunity, renderLogin, renderEditorTest
  ,renderUploadTest
} = require('../controllers/page');

const router = express.Router();
router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = req.user?.Followers?.length || 0;
  res.locals.followingCount = req.user?.Followings?.length || 0;
  res.locals.followingIdList = req.user?.Followings?.map(f => f.id) || [];
  next();
});

router.get('/profile', isLoggedIn, renderProfile);

router.get('/join', isNotLoggedIn, renderJoin);

// router.get('/', renderMain);

router.get('/hashtag', renderHashtag);

//////////////////////////////////////////////////////
///////////////////// TEST ///////////////////////////
//////////////////////////////////////////////////////
router.get('/notice', renderNotice);
router.get('/info', renderInfo);
router.get('/community', renderCommunity);
router.get('/', renderTestmain);
router.get('/login', isNotLoggedIn, renderLogin);
router.get('/editorTest/community', /* isLoggedIn */ renderEditorTest);
router.post('/uploadTest', renderUploadTest);
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

module.exports = router;
