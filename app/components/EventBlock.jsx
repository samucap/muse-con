import React from 'react'
import { keyMaker } from '../helpers'

const EventBlock = (props) => {
  let { events } = props
  let labels = Object.keys(events)

  let prettyDate = (date, ref?) => {
    let currDate = moment()
    console.log('date', typeof date)

    console.log(`plis::${date}, curr::${currDate}`)
    if (date) {
      if (date.search(/:/) == -1) {
        if (ref == 'date') return moment(date).format('Do')
        else if (ref == 'month') return moment(date).format('MMM')
      } else return moment().hour(date).format('h A')
    }
  }
  
  return (
    <div className='col-sm-9 col-sm-offset-3'>
      {
        labels.map(key => 
          <div key={key}>
            <h3>{key}</h3>
            <section key={key} id={key} className='container-fluid group'>
              { 
                events[key].map((eachEv, i) => 
                  <div key={`${key}${i}`} id={`${key}${i}`} className='subgroup'>
                    <div className='ev-img-contain'>
                      <img src={eachEv.images.find(ea => ea.ratio == '3_2' || ea.ratio == '4_3').url} />
                    </div>
                    <div className='ev-info'>
                      <h5>{eachEv.name}</h5>
                      <h4>{prettyDate(eachEv.dates.start.localDate, 'month')}, {prettyDate(eachEv.dates.start.localDate, 'date')}</h4>
                      <h4>{prettyDate(eachEv.dates.start.localTime)}</h4>
                      <p>Where: {eachEv._embedded.venues && eachEv._embedded.venues.length > 0 ? `${eachEv._embedded.venues[0].name}` : ''}</p>
                      {
                        eachEv.priceRanges && eachEv.priceRanges[0] ?
                          <p>{eachEv.priceRanges[0]['min'].toLocaleString(eachEv.priceRanges[0]['currency'], {style:'currency', currency:eachEv.priceRanges[0]['currency']})} - {eachEv.priceRanges[0]['max'].toLocaleString(eachEv.priceRanges[0]['currency'], {style:'currency', currency:eachEv.priceRanges[0]['currency']})}</p>
                          : ''
                      }

                      <a key={i} target='_blank' href={eachEv.url}>Buy Tickets</a>
                    </div>
                  </div>
                ) 
              } 
            </section>
          </div>
        )
      }
    </div>
  )
}

export default EventBlock

