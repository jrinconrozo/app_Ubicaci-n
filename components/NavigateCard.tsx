import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { GOOGLE_MAPS_API_KEY } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Icon } from "react-native-elements";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import NavFavorites from "./NavFavorites";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackList } from "./MapScreenNavigation";
import { setDestination } from "../app/slices/navigationSlice";
import tailwind from "tailwind-react-native-classnames";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigateCardProp>();

  return (
    <SafeAreaView style={tailwind`bg-white flex-1 justify-between`}>
      <View style={tailwind`flex-shrink`}>
        <Text style={tailwind`text-center pb-5 text-lg`}>
          Bienvenido
        </Text>
        <View style={tailwind`border-t border-gray-200 `}>
          <GooglePlacesAutocomplete
            placeholder="A donde quieres ir?"
            debounce={400}
            fetchDetails={true}
            enablePoweredByContainer={false}
            nearbyPlacesAPI="GooglePlacesSearch"
            styles={toInputBoxStyles}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: "en",
            }}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details?.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate("RideOptionsCard");
            }}
          />
        </View>
        <View style={tailwind`px-7`}>
          <NavFavorites />
        </View>
      </View>
      <View
        style={tailwind`flex-row bg-white justify-evenly py-7 border-t border-gray-100`}
      >
        <TouchableOpacity
          style={tailwind`bg-black flex-row w-34 justify-between items-center py-5 px-5 rounded-full`}
          onPress={() => navigation.navigate("RideOptionsCard")}
        >
          <Icon name="car" type="font-awesome" color="gold" size={17} />
          <Text style={tailwind`text-white text-left`}>   transporte  </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tailwind`flex-row w-24 justify-between py-6 px-7 rounded-full`}
        >
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "gray",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "gold",
    borderRadius: 0,
    fontSize: 20,
  },
  textInputContainer: {
    paddingHorizontal: 27,
    paddingBottom: 5,
  },
});

type NavigateCardProp = NativeStackNavigationProp<StackList, "NavigateCard">;

export default NavigateCard;
