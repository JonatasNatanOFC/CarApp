import React, { useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  useColorScheme, // Importando para pegar o tema do dispositivo
  StatusBar, // Importando o StatusBar
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Importando o ícone
import CarModal from "../../components/modals/CarModal"; // Importando o modal
import { CarInterface } from "../../interface/CarInterface"; // Importa a interface do carro

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false); // Controle de visibilidade do modal
  const [cars, setCars] = useState<CarInterface[]>([]); // Lista de carros
  const theme = useColorScheme(); // Obtendo o tema atual (dark ou light)

  // Função para abrir o modal
  const openModal = () => {
    setModalVisible(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setModalVisible(false);
  };

  // Função para adicionar um carro à lista
  const handleAddCar = (car: CarInterface) => {
    setCars((prevCars) => [...prevCars, car]);
    closeModal(); // Fecha o modal após adicionar o carro
  };

  // Função para remover um carro da lista
  const handleRemoveCar = (index: number) => {
    setCars((prevCars) => prevCars.filter((_, i) => i !== index));
  };

  // Renderiza cada item da lista de carros
  const renderCarItem = ({
    item,
    index,
  }: {
    item: CarInterface;
    index: number;
  }) => (
    <View style={styles.carItem}>
      {/* Exibe a imagem do carro usando o campo imageCar */}
      <Image source={{ uri: item.imageCar }} style={styles.carImage} />

      <View style={styles.carInfo}>
        {/* Exibe as informações do carro */}
        <Text style={styles.carText}>{`${item.brandCar} ${item.model}`}</Text>
        <Text style={styles.carText}>{`R$ ${item.value.toFixed(2)}`}</Text>
        <Text style={styles.carText}>{`Ano: ${item.year}`}</Text>
        <Text style={styles.carText}>{`Condição: ${item.condition}`}</Text>
        <Text style={styles.carText}>{`Combustível: ${item.fuelType}`}</Text>
      </View>

      {/* Botão de apagar */}
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
      {/* Ajusta a StatusBar para o tema atual */}
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"} // Muda a cor da StatusBar dependendo do tema
        backgroundColor={theme === "dark" ? "#000000" : "#FFFFFF"} // Altera o fundo da StatusBar
      />

      <View style={styles.container}>
        {/* Exibe a lista de carros */}
        <FlatList
          data={cars}
          renderItem={renderCarItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum carro cadastrado.</Text>
          }
        />
      </View>

      {/* Botão de "+" para abrir o modal - Colocado na parte inferior */}
      <TouchableOpacity style={styles.floatingButton} onPress={openModal}>
        <Icon name="plus-circle" size={50} color="#4CAF50" />
      </TouchableOpacity>

      {/* Modal de Cadastro */}
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
    backgroundColor: "white", // Fundo branco para o card, independente do tema
    flexDirection: "row", // Faz com que o texto e o ícone fiquem lado a lado
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 120, // Tamanho mínimo da caixa de cada item
  },
  carImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  carInfo: {
    flex: 1, // Faz com que o texto ocupe o espaço disponível
    justifyContent: "center", // Alinha o texto no centro
  },
  carText: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "black", // Texto preto para boa legibilidade em qualquer tema
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    fontStyle: "italic",
    marginTop: 20,
  },
  deleteButton: {
    padding: 10,
    backgroundColor: "#f44336", // Cor vermelha para o botão de deletar
    borderRadius: 50,
  },
  floatingButton: {
    position: "absolute", // Fixa o botão na posição
    bottom: 20, // Coloca o botão na parte inferior
    right: 20, // Alinha o botão à direita
    zIndex: 1, // Garante que o botão fique sobre outros componentes
  },
});

export default HomeScreen;
