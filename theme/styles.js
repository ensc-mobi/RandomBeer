import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default styles;
