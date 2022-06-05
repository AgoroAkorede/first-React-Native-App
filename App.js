import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState("");
  const [courseGoals, setCourseGoals] = useState([]);
  function goalInputHandler(enteredText) {
    setEnteredGoal(enteredText);
  }
  const addGoalHandler = () => {
    setCourseGoals((currentGoals) => [ ...currentGoals, enteredGoal ]);
  };
  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Course Goal"
          style={styles.input}
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />
        <Button title="ADD" onPress={addGoalHandler} />
      </View>
      <View>
        {courseGoals.map((goal) => (
          <View style={styles.listItem}>
            <Text key={goal}>{goal}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  input: {
    borderColor: "black",
    width: 200,
    borderWidth: 1,
    padding: 10,
  },
  listItem: {
    padding: 10,
    marginVertical:10,
    backgroundColor: "#ccc",
    borderWidth: 1,
    borderColor:"black"
  }
});
