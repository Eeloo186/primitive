const Sequelize = require('sequelize');

class Post extends Sequelize.Model {
  static initiate(sequelize) {
    Post.init({
        // 좋아요 숫자 카운트 하는 칼럼 필요할 수도 있음(성능문제)
        title: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        views: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Post',
      tableName: 'posts',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Like);
    db.Post.hasMany(db.Comment);
    db.Post.hasOne(db.Content);
    db.Post.belongsTo(db.Board);
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
  }
};

module.exports = Post;
