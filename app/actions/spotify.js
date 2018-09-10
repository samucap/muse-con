import { push, routerActions } from 'react-router-redux'
import urlLib from 'url'
import qString from 'query-string'
import rp from 'request-promise'
import alertify from 'alertify.js'
import { popWrap } from '../helpers'
import { userUpdate } from './user'
import config from '../app.config'

const BASE_PATH = urlLib.format(config.app.api);

function analyzeSpotify (user) {
  return (dispatch) => {
    popWrap({ 
      method: 'GET',
      url: `${BASE_PATH}/users/${user._id}/evalSpotify`,
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      }
    }, dispatch)
    .then((resp) => {
      user.thirdParties[0] = resp;
      dispatch(userUpdate(user));
    });
  }
}

export { analyzeSpotify }
