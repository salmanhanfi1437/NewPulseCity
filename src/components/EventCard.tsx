import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TMEvent } from '../api/ticketmaster';
import { mvs } from 'react-native-size-matters';
import { globalStyles } from '../styles';

type Props = {
  event: TMEvent;
  onPress: () => void;
  onToggleFav: () => void;
  favorite: boolean;
};

const EventCard: React.FC<Props> = ({ event, onPress, onToggleFav, favorite }) => {
  const date = event.dates?.start?.localDate ?? '';
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={{flex:1}}>
        <Text style={globalStyles.title}>{event.name}</Text>
        <Text style={[styles.da]}>{date}</Text>
      </View>
      <TouchableOpacity onPress={onToggleFav} style={styles.fav}>
        <Text style={{fontSize:18}}>{favorite ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection:'row', 
    padding:12,
     borderWidth:1, 
     borderRadius:8, 
     marginVertical:6, 
     alignItems:'center'
    },
  
  date: {
     ...globalStyles.text,
    marginTop:mvs(6)
},
  fav: {
    paddingLeft:mvs(12)
}
});

export default EventCard;