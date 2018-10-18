import R from "ramda";
import { AsyncStorage } from 'react-native'
import Toast from "react-native-root-toast";
function GetTime(curdate) {
  var date, TimeType, hour, minutes, seconds, fullTime;
  date = new Date(curdate);
  hour = date.getHours();
  if (hour <= 11) {
    TimeType = "AM";
  } else {
    TimeType = "PM";
  }
  if (hour > 12) {
    hour = hour - 12;
  }
  if (hour == 0) {
    hour = 12;
  }
  minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes.toString();
  }
  fullTime =
    hour.toString() + ":" + minutes.toString() + " " + TimeType.toString();
  return fullTime;
}
function GenUUID() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}
function sortWithName(a, b) {
  if (a.firstname < b.firstname) return -1;
  if (a.firstname > b.firstname) return 1;
  return 0;
}
function sortReceiverName(a, b) {
  if (a.receiver.firstname < b.receiver.firstname) return -1;
  if (a.receiver.firstname > b.receiver.firstname) return 1;
  return 0;
}
function trim(str) {
  return str.replace(/^\s+|\s+$/gm, "");
}
function rgbaToHex(rgba) {
  var parts = rgba.substring(rgba.indexOf("(")).split(","),
    r = parseInt(trim(parts[0].substring(1)), 10),
    g = parseInt(trim(parts[1]), 10),
    b = parseInt(trim(parts[2]), 10),
    a = parseFloat(trim(parts[3].substring(0, parts[3].length - 1))).toFixed(2);

  return (
    "#" +
    r.toString(16) +
    g.toString(16) +
    b.toString(16) +
    (a * 255).toString(16).substring(0, 2)
  );
}
function onShowToast(message, callback) {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.CENTER,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    onShow: () => {
      // calls on toast\`s appear animation start
    },
    onShown: () => {
      // calls on toast\`s appear animation end.
    },
    onHide: () => {
      // calls on toast\`s hide animation start.
    },
    onHidden: () => {
      if (callback != null) callback();
    }
  });
}
function parseJSONorNot(mayBeJSON) {
  if (typeof mayBeJSON === 'string') {
      // alert(mayBeJSON);
      return JSON.parse(mayBeJSON);
  } else {
      return mayBeJSON;
  }
}

async function saveDefaultData(key,obj){
  try {
    var saveObj = JSON.stringify(obj);
    await AsyncStorage.setItem(key, saveObj);
    return true;
  } catch (error) {
    return false;  
  }
};

async function getDefaultData(key){
  try {
    const value =  await AsyncStorage.getItem(key);
    // alert(value); 
    if (value != null){
      return value;
    }else{
      return null
    }
  } catch (error) {
    return null;  
  }
};

async function removeDefaultData(key){
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;  
  }
};
export { GetTime, GenUUID, sortWithName, sortReceiverName, rgbaToHex, onShowToast , saveDefaultData , getDefaultData, removeDefaultData, parseJSONorNot};
