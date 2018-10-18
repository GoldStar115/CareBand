import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as images from '../constant/images'
import { colors, fonts, dimens } from "../constant/constant";
import PropTypes from "prop-types";
import { Avatar } from "react-native-elements";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: "row",
    alignItems: "center"
  },
  containerPhoto: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  containerLbl: {
    flex: 4,
    flexDirection: "column"
  },
  containerState: {
    flex: 1.2,
    alignItems: "center",
    justifyContent: "center"
  },
  textName: {
    marginLeft: 12,
    fontSize: fonts.CONTENTFSIZE,
    color: colors.MTEXT
  },
  textTime: {
    marginLeft: 12,
    fontSize: fonts.SUBCONTENTFSIZE,
    color: colors.MBLUE
  },
  textState: {
    marginLeft: 12,
    fontSize: fonts.TIMEFSIZE,
    color: colors.MGREY
  },
  photo: {
    height: dimens.PHOTOSIZE,
    width: dimens.PHOTOSIZE,
    borderRadius: dimens.PHOTOSIZE / 2,
    resizeMode: "cover"
  },
  noteState: {
    height: dimens.LOCATESIZE,
    width: dimens.LOCATESIZE,
    resizeMode: "contain"
  }
});
class RowResident extends React.Component {
  static propTypes = {
    data: PropTypes.any,
    handlerLoadProfile: PropTypes.func,
    handlerLoadMap: PropTypes.func
  };
  renderAvatar(data) {    
    if (data.logo != null && data.logo.length > 2) {
      return (
        <Avatar
          width={60}
          height={60}
          rounded
          activeOpacity={0.7}
          source={{
            uri: `https://s3.us-east-1.amazonaws.com/custom-user-photo/${
              data.logo
            }`
          }}
        />
      );
    } else {
      return (
        <Avatar
          width={60}
          height={60}
          rounded
          title={`${data.firstname
            .substring(0, 1)
            .toUpperCase()}${data.lastname
            .substring(0, 1)
            .toUpperCase()}`}
          activeOpacity={0.7}
        />
      );
    }
  }
  render() {
    let { data, handler } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.containerPhoto}>
        {
          this.renderAvatar(data)
        }
        </View>
        <View style={styles.containerLbl}>
          <TouchableOpacity
            key={data.id}
            onPress={() => {
              this.props.handlerLoadProfile(data.id);
            }}
          >
            <Text style={styles.textName}>{`${data.firstname} ${
              data.lastname
            }`}</Text>
            <Text style={styles.textTime}>{`Room ${data.room_id}`}</Text>
            <Text style={styles.textState}>{`Last seen in ${
              data.room_id
            }`}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerState}>
          <TouchableOpacity
            key={data.id}
            onPress={() => {
              this.props.handlerLoadMap(data.id);
            }}
          >
            <Image source={images.locateImg} style={styles.noteState} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default RowResident;
