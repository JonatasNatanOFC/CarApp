import { Image, StyleSheet, Platform } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function CarScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D2D2D2", dark: "#3D3D3D" }}
      headerImage={
        <Image
          source={require("@/assets/images/carro-branco.png")}
          style={styles.initialLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Carros</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">
          Evolução tecnológica e inovação:
        </ThemedText>
        <ThemedText style={{ textAlign: "justify" }}>
          Nos últimos anos, os carros passaram por uma revolução tecnológica.
          Desde os sistemas de entretenimento mais sofisticados, como telas
          sensíveis ao toque e integração com smartphones, até a introdução de
          carros autônomos, a tecnologia transformou a experiência de dirigir.
          Carros híbridos e elétricos também estão se tornando cada vez mais
          populares, contribuindo para a redução da emissão de gases poluentes e
          promovendo a sustentabilidade.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Segurança e conforto:</ThemedText>
        <ThemedText style={{ textAlign: "justify" }}>
          A segurança automotiva melhorou significativamente ao longo dos anos,
          com a inclusão de tecnologias como freios automáticos, câmeras de ré,
          sensores de estacionamento e sistemas de assistência à condução
          (ADAS). Além disso, os carros modernos oferecem maior conforto, com
          assentos ergonômicos, controle de temperatura ajustável, e até
          suspensão adaptativa, que proporciona uma condução mais suave.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">
          Impacto ambiental e sustentabilidade:
        </ThemedText>
        <ThemedText style={{ textAlign: "justify" }}>
          Com o aumento das preocupações ambientais, os carros estão sendo cada
          vez mais projetados para reduzir seu impacto ecológico. Carros
          elétricos e híbridos são uma alternativa mais ecológica aos modelos
          tradicionais movidos a combustíveis fósseis. Além disso, fabricantes
          estão investindo em materiais recicláveis e em processos de produção
          mais sustentáveis, visando uma menor pegada de carbono ao longo do
          ciclo de vida do veículo. Esses três pontos mostram como os carros
          estão se adaptando às novas necessidades de tecnologia, segurança e
          responsabilidade ambiental.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  initialLogo: {
    height: 220,
    width: 300,
    bottom: 0,
    left: 0,
    position: 'absolute',
    marginLeft: 100,
  },
});
