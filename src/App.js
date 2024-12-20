// 

import React, { useState, useEffect } from "react";
import QRScanner from "./Components/QRScanner";
import QRGenerator from "./Components/QRGenerator";

const App = () => {
  const [queueNumber, setQueueNumber] = useState(1);
  const [scannedQueue, setScannedQueue] = useState("");

  useEffect(() => {
    const fetchQueueData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/queue");
        const queueData = await response.json();
        const latestNumber = queueData.length > 0 ? Math.max(...queueData.map(e => e.queueNumber)) + 1 : 1;
        setQueueNumber(latestNumber);
      } catch (error) {
        console.error("Ошибка получения данных очереди:", error);
      }
    };
    fetchQueueData();
  }, []);

  const generateNextNumber = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/queue/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setQueueNumber(data.queueNumber);
    } catch (error) {
      console.error("Ошибка генерации следующего номера:", error);
    }
  };

  const handleScan = (decodedText) => {
    setScannedQueue(decodedText);
    alert(`Сканированный номер: ${decodedText}`);
  };

  return (
    <div>
      <QRGenerator queueNumber={queueNumber} />
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <button onClick={generateNextNumber} style={{ padding: "10px 20px", fontSize: "16px" }}>
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
