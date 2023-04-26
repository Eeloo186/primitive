const { User, Post, Hashtag, Board, Content } = require("../models");

exports.renderProfile = (req, res) => {
  res.render("profile", { title: "내 정보 - NodeBird" });
};

exports.renderJoin = (req, res) => {
  res.render("join", { title: "회원가입 - NodeBird" });
};

exports.renderMain = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ["id", "nick"],
      },
      order: [["createdAt", "DESC"]],
    });
    res.render("main", {
      title: "NodeBird",
      twits: posts,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.renderHashtag = async (req, res, next) => {
  const query = req.query.hashtag;
  if (!query) {
    return res.redirect("/");
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: query } });
    let posts = [];
    if (hashtag) {
      posts = await hashtag.getPosts({ include: [{ model: User }] });
    }

    return res.render("main", {
      title: `${query} | NodeBird`,
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};


//////////////////////////////////////////////////////
///////////////////// TEST ///////////////////////////
//////////////////////////////////////////////////////
exports.renderTestmain = async (req, res, next) => {
  try {
    // const posts = await Post.findAll({
    //   include: {
    //     model: User,
    //     attributes: ["userId", "nickname"],
    //   },
    //   order: [["createdAt", "DESC"]],
    // });
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['userId', 'nickname'],
        },
        {
          model: Board,
          attributes: ['name'],
        },
        {
          model: Content,
          attributes: ['content'],
        },
      ]
    })
    res.render("testmain", {
      title: "메인페이지",
      twits: posts,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.renderNotice = async (req, res, next) => {
  try {
    // const posts = await Post.findAll({
    //   include: {
    //     model: User,
    //     attributes: ["userId", "nickname"],
    //   },
    //   order: [["createdAt", "DESC"]],
    // });
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['userId', 'nickname'],
        },
        {
          model: Board,
          attributes: ['name'],
          where: { name: 'notice' },
        },
        {
          model: Content,
          attributes: ['content'],
        },
      ]
    })
    res.render("notice", {
      title: "공지사항페이지",
      twits: posts,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.renderInfo = async (req, res, next) => {
  try {
    // const posts = await Post.findAll({
    //   include: {
    //     model: User,
    //     attributes: ["userId", "nickname"],
    //   },
    //   order: [["createdAt", "DESC"]],
    // });
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['userId', 'nickname'],
        },
        {
          model: Board,
          attributes: ['name'],
          where: { name: 'info' },
        },
        {
          model: Content,
          attributes: ['content'],
        },
      ]
    })
    res.render("info", {
      title: "정보페이지",
      twits: posts,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.renderCommunity = async (req, res, next) => {
  try {
    // const posts = await Post.findAll({
    //   include: {
    //     model: User,
    //     attributes: ["userId", "nickname"],
    //   },
    //   order: [["createdAt", "DESC"]],
    // });
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['userId', 'nickname'],
        },
        {
          model: Board,
          attributes: ['name'],
          where: { name: 'community' },
        },
        {
          model: Content,
          attributes: ['content'],
        },
      ]
    })

    // DB createdAt에 들어있는 Date 정보 커스터마이징
    posts.forEach( (post) => {
      let date = post['dataValues']['createdAt'];
      post['dataValues']['createdAt'] = `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분 ${date.getSeconds()}초`;
    });

    res.render("community", {
      title: "커뮤니티페이지",
      twits: posts,
      boardName: 'community'
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};



exports.renderLogin = (req, res) => {
  res.render("login", { title: "로그인페이지" });
};


exports.renderEditorTest = (req, res) => {
  res.render("editorTest", { title: "에디터 테스트 페이지" });
}

exports.renderUploadTest = (req, res, next) => {
  try{
    console.log("컨트롤러 내부");
    console.log(req.body.content);
    ///////////////////////////////////////////////
    ////////////// db에 content 등록 //////////////
    ////////////// content 이외의 데이터 필요함 ///
    ///////////////////////////////////////////////
    res.status(200).send("본문 내용 DB에 저장 완료");
    } catch (err){
    console.error(err);
    next(err);
  }
};
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////