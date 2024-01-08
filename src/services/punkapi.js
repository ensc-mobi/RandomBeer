// endpoint
const rootEndpoint = "https://api.punkapi.com/v2";

// fetch for a random beer
const fetchRandomBeer = async () => {
  const response = await fetch(`${rootEndpoint}/beers/random`);
  const beers = await response.json();
  // Access first element of returned beer array
  return beers[0];
};

export default fetchRandomBeer;