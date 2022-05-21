import { useState } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar'

import Colors from "./constants/Colors";
import StartGameScreen from "./screens/StartGameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import GameScreen from "./screens/GameScreen";
import AppLoading from "expo-app-loading";

export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [gameIsOver, setGameisOver] = useState(true);
    const [guessRounds, setGuessRounds] = useState(0)

    const [fonstLoaded] = useFonts({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });

    if (!fonstLoaded) {
        return <AppLoading />;
    }

    function pickedNumberHandler(pickedNumber) {
        setUserNumber(pickedNumber);
        setGameisOver(false);
    }

    function gameOverHandler(numberOfRounds) {
        setGameisOver(true);
        setGuessRounds(numberOfRounds);
    }

    function StartNewGameHandler() {
        setUserNumber(null);
        setGuessRounds(0);
    }

    let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />

    if (userNumber) {
        screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>
    }

    if (gameIsOver && userNumber) {
        screen = <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={StartNewGameHandler}/>
    }

    
    
    return (
        <>
            <StatusBar style='light'/>
            <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
                <ImageBackground 
                    source={require('./assets/images/background.png')}
                    resizeMode="cover"
                    style={styles.rootScreen}
                    imageStyle={styles.backgroundImage}
                >
                    <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
                </ImageBackground>
            </LinearGradient>
        </>
    );
}

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1
    },
    backgroundImage: {
        opacity: 0.15
    }
});