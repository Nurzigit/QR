import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QRScanner = ({ onScan }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("scanner", { fps: 10, qrbox: 250 });
    scanner.render(
      (decodedText) => {
        onScan(decodedText); // Обработка результата
        scanner.clear(); // Остановка сканера после успешного сканирования
      },
      (error) => {
        console.warn("QR Code scan error:", error);
      }
    );

    return () => {
      scanner.clear();
    };
  }, [onScan]);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Сканировать QR-код</h2>
      <div id="scanner" style={{ margin: "20px auto", width: "300px" }}></div>
    </div>
  );
};

export default QRScanner;