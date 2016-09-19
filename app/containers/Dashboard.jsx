import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import EventContain from './EventContain'
import * as actionCreators from '../actions'
import { bindActionCreators } from 'redux'

class Dashboard extends Component{
  render(){
    return (
      <div>
        <h1>Wilkommen</h1>
        <h4>Search your venue</h4>
        
      </div>
    )
  }

  querySearch (e) {
  }
}


const mapStateToProps = (state) => ({
  text: state.reducer.text
})

const mapDispatchToProps = (dispatch) => ({
  doAuth: bindActionCreators(actionCreators, dispatch)
})

//function mapDispatchToProps(dispatch){
//  return () => {
//    dispatch(
//  }
//}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
