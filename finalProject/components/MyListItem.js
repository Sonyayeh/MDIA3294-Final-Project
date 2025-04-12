import { Text, Button, ListItem, Avatar } from '@rneui/themed';
import React from 'react';

export default function MyListItem({ itemData, navigatorRef }) {
  return (
    <ListItem bottomDivider>
      <Avatar
        rounded
        source={{ uri: itemData?.image?.url ?? 'https://via.placeholder.com/150' }} // Fallback image
      />

      <ListItem.Content>
        <Text style={{ fontWeight: 'bold' }}>{itemData?.name ?? 'Unknown Breed'}</Text>
        <Text numberOfLines={2} ellipsizeMode="tail">
          {itemData?.description ?? 'No description available.'}
        </Text>
      </ListItem.Content>

      <Button
        icon={{
          name: 'caret-forward',
          type: 'ionicon',
          size: 15,
        }}
        iconPosition="right"
        onPress={() => navigatorRef.navigate('CatDetailScreen', {
          detailId: itemData?.id, // Ensuring ID is passed
        })}
      />
    </ListItem>
  );
}