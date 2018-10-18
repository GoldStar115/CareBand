import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Animated
} from "react-native";
import { TabViewAnimated, TabBar } from "react-native-tab-view";
import ImagePicker from "react-native-image-picker";

import { getPatientInfo } from "../actions/could/apiResident";
import { connect } from "react-redux";

import NavBar from "../components/NavBar";
import { Avatar } from "react-native-elements";
import RowBattery from "../components/RowBattery";
import RowNote from "../components/RowNote";

import * as utils from "../utils/utils";
import * as images from '../constant/images';
import * as constVal from '../constant/constant'

const initialLayout = {
  height: 0,
  width: constVal.dimens.DEV_WIDTH
};
const deviceId = "277BCAC128FCF51A";
const tabRoutes = [
  { key: "note", title: "Note"},
  { key: "battery", title: "Battery"}
];
class ProfileBattery extends Component {
  static propTypes = {
    batteryData: PropTypes.array
  };
  constructor(props) {
    super(props);    
  }
  render() {    
    return (
      <FlatList
        style={styles.tab_container}
        data={this.props.batteryData}
        renderItem={({ item }) => <RowBattery data={item} />}
        keyExtractor={item => item.dev_eui}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    );    
  }
}

class ProfileNote extends Component {
  static propTypes = {
    noteData: PropTypes.array
  };
  constructor(props) {
    super(props);
  }
  render() {    
    return (
      <FlatList
        style={styles.tab_container}
        data={this.props.noteData}
        renderItem={({ item }) => <RowNote data={item} />}
        keyExtractor={item => "item.dev_eui"}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    ); 
  }
}
class ResidentProfile extends Component {
  static propTypes = {
    handleLeft: PropTypes.func,
    patientData: PropTypes.any
  };
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: tabRoutes,
      avatarSource: this.props.patientData.logo,
      batteryData: [],
      noteData: []
    };
  }
  componentWillMount() {
    this.props.getPatientInfo(deviceId);
  }
  componentWillReceiveProps(nextProps) {
    const {
      isGetPatientInfo,
      isLoading,
      getPatientInfoError,
      patientInfo
    } = nextProps;
    if (isGetPatientInfo) {
      this.setState({
        batteryData: patientInfo.battery,
        noteData: patientInfo.note
      });
    }
  }
  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        this.setState({
          avatarSource: response.uri
        });
      }
    });
  }
  _handleIndexChange = index => this.setState({ index });
  _renderLabel = props => ({ route, index }) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    const colorRange = inputRange.map(inputIndex => {
      if (inputIndex === index) return constVal.colors.MBLUE;
      else {
        return constVal.colors.MWHITE;
      }
    });
    const color = props.position.interpolate({
      inputRange: inputRange,
      outputRange: colorRange
    });
    const backgroundColorRange = inputRange.map(inputIndex => {
      if (inputIndex === index) return constVal.colors.MWHITE;
      else {
        return constVal.colors.MTAB;
      }
    });
    const backgroundColor = props.position.interpolate({
      inputRange: inputRange,
      outputRange: backgroundColorRange
    });
    return (
      <Animated.View style={[styles.tabLbl, { backgroundColor }]}>
        <Animated.Text style={[{ fontSize: 17 }, { color }]}>
          {route.title}
        </Animated.Text>
      </Animated.View>
    );
  };
  _renderHeader = props => (
    <TabBar
      {...props}
      style={{ backgroundColor: constVal.colors.MTAB, height: 40 }}
      indicatorStyle={{ backgroundColor: constVal.colors.MTAB }}
      labelStyle={{ color: "white", fontWeight: "400" }}
      renderLabel={this._renderLabel(props)}
    />
  );
  _renderScene = ({ route }) => {
    switch (route.key) {
      case "note":
        return <ProfileNote noteData={this.state.noteData} />;
      case "battery":
        return <ProfileBattery batteryData={this.state.batteryData} />;
      default:
        return null;
    }
  };
  renderAvatar() {
    if (this.state.avatarSource != null && this.state.avatarSource.length > 2) {
      return (
        <Avatar
          width={120}
          height={120}
          rounded
          activeOpacity={0.7}
          source={{ uri: this.state.avatarSource }}
        />
      );
    } else {
      return (
        <Avatar
          width={120}
          height={120}
          rounded
          source={images.cameraImg}
          activeOpacity={0.7}
        />
      );
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <NavBar
          isCenterImg={false}
          isCenterShow={"flex"}
          title={`${this.props.patientData.firstname} ${
            this.props.patientData.lastname
          }`}
          isRightImg={false}
          isRightShow={"none"}
          rightText={""}
          isLeftImg={true}
          leftSource={images.backImg}
          isLeftShow={"flex"}
          leftAction={() => {
            this.props.handleLeft();
          }}
          leftText={""}
        />
        <View style={styles.container_photo}>
          <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
            {this.renderAvatar()}
          </TouchableOpacity>
        </View>
        <TabViewAnimated
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onIndexChange={this._handleIndexChange}
          initialLayout={initialLayout}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: constVal.colors.MTHEME
  },
  container_photo: {
    height: 160,
    alignItems: "center",
    justifyContent: "center"
  },
  tabLbl: {
    flex: 1,
    top: -4,
    width: constVal.dimens.DEV_WIDTH / 2.1,
    height: 32,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
    marginLeft: 4,
    borderRadius: 6
  },
  tab_container: {
    flex: 1
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: constVal.colors.MBORDERGREY
  }
});

const mapStateToProps = state => {
  return {
    isGetPatientInfo: state.patientInfoReducer.isGetPatientInfo,
    isLoading: state.patientInfoReducer.isLoading,
    getPatientInfoError: state.patientInfoReducer.getPatientInfoError,
    patientInfo: state.patientInfoReducer.patientInfo
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getPatientInfo: devId => {
      dispatch(getPatientInfo(devId));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResidentProfile);
