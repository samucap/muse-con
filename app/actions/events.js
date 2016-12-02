import { eventLoader } from '../helpers'
import popsicle from 'popsicle'
import qString from 'query-string'

function requestEvents(options){
  return {
    type: 'REQUESTING_EVENTS',
    options
  }
}

function loadedEvents(events){
  return {
    type: 'LOADED_EVENTS',
    events
  }
}



function loadEvents(options) {
  let load = [],
      evObj = {}  
  
  return (dispatch) => {
    // signal initializing request
    dispatch(requestEvents(options))

    eventLoader(options)
      .then(resp => {
        resp.forEach((each, i) => {
          console.log('here', resp)
          let str = each.query.keyword
          let key = str.split(/\-|\s/).length === 1 ? str : str.split(/\-|\s/).map((eachWord, i) => i === 0 ? eachWord : eachWord.replace(eachWord[0], (match) => match.toUpperCase())).join('')

          evObj[key] = []
          if (each.body._embedded && each.body._embedded.events) {
            each.body._embedded.events.forEach(ev => evObj[key].push(ev))
          }
        })

        dispatch(loadedEvents(evObj))
      })
  }
}

function toggleSearchOpt (key, currState) {
  currState[key].exclude = currState[key].exclude ? false : true

  return (dispatch) => {
    dispatch({type: 'TOGGLE_SEARCH_OPT', payload: currState})
  }
}

export { loadEvents, toggleSearchOpt }
