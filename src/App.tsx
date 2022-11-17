import { Wrapper } from '@googlemaps/react-wrapper';
import { ReactElement, useEffect, useRef, useState } from 'react';
import './App.css';
import Map from './components/map';
import { Coordinates, MapProps } from './interfaces/interfaces';
import { getCoordinatesAndApiKey } from './services/map';

function App(): ReactElement {
  const defaultMapProps: MapProps = {
    center: {
      lat: 37.775, lng: -122.434
    },
    zoom: 11
  };
  const [coordinates, setCoordinates] = useState<Array<Coordinates>>(new Array<Coordinates>())
  const api_key = useRef<string>('')
  useEffect(() => {
    async function loadMap() {
      const response = await getCoordinatesAndApiKey();
      if (typeof response != 'string') {
        setCoordinates(response.coordinates);
        api_key.current = response.api_key;
      }
    }
    loadMap()
  });
  return (
    <Wrapper apiKey={api_key.current} libraries={['visualization']}  >
      <Map mapProps={defaultMapProps} coordinates={coordinates} />
    </Wrapper>
  );
}

export default App;
