// Import the createTheme from the themed package
// Set up the style the colour
// Default the colour and apply globally
import { createTheme } from "@rneui/themed";

const themePalette = {
    primaryGreen: '#22577a', 
    primaryLightGreen: '#003262', 
    backgroundColor: '#F0F8FF',
    textWhite: '#F5F5F5',
    textGreen: '#22577a'
};

export const DogTheme = createTheme({
    components: {
        Button: {
            raised: true,
            buttonStyle: { backgroundColor: themePalette.primaryGreen}, 
            disabledStyle: { backgroundColor: themePalette.primaryLightGreen },
        },
        Text: {
            h1Style: { 
                color: themePalette.textGreen,
                fontSize: 50,
                fontWeight: 'bold',
                textAlign: 'center',
            },
            h2Style: { 
                color: themePalette.textWhite,
                fontSize: 28,
                fontWeight: 'medium',
                textAlign: 'center',
            },
            h3Style: { 
                color: themePalette.textGreen,
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
            },
            style: { 
                color: themePalette.textGreen, 
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'left',
            },
            Icon: {
                color: themePalette.primaryGreen,

            },
        }
    }
});
