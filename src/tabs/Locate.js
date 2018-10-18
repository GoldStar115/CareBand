import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View , Text} from "react-native";
import * as constVal from "../constant/constant";
import NavBar from "../components/NavBar";
import Indoor from "./LocateInDoor";
import OutDoor from "./LocateOutDoor";
import * as images from "../constant/images";
import * as utils from "../utils/utils";
import { getLocation } from "../actions/could/apiLocate";
import { connect } from "react-redux";
import MapLoadContainer from "../components/MapLoadContainer";
class TabLocate extends Component {
  static propTypes = {
    openMenu: PropTypes.func,
    userId: PropTypes.string.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      isindoor: true
    };
    this.onRightTapped = this.onRightTapped.bind(this);
  }
  componentDidMount(){

  }  
  componentWillReceiveProps(nextProps) {
    const { isLoading, isGetLocation, result, getLocationError } = nextProps;
    if (!isLoading && isGetLocation) {
    } else {
    }
  }
  onRightTapped() {
    const { isindoor } = this.state;
    if (isindoor) {
      this.setState({ isindoor: false });
    } else {
      this.setState({ isindoor: true });
    }
  }
  renderMainView() {      
    if (this.state.isindoor) {
      return <OutDoor data={this.props.result} />;
    } else {
      return <Indoor data={this.props.result} />;
    }
  }
  renderContentView() {    
    const { isLoading, isGetLocation, getLocationError } = this.props;
    if (isLoading) {
      return this.renderLoadingView();
    } else {
      if (isGetLocation) {
        return this.renderMainView();
      } else {
        if (getLocationError != null) {
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
          {this.props.getLocationError.message ||
            JSON.stringify(this.props.getLocationError)}
        </Text>
      </View>
    );
  }
  renderLoadingView() {
    return <MapLoadContainer />;
  }
  render() {
    return (
      <View style={styles.container}>
        <NavBar
          isCenterImg={false}
          centerSource={images.logoImg}
          isCenterShow={"flex"}
          title={"Map"}
          isRightImg={true}
          rightSource={
            this.state.isindoor ? images.locateInImg : images.locateOutImg
          }
          isRightShow={"flex"}
          rightAction={this.onRightTapped}
          rightText={""}
          isLeftImg={true}
          leftSource={images.userMenuImg}
          isLeftShow={"flex"}
          leftAction={this.props.openMenu}
          leftText={""}
        />
        {
            this.renderContentView()
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: constVal.colors.MTHEME
  }
});
const mapStateToProps = state => {
  return {
    isGetLocation: state.locationReducer.isGetLocation,
    isLoading: state.locationReducer.isLoading,
    getLocationError: state.locationReducer.getLocationError,
    result: state.locationReducer.result
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getLocation: user_id => {
      dispatch(getLocation(user_id));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabLocate);
