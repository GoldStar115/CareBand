import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput
} from "react-native";

import PhoneInput from "react-native-phone-input";
import Phonepicker from "../components/phonepicker";
import { Actions } from "react-native-router-flux";
import Spinner from "react-native-loading-spinner-overlay";
import { onShowToast } from "../utils/utils";
import { createUser } from "../actions/auth/register";
import { connect } from "react-redux";
import { colors } from "../constant/constant";
import * as images from '../constant/images';

import { authStyles } from "../constant/authStyles";
var initState = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  picture : '0',
  phone_number: "+1",
  facility_id: "",
  showPass: true,
  press: false,
  error: null,
  isPending: false,
  pickerData: null
};
class ViewAuthSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
    this.showPass = this.showPass.bind(this);
    this._onSignUp = this._onSignUp.bind(this);
    this._onSignIn = this._onSignIn.bind(this);
    this._onConfirm = this._onConfirm.bind(this);
    this.onPressFlag = this.onPressFlag.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
  }
  componentDidMount() {
    this.setState({
      pickerData: this.phone.getPickerData()
    });
  }
  componentWillReceiveProps(nextProps) {
    const { user, registerError, isRegister} = nextProps;    
    if (isRegister && registerError == null && user != null){
      this._onConfirm(this.state.username);      
    }else if (registerError != null){
      onShowToast(registerError.message || JSON.stringify(registerError), null)
    }
  }
  onPressFlag() {
    this.myCountryPicker.open();
  }

  selectCountry(country) {
    this.phone.selectCountry(country.iso2);
    this.setState({ phone_number: country.dialCode });
  }
  showPass() {
    this.state.press === false
      ? this.setState({ showPass: false, press: true })
      : this.setState({ showPass: true, press: false });
  }
  _onSignIn = () => {
    Actions.pop();
  };

  _onConfirm = username => {
    Actions.push("viewAuthConfirm", { username: username, ...this.props});
  };
  _onSignUp = () => {
    this.setState({
      isPending: true
    });
    const {
      username,
      password,
      email,
      phone_number,
      firstname,
      lastname,
      picture,
      facility_id
    } = this.state;
    this.props.dispatchCreateUser(
      username,
      password,
      email,
      phone_number,
      firstname,
      lastname,
      picture,
      facility_id
    );
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

        <View style={authStyles.singUpLogo}>
          <Image source={images.logoImg} style={authStyles.logoImage} />
        </View>

        <KeyboardAvoidingView
          behavior="padding"
          style={authStyles.container_formSignUp}
        >
          <View style={authStyles.inputWrapper}>
            <Image
              source={images.usernameImg}
              style={authStyles.inlineImg}
            />
            <TextInput
              style={authStyles.inputPartLeft}
              placeholder={"First name"}
              secureTextEntry={false}
              autoCorrect={true}
              autoCapitalize={"none"}
              returnKeyType={"next"}
              placeholderTextColor="black"
              underlineColorAndroid="transparent"
              value={this.state.firstname}
              onChangeText={text => this.setState({ firstname: text })}
            />
            <TextInput
              style={authStyles.inputPartRight}
              placeholder={"Last name"}
              secureTextEntry={false}
              autoCorrect={true}
              autoCapitalize={"none"}
              returnKeyType={"next"}
              placeholderTextColor="black"
              underlineColorAndroid="transparent"
              value={this.state.lastname}
              onChangeText={text => this.setState({ lastname: text })}
            />
          </View>
          <View style={authStyles.inputWrapper}>
            <View style={authStyles.inlineFlag}>
              <PhoneInput
                ref={ref => {
                  this.phone = ref;
                }}
                onPressFlag={this.onPressFlag}
              />
              <Phonepicker
                ref={ref => {
                  this.myCountryPicker = ref;
                }}
                data={this.state.pickerData}
                onChange={country => {
                  this.selectCountry(country);
                }}
                cancelText="Cancel"
              />
            </View>
            <TextInput
              style={authStyles.input}
              placeholder={"Phone Number"}
              keyboardType={"phone-pad"}
              secureTextEntry={false}
              autoCorrect={true}
              autoCapitalize={"none"}
              returnKeyType={"next"}
              placeholderTextColor="black"
              underlineColorAndroid="transparent"
              value={this.state.phone_number.toString()}
              onChangeText={text => this.setState({ phone_number: text })}
            />
          </View>
          <View style={authStyles.inputWrapper}>
            <Image source={images.emailImg} style={authStyles.inlineImg} />
            <TextInput
              style={authStyles.input}
              placeholder={"Email"}
              secureTextEntry={false}
              autoCorrect={true}
              keyboardType={"email-address"}
              autoCapitalize={"none"}
              returnKeyType={"next"}
              placeholderTextColor="black"
              underlineColorAndroid="transparent"
              value={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
          </View>
          <View style={authStyles.inputWrapper}>
            <Image
              source={images.usernameImg}
              style={authStyles.inlineImg}
            />
            <TextInput
              style={authStyles.input}
              placeholder={"Username"}
              secureTextEntry={false}
              autoCorrect={true}
              keyboardType={"email-address"}
              autoCapitalize={"none"}
              returnKeyType={"next"}
              placeholderTextColor="black"
              underlineColorAndroid="transparent"
              value={this.state.username}
              onChangeText={text => this.setState({ username: text })}
            />
          </View>
          <View style={authStyles.inputWrapper}>
            <Image
              source={images.facilityImg}
              style={authStyles.inlineImg}
            />
            <TextInput
              style={authStyles.input}
              placeholder={"Facility ID"}
              secureTextEntry={false}
              autoCorrect={true}
              autoCapitalize={"none"}
              returnKeyType={"next"}
              placeholderTextColor="black"
              underlineColorAndroid="transparent"
              value={this.state.facility_id.toString()}
              onChangeText={text => this.setState({ facility_id: text })}
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
              onPress={this._onSignUp}
              activeOpacity={1}
            >
              <Text style={authStyles.btnText}>SIGNUP</Text>
            </TouchableOpacity>
          </View>
          {/* Signup sections */}

          <View style={authStyles.submitPartForm}>
            <TouchableOpacity onPress={this._onSignIn}>
              <Text style={authStyles.text}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

        {/* Submit Login */}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isRegister: state.registerReducer.isRegister,
  isLoading: state.registerReducer.isLoading,
  registerError: state.registerReducer.registerError,
  user : state.registerReducer.user,
});

const mapDispatchToProps = {
  dispatchCreateUser: (
    username,
    password,
    email,
    phone_number,
    firstname,
    lastname,
    picture,
    facility_id
  ) => createUser(username, password, email, phone_number, firstname, lastname, picture, facility_id)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewAuthSignUp);
