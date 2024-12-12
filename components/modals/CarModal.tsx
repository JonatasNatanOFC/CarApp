import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  useColorScheme,
} from "react-native";
import { CarInterface } from "@/interface/CarInterface";

export type CarModalProps = {
  visible: boolean;
  carData: CarInterface | null;
  onAdd: (newCar: CarInterface) => void;
  onUpdate: (updatedCar: CarInterface) => void;
  onDelete: (car: CarInterface) => void;
  onCancel: () => void;
};

export default function CarModal({
  visible,
  carData,
  onAdd,
  onUpdate,
  onDelete,
  onCancel,
}: CarModalProps) {
  const [typeCar, setTypeCar] = useState("");
  const [brandCar, setBrandCar] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [condition, setCondition] = useState("");
  const [color, setColor] = useState("");
  const [value, setValue] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [imageCar, setImageCar] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const theme = useColorScheme();

  useEffect(() => {
    if (carData) {
      setTypeCar(carData.typeCar);
      setBrandCar(carData.brandCar);
      setModel(carData.model);
      setYear(carData.year.toString());
      setCondition(carData.condition);
      setColor(carData.color);
      setValue(carData.value.toString());
      setFuelType(carData.fuelType);
      setImageCar(carData.imageCar);
    } else {
      resetForm();
    }
  }, [carData]);

  const resetForm = () => {
    setTypeCar("");
    setBrandCar("");
    setModel("");
    setYear("");
    setCondition("");
    setColor("");
    setValue("");
    setFuelType("");
    setImageCar("");
    setErrorMessage(null);
  };

  const handleAddCar = () => {
    if (
      typeCar &&
      brandCar &&
      model &&
      year &&
      condition &&
      color &&
      value &&
      fuelType &&
      imageCar
    ) {
      const newCar: CarInterface = {
        id: `${Date.now()}`,
        typeCar,
        brandCar,
        model,
        year: parseInt(year),
        condition,
        color,
        value: parseFloat(value),
        fuelType,
        imageCar,
      };

      onAdd(newCar);
      resetForm();
      onCancel();
    } else {
      setErrorMessage("Por favor, preencha todos os campos corretamente!");
    }
  };

  const handleUpdateCar = () => {
    if (
      carData &&
      typeCar &&
      brandCar &&
      model &&
      year &&
      condition &&
      color &&
      value &&
      fuelType &&
      imageCar
    ) {
      const updatedCar: CarInterface = {
        ...carData,
        typeCar,
        brandCar,
        model,
        year: parseInt(year),
        condition,
        color,
        value: parseFloat(value),
        fuelType,
        imageCar,
      };

      onUpdate(updatedCar);
      resetForm();
      onCancel();
    } else {
      setErrorMessage("Por favor, preencha todos os campos corretamente!");
    }
  };

  const handleDeleteCar = () => {
    if (carData) {
      onDelete(carData);
      resetForm();
      onCancel();
    }
  };

  const placeholderColor = theme === "dark" ? "#B0B0B0" : "#808080";

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalBackground}>
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.boxContainer}>
              <ScrollView contentContainerStyle={styles.scrollView}>
                {errorMessage && (
                  <Text style={styles.errorMessage}>{errorMessage}</Text>
                )}
                <TextInput
                  style={styles.boxInput}
                  placeholder="Tipo de Carro"
                  value={typeCar}
                  onChangeText={setTypeCar}
                  placeholderTextColor={placeholderColor}
                />
                <TextInput
                  style={styles.boxInput}
                  placeholder="Marca"
                  value={brandCar}
                  onChangeText={setBrandCar}
                  placeholderTextColor={placeholderColor}
                />
                <TextInput
                  style={styles.boxInput}
                  placeholder="Modelo"
                  value={model}
                  onChangeText={setModel}
                  placeholderTextColor={placeholderColor}
                />
                <TextInput
                  style={styles.boxInput}
                  placeholder="Ano"
                  value={year}
                  onChangeText={setYear}
                  keyboardType="numeric"
                  placeholderTextColor={placeholderColor}
                />
                <TextInput
                  style={styles.boxInput}
                  placeholder="Condição"
                  value={condition}
                  onChangeText={setCondition}
                  placeholderTextColor={placeholderColor}
                />
                <TextInput
                  style={styles.boxInput}
                  placeholder="Cor"
                  value={color}
                  onChangeText={setColor}
                  placeholderTextColor={placeholderColor}
                />
                <TextInput
                  style={styles.boxInput}
                  placeholder="Valor"
                  value={value}
                  onChangeText={setValue}
                  keyboardType="numeric"
                  placeholderTextColor={placeholderColor}
                />
                <TextInput
                  style={styles.boxInput}
                  placeholder="Tipo de Combustível"
                  value={fuelType}
                  onChangeText={setFuelType}
                  placeholderTextColor={placeholderColor}
                />
                <TextInput
                  style={styles.boxInput}
                  placeholder="URL da Imagem"
                  value={imageCar}
                  onChangeText={setImageCar}
                  placeholderTextColor={placeholderColor}
                />
              </ScrollView>

              <View style={styles.buttonContainer}>
                {carData ? (
                  <TouchableOpacity
                    style={styles.buttonAdd}
                    onPress={handleUpdateCar}
                  >
                    <Text style={styles.buttonText}>Atualizar</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.buttonAdd}
                    onPress={handleAddCar}
                  >
                    <Text style={styles.buttonText}>Adicionar</Text>
                  </TouchableOpacity>
                )}
                {carData && (
                  <TouchableOpacity
                    style={styles.buttonDelete}
                    onPress={handleDeleteCar}
                  >
                    <Text style={styles.buttonText}>Deletar</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={styles.buttonCancel}
                  onPress={onCancel}
                >
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    width: "80%",
    maxHeight: "80%",
  },
  boxContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 25,
    alignItems: "center",
  },
  scrollView: {
    width: "100%",
    paddingBottom: 20,
  },
  boxInput: {
    width: 250,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    borderRadius: 5,
    paddingRight: "auto",
    paddingVertical: 10,
    fontSize: 16,
  },
  errorMessage: {
    color: "red",
    marginBottom: 10,
    fontSize: 14,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonAdd: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonDelete: {
    backgroundColor: "#F44336",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonCancel: {
    backgroundColor: "#553533",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
