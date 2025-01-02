import { StatusBar } from "expo-status-bar";
import { useState,useEffect,useCallback } from "react";
import { ImageBackground, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import StartGameScreen from "./screens/StartGameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import * as SplashScreen from 'expo-splash-screen';
import {useFonts} from "expo-font"


// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();


export default function App() {

  const [userNumber, setUseNumber] = useState<number>(0);
  const[gameOver, setGameOver] = useState<boolean>(true);
  const [guessRounds,setGuessRounds] = useState<number>(0);
 
  const [loaded, error] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  function pickedNumberHandler(pickerNumber: number){
    const pickedNumber: number = typeof pickerNumber === 'string' ? parseInt(pickerNumber, 10) : pickerNumber;

    if (!isNaN(pickedNumber))
      setUseNumber(pickedNumber);
    setGameOver(false);
  }
  function gameOverHandler(numberOfRound:number){
    setGameOver(true);
    setGuessRounds(numberOfRound);
  }

function startNewGameHandler(){
  setUseNumber(0);
  setGuessRounds(0);
}


  let screen = <StartGameScreen onPickNumber={pickedNumberHandler}/>;

  if(userNumber){
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>
  }
  if(gameOver && userNumber)
    screen = <GameOverScreen userNumber={userNumber} roundNumber={guessRounds} onStartNewGame={startNewGameHandler}/>

  return (
    <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.container}
        imageStyle={styles.backGroundImage}
      >
        <SafeAreaView style={styles.container}>
          {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backGroundImage:{
    opacity: 0.15
  }
});
