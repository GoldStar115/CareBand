import React, { Component } from "react";
import { Router, Scene, Actions } from "react-native-router-flux";
import { View, StyleSheet, Image } from "react-native";

import { authenticateSetRouter } from "./actions/auth/router";
import { connect } from "react-redux";

import Spinner from "react-native-loading-spinner-overlay";
import ViewMain from "./views/ViewMain";
import ViewCategory from "./views/ViewCategory";
import ViewWriteNote from "./views/ViewWriteNote";
import ViewOutdoor from "./tabs/LocateOutDoor";
import ViewAuthSignIn from "./views/ViewAuthSignIn";
import ViewAuthConfirm from "./views/ViewAuthConfirm";
import ViewAuthReset from "./views/ViewAuthReset";
import ViewAuthSignUp from "./views/ViewAuthSignUp";
import ViewAuthForgot from "./views/ViewAuthForgot";
import ViewProfile from "./views/ViewProfile";
import * as images from "./constant/images";
import * as constVal from "./constant/constant";
class MainNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user : null
    }
  }
  async componentWillMount() {
    await this.props.authenticateSetRouter();    
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthRouter && nextProps.user != null) {      
      Actions.root({ type: "reset" });
    } else {
      Actions.auth({ type: "reset" });
    }
  }
  render() {
    if (this.props.isLoading) {
      return (
        <View style={styles.container}>
          <Spinner
            cancelable={true}
            visible={this.props.isLoading}
            textContent={""}
            textStyle={{ color: constVal.colors.MBLUE }}
            color={constVal.colors.MBLUE}
            overlayColor={constVal.colors.MOVERLAY}
          />
          <View style={styles.logoContainer}>
            <Image source={images.logoImg} style={styles.logoImage} />
          </View>
        </View>
      );
    } else {
      return (
        <Router>
          <Scene>
            <Scene key="auth">
              <Scene
                key="viewAuthSignIn"
                component={ViewAuthSignIn}
                animation="fade"
                hideNavBar={true}
                initial={true}
              />
              <Scene
                key="viewAuthSignUp"
                component={ViewAuthSignUp}
                animation="fade"
                hideNavBar={true}
              />
              <Scene
                key="viewAuthConfirm"
                component={ViewAuthConfirm}
                animation="fade"
                hideNavBar={true}
              />
              <Scene
                key="viewAuthReset"
                component={ViewAuthReset}
                animation="fade"
                hideNavBar={true}
              />
              <Scene
                key="viewAuthForgot"
                component={ViewAuthForgot}
                animation="fade"
                hideNavBar={true}
              />
            </Scene>
            <Scene key="root">
              <Scene
                key="viewMain"
                component={ViewMain}
                animation="fade"
                hideNavBar={true}
                initial={true}
              />
              <Scene
                key="viewCategory"
                component={ViewCategory}
                animation="fade"
                hideNavBar={true}
              />
              <Scene
                key="viewWriteNote"
                component={ViewWriteNote}
                animation="fade"
                hideNavBar={true}
              />
              <Scene
                key="locateOutdoor"
                component={ViewOutdoor}
                animation="fade"
                hideNavBar={true}
              />
              <Scene
                key="viewProfile"
                component={ViewProfile}
                animation="fade"
                hideNavBar={true}
              />
            </Scene>
          </Scene>
        </Router>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: null,
    height: null
  },
  logoContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center"
  },
  logoImage: {
    flex: 1,
    width: constVal.dimens.DEV_WIDTH - 160,
    height: 60,
    resizeMode: "contain"
  }
});
const mapStateToProps = (state) => {
  return {
    isAuthRouter: state.routerReducer.isAuthRouter,
    isLoading: state.routerReducer.isLoading,
    authRouterError: state.routerReducer.authRouterError,
    user: state.routerReducer.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authenticateSetRouter: () => {
      dispatch(authenticateSetRouter());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainNav);
