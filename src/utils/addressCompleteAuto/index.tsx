import { useState } from 'react'
import { StandaloneSearchBox, LoadScript } from '@react-google-maps/api'
import storage from '../storage'

export default function PlaceComponent() {
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox >()

  const onPlacesChanged = () => {
    console.log('searchBox:',searchBox)
    if (searchBox ) {
      const result = searchBox.getPlaces()
      if( result instanceof Array ) {
        const address = {
          'formatted_address':result[0].formatted_address,
          'place_id':result[0].place_id || '',
          'city':result[0].vicinity || '',
          'url':result[0].url || ''
        }
        storage.set('pickPointAddress', JSON.stringify(address))
      }
       
    }
  }
  const onSBLoad = (ref : google.maps.places.SearchBox)  => {
    setSearchBox(ref)
  }
  

  return (
    <LoadScript googleMapsApiKey='AIzaSyC153GoK1FRCh1x-lVZ3-ruujEY25-Qq9A' libraries={["places"]}>
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
