import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { Avatar } from "react-native-elements";
import { getCurUserAction } from "../actions/user/getuser";
import { logOutSetRouter } from "../actions/auth/router";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { colors, dimens } from "../constant/constant";
import Spinner from "react-native-loading-spinner-overlay";
import * as images from "../constant/images";
import AsyncAvatar from "../components/AsyncAvatar";
class ControlPanel extends Component {
  static propTypes = {
    closeDrawer: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      picture: null,
      firstname: " ",
      lastname: " "
    };
  }
  componentWillMount() {
    this.props.getCurUserAction();
  }
  componentWillReceiveProps(nextProps) {
    const { isGetUser, getUserError, user } = nextProps;
    if (isGetUser && user != null) {
      // alert(JSON.stringify(user.attributes));
      this.setState({
        picture: user.attributes.picture,
        firstname: user.attributes.name,
        lastname: user.attributes.family_name
      });
    } else if (getUserError != null) {
    }
  }
  _onLogout() {
    this.props.logOutSetRouter();
  }
  renderAvatar() {
    return (
        <AsyncAvatar
          width={100}
          height={100}
          firstName={this.state.firstname}
          lastName={this.state.lastname}
          picture={this.state.picture}
          placeHolder={null}
        />
    );
  }
  _gotoPrifleView() {
    Actions.push("viewProfile", { user: this.props.user });
  }
  render() {
    let { closeDrawer } = this.props;
    return (
      <View style={styles.containermenu}>
        <Spinner
          cancelable={true}
          visible={this.props.isLoading}
          textContent={""}
          textStyle={{ color: colors.MBLUE }}
          color={colors.MBLUE}
          overlayColor={colors.MOVERLAY}
        />
        <View style={styles.containerTop}>
          {this.renderAvatar()}
          <Text style={styles.textName}>
            {`${this.state.firstname} ${this.state.lastname}`}
          </Text>
          <Text style={styles.textVision}>{"Caregiver"}</Text>
        </View>

        <View style={styles.containerMiddle}>
          <View style={styles.separator}>
            <TouchableOpacity
              onPress={() => {
                this._gotoPrifleView();
              }}
            >
              <Text style={styles.textMenu}>{"Profile"}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separator}>
            <TouchableOpacity onPress={closeDrawer}>
              <Text style={styles.textMenu}>{"Notification Settings"}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separator}>
            <TouchableOpacity
              onPress={() => {
                closeDrawer;
                this._onLogout();
              }}
            >
              <Text style={styles.textMenu}>{"Log off"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.containerBottom}>
          <View style={styles.containerLogo}>
            <Image source={images.logoImg} style={styles.imgLogo} />
          </View>
          <View style={styles.containerVersionText}>
            <TouchableOpacity onPress={closeDrawer} style={styles.textVersion}>
              <Text style={{ color: colors.MGREY, fontSize: 11 }}>
                {"version 4.0.0"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeDrawer} style={styles.textFeedBack}>
              <Text style={{ color: colors.MBLUE, fontSize: 12 }}>
                {"Leave Feedback"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containermenu: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.MTHEME
  },
  containerTop: {
    flex: 4,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.MBLUE
  },
  imgPhoto: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderColor: colors.MBORDERGREY,
    borderWidth: 1
  },
  textName: {
    fontSize: 13,
    color: colors.MTHEME,
    marginTop: 10
  },
  textVision: {
    fontSize: 12,
    color: colors.MTHEME
  },
  containerMiddle: {
    flex: 7,
    flexDirection: "column",
    alignItems: "flex-start"
  },
  separator: {
    height: 50,
    alignSelf: "stretch",
    justifyContent: "center",
    borderBottomWidth: 0.3,
    borderBottomColor: colors.MBORDERBOTTOM
  },
  textMenu: {
    top: 5,
    bottom: 5,
    fontSize: 16,
    marginLeft: 15,
    color: colors.MTEXT
  },
  containerBottom: {
    flex: 1.3,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  containerLogo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  imgLogo: {
    width: dimens.DEV_WIDTH / 3.5,
    height: 50,
    resizeMode: "contain"
  },
  containerVersionText: {
    flex: 1,
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  textVersion: {
    flex: 1,
    right: 2,
    alignItems: "flex-end"
  },
  textFeedBack: {
    flex: 1,
    left: 2,
    alignItems: "flex-start"
  }
});

const mapStateToProps = state => {
  return {
    isGetUser: state.getUserReducer.isGetUser,
    isLoading: state.getUserReducer.isLoading,
    getUserError: state.getUserReducer.getUserError,
    user: state.getUserReducer.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCurUserAction: () => {
      dispatch(getCurUserAction());
    },
    logOutSetRouter: () => {
      dispatch(logOutSetRouter());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlPanel);
