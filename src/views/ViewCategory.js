import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";

import { Actions } from "react-native-router-flux";
import { colors, dimens } from "../constant/constant";

import NavBar from "../components/NavBar";

class ViewCategory extends Component {
  static propTypes = {
    data: PropTypes.any,
    notiId: PropTypes.string
  };
  componentWillMount() {}
  _onBack() {
    Actions.pop();
  }
  onGotoWriteNote(category) {
    this.props.data.category = category;
    Actions.push("viewWriteNote", {
      data: this.props.data,
      notiId: this.props.notiId
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <NavBar
          isCenterImg={false}
          isCenterShow={"flex"}
          title={"Choose Category"}
          isRightImg={false}
          isRightShow={"none"}
          rightText={"Done"}
          rightAction={this._onGotoWriteNote}
          isLeftImg={false}
          isLeftShow={"flex"}
          leftAction={this._onBack}
          leftText={"Cancel"}
        />
        <ScrollView style={styles.container}>
          <View style={styles.containermenu}>
            <View style={styles.separator}>
              <TouchableOpacity
                onPress={() => {
                  this.onGotoWriteNote(0);
                }}
              >
                <Text style={styles.textMenu}>{"Bathing"}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separator}>
              <TouchableOpacity
                onPress={() => {
                  this.onGotoWriteNote(1);
                }}
              >
                <Text style={styles.textMenu}>{"Dressing"}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separator}>
              <TouchableOpacity
                onPress={() => {
                  this.onGotoWriteNote(2);
                }}
              >
                <Text style={styles.textMenu}>{"Eating"}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separator}>
              <TouchableOpacity
                onPress={() => {
                  this.onGotoWriteNote(3);
                }}
              >
                <Text style={styles.textMenu}>{"Escort"}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separator}>
              <TouchableOpacity
                onPress={() => {
                  this.onGotoWriteNote(4);
                }}
              >
                <Text style={styles.textMenu}>{"Exercise"}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separator}>
              <TouchableOpacity
                onPress={() => {
                  this.onGotoWriteNote(5);
                }}
              >
                <Text style={styles.textMenu}>{"Friend"}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separator}>
              <TouchableOpacity
                onPress={() => {
                  this.onGotoWriteNote(6);
                }}
              >
                <Text style={styles.textMenu}>{"Other- Type Note"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.MTHEME
  },
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
    borderColor: colors.MTHEME,
    borderWidth: 1
  },
  textName: {
    fontSize: 16,
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
export default ViewCategory;
