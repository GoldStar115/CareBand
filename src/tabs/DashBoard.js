import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Animated, FlatList } from "react-native";
import R from "ramda";
import { TabViewAnimated, TabBar } from "react-native-tab-view";
import { getNotificationInfo , updateNotificationStatus } from "../actions/could/apiNotification";
import { tabLocation } from "../actions/tab/index";
import { connect } from "react-redux";
import NavBar from "../components/NavBar";
import RowActive from "../components/RowActive";
import RowCleared from "../components/RowCleared";
import LoadContainer from "../components/LoadContainer";

import { sortReceiverName } from "../utils/utils";

import * as images from "../constant/images";
import * as constVal from "../constant/constant";

const initialLayout = {
  height: 0,
  width: constVal.dimens.DEV_WIDTH
};
const routes = [
  { key: "active", title: "Active" },
  { key: "cleared", title: "Cleared" }
];
class TabDashBoard extends Component {
  static propTypes = {
    openMenu: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes,
      refreshing: false,
      isChangeState: false,
      dataSource: []
    };
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeLocate = this.onChangeLocate.bind(this);
  }
  componentWillMount() {
    this.props.getNotificationInfo();
  }
  componentWillReceiveProps(nextProps) {
    const {
      isLoading,
      isGetNotification,
      notifications,
      getNotificationError
    } = nextProps;
    if (!isLoading && isGetNotification) {
      this.onLoadData(notifications);
    } else {
    }
  }
  onLoadData(data) {
    const sortedData = R.sort(sortReceiverName, data);
    this.setState({
      dataSource: sortedData,
      refreshing: false
    });
  }
  onChangeStatus(data) {
    if (data.status == 0) {
      this.props.updateNotificationStatus(data._id, 1);
    } else if (data.status == 1) {
      this.props.updateNotificationStatus(data._id, 2);
    } else if (data.status == 2) {
      this.props.updateNotificationStatus(data._id, 0);
    }
  }
  onChangeLocate(data) {
    this.props.tabLocation(data.receiver._id);
  }
  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.props.getNotificationInfo();
      }
    );
  };
  onLoadClearedData(data) {
    const notifications = data.filter(
      notification => notification.status === 2
    );
    const sortedData = R.sort(sortReceiverName, notifications);
    return sortedData;
  }
  onLoadActiveData(data) {
    const sortedData = R.sort(sortReceiverName, data);
    return sortedData;
  }
  handleTabIndexChange = index => this.setState({ index });
  renderTabLabel = props => ({ route, index }) => {
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
      <Animated.View style={[styles.tabLabel, { backgroundColor }]}>
        <Animated.Text style={[{ fontSize: 17 }, { color }]}>
          {route.title}
        </Animated.Text>
      </Animated.View>
    );
  };
  renderTabHeader = props => (
    <TabBar
      {...props}
      style={{ backgroundColor: constVal.colors.MTAB, height: 40 }}
      indicatorStyle={{ backgroundColor: constVal.colors.MTAB }}
      labelStyle={{ color: "white", fontWeight: "400" }}
      renderLabel={this.renderTabLabel(props)}
    />
  );
  renderTabScene = ({ route }) => {
    switch (route.key) {
      case "active":
        return (
          <FlatList
            data={this.onLoadActiveData(this.state.dataSource)}
            renderItem={({ item }) => (
              <RowActive
                data={item}
                statusHandler={this.onChangeStatus}
                locateHandler={this.onChangeLocate}
              />
            )}
            keyExtractor={item => item._id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            onRefresh={this.handleRefresh}
            refreshing={this.state.refreshing}
          />
        );
      case "cleared":
        return (
          <FlatList
            data={this.onLoadClearedData(this.state.dataSource)}
            renderItem={({ item }) => <RowCleared data={item} />}
            keyExtractor={item => item._id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            onRefresh={this.handleRefresh}
            refreshing={this.state.refreshing}
          />
        );
      default:
        return null;
    }
  };
  renderLoadingView() {
    return <LoadContainer />;
  }
  renderContentView() {
    const { isLoading, isGetNotification, getNotificationError } = this.props;
    if (isLoading && !this.state.refreshing) {
      return this.renderLoadingView();
    } else {
      if (isGetNotification) {
        return this.renderMainView();
      } else {
        if (getNotificationError != null) {
          return this.renderErrorView();
        } else {
          return this.renderMainView();
        }
      }
    }
  }
  renderErrorView() {
    return (
      <View style={{ padding: 20 }}>
        <Text>
          {this.props.getNotificationError.message ||
            JSON.stringify(this.props.getNotificationError)}
        </Text>
      </View>
    );
  }
  renderMainView() {
    return (
      <TabViewAnimated
        navigationState={this.state}
        renderScene={this.renderTabScene}
        renderHeader={this.renderTabHeader}
        onIndexChange={this.handleTabIndexChange}
        initialLayout={initialLayout}
      />
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <NavBar
          isCenterImg={true}
          isCenterShow={"flex"}
          centerSource={images.logoImg}
          isLeftImg={true}
          isLeftShow={"flex"}
          leftSource={images.userMenuImg}
          leftAction={this.props.openMenu}
          isRightImg={true}
          rightSource={images.userMenuImg}
          isRightShow={"none"}
          tag={"Dashboard"}
        />
        {this.renderContentView()}
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
  container_tabview: {
    flex: 1
  },
  tabLabel: {
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
  separator: {
    flex: 1,
    left: 75,
    height: StyleSheet.hairlineWidth,
    backgroundColor: constVal.colors.MBORDERGREY
  }
});
const mapStateToProps = state => {
  return {
    isGetNotification: state.notificationReducer.isGetNotification,
    isLoading: state.notificationReducer.isLoading,
    getNotificationError: state.notificationReducer.getNotificationError,
    notifications: state.notificationReducer.notifications
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getNotificationInfo: () => {
      dispatch(getNotificationInfo());
    },
    updateNotificationStatus: (notiId, status) => {
      dispatch(updateNotificationStatus(notiId, status));
    },
    tabLocation : (userId) => {
      dispatch(tabLocation(userId));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabDashBoard);
