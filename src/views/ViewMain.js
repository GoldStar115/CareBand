import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import TabNavigator from "react-native-tab-navigator";
import Drawer from "react-native-drawer";
import {
  tabNotification,
  tabLocation,
  tabResident
} from "../actions/tab/index";
import { connect } from "react-redux";

import Dashboard from "../tabs/DashBoard";
import Residents from "../tabs/Resident";
import Locate from "../tabs/Locate";

import ViewMenu from "./ViewMenu";
import { colors, dimens } from "../constant/constant";
import * as images from "../constant/images";
import * as utils from "../utils/utils";

const defaultUserId = '68E60617-7943-CE5B-46BE-2A43DA9B57D6'

class ViewMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      drawerDisable: false
    };
  }
  componentWillMount() {
    this.props.tabNotification();
  }
  closeDrawer = () => {
    this._drawer.close();
  };
  openDrawer = () => {
    this._drawer.open();
  };
  render() {  
    return (
      <Drawer
        ref={ref => (this._drawer = ref)}
        type="overlay"
        content={<ViewMenu closeDrawer={this.closeDrawer} />}
        acceptDoubleTap
        onOpen={() => {
          this.setState({ drawerOpen: true });
        }}
        onClose={() => {
          this.setState({ drawerOpen: false });
        }}
        tweenDuration={200}
        panThreshold={0.08}
        disabled={this.state.drawerDisabled}
        openDrawerOffset={viewport => {
          return dimens.DEV_WIDTH / 2;
        }}
        closedDrawerOffset={() => 0}
        panOpenMask={0.2}
        negotiatePan
        tapToClose={true}
      >
        <TabNavigator style={styles.container}>
          <TabNavigator.Item
            selected={this.props.isSwitchNotification}
            title="Dashboard"
            selectedTitleStyle={{ color: colors.MBLUE }}
            renderIcon={() => (
              <Image
                source={images.deSel_dashBoardImg}
                style={styles.tabimage}
              />
            )}
            renderSelectedIcon={() => (
              <Image source={images.sel_dashBoardImg} style={styles.tabimage} />
            )}
            onPress={() => {
              this.props.tabNotification();
            }}
          >
            <Dashboard openMenu={this.openDrawer} />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.props.isSwitchResident}
            title="Residents"
            selectedTitleStyle={{ color: colors.MBLUE }}
            renderIcon={() => (
              <Image
                source={images.deSel_residentsImg}
                style={styles.tabimage}
              />
            )}
            renderSelectedIcon={() => (
              <Image source={images.sel_residentsImg} style={styles.tabimage} />
            )}
            onPress={() => {
              this.props.tabResident();
            }}
          >
            <Residents openMenu={this.openDrawer} />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.props.isSwitchLocation}
            title="Locate"
            selectedTitleStyle={{ color: colors.MBLUE }}
            renderIcon={() => (
              <Image source={images.deSel_locateImg} style={styles.tabimage} />
            )}
            renderSelectedIcon={() => (
              <Image source={images.sel_locateImg} style={styles.tabimage} />
            )}
            onPress={() => {
              this.props.tabLocation(defaultUserId);
            }}
          >
            <Locate openMenu={this.openDrawer}  userId = {this.props.userId} />
          </TabNavigator.Item>
        </TabNavigator>
      </Drawer>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.MBLUE
  },
  tabimage: {
    width: 24,
    height: 24
  }
});
const mapStateToProps = (state, props) => {
  return {
    isSwitchNotification: state.tabReducer.isSwitchNotification,
    isSwitchResident: state.tabReducer.isSwitchResident,
    isSwitchLocation: state.tabReducer.isSwitchLocation,
    userId : state.tabReducer.userId
  };
};
const mapDispatchToProps = dispatch => {
  return {
    tabNotification: () => {
      dispatch(tabNotification());
    },
    tabResident: () => {
      dispatch(tabResident());
    },
    tabLocation: (userId) => {
      dispatch(tabLocation(userId));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewMain);
