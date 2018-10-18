import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import * as utils from "../utils/utils";
import { Avatar, Icon } from "react-native-elements";
import { Auth, Storage } from "aws-amplify";
class AsyncAvatar extends Component {
  static propTypes = {
    picture: PropTypes.any,
    placeHolder: PropTypes.any,
    firstName: PropTypes.any,
    lastName: PropTypes.any,
    width: PropTypes.any,
    height: PropTypes.any
  };
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: null
    };
    this.onShowAvatar = this.onShowAvatar.bind(this);
    this.onLoadAvatar = this.onLoadAvatar.bind(this);
    
  }
  componentWillMount() {
    this.onLoadAvatar(this.props);
  }
  componentWillReceiveProps(nextProps){
    this.onLoadAvatar(nextProps);
  }
  onLoadAvatar(props) {
    Storage.get(props.picture, { level: "public" })
      .then(imgUrl => {
        this.setState({
          imgUrl: imgUrl
        });
      })
      .catch(error => {
        utils.onShowToast(error.message || JSON.stringify(error));
      });
  }
  onShowAvatar() {
    if (this.props.placeHolder != null) {      
      return (
        <Avatar
          width={Number(this.props.width)}
          height={Number(this.props.height)}
          rounded
          activeOpacity={0.7}
          source={{ uri: this.props.placeHolder }}
        />
      );
    } else {
      if (this.state.imgUrl != null) {        
        return (
          <Avatar
            width={Number(this.props.width)}
            height={Number(this.props.height)}
            rounded
            activeOpacity={0.7}
            source={{ uri: this.state.imgUrl }}
          />
        );
      } else {        
        return (
          <Avatar
            width={Number(this.props.width)}
            height={Number(this.props.height)}
            rounded
            activeOpacity={0.7}
            title={`${this.props.firstName
              .substring(0, 1)
              .toUpperCase()}${this.props.lastName
              .substring(0, 1)
              .toUpperCase()}`}
          />
        );
      }
    }
  }
  render() {
    return <View>{this.onShowAvatar()}</View>;
  }
}
export default AsyncAvatar;
