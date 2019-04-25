import React, { Component } from "react";
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
// import { fetchTweets } from "../actions/tweetsActions";
// import ScrollableTabView, {
//   ScrollableTabBar
// } from "react-native-scrollable-tab-view";

const styles = StyleSheet.create({
  topMargin: {
    marginTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
    backgroundColor: "white",
    zIndex: -1
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
    padding: 0
  },
  badgeCount: {
    fontSize: 12,
    paddingLeft: 5
  },
  footerIcons: {
    flexDirection: "row",
    alignItems: "center"
  },
  modalFooter: {
    backgroundColor: "white",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    height: 54,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5
  },
  modal: {
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    zIndex: 4,
    elevation: 4,
    height: Dimensions.get("window").height - Expo.Constants.statusBarHeight,
    marginTop: Expo.Constants.statusBarHeight / 2
  }
});

@connect(store => {
  return {
    tweets: store.tweets.tweets,
    fetchingTweets: store.tweets.fetchingTweets,
    fetchedTweets: store.tweets.fetchedTweets,
    errorTweets: store.tweets.error,
    user: store.login.user,
    tweetPosted: store.tweets.tweetPosted,
    newTweetModalOpen: store.tweets.newTweetModalOpen
  };
})
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTweetContent: ""
    };
  }

  openModal() {
    this.props.dispatch({ type: "NEW_TWEET_MODAL_OPEN" });
  }

  closeModal() {
    this.props.dispatch({ type: "NEW_TWEET_MODAL_CLOSE" });
  }

  postTweet() {
    this.props.dispatch({
      type: "POST_TWEET",
      payload: {
        user: this.props.user,
        tweetContent: this.state.newTweetContent
      }
    });
  }

  componentWillMount() {
    this.props.dispatch({ type: "FETCH_TWEETS" });
  }

  _keyExtractor = (item, index) => item.id;

  _profileClick(user) {
    this.props.navigation.navigate("Profile", user);
  }

  _tweetDetails(tweet) {
    this.props.navigation.navigate("TweetDetails", tweet);
  }

  render() {
    if (this.props.tweetPosted === "success") {
      this.closeModal();
    }
    return (
      <Container>
        {this.props.newTweetModalOpen && Platform.OS === "android" ? null : (
          <Header style={styles.topMargin}>
            <Left>
              <Thumbnail small source={{ uri: this.props.user.avatar }} />
            </Left>
            <Body>
              <Title style={{ color: "#121212" }}>Home</Title>
            </Body>
            <Right>
              <Button transparent onPress={this.openModal.bind(this)}>
                <Icon name="md-create" style={{ color: "#4286f4" }} />
              </Button>
            </Right>
          </Header>
        )}

        <Modal
          ref={"newTweetModal"}
          backdrop={true}
          style={styles.modal}
          isOpen={this.props.newTweetModalOpen}
          onClosed={this.closeModal.bind(this)}
        >
          <View
            style={{
              alignSelf: "flex-start",
              alignItems: "center",
              flexDirection: "row",
              padding: 5,
              paddingRight: 10
            }}
          >
            <Button transparent onPress={this.closeModal.bind(this)}>
              <Icon name="close" style={{ color: "black", fontSize: 32 }} />
            </Button>
            <View style={{ flex: 1 }} />
            <Thumbnail
              small
              source={{
                uri:
                  "https://i1.wallpaperscraft.ru/image/betmen_art_minimalizm_107658_300x240.jpg"
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "flex-start",
              width: "100%"
            }}
          >
            <Input
              style={{
                flex: 1,
                width: "100%",
                fontSize: 24,
                alignContent: "flex-start",
                justifyContent: "flex-start",
                textAlignVertical: "top",
                margin: 5
              }}
              multiline
              placeholder="What's happening?"
              onChangeText={tweet => this.setState({ newTweetContent: tweet })}
            />
          </View>
          <View style={styles.modalFooter}>
            <Button transparent small>
              <Icon name="ios-image" />
            </Button>
            <Button transparent small>
              <Icon name="ios-pin" />
            </Button>
            <Button transparent small>
              <Icon name="ios-stats-outline" />
            </Button>

            <View style={{ flex: 1 }} />
            {this.props.tweetPosted === "ongoing" ? <Spinner /> : null}
            <Button
              rounded
              style={{ color: "#4286f4", height: 40, width: 94 }}
              onPress={this.postTweet.bind(this)}
            >
              <Text style={{ color: "white" }}>Tweet</Text>
            </Button>
          </View>
        </Modal>
        <Content style={{ backgroundColor: "white" }}>
          {this.props.fetchingTweets ? (
            <View
              contentContainerStyle={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Spinner color="blue" />
            </View>
          ) : (
            <View style={{ justifyContent: "flex-start" }}>
              <FlatList
                data={this.props.tweets}
                keyExtractor={this._keyExtractor}
                renderItem={({ item }) => (
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
                            style={{
                              paddingLeft: 15,
                              color: "#aaa",
                              fontSize: 16
                            }}
                          >
                            {"@" + item.user.username}
                          </Text>
                        </View>
                      </View>
                    </TouchableHighlight>
                    <Text style={styles.tweetText}>{item.tweetContent}</Text>
                    <View style={styles.tweetFooter}>
                      <View style={styles.footerIcons}>
                        <Button
                          transparent
                          dark
                          onPress={this._tweetDetails.bind(this, item)}
                        >
                          <Icon name="ios-text-outline" />
                          <Text style={styles.badgeCount}>{item.replies}</Text>
                        </Button>
                      </View>
                      <View style={styles.footerIcons}>
                        <Button transparent dark>
                          <Icon name="ios-repeat" />
                          <Text style={styles.badgeCount}>{item.retweets}</Text>
                        </Button>
                      </View>
                      <View style={styles.footerIcons}>
                        <Button transparent dark>
                          <Icon name="ios-heart-outline" />
                          <Text style={styles.badgeCount}>{item.likes}</Text>
                        </Button>
                      </View>
                      <View style={styles.footerIcons}>
                        <Button transparent dark>
                          <Icon name="ios-mail-outline" />
                        </Button>
                      </View>
                    </View>
                  </View>
                )}
              />
              {this.state.newTweetModalOpen ? null : (
                <Fab
                  position="bottomRight"
                  style={{ backgroundColor: "#4286f4", zIndex: -1 }}
                  onPress={this.openModal.bind(this)}
                  ref={"FAB"}
                >
                  <Icon name="md-create" />
                </Fab>
              )}
            </View>
          )}
        </Content>

        {/* <View tabLabel="Search">
          <Text>Search</Text>
        </View>
        <View tabLabel="Messages">
          <Text>Messages</Text>
        </View> */}
      </Container>
    );
  }
}
