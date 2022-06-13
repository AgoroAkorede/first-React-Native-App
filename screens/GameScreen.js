import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {ScreenOrientation} from 'expo'

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import Colors from "../constants/colors";
import MainButton from "../components/MainButton";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <Text style={styles.text}>#{listLength - itemData.index}</Text>
    <Text style={styles.text}>{itemData.item}</Text>
  </View>
);

const GameScreen = (props) => {
  // ScreenOreintation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)

  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [ pastGuess, setPastGuesses ] = useState([ initialGuess.toString() ]);
  const [ availableDeviceWidth, setAvailableDeviceWidth ] = useState(Dimensions.get('window').width)
  const [ availableDeviceHeight, setAvailableDeviceHeight ] = useState(Dimensions.get('window').height)
  

  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const { userChoice, onGameOver } = props;
  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width);
      setAvailableDeviceHeight(Dimensions.get('window').height);
    }
    Dimensions.addEventListener('change', updateLayout)

    return () => {
      Dimensions.removeEventListener('change',updateLayout)
    }
  });

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      onGameOver(pastGuess.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );

    setCurrentGuess(nextNumber);
    // setRounds((curRounds) => curRounds + 1);
    setPastGuesses((curPastGuess) => [nextNumber.toString(), ...curPastGuess]);
  };

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text>Opponent's Guess</Text>
        <View style={styles.controls}>
          <MainButton
            // style={styles.button}
            onPress={nextGuessHandler.bind(this, "lower")}
          >
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={nextGuessHandler.bind(this, "higher")}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            keyExtractor={(item) => item}
            data={pastGuess}
            renderItem={renderListItem.bind(this, pastGuess.length)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>

      <Card>
        <View style={styles.buttonContainer}>
          <MainButton
            // style={styles.button}
            onPress={nextGuessHandler.bind(this, "lower")}
          >
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
          <MainButton onPress={nextGuessHandler.bind(this, "higher")}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </View>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuess.map((guess, index) => renderListItem(guess, pastGuess.length-index))}
        </ScrollView> */}
        <FlatList
          keyExtractor={(item) => item}
          data={pastGuess}
          renderItem={renderListItem.bind(this, pastGuess.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 20,
    // width: 400,
    width: Dimensions.get("window").width > 350 ? 400 : 275,
    // maxWidth: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  button: {
    color: Colors.accent,
  },
  listItem: {
    borderColor: "#ccc",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    borderWidth: 1,
    justifyContent: "space-between",
    width: "100%",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
  },
  listContainer: {
    width: Dimensions.get("window").width > 350 ? "60%" : "30%",
    flex: 1,
  },
  text: {
    marginHorizontal: 15,
  },
  list: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems:"center",
    width:'80%'
  }
});
export default GameScreen;
