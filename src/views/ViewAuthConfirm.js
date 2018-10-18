import React, { Component } from "react";
import CodeInput from "react-native-confirmation-code-input";
import { TouchableOpacity, Text, View, Image } from "react-native";
import PropTypes from "prop-types";
import Spinner from "react-native-loading-spinner-overlay";
import { colors } from "../constant/constant";
import * as images from '../constant/images'
import { confirmUserSignUp, resendConfirmCode } from "../actions/auth/confirm";
import { connect } from "react-redux";
import { authStyles } from "../constant/authStyles";
import { onShowToast } from "../utils/utils";
class ViewAuthConfirm extends Component {
  constructor(props) {
    super(props);
    this._onConfirmCode = this._onConfirmCode.bind(this);
    this._onResendConfirmCode = this._onResendConfirmCode.bind(this);
  }
  static propTypes = {
    username: PropTypes.string.isRequired
  };
  componentWillReceiveProps(nextProps) {
    const {
      isConfirm,
      confirmError,
      isResendConfirm,
      resendConfirmError
    } = nextProps;
    if (isResendConfirm && resendConfirmError == null) {
      onShowToast("Successfully", null);
    } else if (isConfirm && confirmError != null) {
      onShowToast(confirmError.message || JSON.stringify(confirmError), null);
    } else if (isResendConfirm && resendConfirmError != null) {
      onShowToast(
        resendConfirmError.message || JSON.stringify(resendConfirmError),
        null
      );
    }
  }
  _onConfirmCode = authCode => {
    this.props.disPatchConfirmUserSignUp(this.props.username, authCode);
  };
  _onResendConfirmCode = () => {
    this.props.disPatchResendConfirmCode(this.props.username);
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
        <View style={authStyles.confirmCodeWrap}>
          <Text style={authStyles.text}>Please enter your confirm code</Text>
          <CodeInput
            ref="codeInputRef2"
            keyboardType="numeric"
            codeLength={6}
            activeColor={colors.MBLUE}
            inactiveColor={colors.MBLUE}
            autoFocus={false}
            ignoreCase={true}
            inputPosition="center"
            size={40}
            value={"075311"}
            onFulfill={code => this._onConfirmCode(code)}
            containerStyle={{ marginTop: 20 }}
            codeInputStyle={{ borderWidth: 1.5 }}
          />
        </View>
        <View style={authStyles.submitPartForm}>
          <TouchableOpacity onPress={this._onResendConfirmCode}>
            <Text style={authStyles.text}>Resend code</Text>
          </TouchableOpacity>
        </View>
        <View style={authStyles.submitPartForm}>
          <TouchableOpacity onPress={this._onBack}>
            <Text style={authStyles.text}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isConfirm: state.confirmReducer.isConfirm,
  confirmError: state.confirmReducer.confirmError,
  isLoading: state.confirmReducer.isLoading,
  isResendConfirm: state.confirmReducer.isResendConfirm,
  resendConfirmError: state.confirmReducer.resendConfirmError
});

const mapDispatchToProps = {
  disPatchConfirmUserSignUp: (username, authCode) =>
    confirmUserSignUp(username, authCode),
  disPatchResendConfirmCode: username => resendConfirmCode(username)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewAuthConfirm);
