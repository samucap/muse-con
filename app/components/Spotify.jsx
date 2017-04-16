import React from 'react'

const Spotify = (props) => {
  const { analyzeSpotify, user, spotify } = props

  return (
    <div className='col-xs-6'>
      { 
        user[user.searchOpts.currSrc].access_token ? '' :
          <span className='label label-primary'>
            <a href="/auth-spotify" style={{color:'white',textTransform:'uppercase'}}>Link Spotify</a>
          </span>
      }
      <div id='genresGraph'>
        <div className='header'><h3>Top Spotify Genres</h3></div>
        {
          user[user.searchOpts.currSrc].access_token ?
            <button onClick={analyzeSpotify} style={{display:'block', background:'none', border:'none'}}>
              Get Spotify Data
              <i className="fa fa-arrow-circle-right" aria-hidden="true" style={{paddingLeft:'1em'}}></i>
            </button>
          : ''
        }
        <svg></svg>
      </div>
    </div>
  )
}

export default Spotify
