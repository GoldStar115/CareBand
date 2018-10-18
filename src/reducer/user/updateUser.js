import * as types from "../../actions/user/type";

const initState = {
  isLoading: false,
  isUpdateUser: false,
  UpdateUserError: null,
  isUploadPhoto: false,
  UploadPhotoError: null,
  UploadedPhoto : null
};
export default (state = initState, action = {}) => {
  switch (action.type) {
    case types.UPDATE_USER:
      return Object.assign({}, state, {
        isLoading: true,
        isUpdateUser: true,
        UpdateUserError: null,        
        isUploadPhoto: false,
        UploadPhotoError: null,
        UploadedPhoto : null
      });
    case types.UPDATE_USER_SUCCESS:      
      return Object.assign({}, state, {
        isLoading: false,
        isUpdateUser: true,
        UpdateUserError: null,
        isUploadPhoto: false,
        UploadPhotoError: null,
        UploadedPhoto : null
      });
    case types.UPDATE_USER_FAILURE:      
      return Object.assign({}, state, {
        isLoading: false,
        isUpdateUser: true,
        UpdateUserError: action.error,
        isUploadPhoto: false,
        UploadPhotoError: null,
        UploadedPhoto : null
      });
    case types.UPLOAD_PHOTO:
      return Object.assign({}, state, {
        isLoading: true,
        isUpdateUser: false,
        UpdateUserError: null,
        isUploadPhoto: false,
        UploadPhotoError: null,
        UploadedPhoto : null
      });
    case types.UPLOAD_PHOTO_SUCCESS:            
      return Object.assign({}, state, {
        isLoading: false,
        isUpdateUser: false,
        UpdateUserError: null,
        isUploadPhoto: true,
        UploadPhotoError: null,
        UploadedPhoto : action.picture
      });
    case types.UPLOAD_PHOTO_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        isUpdateUser: false,
        UpdateUserError: null,
        isUploadPhoto: true,
        UploadPhotoError: null,
        UploadedPhoto : action.picture
      });
    default:
      return state;
  }
}