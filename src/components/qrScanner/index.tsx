import React, { useEffect, useState } from "react";
import { useCameraDevices } from "react-native-vision-camera";
import { Camera } from "react-native-vision-camera";
import { useScanBarcodes, BarcodeFormat, Barcode } from "vision-camera-code-scanner";

interface QRScannerProps {
  onSuccess: (value: Barcode) => void
}

const QRScanner = ({ onSuccess }: QRScannerProps) => {
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === "authorized");
    })();
  }, []);

  useEffect(() => {
    if (barcodes.length > 0) {
      onSuccess(barcodes[0])
    }
  }, [barcodes])

  return (
    device != null &&
      hasPermission ? (
      <Camera
        style={{ flex: 1 }}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        frameProcessorFps={1}
      />
    ) : null
  );
}

export default QRScanner;