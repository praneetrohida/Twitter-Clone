import React, { Component } from "react";
import * as Expo from "expo";
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
  Icon,
  Spinner
} from "native-base";
import { connect } from "react-redux";
import { fetchTweets } from "../actions/tweetsActions";
import ScrollableTabView, {
  ScrollableTabBar
} from "react-native-scrollable-tab-view";

const styles = StyleSheet.create({
  topMargin: {
    marginTop: Expo.Constants.statusBarHeight,
    backgroundColor: "white"
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
    fetchingTweets: store.tweets.fetchingTweets,
    fetchedTweets: store.tweets.fetchedTweets,
    errorTweets: store.tweets.error,
    username: store.login.username
  };
})
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch({ type: "FETCH_TWEETS" });
  }

  _keyExtractor = (item, index) => item.id;

  _profileClick(user) {
    this.props.navigation.navigate("Profile", user);
  }

  render() {
    console.log(this.props);
    return (
      <ScrollableTabView
        style={styles.topMargin}
        renderTabBar={() => <ScrollableTabBar />}
      >
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
          <FlatList
            tabLabel="Home"
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
                        style={{ paddingLeft: 15, color: "#aaa", fontSize: 16 }}
                      >
                        {"@" + item.user.username}
                      </Text>
                    </View>
                  </View>
                </TouchableHighlight>
                <Text style={styles.tweetText}>{item.tweetContent}</Text>
                <View style={styles.tweetFooter}>
                  <Icon name="ios-text-outline">
                    <Text style={styles.badgeCount}>{item.replies}</Text>
                  </Icon>
                  <Icon name="ios-repeat">
                    <Text style={styles.badgeCount}>{item.retweets}</Text>
                  </Icon>
                  <Icon name="ios-heart-outline">
                    <Text style={styles.badgeCount}>{item.likes}</Text>
                  </Icon>
                  <Icon name="ios-mail-outline" />
                </View>
              </View>
            )}
          />
        )}

        <View tabLabel="Search">
          <Text>Search</Text>
        </View>
        <View tabLabel="Messages">
          <Text>Messages</Text>
        </View>
      </ScrollableTabView>
    );
  }
}
