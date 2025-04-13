import AsyncStorage from '@react-native-async-storage/async-storage';

/*********************** ASYNC FUNCTIONS ***********************/

// for a given userID build the key and get the array of favorites for that key
// returns an empty array if no favorites exist for that key
export async function getFavArrayByUser(userId) {
  let arrFav = [];
  try {
    const storedFavs = await AsyncStorage.getItem(userId + '_FAV');
    if (storedFavs !== null) {
      arrFav = JSON.parse(storedFavs);
    }
  } catch (e) {
    console.error('Error getting favorites:', e);
  }
  return arrFav;
}

// add/overwrite the favorites array for a given user
// NOTE: no validation here, service consumer should ensure array is in the correct format
export async function updateFavArrayByUser(userId, arrFavorites) {
  try {
    await AsyncStorage.setItem(userId + '_FAV', JSON.stringify(arrFavorites));
  } catch (e) {
    console.error('Error updating favorites:', e);
  }
}

/*********************** UTILITY FUNCTIONS (NOT ASYNC) ***********************/
export function checkFavorite(checkKey, currFavList = []) {
  let foundIndex = currFavList.findIndex(ele => ele.id == checkKey);
  return foundIndex >= 0;
}

// gets the favorite list, checks to see if should be added, then updates
export async function addFavorite(newCat, currFavList = [], userId) {
  if (!checkFavorite(newCat.id, currFavList)) {
    const liteCat = {
      id: newCat.id,
      slug: newCat.slug,
      name: newCat.name,
      active: newCat.active,
      keyImage: newCat.keyImage
    };
    currFavList.push(liteCat);
    await updateFavArrayByUser(userId, currFavList);
  }
  return currFavList;
}

// gets the favorite list, checks to see if should be added, then updates
export async function delFavorite(delCat, currFavList = [], userId) {
  let filteredList = currFavList.filter(ele => ele.id != delCat.id);
  await updateFavArrayByUser(userId, filteredList);
  return filteredList;
}