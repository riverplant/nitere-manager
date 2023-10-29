import { useState } from 'react'

import { StandaloneSearchBox, LoadScript } from '@react-google-maps/api'
import storage from '../storage'

export default function PlaceComponent() {
  const lib = ['places']
  const [searchBox, setSearchBox] = useState(null)

  const onPlacesChanged = () => {
    console.log('city:',searchBox.getPlaces()[0])
    if (searchBox !== null) {
      const address = {
        'formatted_address':searchBox.getPlaces()[0].formatted_address,
        'place_id':searchBox.getPlaces()[0].place_id,
        'city':searchBox.getPlaces()[0].vicinity,
        'url':searchBox.getPlaces()[0].url
      }
      storage.set('pickPointAddress', JSON.stringify(address))
    }
  }
  const onSBLoad = (ref : any)  => {
    setSearchBox(ref)
  }
  

  return (
    <LoadScript googleMapsApiKey='AIzaSyC153GoK1FRCh1x-lVZ3-ruujEY25-Qq9A' libraries={lib}>
      {/* Child components, such as markers, info windows, etc. */}
      <>
        <StandaloneSearchBox onPlacesChanged={onPlacesChanged} onLoad={onSBLoad}>
          <input
            placeholder='请输入提货点地址'
            aria-required='true'
            className='ant-input css-dev-only-do-not-override-12jzuas'
            type='text'
          ></input>
        </StandaloneSearchBox>
      </>
    </LoadScript>
  )
}
