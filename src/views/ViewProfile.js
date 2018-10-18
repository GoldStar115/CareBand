import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import { Actions } from "react-native-router-flux";

import mime from "react-native-mime-types";

import { updateUserInfo, uploadUserPicture } from "../actions/user/updateuser";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import { Avatar, Icon } from "react-native-elements";
import PhoneInput from "react-native-phone-input";
import Phonepicker from "../components/phonepicker";
import NavBar from "../components/NavBar";
import ImagePicker from "react-native-image-picker";
import { onShowToast, saveDefaultData } from "../utils/utils";
import files from "../utils/files";
import { colors, dimens, strings } from "../constant/constant";
import * as images from "../constant/images";
import { authStyles } from "../constant/authStyles";
import AsyncAvatar from '../components/AsyncAvatar'

class ViewProfile extends Component {
  static propTypes = {
    user: PropTypes.any
  };
  constructor(props) {
    super(props);
    const userInfo = this.props.user.attributes;
    this.state = {
      isTakePhoto: false,
      picture: userInfo.picture != "0" ? userInfo.picture : null,
      email: userInfo.email,
      phone_number: userInfo.phone_number,
      username: this.props.user.username,
      firstname: userInfo.name,
      lastname: userInfo.family_name,
      facility_id: userInfo["custom:facility_id"],
      newpassword: "",
      oldpassword: "",
      showPass: true,
      press: false,
      pickerData: null,
      takePhotoUri : null
    };
    this.showPass = this.showPass.bind(this);
    this.onPressFlag = this.onPressFlag.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this._onUpdateUserAttribute = this._onUpdateUserAttribute.bind(this);
  }
  componentDidMount() {
    this.setState({
      pickerData: this.phone.getPickerData()
    });
  }
  componentWillReceiveProps(nextProps) {
    const {
      isUpdateUser,
      UpdateUserError,
      isUploadPhoto,
      UploadPhotoError,
      UploadedPhoto,
      user
    } = nextProps;
    if (isUpdateUser) {
      if (UpdateUserError != null) {
        onShowToast(
          UpdateUserError.message || JSON.stringify(UpdateUserError),
          null
        );
      }
      if (user != null && user.username != "") {
        const userInfo = user.attributes;
        this.setState({
          picture: userInfo.picture,
          email: userInfo.email,
          phone_number: userInfo.phone_number,
          username: user.username,
          firstname: userInfo.name,
          lastname: userInfo.family_name,
          facility_id: userInfo["custom:facility_id"]
        });
      }
    } else if (isUploadPhoto) {
      if (UploadPhotoError == null && UploadedPhoto != "") {
        this.setState({
          picture: UploadedPhoto
        });
      } else {
        onShowToast(
          UploadPhotoError.message || JSON.stringify(UploadPhotoError),
          null
        );
      }
      if (user != null && user.username != "") {
        const userInfo = user.attributes;
        this.setState({
          email: userInfo.email,
          phone_number: userInfo.phone_number,
          username: user.username,
          firstname: userInfo.name,
          lastname: userInfo.family_name,
          facility_id: userInfo["custom:facility_id"],
          oldpassword: user.signInUserSession.idToken.jwtToken
        });
      }
    }
  }
  showPass() {
    this.state.press === false
      ? this.setState({ showPass: false, press: true })
      : this.setState({ showPass: true, press: false });
  }
  onPressFlag() {
    this.myCountryPicker.open();
  }

  selectCountry(country) {
    this.phone.selectCountry(country.iso2);
    this.setState({ phone_number: country.dialCode });
  }
  _onGetAvatar() {
    return (
      <View>
        <AsyncAvatar
          width={120}
          height={120}
          firstName = {this.state.firstname}
          lastName = {this.state.lastname}          
          picture={ this.state.picture }
          placeHolder = {this.state.takePhotoUri}
        />        
        <Icon
          name={"edit"}
          containerStyle={styles.icon}
          onPress={() => {
            this.selectPhotoTapped();
          }}
        />
      </View>
    );
    // if (
    //   this.state.picture != null &&
    //   this.state.picture != "0" &&
    //   this.state.picture.length > 2
    // ) {
    //   return (
    //     <View>
    //       <Avatar
    //         width={120}
    //         height={120}
    //         rounded
    //         activeOpacity={0.7}
    //         source={{ uri: this.state.picture }}
    //       />
    //       />
    //       <Icon
    //         name={"edit"}
    //         containerStyle={styles.icon}
    //         onPress={() => {
    //           this.selectPhotoTapped();
    //         }}
    //       />
    //     </View>
    //   );
    // } else {
    //   return (
    //     <View>
    //       <Avatar
    //         width={120}
    //         height={120}
    //         rounded
    //         activeOpacity={0.7}
    //         title={`${this.state.firstname
    //           .substring(0, 1)
    //           .toUpperCase()}${this.state.lastname
    //           .substring(0, 1)
    //           .toUpperCase()}`}
    //       />
    //       <Icon
    //         name={"edit"}
    //         containerStyle={styles.icon}
    //         onPress={() => {
    //           this.selectPhotoTapped();
    //         }}
    //       />
    //     </View>
    //   );
    // }
  }
  _onUpdateUserAttribute() {
    this.props.updateUserInfo(this.state);
  }
  _onUpLoadImage(file) {
    this.props.uploadUserPicture(file);
  }
  selectPhotoTapped() {
    this.state.isTakePhoto = false;
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: false
      }
    };
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        this.setState({
          takePhotoUri: response.uri,
          isTakePhoto: true          
        });
        let type = mime.lookup(response.uri);
        let extension = mime.extension(type);
        files
          .readFile(response.origURL)
          .then(buffer => {
            const file = {
              source: buffer,
              name: `${
                this.state.username
              }_${new Date().getTime().toString()}.${extension}`,
              type
            };
            this._onUpLoadImage(file);
          })
          .catch(error => {
            onShowToast(error.message || JSON.stringify(error), null);
          });
      }
    });
  }
  render() {
    // let { user } = this.props;
    return (
      <ScrollView>
        <View style={styles.containermenu}>
          <Spinner
            cancelable={true}
            visible={this.props.isLoading}
            textContent={""}
            textStyle={{ color: colors.MBLUE }}
            color={colors.MBLUE}
            overlayColor={colors.MOVERLAY}
          />
          <NavBar
            isCenterImg={false}
            isCenterShow={"flex"}
            title={`Profile`}
            isRightImg={false}
            isRightShow={"none"}
            rightText={""}
            rightAction={() => {}}
            isLeftImg={true}
            leftSource={images.backImg}
            isLeftShow={"flex"}
            leftAction={() => {
              Actions.pop();
            }}
            leftText={""}
          />
          <View style={styles.containerTop}>{this._onGetAvatar()}</View>
          <KeyboardAvoidingView
            behavior="padding"
            style={[authStyles.container_formSignUp, { marginTop: 20 }]}
          >
            <View style={authStyles.inputWrapper}>
              <Image source={images.usernameImg} style={authStyles.inlineImg} />
              <TextInput
                style={[authStyles.inputPartLeft, { borderRadius: 2 }]}
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
                style={[authStyles.inputPartRight, { borderRadius: 2 }]}
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
              <Image source={images.emailImg} style={authStyles.inlineImg} />
              <TextInput
                style={authStyles.inputProfile}
                placeholder={"Email"}
                secureTextEntry={false}
                autoCorrect={true}
                autoCapitalize={"none"}
                returnKeyType={"next"}
                placeholderTextColor="black"
                underlineColorAndroid="transparent"
                value={this.state.email}
                onChangeText={text => this.setState({ email: text })}
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
                style={authStyles.inputProfile}
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
              <Image source={images.facilityImg} style={authStyles.inlineImg} />
              <TextInput
                style={authStyles.inputProfile}
                placeholder={"Facility ID"}
                secureTextEntry={false}
                autoCorrect={true}
                autoCapitalize={"none"}
                returnKeyType={"next"}
                placeholderTextColor="black"
                value={this.state.facility_id}
                underlineColorAndroid="transparent"
                onChangeText={text => {
                  this.setState({ facility_id: text });
                }}
              />
            </View>
            {/* <View style={authStyles.inputWrapper}>
              <Image
                source={images.passwordImg}
                style={authStyles.inlineImg}
              />
              <TextInput
                style={authStyles.inputProfile}
                placeholder={"Old Password"}
                // secureTextEntry={this.state.showPass}
                autoCorrect={false}
                autoCapitalize={"none"}
                returnKeyType={"done"}
                placeholderTextColor="black"
                underlineColorAndroid="transparent"
                value={this.state.oldpassword}
                onChangeText={text => this.setState({ oldpassword: text })}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                style={authStyles.passwordEye}
                onPress={this.showPass}
              >
                <Image source={images.eyeImg} style={authStyles.iconEye} />
              </TouchableOpacity>
            </View> */}
            {/*
            <View style={authStyles.inputWrapper}>
              <Image
                source={images.passwordImg}
                style={authStyles.inlineImg}
              />
              <TextInput
                style={authStyles.inputProfile}
                placeholder={"New Password"}
                secureTextEntry={this.state.showPass}
                autoCorrect={false}
                autoCapitalize={"none"}
                returnKeyType={"done"}
                placeholderTextColor="black"
                underlineColorAndroid="transparent"
                value={this.state.newpassword}
                onChangeText={text => this.setState({ newpassword: text })}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                style={authStyles.passwordEye}
                onPress={this.showPass}
              >
                <Image source={images.eyeImg} style={authStyles.iconEye} />
              </TouchableOpacity>
            </View> */}

            <View style={authStyles.submitForm}>
              <TouchableOpacity
                style={authStyles.btnSubmit}
                onPress={() => {
                  this._onUpdateUserAttribute();
                }}
                activeOpacity={1}
              >
                <Text style={authStyles.btnText}>UPDATE</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  containermenu: {
    flex: 1,
    backgroundColor: colors.MTHEME
  },
  containerTop: {
    height: 160,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.MBLUE
  },
  icon: {
    backgroundColor: colors.MTAB,
    position: "absolute",
    borderRadius: 5,
    right: 0,
    bottom: 0
  },
  imgPhoto: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderColor: colors.MBORDERGREY,
    borderWidth: 1
  },
  textName: {
    fontSize: 16,
    color: colors.MTHEME,
    marginTop: 10
  },
  textVision: {
    fontSize: 16,
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
    width: dimens.DEV_WIDTH,
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
    user: state.getUserReducer.user,
    isLoading: state.updateUserReducer.isLoading,
    isUpdateUser: state.updateUserReducer.isUpdateUser,
    UpdateUserError: state.updateUserReducer.UpdateUserError,
    isUploadPhoto: state.updateUserReducer.isUploadPhoto,
    UploadPhotoError: state.updateUserReducer.UploadPhotoError,
    UploadedPhoto: state.updateUserReducer.UploadedPhoto
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUserInfo: user => {
      dispatch(updateUserInfo(user));
    },
    uploadUserPicture: file => {
      dispatch(uploadUserPicture(file));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewProfile);
