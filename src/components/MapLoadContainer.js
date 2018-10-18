import ContentLoader from "react-native-content-loader";
import { Circle, Rect } from "react-native-svg";
import React, { Component } from "react";
import { View } from "react-native";
class MapLoadContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ padding: 20 }}>
        <ContentLoader
          height={500}
          width={320}
          speed={2}
        >
          <Rect x="10" y="10" rx="0" ry="0" width="100" height="100" />
          <Rect x="10" y="120" rx="0" ry="0" width="100" height="100" />
          <Rect x="10" y="230" rx="0" ry="0" width="140" height="270" />
          <Rect x="120" y="10" rx="0" ry="0" width="100" height="100" />
          <Rect x="230" y="10" rx="0" ry="0" width="100" height="120" />
          <Rect x="230" y="140" rx="0" ry="0" width="100" height="100" />
          <Rect x="230" y="250" rx="0" ry="0" width="100" height="110" />
          <Rect x="230" y="370" rx="0" ry="0" width="100" height="130" />
          <Rect x="120" y="120" rx="0" ry="0" width="100" height="100" />
          <Rect x="160" y="220" rx="0" ry="0" width="60" height="280" />
        </ContentLoader>
      </View>
    );
  }
}
export default MapLoadContainer;
