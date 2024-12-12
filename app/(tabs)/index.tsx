import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  useColorScheme,
} from "react-native";
import { CarInterface } from "../../interface/CarInterface";
import CarModal from "../../components/modals/CarModal";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

export default function CarList() {
  const [carData, setCarData] = useState<CarInterface[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState<CarInterface | null>(null);

  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const data = await AsyncStorage.getItem("@CarApp:cars");
        const carsData = data != null ? JSON.parse(data) : [];
        setCarData(carsData);
      } catch (e) {}
    }

    getData();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to acess location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const theme = useColorScheme();

  const handleAddCar = (newCar: CarInterface) => {
    setCarData((prevData) => {
      const updatedData = [...prevData, newCar];
      AsyncStorage.setItem("@CarApp:cars", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const handleUpdateCar = (updatedCar: CarInterface) => {
    setCarData((prevData) => {
      const updatedData = prevData.map((car) =>
        car.id === updatedCar.id ? { ...car, ...updatedCar } : car
      );
      AsyncStorage.setItem("@CarApp:cars", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const handleDeleteCar = (carToDelete: CarInterface) => {
    setCarData((prevData) => {
      const updatedData = prevData.filter((car) => car.id !== carToDelete.id);
      AsyncStorage.setItem("@CarApp:cars", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const openModal = (car: CarInterface | null = null) => {
    setSelectedCar(car);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCar(null);
  };

  const renderCarItem = ({ item }: { item: CarInterface }) => (
    <View style={styles.carItem}>
      <Image source={{ uri: item.imageCar }} style={styles.carImage} />
      <View style={styles.carInfo}>
        <Text style={styles.carText}>Marca: {item.brandCar}</Text>
        <Text style={styles.carText}>Modelo: {item.model}</Text>
        <Text style={styles.carText}>Cor: {item.color}</Text>
        <Text style={styles.carText}>Ano: {item.year}</Text>
        <Text style={styles.carText}>Condição: {item.condition}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonEdit}
            onPress={() => openModal(item)}
          >
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonDelete}
            onPress={() => handleDeleteCar(item)}
          >
            <Text style={styles.buttonText}>Deletar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "#000" : "#fff" },
      ]}
    >
      <Text
        style={[styles.title, { color: theme === "dark" ? "#fff" : "#000" }]}
      >
        Lista de Carros
      </Text>
      <Text
        style={[styles.textGps, { color: theme === "dark" ? "#fff" : "#000" }]}
      >
        {" "}
        {text}
      </Text>
      <FlatList
        data={carData}
        renderItem={renderCarItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.buttonAdd} onPress={() => openModal()}>
        <Icon name="plus-circle" size={50} color="#FFBA26" />
      </TouchableOpacity>

      <CarModal
        visible={modalVisible}
        carData={selectedCar}
        onAdd={handleAddCar}
        onUpdate={handleUpdateCar}
        onDelete={handleDeleteCar}
        onCancel={closeModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  listContainer: {
    flexGrow: 1,
    width: "35%",
    paddingBottom: 40,
  },
  carItem: {
    flexDirection: "row",
    marginBottom: 15,
    backgroundColor: "#f1f1f1",
    padding: 20,
    borderRadius: 8,
    width: 350,
    alignItems: "flex-start",
    height: 250,
  },
  carImage: {
    width: 100,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  carInfo: {
    justifyContent: "flex-start",
    flexShrink: 1,
    alignItems: "flex-start",
  },
  carText: {
    fontSize: 18,
    marginBottom: 8,
    flexWrap: "wrap",
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
    width: "100%",
  },
  buttonEdit: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonDelete: {
    backgroundColor: "#F44336",
    padding: 12,
    borderRadius: 5,
  },
  buttonAdd: {
    position: "absolute",
    bottom: 5,
    right: 5,
    padding: 15,
    borderRadius: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  textGps: {
    paddingBottom: 20,
    fontSize: 8,
  },
});
