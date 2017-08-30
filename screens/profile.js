import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
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
  Button
} from "native-base";

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
    borderRadius: 100
  },
  avatar: {
    marginLeft: 26,
    marginTop: -95,
    width: 89,
    height: 89,
    borderRadius: 100
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
    marginTop: 10
  },
  locationText: {
    fontSize: 16,
    marginLeft: 14,
    marginTop: 10,
    color: "#555"
  },
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

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.user = this.props.navigation.state.params;
    console.log(this.user.name);
  }

  tweets = [
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

  render() {
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
          <Text style={styles.nameText}>
            {this.user.name}
          </Text>
          <Text style={styles.usernameText}>
            {"@" + this.user.username}
          </Text>
          <Text style={styles.bioText}>
            {this.user.bio}
          </Text>
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
            data={this.tweets}
            keyExtractor={this._keyExtractor}
            renderItem={({ item }) =>
              <View style={styles.tweet}>
                {/* <TouchableHighlight
                  onPress={this._profileClick.bind(this, item.user)}
                  underlayColor="white"
                  activeOpacity={0.75}
                > */}
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
                {/* </TouchableHighlight> */}
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
        </View>
      </ScrollView>
    );
  }
}
