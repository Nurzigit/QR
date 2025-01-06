import React, { useState, useEffect } from "react";
import QRScanner from "./Components/QRScanner";
import QRGenerator from "./Components/QRGenerator";
import QrList from './Components/QrList';
import Header from "./Components/Header";
import Manager from "./Components/ManagerPage";
import { Route, Routes, Link } from "react-router-dom";
import "./App.css";

const App = () => {
  const [queueNumber, setQueueNumber] = useState(1);
  const [scannedQueue, setScannedQueue] = useState("");
  const [queueList, setQueueList] = useState([]);

  useEffect(() => {
    const fetchQueueData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/queue");
        const queueData = await response.json();
        const latestNumber =
          queueData.length > 0
            ? Math.max(...queueData.map((e) => e.queueNumber)) + 1
            : 1;
        setQueueList(queueData);
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
      setQueueList([...queueList, data]); // Добавление нового номера в список
    } catch (error) {
      console.error("Ошибка генерации следующего номера:", error);
    }
  };

  const handleScan = (decodedText) => {
    setScannedQueue(decodedText);
    alert(`Сканированный номер: ${decodedText}`);
  };

  // Функция для удаления элемента из очереди
  const removeQueueItem = (queueNumber) => {
    setQueueList(queueList.filter(item => item.queueNumber !== queueNumber));
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
        <Route
          path="/list"
          element={<QrList queueList={queueList} />}
        />
        <Route
          path="/manage"
          element={
            <Manager 
              queueList={queueList} 
              setQueueList={setQueueList} 
              removeQueueItem={removeQueueItem} 
            />
          }
        />
        <Route path="*" element={<h1 className="PageNotFind">Page Not Found</h1>} />
      </Routes>
    </div>
  );
};

export default App;
