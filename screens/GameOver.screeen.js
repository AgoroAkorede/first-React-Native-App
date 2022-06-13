import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import MainButton from "../components/MainButton";

const GameOver = (props) => {
  return (
      <ScrollView>
        <View style={styles.screen}>
          <Text>The Game is Over</Text>
          <View style={styles.imageContainer}>
            {/* <Image
          source={require("../assets/sucess.png")}
          styles={styles.image}
          resizeMode="contain"
        /> */}
          </View>

          <Text>Number of rounds:{props.roundsNumber}</Text>
          <Text>Number:{props.userNumber}</Text>
          <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  imageContainer: {
    width: Dimensions.get("window").width * 0.7,
    // height: 300,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 20,
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
export default GameOver;
