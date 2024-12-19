import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRGenerator = ({ queueNumber }) => (
  <div style={{ textAlign: "center", marginTop: "20px" }}>
    <h2>QR-код для номера очереди</h2>
    <QRCodeCanvas value={queueNumber.toString()} size={256} />
    <p>Номер: {queueNumber}</p>
  </div>
);

export default QRGenerator;
