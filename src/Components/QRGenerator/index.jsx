import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRGenerator = ({ queueNumber, generateNextNumber }) => (
  <div style={{ textAlign: "center", marginTop: "20px" }}>
    <h2>QR-код для номера очереди</h2>
    <QRCodeCanvas value={queueNumber.toString()} size={256} />
    <div style={{ textAlign: "center", margin: "20px 0" }}>
        <button onClick={generateNextNumber} style={{ padding: "10px 20px", fontSize: "16px" }}>
          Сгенерировать следующий номер
        </button>

        <h1>{queueNumber}</h1>
      </div>
  </div>
);

export default QRGenerator;
