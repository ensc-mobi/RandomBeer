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

// fetch API for a random beer
const fetchRandomBeer = async () => {
  const response = await fetch(`${rootEndpoint}/beers/random`, { headers });
  const beers = await response.json();
  // Access first element of returned beer array
  return beers[0];
};

export default App = () => {
  // Define state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [beerName, setBeerName] = useState("");
  const [beerDescription, setBeerDescription] = useState("");

  // Load a new beer
  const loadBeer = async () => {
    setLoading(true);
    setError(false);

    try {
      const beer = await fetchRandomBeer();

      // Update state
      setBeerName(beer.name);
      setBeerDescription(beer.description);
    } catch (e) {
      setError(true);
    }

    setLoading(false);
  };

  // The empty array [] prevents the effect from running at each re-render
  useEffect(() => {
    loadBeer();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Something went wrong :\</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{beerName}</Text>
      <Text style={styles.description}>{beerDescription}</Text>
      {/* Add a button to fetch another beer */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          loadBeer();
        }}
      >
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
    margin: 30,
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
