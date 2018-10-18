import { Auth, Storage } from "aws-amplify";
import * as types from "./type";
import { getCurUserAction } from './getuser';
import { onShowToast } from "../../utils/utils";
// Actions
Storage.configure({level : 'protected'});
function updateUser() {
  return {
    type: types.UPDATE_USER
  };
}
function updateUserSuccess() {
  return {
    type: types.UPDATE_USER_SUCCESS    
  };
}
function updateUserFailed(error) {
  return {
    type: types.UPDATE_USER_FAILURE,
    error
  };
}
//////////////////
function uploadPhoto() {
  return {
    type: types.UPLOAD_PHOTO
  };
}
function uploadPhotoSuccess(picture) {
  return {
    type: types.UPLOAD_PHOTO_SUCCESS,
    picture
  };
}
function uploadPhotoFailed(error) {
  return {
    type: types.UPLOAD_PHOTO_FAILURE,
    error
  };
}
/////////////////////////
export const updateUserInfo = currentUser => async dispatch => {
  try {    
    dispatch(updateUser());
    const user = await Auth.currentAuthenticatedUser();
    Auth.updateUserAttributes(user, {
      email: currentUser.email,
      phone_number: currentUser.phone_number,
      picture: currentUser.picture,
      family_name: currentUser.lastname,
      name: currentUser.firstname,
      updated_at: new Date().getTime().toString(),
      'custom:facility_id' : currentUser.facility_id
    })
      .then(data => {
        dispatch(updateUserSuccess()); 
        dispatch(getCurUserAction());           
      })
      .catch(updateError => {
        dispatch(updateUserFailed(updateError));
      });
  } catch (catchError) {
    dispatch(updateUserFailed(catchError));
  }
};

export const uploadUserPicture = file => async dispatch => {
  dispatch(uploadPhoto());
  Storage.put(file.name, file.source, {
    level: "public",
    contentType: file.type
  })
    .then(resultPut => {         
      dispatch(uploadPhotoSuccess(resultPut.key)); 
    })
    .catch(catchError => {
      dispatch(uploadPhotoFailed(catchError));
    });
};
