import React, { useState, useEffect } from "react";
import QRScanner from "./Components/QRScanner";
import QRGenerator from "./Components/QRGenerator";
import QrList from './Components/QrList'
import Header from "./Components/Header";
import Manager from "./Components/ManagerPage";
import { Route, Routes, Link } from "react-router-dom";
import "./App.css";

const App = () => {
  const [queueNumber, setQueueNumber] = useState(1);
  const [scannedQueue, setScannedQueue] = useState("");

  useEffect(() => {
    const fetchQueueData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/queue");
        const queueData = await response.json();
        const latestNumber =
          queueData.length > 0
            ? Math.max(...queueData.map((e) => e.queueNumber)) + 1
            : 1;
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
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <QRGenerator
              queueNumber={queueNumber}
              generateNextNumber={generateNextNumber}
            />
          }
        />
        <Route
          path="/scanner"
          element={
            <QRScanner onScan={handleScan} scannedQueue={scannedQueue} />
          }
        />
        <Route path="/list" element={<QrList />} />
        <Route path="/manage" element={<Manager />} />
        <Route path="*" element={<h1 className="PageNotFind">Page Not Found</h1>} />
      </Routes>
    </div>
  );
};

export default App;
