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
import Spinner from "react-native-loading-spinner-overlay";
import { onShowToast } from "../utils/utils";

import { authenticate } from "../actions/auth/login";
import { connect } from "react-redux";
import * as images from '../constant/images';
import { colors } from "../constant/constant";
import { authStyles } from "../constant/authStyles";

class ViewAuthSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
      username: "goldstar61117",
      password: "Sec123456!",
      accessCode : ''      
    };
    this.showPass = this.showPass.bind(this);
    this._onSignIn = this._onSignIn.bind(this);        
    this._onGotoNext = this._onGotoNext.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { loginError, isLogin} = nextProps   
    if(!isLogin &&  loginError != null){  
      if (loginError.code == 'UserNotConfirmedException'){
          Actions.push('viewAuthConfirm', {username : this.state.username, ...this.props})
      }else{
        onShowToast(loginError.message || JSON.stringify(loginError), null)
      }
    }
  }
  showPass() {
    this.state.press === false
      ? this.setState({ showPass: false, press: true })
      : this.setState({ showPass: true, press: false });
  }
  _onSignUpPress() {
    Actions.viewAuthSignUp();
  }
  _onForgotPress() {
    Actions.viewAuthForgot();
  }
  _onSignIn() {
    const { username, password } = this.state
    this.props.dispatchAuthenticate(username, password);
  }
  _onGotoNext = username => {
    Actions.push("viewAuthConfirm", { username: username });
  };
  render() {
    return (
      <View style={authStyles.container}>
        {/* Logo Sections */}
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

        {/* Form Login */}

        <KeyboardAvoidingView
          behavior="padding"
          style={authStyles.container_formLogin}
        >
          <View style={authStyles.inputWrapper}>
            <Image source={images.usernameImg} style={authStyles.inlineImg} />
            <TextInput
              style={authStyles.input}
              placeholder={"Username"}
              secureTextEntry={false}
              autoCorrect={true}
              autoCapitalize={"none"}
              returnKeyType={"done"}
              keyboardType={'email-address'}
              placeholderTextColor="black"
              underlineColorAndroid="transparent"
              value={this.state.username}
              onChangeText={text => this.setState({ username: text })}
            />
          </View>
          <View style={authStyles.inputWrapper}>
            <Image
              source={images.passwordImg}
              style={authStyles.inlineImg}
            />
            <TextInput
              style={authStyles.input}
              placeholder={"Password"}
              secureTextEntry={this.state.showPass}
              autoCorrect={false}
              autoCapitalize={"none"}
              returnKeyType={"done"}
              placeholderTextColor="black"
              underlineColorAndroid="transparent"
              value={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={authStyles.passwordEye}
              onPress={this.showPass}
            >
              <Image source={images.eyeImg} style={authStyles.iconEye} />
            </TouchableOpacity>
          </View>
          <View style={authStyles.submitForm}>
            <TouchableOpacity
              style={authStyles.btnSubmit}
              onPress={() => {
                this._onSignIn();
              }}
            >
              <Text style={authStyles.btnText}>SIGNIN</Text>
            </TouchableOpacity>
          </View>
          {/* Signup sections */}

          <View style={authStyles.submitPartForm}>
            <TouchableOpacity onPress={this._onSignUpPress}>
              <Text style={authStyles.text}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._onForgotPress}>
              <Text style={authStyles.text}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

        {/* Submit Login */}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.logInReducer.login,
  isLoading: state.logInReducer.isLoading,
  loginError: state.logInReducer.loginError,
  user : state.logInReducer.user
})

const mapDispatchToProps = {  
  dispatchAuthenticate: (username, password) => authenticate(username, password)  
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewAuthSignIn);
