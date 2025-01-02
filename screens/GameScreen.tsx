import { View, StyleSheet, Alert, Text, FlatList } from "react-native";
import Title from "../components/UI/TitleComponet";
import { useState, useEffect } from "react";
import { IGameScreen, GuessRound } from "../types/Interfaces";
import NumberContainer from "../components/Game/numberContainer";
import PrimaryButton from "../components/UI/PrimaryButton";
import { Direction } from "../types/enums";
import InstruccionText from "../components/UI/InstruccionText";
import Card from "../components/UI/Card";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/Game/GuessLogItem";

let minBoundary: number = 1;
let maxBoundary: number = 100;

function generateRandomBetween(min: number, max: number, exclude: number) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}
function GameScreen(this: any, { userNumber, onGameOver }: IGameScreen) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);
  const [guessRounds, setGuessRounds] = useState<GuessRound[]>([
    { id: 1, value: initialGuess },
  ]);

  useEffect(() => {
    if (currentGuess === userNumber) onGameOver(guessRounds.length);
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function nextGuessHandler(direction: Direction) {
    if (
      (direction === Direction.lower && currentGuess < userNumber) ||
      (direction === Direction.greater && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "I know everything...", [
        { text: "My bad", style: "cancel" },
      ]);
      return;
    }
    if (direction === Direction.lower) {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRnNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRnNumber);
    setGuessRounds((prevGuessRounds) => [
      { id: prevGuessRounds.length + 1, value: newRnNumber },
      ...prevGuessRounds,
    ]);
  }

  return (
    <View style={styles.mainScreen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess.toString()}</NumberContainer>
      <Card>
        <InstruccionText style={styles.textobjet}>
          Higer or lower
        </InstruccionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={nextGuessHandler.bind(this, Direction.lower)}
            >
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPress={nextGuessHandler.bind(this, Direction.greater)}
            >
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={({ item }) => (
            <GuessLogItem roundNumber={item.id} guess={item.value} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    padding: 24,
    alignItems: 'center'
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  textobjet: {
    marginBottom: 12,
  },
  listContainer:{
    flex:1,
    padding:16
  }
});

export default GameScreen;
