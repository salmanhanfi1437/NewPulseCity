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
import { const_city, const_please_select, const_state } from "../../../types/constants";
import { useTranslation } from "react-i18next";
import GlobalStyles from "../../../styles/GlobalStyles";
import FontStyles from "../../../styles/FontStyles";
import { mb } from "../../../utils/spaces";

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

  const {t} = useTranslation();

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
<Text style={[FontStyles.headingText,mb(10)]}>
  {type === "state"
    ? t(const_please_select, { field: t(const_state) })
    : t(const_please_select, { field: t(const_city) })
  }
</Text>
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
  container: { flex: mvs(1), padding: mvs(16), backgroundColor: colors.white },
  item: {
    padding: mvs(12),
    borderWidth: ms(1),
    borderColor: colors.grey,
    borderRadius: mvs(8),
    marginBottom: mvs(8),
  },
  itemText: { fontSize: 16 },
});
