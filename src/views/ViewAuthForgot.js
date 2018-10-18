import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Image,
  KeyboardAvoidingView
} from "react-native";
import { Actions } from "react-native-router-flux";
import { onShowToast } from "../utils/utils";
import Spinner from "react-native-loading-spinner-overlay";
import { forgotPassword } from "../actions/auth/forgot";
import { connect } from "react-redux";
import { colors } from "../constant/constant";
import * as images from '../constant/images'
import { authStyles } from "../constant/authStyles";

class ViewAuthForgot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
    this._onLoginPress = this._onLoginPress.bind(this);
    this._onForgotPass = this._onForgotPass.bind(this);
    this._onGoNext = this._onGoNext.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { isForgotPass, forgotError } = nextProps;
    if (isForgotPass && forgotError == null) {
      this._onGoNext();
    } else {
      onShowToast(forgotError.message || JSON.stringify(forgotError), null);
    }
  }
  _onLoginPress() {
    Actions.pop();
  }
  _onGoNext() {
    Actions.push("viewAuthReset", { username: this.state.username });
  }

  _onForgotPass = () => {
    this.props.dispatchForgotPassword(this.state.username);
  };
  render() {
    return (
      <View style={authStyles.container}>
        <Spinner
          cancelable={true}
          visible={this.props.isLoading}
          textContent={""}
          textStyle={{ color: colors.MBLUE }}
          color={colors.MBLUE}
          overlayColor={colors.MOVERLAY}
        />
        {/* Logo Sections */}
        <View style={authStyles.singInLogo}>
          <Image source={images.logoImg} style={authStyles.logoImage} />
        </View>

        {/* Form Login */}

        <KeyboardAvoidingView
          behavior="padding"
          style={authStyles.container_formLogin}
        >
          <View style={authStyles.inputWrapper}>
            <Image
              source={images.usernameImg}
              style={authStyles.inlineImg}
            />
            <TextInput
              style={authStyles.input}
              placeholder={"Username"}
              value={this.state.username}
              secureTextEntry={false}
              autoCorrect={true}
              autoCapitalize={"none"}
              returnKeyType={"done"}
              placeholderTextColor="black"
              underlineColorAndroid="transparent"
              onChangeText={text => this.setState({ username: text })}
            />
          </View>

          {/* Submit Login */}
          <View style={authStyles.submitForm}>
            <TouchableOpacity
              style={authStyles.btnSubmit}
              onPress={this._onForgotPass}
              activeOpacity={1}
            >
              <Text style={authStyles.btnText}>FORGOT PASSWORD</Text>
            </TouchableOpacity>
          </View>
          {/* Signup sections */}

          <View style={authStyles.submitPartForm}>
            <TouchableOpacity onPress={this._onLoginPress}>
              <Text style={authStyles.text}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isForgotPass: state.forgotPassReducer.isForgotPass,
  isLoading: state.forgotPassReducer.isLoading,
  forgotError: state.forgotPassReducer.forgotError
});
const mapDispatchToProps = {
  dispatchForgotPassword: username => forgotPassword(username)
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewAuthForgot);
