import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { searchEvents, TMEvent } from '../api/ticketmaster';
import EventCard from '../components/EventCard';
import { useFavorites } from '../hooks/useFavorites';
import { LanguageContext } from '../context/LanguageContext';
import { ms, mvs } from 'react-native-size-matters';
import { marginBottom, marginTop } from '../styles/ui';
import ScreenWrapper from '../components/ScreenWrapper';

const HomeScreen: React.FC<any> = ({ navigation }) => {

    const [keyword, setKeyword] = useState('');
    const [city, setCity] = useState('');
    const [events, setEvents] = useState<TMEvent[]>([]);
    const [loading, setLoading] = useState(false);
    const { favorites, toggleFavorite, isFavorite } = useFavorites();
    const { language, toggle } = useContext(LanguageContext);


    const handleSearch = async () => {
        setLoading(true);
        try {
            const res = await searchEvents(keyword, city);
            setEvents(res);
        } catch (e) {
            console.warn(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScreenWrapper>
            <View style={marginBottom(mvs(10))}>
                <Button title={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`} onPress={toggle} />
            </View>

            <TextInput style={styles.input} placeholder="Keyword" value={keyword} onChangeText={setKeyword} />
            <TextInput style={styles.input} placeholder="City" value={city} onChangeText={setCity} />
            <Button title={loading ? 'Searching...' : 'Search'} onPress={handleSearch} />

            <FlatList
                data={events}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <EventCard
                        event={item}
                        onPress={() => navigation.navigate('EventDetails', { event: item })}
                        onToggleFav={() => toggleFavorite(item)}
                        favorite={isFavorite(item.id)}
                    />
                )}
                ListEmptyComponent={<Text style={marginTop(mvs(20))}>No events. Try a search.</Text>}
                style={marginTop(mvs(10))}/>

            <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.profileBtn}>
                <Text>Profile</Text>
            </TouchableOpacity>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    
    input: {
        borderWidth: mvs(1),
        padding: mvs(10),
        borderRadius: mvs(6),
        marginVertical: mvs(6)
    },
    profileBtn: {
        position: 'absolute',
        right: mvs(15),
        bottom: mvs(15),
        padding: mvs(10),
        borderRadius: ms(25),
        borderWidth: mvs(1)
    }
});

export default HomeScreen;