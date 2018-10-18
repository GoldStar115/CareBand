import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView
} from "react-native";

import { Actions } from "react-native-router-flux";
import { updateNotificationNote } from "../actions/could/apiNotification";
import { connect } from "react-redux";
import NavBar from "../components/NavBar";
import * as constVal from '../constant/constant'

class ViewWriteNote extends Component {
  static propTypes = {
    data: PropTypes.any,
    notiId: PropTypes.string
  };
  state = {
    textValue: ""
  };
  constructor(props) {
    super(props);
    this._onDone = this._onDone.bind(this);
  }
  componentWillMount() {    
    this._onGetContent(this.props.data);
  }
  _onBack() {
    Actions.pop();
  }
  _onDone() {
    this.props.data.content = this.state.textValue;
    this.props.updateNotificationNote(this.props.data, this.props.notiId);    
    Actions.popTo("viewMain");
  }
  _onGetContent(data) {
    if (data === "" || data == undefined || data == null) {
      this.setState({ textValue: "" });
    } else {
      this.setState({
        textValue: data.content === null ? "null" : data.content
      });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <NavBar
          isCenterImg={false}
          isCenterShow={"flex"}
          title={"Write Note"}
          isRightImg={false}
          isRightShow={"flex"}
          rightText={"Done"}
          rightAction={this._onDone}
          isLeftImg={false}
          isLeftShow={"flex"}
          leftAction={this._onBack}
          leftText={"Cancel"}
        />
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <TextInput
            allowFontScaling={true}
            autoCapitalize="sentences"
            value={this.state.textValue}
            autoCorrect={true}
            autoFocus={true}
            editable={true}
            maxLength={2000}
            multiline={true}
            onChangeText={content => this.setState({ textValue: content })}
            style={styles.textView}
            placeholder="Write note"
            placeholderTextColor= {constVal.colors.MBORDERBOTTOM}
            returnKeyType="done"
          />
        </KeyboardAvoidingView>
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
  textView: {
    padding: 10,
    fontSize: 15,
    flex: 1,
    backgroundColor: "white",
    borderColor: constVal.colors.MBORDERBOTTOM,
    borderWidth: 1,
    borderRadius: 4
  }
});
const mapStateToProps = (state) => {
  return{
    ...state
  }
};
const mapDispatchToProps = dispatch => {
  return {
    updateNotificationNote: (note, notiId) => {
      dispatch(updateNotificationNote(note, notiId));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewWriteNote);
