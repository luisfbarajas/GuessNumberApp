import { Text, View, Image, StyleSheet, Dimensions } from "react-native";
import Title from "../components/UI/TitleComponet";
import Colors from "../constants/colors";
import PrimaryButton from "../components/UI/PrimaryButton";
function GameOVerScreen({roundNumber, userNumber, onStartNewGame}:{roundNumber:number,userNumber:number,onStartNewGame:()=> void}){
    return (<View style={styles.rootContainer}>
        <Title>Game Over!</Title>
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={require("../assets/images/image.png")} />
        </View>
        <Text style={styles.summaryText}>Your phone needed <Text style={styles.highligth}>{roundNumber}</Text> rounds to guess the number <Text style={styles.highligth}>{userNumber}</Text>.</Text>
        <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
    </View>
    );
}
export default GameOVerScreen;
const deviceWithd = Dimensions.get('window').width;
const styles = StyleSheet.create({
    imageContainer: {
        borderRadius:deviceWithd < 380? 75:150,
        width:deviceWithd < 380? 150:300,
        height:deviceWithd < 380? 150:300,
        borderWidth:3,
        borderColor: Colors.primary800,
        overflow:'hidden',
        margin:36
    },
    image:{
        width:'100%',
        height:'100%'
    },
    rootContainer:{
        flex:1,
        padding:24,
        justifyContent:'center',
        alignItems:'center'
    },
    summaryText:{
        fontFamily: 'open-sans',
        fontSize:24,
        textAlign:'center',
        marginBottom:24
    },
    highligth:{
        fontFamily: 'open-sans-bold',
        color:Colors.primary500
    }
});