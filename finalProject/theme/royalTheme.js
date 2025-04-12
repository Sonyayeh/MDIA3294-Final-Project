import { createTheme } from "@rneui/themed";

const themePalette = {
    primary: '#ffb703', // Orange
    primaryDarker: '#fb8500', // Darker Orange
    blue: '#219ebc', // Light Blue
    blueDarker: '#023047', // Navy
    blueLighter: '#8ecae6', // Sky Blue
    none: 'transparent',
    error: '#990000'
};

export const royalTheme = createTheme({
    colors: {
        primary: themePalette.primary, 
        primaryDarker: themePalette.primaryDarker,
        blue: themePalette.blue,
        blueDarker: themePalette.blueDarker,
        blueLighter: themePalette.blueLighter,
        none: themePalette.none,

    },
    components: {
        Button: {
            raised: true,
            borderRadius: 5,
            buttonStyle: { backgroundColor: themePalette.primary }, // Apply primary color here
            disabledStyle: { backgroundColor: themePalette.blueDarker }, // Use navy when disabled
        },
        Text: {
            style: { color: themePalette.blueDarker } // Ensure text color fits the theme
        },
        Avatar: {
            avatarStyle: {
                borderColor: themePalette.primary,
                borderWidth: 1,
            },
            size: 50
        },
        Input: {
            inputStyle: {
                backgroundColor: themePalette.fieldBackground,
                borderRadius: 10,
                fontFamily: 'OpenSans-Regular',
                fontSize: 14
                
            },
            errorStyle:{
                color:themePalette.error
            }
            
        },
        CheckBox:{
            checkedColor:themePalette.primaryLighter,
            containerStyle:{
                backgroundColor:'transparent',            
            },
            textStyle:{
                fontFamily: 'OpenSans-Regular',
                fontWeight: 'normal',
            }
    
        },
    },
});
