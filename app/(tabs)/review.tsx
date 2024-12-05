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
import ReviewModal from "../../components/modals/ReviewModal";
import { ReviewInterface } from "../../interface/ReviewInterface";

const ReviewScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [reviews, setReviews] = useState<ReviewInterface[]>([]);
  const theme = useColorScheme();

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleAddReview = (review: ReviewInterface) => {
    const newReview = {
      ...review,
      id: reviews.length + 1,
    };
    setReviews((prevReviews) => [...prevReviews, newReview]);
    closeModal();
  };

  const handleRemoveReview = (index: number) => {
    setReviews((prevReviews) => prevReviews.filter((_, i) => i !== index));
  };

  const renderReviewItem = ({
    item,
    index,
  }: {
    item: ReviewInterface;
    index: number;
  }) => (
    <View style={styles.carItem}>
      <Image source={{ uri: item.imageCar }} style={styles.carImage} />
      <View style={styles.carInfo}>
        <Text style={styles.carText}>{`Carro: ${item.car}`}</Text>
        <Text style={styles.carText}>{`Dono: ${item.ownerCar}`}</Text>
        <Text style={styles.carText}>{`Recebido: ${item.receivedDate}`}</Text>
        <Text style={styles.carText}>{`Entregar: ${item.deliveryDate}`}</Text>
      </View>
      <TouchableOpacity
        onPress={() => handleRemoveReview(index)}
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
          data={reviews}
          renderItem={renderReviewItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhuma revisão cadastrada.</Text>
          }
        />
      </View>
      <TouchableOpacity style={styles.floatingButton} onPress={openModal}>
        <Icon name="plus-circle" size={50} color="#FFBA26" />
      </TouchableOpacity>
      <ReviewModal
        visible={modalVisible}
        onAdd={handleAddReview}
        onCancel={closeModal}
        onUpdate={() => {}}
        onDelete={() => {}}
        reviewData={null}
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

export default ReviewScreen;
