import React, { useState, useEffect } from "react";
import QRScanner from "./Components/QRScanner";
import QRGenerator from "./Components/QRGenerator";

const App = () => {
  const [queueNumber, setQueueNumber] = useState(() => {
    // Инициализация из localStorage
    const savedData = JSON.parse(localStorage.getItem("queueData")) || [];
    return savedData.length > 0 ? Math.max(...savedData.map((e) => e.queueNumber)) + 1 : 1;
  });
  const [scannedQueue, setScannedQueue] = useState("");

  useEffect(() => {
    // Удаление данных в 00:00
    const checkMidnight = () => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        localStorage.setItem("queueData", JSON.stringify([]));
      }
    };

    const interval = setInterval(checkMidnight, 60 * 1000); // Проверяем каждую минуту
    return () => clearInterval(interval); // Очистка таймера
  }, []);

  const generateNextNumber = () => {
    const data = JSON.parse(localStorage.getItem("queueData")) || [];
    const entry = { queueNumber, timestamp: Date.now() };
    const updatedData = [...data, entry];
    localStorage.setItem("queueData", JSON.stringify(updatedData));
    setQueueNumber(queueNumber + 1);
  };

  const handleScan = (decodedText) => {
    setScannedQueue(decodedText);
    alert(`Сканированный номер: ${decodedText}`);
  };

  return (
    <div>
      <QRGenerator queueNumber={queueNumber} />
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <button
          onClick={generateNextNumber}
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
