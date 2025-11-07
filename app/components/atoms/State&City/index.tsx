import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import {
  fetchStatesRequest,
  fetchCitiesRequest,
  StateItem,
  CityItem,
} from "./StateCitySlice";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import colors from "../../../styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { ms, mvs } from "react-native-size-matters";
import { Typography } from "../../../styles";

type RouteParams = {
  type: "state" | "city";
  stateId?: string;
  onSelect: (item: StateItem | CityItem) => void;
};

const StateCitySelector: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();

  const { type, stateId, onSelect } = route.params;
  const { stateList, cityList, loading } = useSelector(
    (state: RootState) => state.stateCity
  );

  useEffect(() => {
    if (type === "state") dispatch(fetchStatesRequest());
    if (type === "city" && stateId) dispatch(fetchCitiesRequest(stateId));
  }, []);

  const handleSelect = (item: StateItem | CityItem) => {
    onSelect(item);
    navigation.goBack();
  };

  const data = type === "state" ? stateList : cityList;

  return (
    <SafeAreaView style={styles.container}>
    <View>
      <Text style={styles.title}>{type === "state" ? "Select State" : "Select City"}</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handleSelect(item)}>
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}

      />
      {loading && <Text>Loading...</Text>}
    </View>
    </SafeAreaView>
  );
};

export default StateCitySelector;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: colors.white },
  title: { fontSize: ms(14), fontWeight: "600", marginBottom: mvs(10),...Typography.weights.mediumU },
  item: {
    padding: 12,
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemText: { fontSize: 16 },
});
