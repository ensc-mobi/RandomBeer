// endpoint
const rootEndpoint = "https://punkapi-alxiw.amvera.io/v3";

// fetch for a random beer
export const fetchRandomBeer = async () => {
  const response = await fetch(`${rootEndpoint}/beers/random`);
  const beer = await response.json();
  // Access first element of returned beer array
  return beer;
};

export const getImageUrl = (image) => `${rootEndpoint}/images/${image}`;