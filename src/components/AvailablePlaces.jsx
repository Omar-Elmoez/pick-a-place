/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Places, Error } from "../components";
import { sortPlacesByDistance } from '../loc';
import { fetchAvailablePlaces } from "../http";
export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true)
      try {
        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {

          const { latitude: lat, longitude: lng } = position.coords;
          const sortedPlaces = sortPlacesByDistance(places, lat, lng);

          setAvailablePlaces(sortedPlaces);
          setIsFetching(false)
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setAvailablePlaces(places);
            setIsFetching(false)
          }
        })

      } catch (error) {
        setError({
          message: error.message || 'Some thing went wrong. Please try again later.',
        });
        setIsFetching(false)
      }


    }
    fetchData();
  }, []);

  if (error) {
    return <Error title="Could not fetch places" message={error.message} />
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Loading places data ..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
