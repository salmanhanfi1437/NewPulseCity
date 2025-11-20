import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFavorites } from '../hooks/useFavorites';
import { globalStyles } from '../styles';
import { marginBottom, marginTop } from '../styles/ui';
import { mvs } from 'react-native-size-matters';
import ScreenWrapper from '../components/ScreenWrapper';

const ProfileScreen: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <ScreenWrapper>
      <Text style={[globalStyles.title,marginBottom(mvs(8))]}>Profile</Text>
      <Text>Name: Mohammad Salman (Demo)</Text>
      <Text>Email: salmanhanfi1437@gmail.com</Text>

      <Text style={[globalStyles.title,marginTop(mvs(16))]}>Favorites</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.favItem}>
            <Text>{item.name}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No favourites yet.</Text>}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  
  favItem: {
    paddingVertical:mvs(8), 
    borderBottomWidth:mvs(1)
}
});

export default ProfileScreen;