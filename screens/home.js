import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableHighlight
} from "react-native";
import {
  Container,
  Header,
  Body,
  Content,
  Left,
  Title,
  Thumbnail,
  Col,
  Row,
  Grid,
  Icon
} from "native-base";
import { connect } from "react-redux";
import { fetchTweets } from "../actions/tweetsActions";

const styles = StyleSheet.create({
  topMargin: {
    marginTop: 25
  },
  content: {
    padding: 10,
    backgroundColor: "white"
  },
  heading: {
    fontSize: 32,
    fontWeight: "400",
    marginBottom: 30
  },
  tweet: {
    paddingTop: 20,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "column"
  },
  tweetText: {
    marginTop: 10,
    fontSize: 18,
    color: "#555"
  },
  tweetFooter: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  badgeCount: {
    fontSize: 10
  }
});

@connect(store => {
  return {
    tweets: store.tweets.tweets,
    fetchingTweets: store.tweets.fetching,
    fetchedTweets: store.tweets.fetched,
    errorTweets: store.tweets.error,
    username: store.login.username
  };
})
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(fetchTweets());
  }

  tweetsTemp = [
    {
      id: 1,
      user: {
        name: "Deepika Padukone",
        username: "deepikaofficial",
        avatar: "https://cdn.pinkvilla.com/files/dff2_0.jpg",
        cover:
          "https://i.pinimg.com/originals/26/c0/f9/26c0f9364501d8c8be3d0bdd5de7846a.jpg",
        bio: "Most popular Bollywood actress. Love dancing and badminton",
        location: "Mumbai, India",
        following: 12,
        followers: 23001
      },
      tweetContent: "I wish Ranveer Singh would stop wearing my dresses",
      likes: 253,
      retweets: 122,
      replies: 32
    },
    {
      id: 2,
      user: {
        name: "Salman Khan",
        username: "sallu",
        avatar:
          "http://st1.bollywoodlife.com/wp-content/uploads/2016/11/Salman-Khan-3.jpg",
        cover:
          "https://i.pinimg.com/originals/26/c0/f9/26c0f9364501d8c8be3d0bdd5de7846a.jpg",
        bio:
          "Most demanded bollywood actor. I run a charity called Being Human",
        location: "Mumbai, India",
        following: 23,
        followers: 13312
      },
      tweetContent:
        "This tweet is senseless but still you will still like it! Because... bhai ka tweet hai",
      likes: 2123,
      retweets: 1223,
      replies: 231
    },
    {
      id: 3,
      user: {
        name: "Batman",
        username: "batsy",
        avatar:
          "http://www.dccomics.com/sites/default/files/video/THE_LEGO_BATMAN_MOVIE_TRAILER_2_thumb_56f9a68c4f62a0.07314395.jpg",
        cover:
          "https://i.pinimg.com/originals/26/c0/f9/26c0f9364501d8c8be3d0bdd5de7846a.jpg",
        bio: "I am the watchful protector. I am the Dark Knight",
        location: "Gotham",
        following: 0,
        followers: 319823
      },
      tweetContent: "I am Batman, definitely not Bruce Wayne",
      likes: 9999,
      retweets: 9999,
      replies: 9999
    },
    {
      id: 4,
      user: {
        name: "Sankhadeep Roy",
        username: "sankhadeep_roy",
        avatar: "https://www.geekyants.com/images/team/sankhadeep-roy.jpg",
        cover:
          "https://i.pinimg.com/originals/26/c0/f9/26c0f9364501d8c8be3d0bdd5de7846a.jpg",
        bio: "Software developer at Geekyants.",
        location: "Bangalore, India",
        following: 123,
        followers: 433
      },
      tweetContent: "Dubai is awesome \n#Dubai #Project #Geekyants",
      likes: 54,
      retweets: 24,
      replies: 39
    },
    {
      id: 5,
      user: {
        name: "GeekyAnts",
        username: "geekyants",
        avatar:
          "https://pbs.twimg.com/profile_images/898136449454710784/KNIMhLNW_400x400.jpg",
        cover:
          "https://i.pinimg.com/originals/26/c0/f9/26c0f9364501d8c8be3d0bdd5de7846a.jpg",
        bio: "Challenges . Experiments . Hacking",
        location: "Bangalore, India",
        following: 58,
        followers: 1200
      },
      tweetContent: "New tech-talk released. Go check it out on YouTube",
      likes: 102,
      retweets: 45,
      replies: 10
    }
  ];

  _keyExtractor = (item, index) => item.id;

  _profileClick(user) {
    this.props.navigation.navigate("Profile", user);
  }

  render() {
    console.log(this.props);
    return (
      <Container style={styles.topMargin}>
        <Header noShadow style={{ backgroundColor: "white" }}>
          <Left style={{ flex: 1 }}>
            <Title style={{ color: "black" }}>Home</Title>
          </Left>
        </Header>
        <Content style={styles.content}>
          <FlatList
            data={this.props.tweets}
            keyExtractor={this._keyExtractor}
            renderItem={({ item }) =>
              <View style={styles.tweet}>
                <TouchableHighlight
                  onPress={this._profileClick.bind(this, item.user)}
                  underlayColor="white"
                  activeOpacity={0.75}
                >
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <Thumbnail source={{ uri: item.user.avatar }} />
                    <View
                      style={{
                        flexDirection: "column",
                        justifyContent: "flex-start"
                      }}
                    >
                      <Text
                        style={{
                          paddingLeft: 15,
                          fontWeight: "bold",
                          fontSize: 20
                        }}
                      >
                        {item.user.name}
                      </Text>

                      <Text
                        style={{ paddingLeft: 15, color: "#aaa", fontSize: 16 }}
                      >
                        {"@" + item.user.username}
                      </Text>
                    </View>
                  </View>
                </TouchableHighlight>
                <Text style={styles.tweetText}>
                  {item.tweetContent}
                </Text>
                <View style={styles.tweetFooter}>
                  <Icon name="ios-text-outline">
                    <Text style={styles.badgeCount}>
                      {item.replies}
                    </Text>
                  </Icon>
                  <Icon name="ios-repeat">
                    <Text style={styles.badgeCount}>
                      {item.retweets}
                    </Text>
                  </Icon>
                  <Icon name="ios-heart-outline">
                    <Text style={styles.badgeCount}>
                      {item.likes}
                    </Text>
                  </Icon>
                  <Icon name="ios-mail-outline" />
                </View>
              </View>}
          />
        </Content>
      </Container>
    );
  }
}
