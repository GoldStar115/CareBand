import { StyleSheet } from "react-native";

import * as constVal from '../constant/constant'

const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: null,
    height: null
  },

  logoImage: {
    flex: 1,
    width: constVal.dimens.DEV_WIDTH - 160,
    height: 60,
    resizeMode: "contain"
  },

  //////////////
  singInLogo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  container_formLogin: {
    flex: 1,
    alignItems: "center"
  },

  /////////////////////

  confirmCodeWrap: {
    flex: 1,
    top: -60,
    alignItems: "center"
    // backgroundColor: "black"
  },

  /////////////////
  singUpLogo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  container_formSignUp: {
    flex: 2,
    alignItems: "center"
  },
  inlineFlag: {
    position: "absolute",
    zIndex: 99,
    width: 10,
    height: 22,
    left: 45,
    top: 9
  },
  inputPartLeft: {
    backgroundColor: constVal.colors.MWHITE,
    width: (constVal.dimens.DEV_WIDTH - 46) / 2,
    height: constVal.dimens.MARGINSIZE,
    marginLeft: 20,
    marginRight: 6,
    paddingLeft: 45,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: constVal.colors.MBLUE,
    color: "black"
  },
  inputPartRight: {
    backgroundColor: constVal.colors.MWHITE,
    width: (constVal.dimens.DEV_WIDTH - 46) / 2,
    height: constVal.dimens.MARGINSIZE,
    marginRight: 20,
    paddingLeft: 15,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: constVal.colors.MBLUE,
    color: "black"
  },
  /////////////
  submitForm: {
    height: constVal.dimens.MARGINSIZE,
    marginTop: 15,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  submitPartForm: {
    width: constVal.dimens.DEV_WIDTH,
    height: constVal.dimens.MARGINSIZE,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  btnSubmit: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: constVal.colors.MBLUE,
    width: constVal.dimens.DEV_WIDTH - 40,
    height: constVal.dimens.MARGINSIZE,
    borderRadius: 10,
    zIndex: 100
  },
  circle: {
    height: constVal.dimens.MARGINSIZE,
    width: constVal.dimens.MARGINSIZE,
    marginTop: -constVal.dimens.MARGINSIZE,
    borderWidth: 1,
    borderColor: constVal.colors.MBLUE,
    borderRadius: 100,
    alignSelf: "center",
    zIndex: 99,
    backgroundColor: constVal.colors.MBLUE
  },
  btnText: {
    color: "white",
    backgroundColor: "transparent"
  },
  image: {
    width: 24,
    height: 24
  },

  text: {
    color: constVal.colors.MBLUE,
    backgroundColor: "transparent"
  },

  passwordEye: {
    position: "absolute",
    top: 8,
    right: 28
  },

  iconEye: {
    width: 25,
    height: 25,
    tintColor: "rgba(0,0,0,0.2)"
  },

  inputWrapper: {
    height: constVal.dimens.MARGINSIZE,
    marginTop: 7,
    flexDirection: "row",
    marginBottom: 7
  },

  input: {
    backgroundColor: constVal.colors.MWHITE,
    width: constVal.dimens.DEV_WIDTH - 40,
    height: constVal.dimens.MARGINSIZE,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: constVal.colors.MBLUE,
    color: "black"
  },

  inputProfile: {
    backgroundColor: constVal.colors.MWHITE,
    width: constVal.dimens.DEV_WIDTH - 40,
    height: constVal.dimens.MARGINSIZE,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: constVal.colors.MBLUE,
    color: "black"
  },
  inlineImg: {
    position: "absolute",
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 9
  }
});
export { authStyles };
