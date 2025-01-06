import React, { useEffect, useState } from "react";

const QrList = () => {
  const [queueList, setQueueList] = useState([]);

  useEffect(() => {
    const fetchQueueData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/queue");
        const data = await response.json();
        setQueueList(data);
      } catch (error) {
        console.error("Ошибка получения данных очереди:", error);
      }
    };
    fetchQueueData();
  }, []);

  return (
    <div className="list">
      <h3>Список очередей</h3>
      <ul>
        {queueList.map((item) => (
          <li key={item.queueNumber}>
            Номер: {item.queueNumber}, Время: {new Date(item.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QrList;