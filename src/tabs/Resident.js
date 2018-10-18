import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  FlatList,
  Text  
} from "react-native";

import R from "ramda";
import LoadContainer from '../components/LoadContainer'
import {
  getPatientsAction
} from "../actions/could/apiResident";
import { tabLocation } from "../actions/tab/index";
import { connect } from "react-redux";

import * as constVal from '../constant/constant'
import * as images from '../constant/images';

import SearchBar from "react-native-search-bar";
import * as utils from "../utils/utils";
import NavBar from "../components/NavBar";
import RowResident from "../components/RowResident";
import ResidentProfile from "./ResidentProfile";


class TabResidents extends Component {
  static propTypes = {
    openMenu: PropTypes.func
  };
  searchBarBox;
  constructor(props) {
    super(props);
    this.onSearchFilter = this.onSearchFilter.bind(this);
    this.state = {
      dataSource: [],
      refreshing: false,
      isProfileView: false,
      selectedPatientId: null
    };
    this.onLoadData = this.onLoadData.bind(this);
    this.onLoadPatients = this.onLoadPatients.bind(this);
    this.onLoadProfile = this.onLoadProfile.bind(this);
  }
  componentWillMount() {
    this.props.getPatientsAction();
  }
  componentWillReceiveProps(nextProps) {
    const { isLoading, isGetPatient, patients, getPatientsError } = nextProps;
    if (!isLoading && isGetPatient) {
      this.onLoadData(patients);
    } else {
    }
  }
  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.props.getPatientsAction();
      }
    );
  };
  onLoadData(data) {
    const sortedData = R.sort(utils.sortWithName, data);
    this.setState({
      dataSource: sortedData,
      refreshing: false
    });
  }
  onSearchFilter(text) {
    const users = this.props.patients.filter(user =>
      `${user.firstname}${user.lastname}`
        .toUpperCase()
        .includes(text.toUpperCase())
    );
    const sortedData = R.sort(utils.sortWithName, users);
    this.setState({
      dataSource: sortedData,
      refreshing: false
    });
  }
  onLoadProfile(_id) {
    this.setState({
      isProfileView: true,
      selectedPatientId: _id
    });
  }
  onLoadPatients() {
    this.setState({
      isProfileView: false
    });
  }
  renderProfile() {
    const patient = this.props.patients.filter(user =>
      `${user.id}`
        .toUpperCase()
        .includes(this.state.selectedPatientId.toUpperCase())
    );
    return (
      <ResidentProfile
        handleLeft={this.onLoadPatients}
        patientData={patient[0]}
      />
    );
  }
  renderHeader = () => {
    return (
      <SearchBar
        ref={ref => (this.searchBarBox = ref)}
        placeholder="Search"
        searchBarStyle="prominent"
        showsCancelButton={false}
        showsCancelButtonWhileEditing={true}
        enablesReturnKeyAutomatically={true}
        onChangeText={text => this.onSearchFilter(text)}
        onSearchButtonPress={() => {
          this.searchBarBox.blur();
        }}
        onCancelButtonPress={() => {
          this.searchBarBox.blur();
        }}
      />
    );
  };
  renderLoadingView() {
    return (
      <LoadContainer/>
    );
  }
  renderErrorView() {
    return (
      <View style={{ padding: 20 }}>
        <Text>
          {this.props.getPatientsError.message ||
            JSON.stringify(this.props.getPatientsError)}
        </Text>
      </View>
    );
  }
  renderMainView() {
    return (
      <FlatList
        data={this.state.dataSource}
        renderItem={({ item }) => (
          <RowResident data={item} handlerLoadProfile={this.onLoadProfile} handlerLoadMap= { this.props.tabLocation(item._id) }/>
        )}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={this.renderHeader}        
        onRefresh={this.handleRefresh}
        refreshing={this.state.refreshing}
      />
    );
  }
  renderContentView() {
    const { isLoading, isGetPatient, getPatientsError } = this.props;
    if (isLoading && !this.state.refreshing) {
      return this.renderLoadingView();
    } else {
      if (isGetPatient) {
        return this.renderMainView();
      } else {
        if (getPatientsError != null) {
          return this.renderErrorView();
        } else {
          return this.renderMainView();
        }
      }
    }
  }
  render() {
    if (this.state.isProfileView) {
      return this.renderProfile();
    } else {
      return (
        <View style={styles.container}>
          <NavBar
            isCenterImg={false}
            centerSource={images.logoImg}
            isCenterShow={"flex"}
            title={"Residents"}
            isRightImg={true}
            rightSource={images.userMenuImg}
            isRightShow={"none"}
            rightText={""}
            isLeftImg={true}
            leftSource={images.userMenuImg}
            isLeftShow={"flex"}
            leftAction={this.props.openMenu}
            leftText={""}
          />
          {this.renderContentView()}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: constVal.colors.MTHEME
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
    isGetPatient: state.patientReducer.isGetPatient,
    isLoading: state.patientReducer.isLoading,
    getPatientsError: state.patientReducer.getPatientsError,
    patients: state.patientReducer.patients
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getPatientsAction: () => {
      dispatch(getPatientsAction());
    },
    tabLocation : (userId) => {
      dispatch(tabLocation(userId));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabResidents);
