import React, { useEffect } from 'react'
import { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoBox } from '@react-google-maps/api';

import Alert from '@mui/material/Alert';

function UserMap({ location, setLocation }) {

  const center = {
    lat: 32.080511,
    lng: 34.797230
  };

  const centerInfoBox = {
    lat: 33.04929389618427,
    lng: 32.39122414062499
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyB0sVU1dc_59ltSfG1DzNx6Udht0L8iox8"
  })

  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (location) setMarker(location)
  })

  const containerStyle = {
    width: '100%',
    height: '100%',
    border: marker ? "green solid 3px" : "red solid 3px"
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={7}
      onClick={(e) => {
        console.log({
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        });
        setMarker({
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        });
        setLocation({
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        })
      }}
    >
      <>
        {!marker && <InfoBox
          position={centerInfoBox}
        >
          <Alert severity="error">נא למקם את הזיכרון על המפה!</Alert>
        </InfoBox>}
        {marker && <Marker position={marker} />}
      </>
    </GoogleMap>
  ) : <></>
}

export default React.memo(UserMap)
