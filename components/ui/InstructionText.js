import { Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

function InstructionText({ children, styleProp }) {
    return <Text style={[styles.instructionText, styleProp]}>{children}</Text>
}

export default InstructionText;

const styles = StyleSheet.create({
    instructionText: {
        fontFamily: 'open-sans',
        color: Colors.accent500,
        fontSize: 24
    },
});