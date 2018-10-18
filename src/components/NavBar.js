import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import * as constantVal from "../constant/constant";
class NavBar extends Component {
  static propTypes = {
    isCenterImg: PropTypes.bool.isRequired,
    centerSource: PropTypes.number,
    isCenterShow: PropTypes.string,
    title: PropTypes.string,

    isRightImg: PropTypes.bool.isRequired,
    rightSource: PropTypes.number,
    isRightShow: PropTypes.string,
    rightAction: PropTypes.any,
    rightText: PropTypes.string,

    isLeftImg: PropTypes.bool.isRequired,
    leftSource: PropTypes.number,
    isLeftShow: PropTypes.string,
    leftAction: PropTypes.any,
    leftText: PropTypes.string
  };

  constructor(props) {
    super(props);
    this._onLoadNav = this._onLoadNav.bind(this);
    this._onLoadLeftItem = this._onLoadLeftItem.bind(this);
    this._onLoadCenterItem = this._onLoadCenterItem.bind(this);
    this._onLoadRightItem = this._onLoadRightItem.bind(this);
  }

  _onLoadNav() {
    return (
      <View style={styles.navbar}>
        <View style={styles.navLeft}>{this._onLoadLeftItem()}</View>
        <View style={styles.navCenter}>{this._onLoadCenterItem()}</View>
        <View style={styles.navRight}>{this._onLoadRightItem()}</View>
      </View>
    );
  }
  _onLoadLeftItem() {
    const {
      isLeftImg,
      isLeftShow,
      leftSource,
      leftText,
      leftAction
    } = this.props;
    if (isLeftImg) {
      return (
        <TouchableOpacity onPress={leftAction} style={{ display: isLeftShow }}>
          <Image source={leftSource} style={[styles.navItemImg]} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={leftAction}
          style={[styles.navLeftTitle, { display: isLeftShow }]}
        >
          <Text style={styles.leftTitle}>{`${leftText}`}</Text>
        </TouchableOpacity>
      );
    }
  }
  _onLoadCenterItem() {
    const { isCenterImg, isCenterShow, centerSource, title } = this.props;
    if (isCenterImg) {
      return (
        <Image
          source={centerSource}
          style={[styles.centerImg, { display: isCenterShow }]}
        />
      );
    } else {
      return <Text style={[styles.title]}>{title}</Text>;
    }
  }

  _onLoadRightItem() {
    const {
      isRightImg,
      isRightShow,
      rightSource,
      rightText,
      rightAction
    } = this.props;
    if (isRightImg) {
      return (
        <TouchableOpacity
          onPress={rightAction}
          style={{ display: isRightShow }}
        >
          <Image source={rightSource} style={[styles.navItemImg]} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={rightAction}
          style={[styles.navRightTitle, { display: isRightShow }]}
        >
          <Text style={styles.rightTitle}>{`${rightText}`}</Text>
        </TouchableOpacity>
      );
    }
  }
  render() {
    return <View>{this._onLoadNav()}</View>;
  }
}

const styles = StyleSheet.create({
  navbar: {
    height: constantVal.dimens.NAVHEIGHT,
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#c3c3c3",
    alignItems: "center",
    justifyContent: "center"
  },
  navLeft: {
    flex: 1,
    left: 10,
    top: 12,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  navCenter: {
    flex: 3,
    top: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  navRight: {
    flex: 1,
    right: 10,
    top: 12,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  navItemImg: {
    width: 25,
    height: 25,
    alignItems: "center",
    resizeMode: "contain",
    justifyContent: "center"
  },
  centerImg: {
    width: constantVal.dimens.DEV_WIDTH / 2.7,
    height: 25,
    resizeMode: "contain"
  },
  navLeftTitle: {
    top: 2,
    borderColor: constantVal.colors.MBLUE,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  leftTitle: {
    fontSize: constantVal.fonts.TABFSIZE,
    color: constantVal.colors.MBLUE,
    textAlign: "center",
    width: 50
  },
  navRightTitle: {
    top: 2,
    borderRadius: 5,
    backgroundColor: constantVal.colors.MBLUE,
    alignItems: "center",
    justifyContent: "center"
  },
  rightTitle: {
    width: 50,
    fontSize: constantVal.fonts.TABFSIZE,
    color: "white",
    textAlign: "center"
  },
  title: {
    fontSize: constantVal.fonts.TITLEFSIZE,
    fontWeight: "bold",
    color: constantVal.colors.MTEXT,
    alignSelf: "center",
    textAlign: "center"
  }
});

export default NavBar;
