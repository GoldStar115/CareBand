import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import MapView, { Marker, ProviderPropType } from 'react-native-maps';
import * as constVal from '../constant/constant'

const ASPECT_RATIO = constVal.dimens.DEV_WIDTH / constVal.dimens.DEV_HEIGHT;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

class DefaultMarkers extends React.Component {
  static propTypes = {
     data : PropTypes.any
  }
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [],
    };
  }
  componentWillMount(){    
    this.onCreateMarkers(this.props.data);
  }
  onCreateMarkers(data) {
    var markerdata = [];
    data.forEach(row => {
      markerdata.push(
        {
          coordinate: {
            latitude: Number(row.location.split(',')[0]),
            longitude: Number(row.location.split(',')[1]),
          },
          key: row._id,
          color: randomColor(),
        }
      );
    })
    this.setState({
      markers: markerdata
    });    
  }
  
  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={this.state.region}>

          {this.props.data.map(row => (            
            <Marker
              key={row._id}
              coordinate={{
                latitude: Number(row.location.split(',')[0]),
                longitude: Number(row.location.split(',')[1]),
              }}
              pinColor={randomColor()}
            />
          ))}
        </MapView>       
      </View>
    );
  }
}

DefaultMarkers.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    flex : 1,
    flexDirection : 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: constVal.colors.MBORDERBOTTOM,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

export default DefaultMarkers;
