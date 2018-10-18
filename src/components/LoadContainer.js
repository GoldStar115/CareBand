import ContentLoader from "react-native-content-loader";
import { Circle, Rect } from "react-native-svg";
import React, { Component } from "react";
import { View } from "react-native";
class LoadContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ padding: 20 }}>
        <ContentLoader height={600} speed={2}>
          <Circle cx="30" cy="30" r="30" />
          <Rect x="75" y="13" rx="4" ry="4" width="400" height="13" />
          <Rect x="75" y="37" rx="4" ry="4" width="150" height="8" />
          <Rect x="10" y="71" rx="4" ry="4" width="500" height="8" />

          <Circle cx="30" cy="130" r="30" />
          <Rect x="75" y="113" rx="4" ry="4" width="400" height="13" />
          <Rect x="75" y="137" rx="4" ry="4" width="150" height="8" />
          <Rect x="10" y="171" rx="4" ry="4" width="500" height="8" />

          <Circle cx="30" cy="230" r="30" />
          <Rect x="75" y="213" rx="4" ry="4" width="400" height="13" />
          <Rect x="75" y="237" rx="4" ry="4" width="150" height="8" />
          <Rect x="10" y="271" rx="4" ry="4" width="500" height="8" />

          <Circle cx="30" cy="330" r="30" />
          <Rect x="75" y="313" rx="4" ry="4" width="400" height="13" />
          <Rect x="75" y="337" rx="4" ry="4" width="150" height="8" />
          <Rect x="10" y="371" rx="4" ry="4" width="500" height="8" />

          <Circle cx="30" cy="430" r="30" />
          <Rect x="75" y="413" rx="4" ry="4" width="400" height="13" />
          <Rect x="75" y="437" rx="4" ry="4" width="150" height="8" />
          <Rect x="10" y="471" rx="4" ry="4" width="500" height="8" />
        </ContentLoader>
      </View>
    );
  }
}
export default LoadContainer;
