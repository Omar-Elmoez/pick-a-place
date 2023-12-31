export async function fetchAvailablePlaces() {
  const response = await fetch("https://pick-a-place-8yuf.onrender.com/places");
  const data = await response.json();

  if(!response.ok) {
    throw new Error('Could not fetch places.');
  }

  return data.places;
}
export async function fetchUserPlaces() {
  const response = await fetch("https://pick-a-place-8yuf.onrender.com/user-places");
  const data = await response.json();

  if(!response.ok) {
    throw new Error('Could not fetch user places.');
  }

  return data.places;
}

export async function updateUserPlaces(places) {

  const response = await fetch("https://pick-a-place-8yuf.onrender.com/user-places", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ places }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error('Could not update user places.');
  }

  return data.message;
}