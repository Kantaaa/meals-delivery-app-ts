import React, { useState, useReducer, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import * as Location from "expo-location";

import { useNavigation } from "../utils";

import { connect } from "react-redux";
import { onUpdateLocation, UserState, ApplicationState } from "../redux";

const screenWidth = Dimensions.get("screen").width;

interface LandingProps {
  userReducer: UserState;
  onUpdateLocation: Function;
}

export const _LandingScreen: React.FC<LandingProps> = (props) => {
  const { userReducer, onUpdateLocation } = props;

  const { navigate } = useNavigation();

  const [errorMsg, setErrorMsg] = useState("");
  const [address, setAddress] = useState<Location.LocationGeocodedAddress>();

  const [displayAddress, setDisplayAddress] = useState(
    "Waiting for Current Location"
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location is not granted");
      }

      let location: any = await Location.getCurrentPositionAsync({});
      const { coords } = location;
      if (coords) {
        const { latitude, longitude } = coords;

        let addressResponse: any = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        for (let item of addressResponse) {
          setAddress(item);
          onUpdateLocation(item);
          let currentAdddress = `${item.name}, ${item.street}, ${item.postalCode}, ${item.country}`;
          setDisplayAddress(currentAdddress);

          if (currentAdddress.length > 0) {
            setTimeout(() => {
              navigate("homeStack");
            }, 1000);
          }

          return;
        }
      } else {
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navigation}></View>
      <View style={styles.body}>
        <Image
          source={require("../images/delivery_icon.png")}
          style={styles.deliveryIcon}
        />
        <View style={styles.addressContainer}>
          <Text style={styles.addressTitle}>Delivery Address</Text>
          <Text style={styles.addressText}>{displayAddress}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text>Footer</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(242,242,242,1)",
  },
  navigation: {
    flex: 2,
  },
  body: {
    flex: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  deliveryIcon: { width: 120, height: 120 },
  addressContainer: {
    width: screenWidth - 100,
    borderBottomColor: "red",
    borderBottomWidth: 0.5,
    padding: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  addressTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#7D7D7D",
  },
  addressText: {
    fontSize: 20,
    fontWeight: "200",
    color: "#4F5F5F",
  },
  footer: {
    flex: 1,
  },
});

const mapToStateProps = (state: ApplicationState) => ({
  userReducer: state.useReducer,
});

const LandingScreen = connect(mapToStateProps, {
  onUpdateLocation,
})(_LandingScreen);

export { LandingScreen };
