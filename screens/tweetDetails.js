import React, { Component } from "react";
import moment from "moment";
import * as Expo from "expo";
import Modal from "react-native-modalbox";
import Dimensions from "Dimensions";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableHighlight,
  Platform
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
  Icon,
  Spinner,
  Fab,
  Button,
  Footer,
  Input,
  Right
} from "native-base";
import { connect } from "react-redux";
import { fetchTweets } from "../actions/tweetsActions";
// import ScrollableTabView, {
//   ScrollableTabBar
// } from "react-native-scrollable-tab-view";

const styles = StyleSheet.create({
  tweetHead: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    paddingBottom: 0
  },
  timeStamp: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 10,
    borderBottomColor: "#CCC",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  tweetFooter: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomColor: "#CCC",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  footerIcons: {
    flexDirection: "row",
    alignItems: "center"
  },
  tweetReply: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    paddingBottom: 0
  }
});

@connect(store => {
  return {
    user: store.login.user,
    tweetReplies: store.tweets.tweetReplies,
    fetchingTweetReplies: store.tweets.fetchingTweetReplies,
    fetchedTweetReplies: store.tweets.fetchedTweetReplies
  };
})
export default class TweetDefailsScreen extends Component {
  constructor(props) {
    super(props);
    this.tweet = this.props.navigation.state.params;
    this.tweetTime = moment(this.tweet.time);
    console.log(this.tweet);
  }

  componentWillMount() {
    this.props.dispatch({ type: "FETCH_TWEET_REPLIES" });
  }

  _goBack() {
    console.log("Back button pressed");
    this.props.navigation.goBack();
  }

  _keyExtractor = (item, index) => item.id;

  render() {
    console.log(this.props);
    return (
      <Container>
        <Header style={{ backgroundColor: "white" }}>
          <Left>
            <Button transparent onPress={this._goBack.bind(this)}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Tweet</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ backgroundColor: "white" }}>
          <View style={styles.tweetHead}>
            <Thumbnail source={{ uri: this.tweet.user.avatar }} />
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                paddingLeft: 10,
                height: 56
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                {this.tweet.user.name}
              </Text>

              <Text style={{ color: "#999", fontSize: 18 }}>
                {"@" + this.tweet.user.username}
              </Text>
            </View>
          </View>
          <View>
            <Text style={{ fontSize: 22, padding: 10 }}>
              {this.tweet.tweetContent}
            </Text>
          </View>
          <View style={styles.timeStamp}>
            <Text style={{ color: "#888", fontSize: 16 }}>
              {this.tweetTime.format("hh[:]mm A [-] DD MMM YY")}
            </Text>
          </View>
          <View style={styles.timeStamp}>
            <Text style={{ fontWeight: "bold", fontSize: 16, paddingRight: 5 }}>
              {this.tweet.retweets}
            </Text>
            <Text style={{ color: "#888", fontSize: 16, paddingRight: 20 }}>
              Retweets
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 16, paddingRight: 5 }}>
              {this.tweet.likes}
            </Text>
            <Text style={{ color: "#888", fontSize: 16 }}>Likes</Text>
          </View>
          <View style={styles.tweetFooter}>
            <View>
              <Button
                transparent
                dark
                style={{ paddingBottom: 0, paddingTop: 0 }}
              >
                <Icon name="ios-text-outline" />
              </Button>
            </View>
            <View>
              <Button transparent dark>
                <Icon name="ios-repeat" />
              </Button>
            </View>
            <View>
              <Button transparent dark>
                <Icon name="ios-heart-outline" />
              </Button>
            </View>
            <View>
              <Button transparent dark>
                <Icon name="ios-mail-outline" />
              </Button>
            </View>
          </View>
          <View>
            {this.props.fetchingTweetReplies ? (
              <Spinner />
            ) : (
              <FlatList
                data={this.props.tweetReplies}
                keyExtractor={this._keyExtractor}
                renderItem={({ item }) => (
                  <View style={styles.tweetReply}>
                    <Thumbnail small source={{ uri: item.user.avatar }} />
                    <View
                      style={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        paddingLeft: 10,
                        paddingRight: 10,
                        width: "93%"
                      }}
                    >
                      <View style={{ flexDirection: "row", maxHeight: 22 }}>
                        <Text style={{ fontWeight: "bold" }}>
                          {item.user.name}
                        </Text>
                        <Text
                          style={{ color: "#888", flex: 1, paddingLeft: 5 }}
                        >
                          {"@" + item.user.username}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          paddingTop: 5,
                          maxHeight: 22
                        }}
                      >
                        <Text style={{ color: "#888" }}>Replying to</Text>
                        <Text style={{ color: "#4286f4", flex: 1 }}>
                          {"@" + this.tweet.user.username}
                        </Text>
                      </View>
                      <Text style={{ paddingTop: 5 }}>{item.tweetContent}</Text>
                      <View
                        style={StyleSheet.flatten([
                          styles.tweetFooter,
                          { width: "100%" }
                        ])}
                      >
                        <View style={styles.footerIcons}>
                          <Button transparent dark>
                            <Icon
                              name="ios-text-outline"
                              style={{ fontSize: 20 }}
                            />
                            <Text style={{ fontSize: 14 }}>{item.replies}</Text>
                          </Button>
                        </View>
                        <View style={styles.footerIcons}>
                          <Button transparent dark>
                            <Icon name="ios-repeat" style={{ fontSize: 20 }} />
                            <Text style={{ fontSize: 14 }}>
                              {item.retweets}
                            </Text>
                          </Button>
                        </View>
                        <View style={styles.footerIcons}>
                          <Button transparent dark>
                            <Icon
                              name="ios-heart-outline"
                              style={{ fontSize: 20 }}
                            />
                            <Text style={{ fontSize: 14 }}>{item.likes}</Text>
                          </Button>
                        </View>
                        <View style={styles.footerIcons}>
                          <Button transparent dark>
                            <Icon
                              name="ios-mail-outline"
                              style={{ fontSize: 20 }}
                            />
                          </Button>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              />
            )}
          </View>
        </Content>
      </Container>
    );
  }
}
``;
