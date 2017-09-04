import * as Expo from "expo";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import getTheme from "../native-base-theme/components";
import platform from "../native-base-theme/variables/platform";
import material from "../native-base-theme/variables/material";
import {
  Container,
  Button,
  Text,
  Header,
  Left,
  Body,
  Right,
  Icon,
  Title,
  StyleProvider,
  Content,
  Grid,
  Col,
  Row,
  Input,
  Item,
  Form,
  Label,
  Footer,
  FooterTab
} from "native-base";
import { setUsername } from "../actions/loginActions";
import { connect } from "react-redux";

const styles = StyleSheet.create({
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
  footer: {
    backgroundColor: "white",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    height: 60
  }
});

@connect(store => {
  return {};
})
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
  }
  login() {
    this.props.navigation.navigate("Home");
  }

  render() {
    return (
      <StyleProvider style={getTheme(platform)}>
        <Container style={styles.topMargin}>
          <Header noShadow style={{ backgroundColor: "white" }}>
            <Left style={{ flex: 1 }} />
            <Body style={{ flex: 1 }}>
              <Icon
                name="logo-twitter"
                style={{ alignSelf: "center", color: "#4286f4" }}
              />
            </Body>
            <Right style={{ flex: 1 }}>
              <Button transparent>
                <Text style={{ color: "#4286f4" }}>Sign up</Text>
              </Button>
              <Button transparent>
                <Icon name="more" style={{ color: "#4286f4" }} />
              </Button>
            </Right>
          </Header>
          <Content style={styles.content}>
            <Text style={styles.heading}>Login to Twitter</Text>
            <Form>
              <Item stackedLabel last>
                <Label>Phone number, email address, or username</Label>
                <Input
                  onChangeText={username =>
                    this.props.dispatch(setUsername(username))}
                />
              </Item>
              <Item stackedLabel last>
                <Label>Password</Label>
                <Input secureTextEntry={true} />
              </Item>
            </Form>
            <Button
              transparent
              style={{
                margin: 15,
                marginTop: 25,
                width: "50%",
                alignSelf: "center"
              }}
            >
              <Text
                style={{ textAlign: "center", fontSize: 14, color: "#AAA" }}
              >
                Forgot password?
              </Text>
            </Button>
          </Content>
          <Footer style={styles.footer}>
            <Right>
              <Button
                rounded
                style={{ marginRight: 20, backgroundColor: "#4286f4" }}
                onPress={this.login.bind(this)}
              >
                <Text>Log in</Text>
              </Button>
            </Right>
          </Footer>
        </Container>
      </StyleProvider>
    );
  }
}
