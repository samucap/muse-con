import popsicle from 'popsicle'
import * as actions from '../actions'
import qString from 'query-string'

function popWrap (...args) {
  let optsArr = ['method', 'url', 'body'],
      opts = {}

  optsArr.forEach((each, i) => {
    opts[each] = args[i]
  })

  return popsicle(opts)
}

function locateUser (currUser) {

  return new Promise(resolve => {
    let latLong,
        userObj,
        opts = {
          method: 'put',
          url: '/api/users'
        }

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        latLong = {
          lat: pos.coords.latitude,
          long: pos.coords.longitude
        }
        userObj = Object.assign(currUser, latLong)

        opts.body = latLong

        popsicle(opts)
          .then(res => resolve(res.body))
      })
    }
  })
}

function eventLoader (userAuth) {
  let latLong = `${userAuth.lat},${userAuth.long}`,
      qParams,
      opts,
      reqsArr = []

  qParams = userAuth.searchOpts
  qParams.apikey = process.env.TICKETMASTER_KEY
  qParams.radius = 50

  userAuth[userAuth.searchOpts.currSrc][userAuth.searchOpts.by].forEach((each, i) => {
    if (i < 3) {
      qParams.keyword = each.name

      opts = {
        method: 'GET',
        url: `${process.env.TICKETMASTER_URL}/events.json?${qString.stringify(qParams)}`
      }

      reqsArr.push(popsicle(opts))
    } 
  })

  return Promise.all(reqsArr)
}

// first check for - or \s, if one word cool.tolowercase, but if more than one word, take every word after the first and capitalize and then join that arr 
const keyMaker = (str) => str.split(/\-|\s/).length === 1 ? str.toLowerCase() : str.split(/\-|\s/).map((each, i) => i === 0 ? each.toLowerCase() : each.replace(each[0], (match) => match.toUpperCase())).join('')

export { popWrap, locateUser, eventLoader, keyMaker }
