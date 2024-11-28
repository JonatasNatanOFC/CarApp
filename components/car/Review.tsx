import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export type ReviewType = {
  deliveryDate: string;
  car: string;
  receivedDate: string;
  ownerCar: string;
  imageCar: string;
};

export default function Review({
  deliveryDate,
  receivedDate,
  car,
  ownerCar,
  imageCar,
}: ReviewType) {
  return (
    <View style={styles.carContainer}>
      <Image source={{ uri: imageCar }} style={styles.carImage} />
      <View style={styles.carInfo}>
        <Text style={styles.carTitle}>{car}</Text>
        <Text style={styles.carDetails}>Dono: {ownerCar}</Text>
        <Text style={styles.carDetails}>Recebido: {receivedDate}</Text>
        <Text style={styles.carDetails}>Entregar: {deliveryDate}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  carContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 5,
  },
  carImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  carInfo: {
    flex: 1,
    justifyContent: "center",
  },
  carTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  carDetails: {
    fontSize: 14,
    color: "#555",
  },
});
