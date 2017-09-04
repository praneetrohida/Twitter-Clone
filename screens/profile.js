import React, { Component } from "react";
import * as Expo from "expo";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableHighlight,
  Animated
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
  Button
} from "native-base";
import ParallaxScrollView from "react-native-parallax-scroll-view";

import { connect } from "react-redux";
import { fetchTweets } from "../actions/tweetsActions";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const styles = StyleSheet.create({
  header: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "column",
    backgroundColor: "white"
  },
  avatarbg: {
    marginTop: -95,
    marginLeft: 20,
    padding: 10,
    width: 100,
    height: 100,
    borderRadius: 50,
    zIndex: 12
    // borderRadius: 180
  },
  avatar: {
    marginLeft: 26,
    marginTop: -95,
    width: 89,
    height: 89,
    borderRadius: 44,
    zIndex: 12
  },
  headerButton: {
    // alignSelf: "flex-end",
    paddingLeft: 7,
    paddingRight: 7,
    paddingBottom: 3,
    paddingTop: 3,
    marginRight: 8
  },
  nameText: {
    fontSize: 26,
    fontWeight: "500",
    marginLeft: 14
  },
  usernameText: {
    color: "#777",
    fontSize: 16,
    marginLeft: 14
  },
  bioText: {
    fontSize: 16,
    marginLeft: 14,
    marginTop: 10,
    maxHeight: 41
  },
  locationText: {
    fontSize: 16,
    marginLeft: 14,
    marginTop: 10,
    color: "#555"
  },
  topMargin: {
    // marginTop: 25
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
export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.user = this.props.navigation.state.params;
    console.log(this.user.name);
    this.state = { scrollY: new Animated.Value(0) };
  }

  _keyExtractor = (item, index) => item.id;

  render() {
    var headMov = this.state.scrollY.interpolate({
      inputRange: [0, 390, 391],
      outputRange: [0, -390, -390]
    });
    var CoverMov = this.state.scrollY.interpolate({
      inputRange: [0, 94, 95],
      outputRange: [0, -94, -94]
    });
    var headColor = this.state.scrollY.interpolate({
      inputRange: [0, 331],
      outputRange: ["red", "blue"]
    });
    return (
      <ScrollView>
        <Image
          source={{ uri: this.user.cover }}
          style={{ marginTop: 25, width: "100%", height: 150 }}
        />
        <View style={styles.header}>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Button bordered rounded style={styles.headerButton}>
              <Icon name="ios-mail-outline" />
            </Button>
            <Button bordered rounded style={styles.headerButton}>
              <Icon name="ios-notifications-outline" />
            </Button>
            <Button
              bordered
              rounded
              style={
                (styles.headerButton, { paddingLeft: 15, paddingRight: 15 })
              }
            >
              <Text>Follow</Text>
            </Button>
          </View>
        </View>
        <Thumbnail
          large
          source={{
            uri: "https://data.humdata.org/crisis-tiles/12/2485/1645.png"
          }}
          style={styles.avatarbg}
        />

        <Thumbnail
          large
          source={{ uri: this.user.avatar }}
          style={styles.avatar}
        />
        <View style={styles.header}>
          <Text style={styles.nameText}>{this.user.name}</Text>
          <Text style={styles.usernameText}>{"@" + this.user.username}</Text>
          <Text style={styles.bioText}>{this.user.bio}</Text>
          <Text style={styles.locationText}>
            <Icon small name="ios-pin-outline" style={{ fontSize: 16 }} />
            {" " + this.user.location}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{ fontSize: 16, fontWeight: "bold", marginLeft: 14 }}
              >
                {this.user.following}
              </Text>
              <Text style={{ fontSize: 16, color: "#555", marginLeft: 5 }}>
                Following
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{ fontSize: 16, fontWeight: "bold", marginLeft: 30 }}
              >
                {this.user.followers}
              </Text>
              <Text style={{ fontSize: 16, color: "#555", marginLeft: 5 }}>
                Followers
              </Text>
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: "white", marginTop: 8 }}>
          <FlatList
            data={this.props.tweets}
            keyExtractor={this._keyExtractor}
            renderItem={({ item }) => (
              <View style={styles.tweet}>
                {/* <TouchableHighlight
                  onPress={this._profileClick.bind(this, item.user)}
                  underlayColor="white"
                  activeOpacity={0.75}
                > */}
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Thumbnail source={{ uri: this.user.avatar }} />
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
                      {this.user.name}
                    </Text>

                    <Text
                      style={{
                        paddingLeft: 15,
                        color: "#aaa",
                        fontSize: 16
                      }}
                    >
                      {"@" + this.user.username}
                    </Text>
                  </View>
                </View>
                {/* </TouchableHighlight> */}
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
        </View>
      </ScrollView>
    );
  }
}
