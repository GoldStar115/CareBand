import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { GetTime } from '../utils/utils'
import { colors ,fonts, dimens} from '../constant/constant'
import * as images from '../constant/images'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerPhoto : {
    flex : 1,    
    alignItems : 'center',
    justifyContent : 'center'
  },
  containerLabel : {
    flex : 3,    
    flexDirection : 'column'
  },
  containerLocate : {
    flex  : 1,    
    alignItems : 'center',
    justifyContent : 'center'
  },
  containerState : {
    flex : 1,
    borderLeftWidth : 0.5,
    borderLeftColor : colors.MBORDERGREY,
    flexDirection : 'column',
    alignItems : 'center',
    justifyContent : 'center'
  },
  stateImg : {
    flex : 3,
    alignItems : 'center',
    justifyContent : 'center'
  },
  stateTitle : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center'
  },
  textName: {
    marginLeft: 12,
    fontSize: fonts.CONTENTFSIZE,
    color : colors.MTEXT
  },
  textTime: {
    marginLeft: 12,
    fontSize: fonts.SUBCONTENTFSIZE,
    color : colors.MALERT
  },
  textState: {
    marginLeft: 12,
    fontSize: fonts.TIMEFSIZE,
    color : colors.MGREY
  },
  photo: {
    height: dimens.PHOTOSIZE,
    width: dimens.PHOTOSIZE,
    borderRadius: dimens.PHOTOSIZE/2,
    resizeMode : 'cover'
  },
  locatestate: {
    height: dimens.LOCATESIZE,
    width: dimens.LOCATESIZE,    
    resizeMode : 'contain'
  },
  progressstate: {
    height: dimens.ACTIVESIZE,
    width: dimens.ACTIVESIZE,    
    resizeMode : 'contain'
  },
});
class RowActive extends React.Component{
    static propTypes = {
        data : PropTypes.any,
        statusHandler : PropTypes.func,
        locateHandler : PropTypes.func
    }
    onLoadProgressImg(status)
    {
        switch(status){
          case  0 :
            return (              
                <Image source={images.progressImg} style={styles.progressstate} />
            )
          case 1:
            return (
               <Image source={images.acceptImg} style={styles.progressstate} />
            )
          case 2:
            return (
               <Image source={images.cleardImg} style={styles.progressstate} />
            )
        }
    }
    onLoadProgressTitle(status)
    {
        switch(status){
          case  0 :
            return (              
               <Text numberOfLines = {1} style={{fontSize : fonts.STATEFSIZE - 1, color : colors.MYELLOW}}>Progress</Text>
            )
          case 1:
            return (
               <Text numberOfLines = {1} style={{fontSize : fonts.STATEFSIZE - 1,  color : colors.MGREEN}}>Accept</Text>
            )
          case 2:
            return (
               <Text numberOfLines = {1} style={{fontSize : fonts.STATEFSIZE - 1, color : colors.MGREEN}}>Cleared</Text>
            )
        }
    }
    onLoadNitoficationType(type,date){      
      switch(type){
        case  0 :
          return (
            <Text numberOfLines = {1} style={styles.textTime}>{`Nurse Call - ${GetTime(date)}`}</Text>
          )
        case 1:
          return (
            <Text numberOfLines = {1} style={styles.textTime}>{`Wandering - ${GetTime(date)}`}</Text>
          )
      }      
    }

   render(){
      let {data, handler} = this.props;
      return(
          <View style={styles.container}>
            <View style = { styles.containerPhoto}>
              <Image source={{ uri: data.receiver.photo}} style={styles.photo} />
            </View>
            <View style = { styles.containerLabel}>
              <Text numberOfLines = {1} style={styles.textName}>{`${data.receiver.firstname} ${data.receiver.lastname}`}</Text>
              { this.onLoadNitoficationType(data.type, data.createdAt)}
              <Text numberOfLines = {1} style={styles.textState}>{ `Last seen in waiting room`}</Text>
            </View>
            <View style = { styles.containerLocate}>
            <TouchableOpacity onPress = {() => this.props.locateHandler(data)}>
              {
                data.type === 1 ? <Image source={images.locateImg} style={[styles.locatestate, {display : 'flex'}]} /> : <Image source={images.locateImg} style={[styles.locatestate, {display : 'none'}]} />
              }            
              </TouchableOpacity>    
            </View>
            <View style = { styles.containerState}>            
                <TouchableOpacity onPress = {() => this.props.statusHandler(data)}>
                 <View style = {styles.stateImg}>
                  {
                      this.onLoadProgressImg(data.status)
                  }
                  </View>
                  <View style = {styles.stateTitle}>
                    {
                      this.onLoadProgressTitle(data.status)
                    }
                  </View>
                </TouchableOpacity>                        
            </View>      
        </View>
      )
   }
}

export default RowActive
