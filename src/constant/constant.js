 import { Dimensions } from 'react-native'
 const MBLUE = '#3eb8be';
 const MTAB = '#d7d8d8';
 const MALERT = '#c22e5a';
 const MGREEN = '#4bad52';
 const MYELLOW = '#f4b669';
 const MTEXT = '#334954';
 const MGREY = '#b4b4b4';
 const MBORDERGREY = '#e7e7e7';
 const MBORDERBOTTOM = '#c3c3c3'
 const MTHEME = '#f5f5f5'
 const MWHITE = '#ffffff'
 const MOVERLAY = "rgba(62, 184, 190,0.25)"

 const TITLEFSIZE = 24;
 const TABFSIZE = 15;
 const CONTENTFSIZE = 17;
 const SUBCONTENTFSIZE = 15;
 const TIMEFSIZE = 13;
 const STATEFSIZE = 12;

 const NAVHEIGHT = 74;
 const TABHEIGHT = 44;
 const PHOTOSIZE = 55;
 const ICONSIZE = 50;
 const LOCATESIZE = 45;
 const NOTESIZE = 50;
 const ACTIVESIZE = 35;
 const PROFILEPHOTOSIZE = 120;
 const MARGINSIZE = 40;
 const DEV_WIDTH = Dimensions.get('window').width;
 const DEV_HEIGHT = Dimensions.get('window').height;

 const USERID = "USERID";
 const ACCESSTOKEN = "ACCESSTOKEN";
 const USERMODEL = 'USERMODEL'
 const COGNITOUSER = 'COGNITOUSER'

 const user = {
    _id: "09CEE95A-ED9B-CE04-6618-207F1E8404E0",
    firstname: "Phillip",
    lastname: "Tanek",
    email: "test@gmail.com",
    password: "123456",
    photo: "https://randomuser.me/api/portraits/men/4.jpg"
};

 const strings = {
     USERID,
     ACCESSTOKEN,
     USERMODEL,
     COGNITOUSER
 }
 const colors = {
    MBLUE,
    MBLUE,
    MTAB,
    MALERT,
    MGREEN,
    MYELLOW,
    MTEXT,
    MGREY,
    MBORDERGREY,
    MBORDERBOTTOM,
    MTHEME,
    MWHITE,
    MOVERLAY
 }

 const fonts = {
     TITLEFSIZE,
     TABFSIZE,
     CONTENTFSIZE,
     SUBCONTENTFSIZE,
     STATEFSIZE,
     TIMEFSIZE,
     
 }

 const dimens = {
    NAVHEIGHT,
    TABHEIGHT,
    PHOTOSIZE,
    PROFILEPHOTOSIZE,
    ICONSIZE,
    LOCATESIZE,
    NOTESIZE,
    ACTIVESIZE,
    DEV_WIDTH,
    DEV_HEIGHT,
    MARGINSIZE
 }
 export {
    colors, fonts, dimens, strings, user
 }
