import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import MainButton from '../components/MainButton'

const GameOver = (props) => {
  return (
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
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    },
    imageContainer: {
        width:300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical:30
    },
  image: {
    height: "100%",
    width: "100%",
  },
});
export default GameOver;
