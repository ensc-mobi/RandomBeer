import React, { useEffect } from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

const rootEndpoint = "https://api.punkapi.com/v2";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// Fetch a random beer from API
const getRandommBeer = () =>
  fetch(`${rootEndpoint}/beers/random`, { headers })
    .then((response) => response.json())
    .then((beers) => beers[0]) // Access first element of returned array
    .catch((error) => {
      console.error(error);
    });

const fetchRandomBeer = async () => {
  const response = await fetch(`${rootEndpoint}/beers/random`, { headers });
  const beers = await response.json();
  // Access first element of returned beer array
  return beers[0];
};

export default App = () => {
  const [loading, setLoading] = useState(true);
  const [beerName, setBeerName] = useState("");
  const [beerDescription, setBeerDescription] = useState("");

  useEffect(() => {
    const getBeer = async () => {
      const beer = await fetchRandomBeer();

      // Update state
      setBeerName(beer.name);
      setBeerDescription(beer.description);
      setLoading(false);
    };

    getBeer();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{beerName}</Text>
      <Text style={styles.description}>{beerDescription}</Text>
      {/* Add a button to fetch another beer */}
      <TouchableOpacity style={styles.button}>
        <Text>Grab a new beer!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  description: {
    marginBottom: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 3,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
