import React, { useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  useColorScheme,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import CarModal from "../../components/modals/CarModal";
import { CarInterface } from "../../interface/CarInterface";

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cars, setCars] = useState<CarInterface[]>([]);
  const theme = useColorScheme();

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleAddCar = (car: CarInterface) => {
    setCars((prevCars) => [...prevCars, car]);
    closeModal();
  };

  const handleRemoveCar = (index: number) => {
    setCars((prevCars) => prevCars.filter((_, i) => i !== index));
  };

  const renderCarItem = ({
    item,
    index,
  }: {
    item: CarInterface;
    index: number;
  }) => (
    <View style={styles.carItem}>
      <Image source={{ uri: item.imageCar }} style={styles.carImage} />

      <View style={styles.carInfo}>
        <Text style={styles.carText}>{`${item.brandCar} ${item.model}`}</Text>
        <Text style={styles.carText}>{`R$ ${item.value.toFixed(2)}`}</Text>
        <Text style={styles.carText}>{`Ano: ${item.year}`}</Text>
        <Text style={styles.carText}>{`Condição: ${item.condition}`}</Text>
        <Text style={styles.carText}>{`Combustível: ${item.fuelType}`}</Text>
      </View>

      <TouchableOpacity
        onPress={() => handleRemoveCar(index)}
        style={styles.deleteButton}
      >
        <Icon name="trash" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={theme === "dark" ? "#000000" : "#FFFFFF"}
      />

      <View style={styles.container}>
        <FlatList
          data={cars}
          renderItem={renderCarItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum carro cadastrado.</Text>
          }
        />
      </View>

      <TouchableOpacity style={styles.floatingButton} onPress={openModal}>
        <Icon name="plus-circle" size={50} color="#4CAF50" />
      </TouchableOpacity>

      <CarModal
        visible={modalVisible}
        onAdd={handleAddCar}
        onCancel={closeModal}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  carItem: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 120,
  },
  carImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  carInfo: {
    flex: 1,
    justifyContent: "center",
  },
  carText: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "black",
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    fontStyle: "italic",
    marginTop: 20,
  },
  deleteButton: {
    padding: 10,
    backgroundColor: "#f44336",
    borderRadius: 50,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 1,
  },
});

export default HomeScreen;
