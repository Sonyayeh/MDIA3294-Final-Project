 // Import react from react
 import React from 'react';
 // Import components 
 import { StyleSheet, View, Image } from 'react-native';
 // global styles from themed
 import { Text, Button } from '@rneui/themed';
 
 // Home screen
 // This is the first screen that the user sees when they open the app
 // It has a title and a button to navigate to the search screen
 // The screen is divided into three sections with a banner image and text
 // The banner images are imported from the assets folder
 // The button is linked to the Search screen
 
 export default function DogHome({navigation}) {
 
     return (
         <View style={styles.container}>
             <Text
              style= {styles.title}
              h1>DogZ
              </Text>
 
              <View
                 style={styles.bannerTops}
                 >
                 <Image
                     style={styles.banner}
                     source={require('../assets/dog-1.png')}
                  />
                 <Text h2>
                     Hello
                 </Text>
              </View>
 
              <View
                 style={styles.bannerMiddle}
                 >
                 <Text h2>
                     Dog
                 </Text>
                 <Image
                     style={styles.banner}
                     source={require('../assets/dog-2.png')}
                  />
              </View>
              <View
                 style={styles.bannerBottom}
                 >
                 <Image
                     style={styles.banner}
                     source={require('../assets/dog-3.png')}
                  />
                 <Text h2>
                     Lover
                 </Text>
              </View>
             <View style={styles.btnIntro}>
                 <Button
                     title="Search" 
                     onPress={() => navigation.navigate('Search')}
                 />
             </View>
 
         </View>
     );
 }
 
 const styles = StyleSheet.create({
     container: {
         flex: 1,
         padding: 20,
         backgroundColor: "#F0F8FF",
     },
 
     title: {
         marginTop: 50,
     },
 
     bannerTops: {
         flexDirection: 'row',
         alignItems: 'center',
         backgroundColor: '#e9c46a',
         padding: 10,
         gap: 50,
         marginTop: 100,
     },
     
     banner: {
         width: 100, 
         height: 100,
         resizeMode: 'contain', 
     },
     
     bannerMiddle: {
         flexDirection: 'row',
         justifyContent: 'flex-end',
         alignItems: 'center',
         backgroundColor: '#e76f51',
         padding: 10,
         gap: 50,
         marginTop: 30,
     },
 
     bannerBottom: {
         flexDirection: 'row',
         alignItems: 'center',
         backgroundColor: '#bc4749',
         padding: 10,
         gap: 50,
         marginTop: 30,
     },
 
     btnIntro: {
         marginTop: 100,
     },
 
 });