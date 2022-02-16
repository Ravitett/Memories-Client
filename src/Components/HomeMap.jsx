import React from 'react'
import { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

import { getAllMemories } from '../Api/memories';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 32.080511,
  lng: 34.797230
};

function HomeMap({MarkerList,setMenory}) {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyB0sVU1dc_59ltSfG1DzNx6Udht0L8iox8"
  })

  const [data, setData] = useState([]);

  useEffect(async () => {
    let dataFromApi = await getAllMemories();
    setData(dataFromApi);
  },[]);

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={7}
        onClick={(e)=>{
          console.log(e.latLng.lat());
          console.log(e.latLng.lng());
        }}
      >
        <>
          {data && data.map(m => <Marker key={m._id} position={m.location} onClick={() => {
            setMenory(m._id);
          }}/>)}  
        </>
      </GoogleMap>
  ) : <></>
}

export default React.memo(HomeMap)
