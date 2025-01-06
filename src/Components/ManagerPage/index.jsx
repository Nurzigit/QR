import React, { useState, useEffect } from "react";

const Manager = ({ queueList, setQueueList, removeQueueItem }) => {
  const [currentQueue, setCurrentQueue] = useState(null);
  const [missedQueue, setMissedQueue] = useState([]);

  const callNext = () => {
    if (queueList.length > 0) {
      const nextQueue = queueList[0]; // Получаем первый элемент
      setCurrentQueue(nextQueue);
      removeQueueItem(nextQueue.queueNumber); // Удаляем номер из списка очереди
    } else {
      alert("В очереди нет номеров");
    }
  };

  const markAsMissed = () => {
    if (currentQueue) {
      setMissedQueue([...missedQueue, currentQueue]);
      setCurrentQueue(null);
    } else {
      alert("Сейчас нет вызванного номера");
    }
  };

  const callMissed = () => {
    if (missedQueue.length > 0) {
      const lastMissed = missedQueue.pop();
      setCurrentQueue(lastMissed);
      setMissedQueue([...missedQueue]);
    } else {
      alert("Нет пропущенных номеров");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Управление Очередью</h2>
      <div>
        <h3>Текущий номер: {currentQueue ? currentQueue.queueNumber : "—"}</h3>
        <button
          onClick={callNext}
          style={{ margin: "10px", padding: "10px 20px" }}
        >
          Вызвать следующий номер
        </button>
        <button
          onClick={markAsMissed}
          style={{ margin: "10px", padding: "10px 20px" }}
        >
          Пропустить
        </button>
        <button
          onClick={callMissed}
          style={{ margin: "10px", padding: "10px 20px" }}
        >
          Вернуться к пропущенному
        </button>
      </div>
      <div>
        <h3>Список номеров в очереди</h3>
        <ul>
          {queueList.map((item) => (
            <li key={item.queueNumber}>
              Номер: {item.queueNumber}, Время:{" "}
              {new Date(item.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Пропущенные номера</h3>
        <ul>
          {missedQueue.map((item) => (
            <li key={item.queueNumber}>Номер: {item.queueNumber}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Manager;
