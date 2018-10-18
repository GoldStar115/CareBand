import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import {GetTime} from '../utils/utils'
import * as constantVal from "../constant/constant";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
  },
  textTime: {
    flex :1,  
    textAlign : 'center',
    fontSize: constantVal.fonts.SUBCONTENTFSIZE,
    color : constantVal.colors.MGREY
  },
  textPercent: {  
    flex :1,  
    textAlign: 'center',
    fontSize: constantVal.fonts.SUBCONTENTFSIZE,
    color : constantVal.colors.MTEXT
  },
});
class RowBattery extends React.Component{
  static propTypes = {
      data : PropTypes.any      
  }
  render(){
    let {data} = this.props;
    return(
      <View style={styles.container}>
            <Text style={styles.textPercent}>{`${data.battery} %`}</Text>
            <Text style={styles.textTime}>{`Today ${GetTime(data.server_time)}`}</Text>
      </View>
    )
  }
}
export default RowBattery;
