import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'google-maps';

const Map = ({ locations }) => {
  const gmap = useRef();

  const getLoc = async (google, address) => {
    const g = new google.maps.Geocoder();
    return new Promise((resolve) => {
      g.geocode({ address }, (results) => {
        results.length ? resolve(results[0].geometry.location) : resolve(null);
      });
    });
  };

  const showLocation = async (places, google) => {
    const map = new google.maps.Map(gmap.current, { zoom: 0 });
    const bounds = new google.maps.LatLngBounds();
    places.forEach(async (l) => {
      const loc = await getLoc(google, l);
      if (loc) {
        const marker = new google.maps.Marker({
          title: l,
          position: new google.maps.LatLng(loc.lat(), loc.lng()),
        });
        bounds.extend(marker.position);
        marker.setMap(map);
      }
    });
    map.fitBounds(bounds);
    map.panToBounds(bounds);
  };

  useEffect(() => {
    (async () => {
      const loader = new Loader('AIzaSyAJIEf58ndN1EXgYcVCvyYsCAaR1lKEpfc', {});
      const google = await loader.load();
      await showLocation(['Bangalore', 'M dfd d'], google);
    })();
  }, [locations]);

  return <div className="mapContainer" ref={gmap} />;
};

Map.propTypes = {
  locations: PropTypes.array,
};

export default Map;
