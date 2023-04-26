const { Post, Hashtag } = require('../models');

exports.testMiddle = (req, res, next) => {
  console.log('-----------------1--------------------');
  console.log("ckfinder 실행");
  console.log('-----------------2----------------------');
  // console.log(req);
  console.log('----------------3----------------------');

  next();
}

exports.afterUploadImage = (req, res) => {
  console.log('-----------------------------------------------------------');
  console.log('사진업로드에서 넘어옴');
  console.log('-----------------------------------------------------------');
  console.log(req.files[0].mimetype);
  console.log(req.files[0].filename);
  // console.log(req.files[0].filename);
  console.log('-----------------------------------------------------------');
  res.json({ url: `/img/${req.files[0].filename}` });
  // res.json({ url: `/img/cover1682471098229.jpg` });
};

exports.uploadPost = async (req, res, next) => {
  try {
    console.log(req.body, '-------------');
    // const post = await Post.create({
    //   content: req.body.content,
    //   img: req.body.url,
    //   UserId: req.user.id,
    // });
    // const hashtags = req.body.content.match(/#[^\s#]*/g);
    // if (hashtags) {
    //   const result = await Promise.all(
    //     hashtags.map(tag => {
    //       return Hashtag.findOrCreate({
    //         where: { title: tag.slice(1).toLowerCase() },
    //       })
    //     }),
    //   );
    //   await post.addHashtags(result.map(r => r[0]));
    // }
    // res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
};