import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

// Definindo o tipo usando 'type'
export type CarType = {
  typeCar: string;
  brandCar: string;
  model: string;
  year: number;
  condition: string;
  color: string;
  value: number;
  fuelType: string;
  imageCar: string;
};

export default function Car({
  typeCar,
  brandCar,
  model,
  year,
  condition,
  color,
  value,
  fuelType,
  imageCar,
}: CarType) {
  return (
    <View style={styles.carContainer}>
      <Image source={{ uri: imageCar }} style={styles.carImage} />
      <View style={styles.carInfo}>
        <Text style={styles.carTitle}>{model}</Text>
        <Text style={styles.carDetails}>Tipo: {typeCar}</Text>
        <Text style={styles.carDetails}>Marca: {brandCar}</Text>
        <Text style={styles.carDetails}>Ano: {year}</Text>
        <Text style={styles.carDetails}>Condição: {condition}</Text>
        <Text style={styles.carDetails}>Cor: {color}</Text>
        <Text style={styles.carDetails}>Valor: R$ {value.toFixed(2)}</Text>
        <Text style={styles.carDetails}>Combustível: {fuelType}</Text>
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
    elevation: 3, // Sombra para o efeito 3D
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
