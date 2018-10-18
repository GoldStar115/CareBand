import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput
} from "react-native";
import { Actions } from "react-native-router-flux";
import PropTypes from "prop-types";
import Spinner from "react-native-loading-spinner-overlay";
import { onShowToast } from "../utils/utils";

import { resetPassword } from "../actions/auth/reset";
import { connect } from "react-redux";
import { colors } from "../constant/constant";
import * as images from '../constant/images';
import { authStyles } from "../constant/authStyles";
class ViewAuthReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmCode: "",
      newPassword: "",      
      showPass: true,
      press: false,      
    };
    this.showPass = this.showPass.bind(this);
    this._onResetPass = this._onResetPass.bind(this);
    this._onSignIn = this._onSignIn.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { isResetPass, resetPassError } = nextProps   
    if(isResetPass && resetPassError  == null){
      this._onSignIn();
    }else{
      onShowToast(resetPassError.message || JSON.stringify(resetPassError), null)
    }
  }

  static propTypes = {
    username: PropTypes.string.isRequired
  };
  showPass() {
    this.state.press === false
      ? this.setState({ showPass: false, press: true })
      : this.setState({ showPass: true, press: false });
  }
  _onSignIn = () => {
    Actions.popTo("viewAuthSignIn");
  };

  _onResetPass = () => {
    this.props.dispatchForgotPasswordSubmit(this.props.username, this.state.confirmCode, this.state.newPassword)
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

        <View style={authStyles.singInLogo}>
          <Image source={images.logoImg} style={authStyles.logoImage} />
        </View>

        <KeyboardAvoidingView
          behavior="padding"
          style={authStyles.container_formLogin}
        >
          <View style={authStyles.inputWrapper}>
            <Image source={images.emailImg} style={authStyles.inlineImg} />
            <TextInput
              style={authStyles.input}
              placeholder={"ConfirmCode"}
              secureTextEntry={false}
              keyboardType={"numeric"}
              autoCorrect={true}
              autoCapitalize={"none"}
              returnKeyType={"done"}
              placeholderTextColor="black"
              underlineColorAndroid="transparent"
              value={this.state.confirmCode}
              onChangeText={text => this.setState({ confirmCode: text })}
            />
          </View>
          <View style={authStyles.inputWrapper}>
            <Image
              source={images.passwordImg}
              style={authStyles.inlineImg}
            />
            <TextInput
              style={authStyles.input}
              placeholder={"New Password"}
              secureTextEntry={this.state.showPass}
              autoCorrect={false}
              autoCapitalize={"none"}
              returnKeyType={"done"}
              placeholderTextColor="black"
              underlineColorAndroid="transparent"
              value={this.state.newPassword}
              onChangeText={text => this.setState({ newPassword: text })}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={authStyles.passwordEye}
              onPress={this.showPass}
            >
              <Image source={images.eyeImg} style={authStyles.iconEye} />
            </TouchableOpacity>
          </View>
          {/* Submit Login */}
          <View style={authStyles.submitForm}>
            <TouchableOpacity
              style={authStyles.btnSubmit}
              onPress={this._onResetPass}
              activeOpacity={1}
            >
              <Text style={authStyles.btnText}>RESET PASSWORD</Text>
            </TouchableOpacity>
          </View>
          {/* Signup sections */}

          <View style={authStyles.submitPartForm}>
            <TouchableOpacity onPress={this._onSignIn}>
              <Text style={authStyles.text}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({  
  isResetPass: state.resetPassReducer.isResetPass,
  isLoading: state.resetPassReducer.isLoading,
  resetPassError: state.resetPassReducer.resetPassError
})
const mapDispatchToProps = {  
  dispatchForgotPasswordSubmit: (username, code, newpassword) => resetPassword(username, code, newpassword)  
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewAuthReset);
