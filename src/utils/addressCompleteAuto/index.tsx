import React, { useState } from 'react'

import { StandaloneSearchBox, LoadScript } from '@react-google-maps/api'
import storage from '../storage'

export default function PlaceComponent() {
  const lib = ['places']
  const [searchBox, setSearchBox] = useState(null)

  const onPlacesChanged = () => {
    if (searchBox !== null) {
      storage.set('pickPointAddress', searchBox.getPlaces()[0].formatted_address)
      console.log(searchBox.getPlaces()[0].formatted_address)
    }
  }
  const onSBLoad = ref => {
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
