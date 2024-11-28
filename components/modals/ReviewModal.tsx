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
import { ReviewInterface } from "../../interface/ReviewInterface";

export type ReviewModalProps = {
  visible: boolean;
  onAdd: (car: ReviewInterface) => void;
  onCancel: () => void;
};

export default function CarModal({
  visible,
  onAdd,
  onCancel,
}: ReviewModalProps) {
  const [deliveryDate, setDeliveryDate] = useState("");
  const [receivedDate, setReceivedDate] = useState("");
  const [car, setCar] = useState("");
  const [ownerCar, setOwnerCar] = useState("");
  const [imageCar, setImageCar] = useState("");

  const theme = useColorScheme();

  // Função para resetar os campos
  const resetForm = () => {
    setDeliveryDate("");
    setReceivedDate("");
    setCar("");
    setOwnerCar("");
    setImageCar("");
  };

  const handleAddCar = () => {
    if (deliveryDate && receivedDate && car && ownerCar && imageCar) {
      const newReview: ReviewInterface = {
        deliveryDate,
        receivedDate,
        car,
        ownerCar,
        imageCar,
      };

      onAdd(newReview);
      resetForm();
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
                  placeholder="Carro"
                  value={car}
                  onChangeText={setCar}
                  placeholderTextColor={placeholderColor}
                />
                <TextInput
                  style={styles.boxInput}
                  placeholder="Dono do Carro"
                  value={ownerCar}
                  onChangeText={setOwnerCar}
                  placeholderTextColor={placeholderColor}
                />
                <TextInput
                  style={styles.boxInput}
                  placeholder="Recebido"
                  value={receivedDate}
                  onChangeText={setReceivedDate}
                  placeholderTextColor={placeholderColor}
                />
                <TextInput
                  style={styles.boxInput}
                  placeholder="Prazo de Entrega"
                  value={deliveryDate}
                  onChangeText={setDeliveryDate}
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
                  onPress={() => {
                    resetForm();
                    onCancel();
                  }}
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
