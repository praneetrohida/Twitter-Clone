const faker = require("faker");
const _ = require("lodash");

faker.locale = "en_IND";

module.exports = function() {
  return {
    tweets: _.times((i = 30), function(index) {
      return {
        id: index,
        user: {
          name: faker.name.findName(),
          username: faker.internet.userName(),
          avatar: faker.image.avatar(),
          cover: faker.image.image(),
          bio: faker.lorem.sentence(),
          location: faker.address.city(),
          following: faker.random.number(1000),
          followers: faker.random.number(10000)
        },
        tweetContent: faker.lorem.sentences(2),
        likes: faker.random.number(500),
        retweets: faker.random.number(500),
        replies: faker.random.number(500)
      };
    })
  };
};
