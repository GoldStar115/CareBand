import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import {GetTime} from '../utils/utils'
import * as constantVal from "../constant/constant";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'column',
  },

  containerNote : {
    flex : 1,    
    alignItems : 'flex-start',
    justifyContent : 'center'
  },
  containerState : {
    flex : 1,
    flexDirection : 'row',    
  },
  subContainerDate : {
    flex :2,    
    alignItems : 'flex-start',
    justifyContent : 'center'
  },
  subContainerPlace : {
    flex : 3,    
    alignItems : 'flex-start',
    justifyContent : 'center'
  },


  textName: {
    width : constantVal.dimens.DEV_WIDTH - 30,
    marginLeft: 12,
    fontSize: constantVal.fonts.CONTENTFSIZE,
    color : constantVal.colors.MTEXT
  },
  textTime: {
    marginLeft: 12,  
    fontSize: constantVal.fonts.SUBCONTENTFSIZE,
    color : constantVal.colors.MALERT
  },
  textState: {  
    marginLeft: 12,  
    fontSize: constantVal.fonts.SUBCONTENTFSIZE,
    color : constantVal.colors.MGREY
  },
});

class RowNote extends React.Component{
  static propTypes = {
      data : PropTypes.any,
      handler : PropTypes.func
  }
  render(){
    let { data } = this.props
    return (
        <View style={styles.container}>
        <View style ={styles.containerNote}>
            <Text style={styles.textName} numberOfLines = {1}>{data.counter}</Text>
        </View>
        <View style ={styles.containerState}>
            <Text style={styles.textState}>{`Today ${GetTime(data.server_time)}`}</Text>
            <Text style={[styles.textTime ,{display : 'flex'}]}>{ `Wandering alert`}</Text>
        </View>
      </View>
    )
  }

}

export default RowNote;
