import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'google-maps';

const loader = new Loader('AIzaSyAJIEf58ndN1EXgYcVCvyYsCAaR1lKEpfc', {});

const showLocation = (ele, places, google) => {
  const getLoc = (address) => {
    const g = new google.maps.Geocoder();
    return new Promise((resolve) => {
      g.geocode({ address }, (results) => {
        results.length ? resolve(results[0].geometry.location) : resolve(null);
      });
    });
  };

  const map = new google.maps.Map(ele);
  const bounds = new google.maps.LatLngBounds();
  const proms = places.map(getLoc);

  Promise.all(proms)
    .then((locs) => {
      locs.forEach((loc) => {
        if (loc !== null) {
          const latLng = new google.maps.LatLng(loc.lat(), loc.lng());
          const marker = new google.maps.Marker({
            position: latLng,
          });
          bounds.extend(latLng);
          marker.setMap(map);
        }
      });
      map.fitBounds(bounds);
      map.panToBounds(bounds);
    });
};

const Map = ({ locations }) => {
  const gmap = useRef();

  useEffect(() => {
    (async () => {
      const google = await loader.load();
      await showLocation(gmap.current, locations, google);
    })();
  }, [locations]);

  return <div className="mapContainer" ref={gmap} />;
};

Map.propTypes = {
  locations: PropTypes.array,
};

export default Map;
