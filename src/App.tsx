import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { ReactElement, useEffect, useState } from 'react';
import './App.css';
import Map from './components/map';
import { CoordinatesAndAPIKeyResponse, MapProps } from './interfaces/interfaces';
import { getCoordinatesAndApiKey } from './services/mapService';

function App(): ReactElement {
  const defaultMapProps: MapProps = {
    center: {
      lat: -1.3460634739251633, lng: -78.56483353462201
    },
    zoom: 11
  };
  const defaultCoordinatesApiKey: CoordinatesAndAPIKeyResponse = {
    api_key: "",
    coordinates: []
  }
  const [coordinatesApiKey, setCoordinatesApiKey] = useState<CoordinatesAndAPIKeyResponse>(defaultCoordinatesApiKey);
  useEffect(() => {
    async function loadMap() {
      const response = await getCoordinatesAndApiKey();
      if (typeof response != 'string') {
        setCoordinatesApiKey((prev) => response);
      }
    }
    loadMap()
  }, [coordinatesApiKey]);
  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };
  return (
    <>
      {coordinatesApiKey.api_key !== "" &&
        <Wrapper apiKey={coordinatesApiKey?.api_key} libraries={['visualization']} render={render}  >
          <Map mapProps={defaultMapProps} coordinates={coordinatesApiKey?.coordinates} />
        </Wrapper>
      }
    </>
  );
}

export default App;
