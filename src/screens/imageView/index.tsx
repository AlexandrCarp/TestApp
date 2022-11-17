import React, { useState, useRef } from "react";
import {
  Image,
  SafeAreaView,
  View,
  useColorScheme,
  Text,
  TouchableOpacity,
  Modal,
  Platform,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
import { Barcode } from "vision-camera-code-scanner";
import { ModalView } from 'react-native-ios-modal';

import { getThemeStyles } from "./styles";
import { QRScanner } from "../../components"

type ListScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList
>;

interface ImageViewScreenRouteParams {
  imageUrl?: string;
}

const ImageViewScreen = ({ route }: ListScreenNavigationProp) => {
  const iosModalRef = useRef<ModalView>(null);

  const isDarkMode = useColorScheme() === "dark";
  const styles = getThemeStyles(isDarkMode);

  const { imageUrl } = route.params as ImageViewScreenRouteParams;


  const [qrScannerVisible, setQrScannerVisibilityState] = useState(false);
  const [qrResults, setQrResults] = useState<string[]>([]);


  const handlePressAdd = () => {
    if (Platform.OS === "ios") {
      iosModalRef.current.setVisibility(true)
    } else {
      setQrScannerVisibilityState(true);
    }
  }

  const handleCloseQrScanner = () => {
    if (Platform.OS === "ios") {
      iosModalRef.current.setVisibility(false)
    } else {
      setQrScannerVisibilityState(false);
    }
  }

  const onScanQrSuccess = (value: Barcode) => {
    if (value && value.displayValue) {
      setQrResults([...qrResults, value.displayValue])
      handleCloseQrScanner();
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
      {
        Platform.OS === "ios" &&
        <ModalView ref={iosModalRef}>
          <View style={styles.iosModalContainer}>
            <TouchableOpacity onPress={handleCloseQrScanner} style={{ margin: 15 }}>
              <Text style={styles.cancelBtn}>Cancel</Text>
            </TouchableOpacity>
            <QRScanner onSuccess={onScanQrSuccess} />
          </View>
        </ModalView>
      }
      {
        Platform.OS === "android" &&
        <Modal visible={qrScannerVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={handleCloseQrScanner} style={{ margin: 15 }}>
              <Text style={styles.cancelBtn}>Cancel</Text>
            </TouchableOpacity>
            <QRScanner onSuccess={onScanQrSuccess} />
          </View>
        </Modal>
      }
    </SafeAreaView>
  );
};


export default ImageViewScreen;
