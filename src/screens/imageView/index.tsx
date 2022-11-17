import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  View,
  useColorScheme,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
import { Barcode } from "vision-camera-code-scanner";

import { getThemeStyles } from "./styles";
import { QRScanner } from "../../components"

type ListScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList
>;

interface ImageViewScreenRouteParams {
  imageUrl?: string;
}

const ImageViewScreen = ({ route }: ListScreenNavigationProp) => {
  const isDarkMode = useColorScheme() === "dark";
  const styles = getThemeStyles(isDarkMode);

  const { imageUrl } = route.params as ImageViewScreenRouteParams;


  const [qrScannerVisible, setQrScannerVisibilityState] = useState(false);
  const [qrResults, setQrResults] = useState<string[]>([]);


  const handlePressAdd = () => {
    setQrScannerVisibilityState(true);
  }

  const handleCloseQrScanner = () => {
    setQrScannerVisibilityState(false);
  }

  const onScanQrSuccess = (value: Barcode) => {
    if (value && value.displayValue) {
      setQrResults([...qrResults, value.displayValue])
      setQrScannerVisibilityState(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ReactNativeZoomableView
        maxZoom={2}
        minZoom={1}
        zoomStep={0.5}
        initialZoom={1}
        bindToBorders={true}
      >
        <Image source={{ uri: imageUrl }} style={{ width: "100%", height: "100%" }} />
      </ReactNativeZoomableView>
      <View style={styles.bottomContainer}>
        <View style={{ flex: 1 }}>
          {
            qrResults.map((result, i) => (
              <Text key={i.toString()}>{result}</Text>
            ))
          }
        </View>
        <View style={styles.bottomTabs}>
          <TouchableOpacity style={styles.tab} onPress={handlePressAdd}>
            <Text style={styles.scanQrBtnLabel}>Scan QR</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={qrScannerVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={handleCloseQrScanner} style={{ margin: 15 }}>
            <Text style={styles.cancelBtn}>Cancel</Text>
          </TouchableOpacity>
          <QRScanner onSuccess={onScanQrSuccess} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};


export default ImageViewScreen;
