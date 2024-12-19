import React, { useState } from "react";
import QRScanner from "./Components/QRScanner";
import QRGenerator from "./Components/QRGenerator";

const App = () => {
  const [queueNumber, setQueueNumber] = useState(1);
  const [scannedQueue, setScannedQueue] = useState("");

  const handleScan = (decodedText) => {
    setScannedQueue(decodedText);
    alert(`Сканированный номер: ${decodedText}`);
  };

  return (
    <div>
      <QRGenerator queueNumber={queueNumber} />
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <button
          onClick={() => setQueueNumber(queueNumber + 1)}
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          Сгенерировать следующий номер
        </button>
      </div>
      <QRScanner onScan={handleScan} />
      {scannedQueue && (
        <p style={{ textAlign: "center", fontSize: "18px" }}>
          Вы сканировали номер: {scannedQueue}
        </p>
      )}
    </div>
  );
};

export default App;

