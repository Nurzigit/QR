import React from "react";

const QrList = ({ queueList }) => {
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
