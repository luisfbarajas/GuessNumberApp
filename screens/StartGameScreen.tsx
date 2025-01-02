import { TextInput, View, StyleSheet, Alert, Dimensions, useWindowDimensions } from "react-native";
import { useState } from "react";
import PrimaryButton from "../components/UI/PrimaryButton";
import { IStarGame } from "../types/Interfaces";
import Colors from "../constants/colors";
import Title from "../components/UI/TitleComponet";
import Card from "../components/UI/Card";
import InstruccionText from "../components/UI/InstruccionText";

function StartScreen({ onPickNumber }: IStarGame) {
  const [enteredNumber, setEnteredNumber] = useState<string>("");

  const {width, height} = useWindowDimensions();

  function numberInputHandler(input: string) {
    setEnteredNumber(input);
  }
  function resetInputHandler() {
    setEnteredNumber("");
  }

  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      //show alert...
      Alert.alert(
        "Invalid number",
        "Number has to be a number between 1 and 99.",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }
    onPickNumber(chosenNumber);
  }

  const marginTop = height < 380 ? 30: 100;
  return (
    <View style={[styles.rootContainer,{marginTop: marginTop}]}>
      <Title >Guess my number!</Title>

      <Card>
        <InstruccionText>Enter a number!</InstruccionText>
        <TextInput
          style={styles.inputNumber}
          maxLength={2}
          keyboardType="number-pad"
          autoCapitalize="none"
          scrollEnabled={false}
          autoCorrect={false}
          value={enteredNumber}
          onChangeText={numberInputHandler}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={confirmInputHandler}>Confimr</PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
}

export default StartScreen;

const deviceHeigth = Dimensions.get("window").height;

const styles = StyleSheet.create({
  rootContainer:{
    flex:1,
    alignItems: 'center'
  },
  inputNumber: {
    height: 58,
    width: 50,
    fontSize: 30,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  }
});
