import { FlatList, Text, TouchableOpacity, View } from "react-native";
import {selectOrigin, setDestination, setOrigin} from "../app/slices/navigationSlice";
import { useDispatch, useSelector } from "react-redux";

import { HomeScreenProp } from "./NavOptions";
import { Icon } from "react-native-elements";
import { Point } from "react-native-google-places-autocomplete";
import React from "react";
import tailwind from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";

const NavFavorites = ({ shouldSetOrigin }: { shouldSetOrigin?: boolean }) => {
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const navigation = useNavigation<HomeScreenProp>();

  return (
    <FlatList
      data={favoritesData.filter(
        // verifico si el recorrido esta seleccionado
        (item) => shouldSetOrigin || origin?.location !== item.location
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View
          style={[
            tailwind`bg-gray-200`,
            {
              height: 0.7,
            },
          ]}
        />
      )}
      renderItem={({ item: { name, icon, location, description } }) => (
        <TouchableOpacity
          style={tailwind`flex-row items-center py-5`}
          onPress={() => {
            if (shouldSetOrigin) {
              dispatch(
                setOrigin({
                  location,
                  description,
                })
              );
              navigation.navigate("MapScreen");
            } else {
              dispatch(
                setDestination({
                  location,
                  description,
                })
              );
            }
          }}
        >
          <Icon
            style={tailwind`mr-4 rounded-full bg-gray-300 p-3`}
            name={icon}
            type="ionicon"
            color="orange"
            size={18}
          />
          <View>
            <Text style={tailwind`font-bold text-lg`}>{name}</Text>
            <Text style={tailwind`text-gray-500`}>{description}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

type FavoritesData = {
  id: string;
  name: string;
  icon: string;
  location: Point;
  description: string;
}[];

const favoritesData: FavoritesData = [
  {
    id: "12",
    icon: "home",
    name: "Usted está aqui!!",
    location: { lat: 5.02836, lng: -73.9992 },
    description: "centro Zipaquirá",
  },
  {
    id: "13",
    icon: "briefcase",
    name: "Catedral de sal",
    location: { lat: 5.0195, lng: -74.0093 },
    description: "Lugar icónico del municipio",
  },
  {
    id: "14",
    icon: "briefcase",
    name: "plaza de la independencia",
    location: { lat: 5.0223605, lng: -74.0079215 },
    description: "Lugar icónico del municipio",
  },
  {
    id: "15",
    icon: "briefcase",
    name: "Catedral Santisima Trinidad",
    location: { lat: 5.0228201, lng: -74.0059045 },
    description: "Lugar icónico del municipio",
  },
  
];

export default NavFavorites;
