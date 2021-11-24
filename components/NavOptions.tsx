import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import { Icon } from "react-native-elements";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StackList } from "./HomeNavigation";
import { selectOrigin } from "../app/slices/navigationSlice";
import tailwind from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const NavOptions = () => {
  const navigation = useNavigation<HomeScreenProp>();
  const origin = useSelector(selectOrigin);

  return (
    <FlatList
      data={navData}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          disabled={!origin}
          onPress={() => navigation.navigate(item.screen)}
          style={tailwind`pr-2 pl-6 pt-4 pb-8 bg-gray-200 mr-2 mb-5 w-40 rounded-md`}
        >
          <View style={tailwind.style(!origin && "opacity-20")}>
            <Image
              source={{ uri: item.image }}
              style={{ width: 130, height: 120, resizeMode: "contain" }}
            />
            <Text style={tailwind`mt-2 text-lg font-bold`}>{item.title}</Text>
            <Icon
              style={tailwind`p-2 bg-black rounded-full w-10 mt-6`}
              type="antdesign"
              color="gold"
              name="arrowright"
              //este es el icono de ingresar por la imagen
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

type NavData = {
  id: string;
  title: string;
  image: string;
  screen: keyof StackList;
}[];

export const navData: NavData = [
  {
    id: "1",
    title: "inicia recorrido",
    image: "https://previews.123rf.com/images/iqoncept/iqoncept1701/iqoncept170100197/70589275-punto-de-inter%C3%A9s-mapa-de-ubicaci%C3%B3n-de-turismo-de-viajes-in-situ-3d-ilustraci%C3%B3n.jpg",
    screen: "MapScreen",
  },
  
];

export type HomeScreenProp = NativeStackNavigationProp<StackList, "HomeScreen">;

export default NavOptions;
