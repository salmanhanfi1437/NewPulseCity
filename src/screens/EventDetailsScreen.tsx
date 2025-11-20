import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
//import MapView, { Marker } from 'react-native-maps';
import { flex, marginBottom, marginTop, padding } from '../styles/ui';
import { mvs } from 'react-native-size-matters';
import { globalStyles } from '../styles';
import ScreenWrapper from '../components/ScreenWrapper';

const { height } = Dimensions.get('window');

const EventDetailsScreen: React.FC<any> = ({ route }) => {
  const { event } = route.params;
  const venue = event._embedded?.venues?.[0];
  const lat = Number(venue?.location?.latitude);
  const lng = Number(venue?.location?.longitude);

  return (
    <ScreenWrapper>
      <Text style={[globalStyles.title,marginBottom(mvs(8))]}>{event.name}</Text>
      <Text>Date: {event.dates?.start?.localDate ?? 'N/A'}</Text>
      <Text>Venue: {venue?.name ?? 'N/A'}</Text>
      <Text style={globalStyles.title}>{event.info ?? 'No description'}</Text>

      {/* {lat && lng ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={{ latitude: lat, longitude: lng }} title={venue?.name} />
        </MapView>
      ) : (
        <Text style={marginTop(mvs(12))}>No location available for this venue.</Text>
      )} */}
   </ScreenWrapper>
  );
};

const styles = StyleSheet.create({

  map: {
    height: Math.max(200, height * 0.35), 
    marginTop:mvs(12)
}
});

export default EventDetailsScreen;