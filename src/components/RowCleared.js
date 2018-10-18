import React from 'react';
import { View, Text, StyleSheet, Image , TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { GetTime, GenUUID } from '../utils/utils'
import { colors ,fonts, dimens} from '../constant/constant'
import * as images from '../constant/images'
class RowCleared extends React.Component{
  static propTypes = {
      data : PropTypes.any,
      handler : PropTypes.func
  }
  onItemClicked(data){        
      if (data.note === "")  {
        Actions.push('viewCategory',{data : this.onCreateNoteModel(data), notiId : data._id});
      }else{
        Actions.push('viewWriteNote',{data : data.note, notiId : data._id})
      }    
  }
  onCreateNoteModel(data){
    return {
        _id : GenUUID(),
        createdAt : new Date().toISOString(),
        type : data.type,
        category : 0,
        content : "",
        senderid : data.sender._id,
        receiverid : data.receiver._id
    }    
  }
  onLoadNote(note)
  {      
        if (note === "") {
          return (
              <Image source={images.noteImg} style={styles.progressstate} />
          )
        }else{
          return (
             <Image source={images.noteFilledImg} style={styles.progressstate} />
          )
        }    
  }
  onLoadNotificationType(type,date){      
    switch(type){
      case  0 :
        return (
          <Text numberOfLines = {1} style={styles.texttime}>{`Nurse Call - ${GetTime(date)}`}</Text>
        )
      case 1:
        return (
          <Text numberOfLines = {1} style={styles.texttime}>{`Wandering - ${GetTime(date)}`}</Text>
        )
    }      
  }
  render() {
    let {data, handler} = this.props;
    return (
        <View style={styles.container}>
        <View style = { styles.containerphoto}>
          <Image source={{ uri: data.receiver.photo}} style={styles.photo} />
        </View>
        <View style = { styles.containerlabel}>
          <Text  numberOfLines = {1} style={styles.textname}>{`${data.receiver.firstname} ${data.receiver.lastname}`}</Text>
          { this.onLoadNotificationType(data.type, data.createdAt)}
          <Text  numberOfLines = {1} style={styles.textstate}>{ `Last seen in waiting room`}</Text>
        </View>
        <View style = { styles.containerstate}>
            <View style = { styles.containernote}>
              <TouchableOpacity onPress= {() => this.onItemClicked(data)}>
                {this.onLoadNote(data.note)}
              </TouchableOpacity>
            </View>
            <View style = { styles.containertime}>
                <Text numberOfLines = {1}  style = {styles.textnotetime}>{'26 min ago'}</Text>
            </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerphoto : {
    flex : 1,    
    alignItems : 'center',
    justifyContent : 'center'
  },
  containerlabel : {
    flex : 4,    
    flexDirection : 'column'
  },
  containerstate : {
    flex : 1.2, 
    borderLeftWidth : 0.3,
    borderLeftColor : colors.MBORDERGREY,
    flexDirection : 'column'
  },
  containernote : {
    flex : 3,
    alignItems : 'center',
    justifyContent : 'center'
  },
  containertime : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center'
  },
  textname: {
    marginLeft: 12,
    fontSize: fonts.CONTENTFSIZE,
    color : colors.MTEXT
  },
  texttime: {
    marginLeft: 12,
    fontSize: fonts.SUBCONTENTFSIZE,
    color : colors.MALERT
  },
  textnotetime: {    
    fontSize: fonts.STATEFSIZE,
    color : colors.MGREY
  },
  textstate: {
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
  notestate: {
    height: dimens.NOTESIZE,
    width: dimens.NOTESIZE,    
    resizeMode : 'contain'
  },
});

export default RowCleared;
