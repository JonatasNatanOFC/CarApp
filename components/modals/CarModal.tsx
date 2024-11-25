import React, { useState } from "react";
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
import { CarInterface } from "../../interface/CarInterface";

export type CarModalProps = {
  visible: boolean;
  onAdd: (car: CarInterface) => void;
  onCancel: () => void;
};

export default function CarModal({ visible, onAdd, onCancel }: CarModalProps) {
  const [typeCar, setTypeCar] = useState("");
  const [brandCar, setBrandCar] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [condition, setCondition] = useState("");
  const [color, setColor] = useState("");
  const [value, setValue] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [imageCar, setImageCar] = useState("");

  const theme = useColorScheme();

  const handleAddCar = () => {
    const valueNumber = parseFloat(value);
    const yearNumber = parseInt(year);

    if (
      valueNumber &&
      yearNumber &&
      typeCar &&
      brandCar &&
      model &&
      condition &&
      color &&
      fuelType &&
      imageCar
    ) {
      const newCar: CarInterface = {
        typeCar,
        brandCar,
        model,
        year: yearNumber,
        condition,
        color,
        value: valueNumber,
        fuelType,
        imageCar,
      };

      onAdd(newCar);
      onCancel();
    } else {
      alert("Por favor, preencha todos os campos corretamente!");
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
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.modalBackground}>
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.boxContainer}>
              <ScrollView contentContainerStyle={styles.scrollView}>
                <TextInput
                  style={styles.boxInput}
                  placeholder="Tipo do Veículo"
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
                  keyboardType="numeric"
                  value={year}
                  onChangeText={setYear}
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
                  placeholder="Preço"
                  keyboardType="numeric"
                  value={value}
                  onChangeText={setValue}
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
                  placeholder="URL da Imagem do Veículo"
                  value={imageCar}
                  onChangeText={setImageCar}
                  placeholderTextColor={placeholderColor}
                />
              </ScrollView>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.buttonAdd}
                  onPress={handleAddCar}
                >
                  <Text style={styles.buttonText}>Adicionar</Text>
                </TouchableOpacity>
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
    width: "90%",
    maxHeight: "80%",
    marginBottom: 20,
  },
  boxContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  scrollView: {
    width: "100%",
    paddingBottom: 20,
  },
  boxInput: {
    width: 250,
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
    fontSize: 16,
    textAlignVertical: "center",
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonAdd: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonCancel: {
    backgroundColor: "#F44336",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
