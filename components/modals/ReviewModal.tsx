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
import { ReviewInterface } from "@/interface/ReviewInterface"; 

export type ReviewModalProps = {
  visible: boolean;
  reviewData: ReviewInterface | null; 
  onAdd: (newReview: ReviewInterface) => void;
  onUpdate: (updatedReview: ReviewInterface) => void;
  onDelete: (review: ReviewInterface) => void;
  onCancel: () => void;
};

export default function ReviewModal({
  visible,
  reviewData,
  onAdd,
  onUpdate,
  onDelete,
  onCancel,
}: ReviewModalProps) {
  const [car, setCar] = useState("");
  const [ownerCar, setOwnerCar] = useState("");
  const [receivedDate, setReceivedDate] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [imageCar, setImageCar] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const theme = useColorScheme();

  
  useEffect(() => {
    if (reviewData) {
      setCar(reviewData.car);
      setOwnerCar(reviewData.ownerCar);
      setReceivedDate(reviewData.receivedDate);
      setDeliveryDate(reviewData.deliveryDate);
      setImageCar(reviewData.imageCar);
    } else {
      resetForm();
    }
  }, [reviewData]);

  const resetForm = () => {
    setCar("");
    setOwnerCar("");
    setReceivedDate("");
    setDeliveryDate("");
    setImageCar("");
    setErrorMessage(null);
  };

  const handleAddReview = () => {
    if (car && ownerCar && receivedDate && deliveryDate && imageCar) {
      const newReview: ReviewInterface = {
        id: Date.now(),
        car,
        ownerCar,
        receivedDate,
        deliveryDate,
        imageCar,
      };

      onAdd(newReview);
      resetForm();
      onCancel();
    } else {
      setErrorMessage("Por favor, preencha todos os campos corretamente!");
    }
  };

  const handleUpdateReview = () => {
    if (
      reviewData &&
      car &&
      ownerCar &&
      receivedDate &&
      deliveryDate &&
      imageCar
    ) {
      const updatedReview: ReviewInterface = {
        ...reviewData,
        car,
        ownerCar,
        receivedDate,
        deliveryDate,
        imageCar,
      };

      onUpdate(updatedReview);
      resetForm();
      onCancel();
    } else {
      setErrorMessage("Por favor, preencha todos os campos corretamente!");
    }
  };

  const handleDeleteReview = () => {
    if (reviewData) {
      onDelete(reviewData);
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
                  placeholder="Data Recebido"
                  value={receivedDate}
                  onChangeText={setReceivedDate}
                  placeholderTextColor={placeholderColor}
                />
                <TextInput
                  style={styles.boxInput}
                  placeholder="Data Entregar"
                  value={deliveryDate}
                  onChangeText={setDeliveryDate}
                  placeholderTextColor={placeholderColor}
                />
                <TextInput
                  style={styles.boxInput}
                  placeholder="Imagem do Carro"
                  value={imageCar}
                  onChangeText={setImageCar}
                  placeholderTextColor={placeholderColor}
                />
              </ScrollView>

              <View style={styles.buttonContainer}>
                {reviewData ? (
                  <>
                    <TouchableOpacity
                      style={styles.buttonAdd}
                      onPress={handleUpdateReview}
                    >
                      <Text style={styles.buttonText}>Atualizar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.buttonDelete}
                      onPress={handleDeleteReview}
                    >
                      <Text style={styles.buttonText}>Deletar</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity
                    style={styles.buttonAdd}
                    onPress={handleAddReview}
                  >
                    <Text style={styles.buttonText}>Adicionar</Text>
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
    width: "90%",
    maxHeight: "80%",
  },
  boxContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  scrollView: {
    width: "100%",
    paddingBottom: 20,
  },
  boxInput: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    borderRadius: 5,
    paddingHorizontal: 10,
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
