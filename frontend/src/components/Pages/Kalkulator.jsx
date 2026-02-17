import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Card,
  Row,
  Col,
  message,
  Alert,
} from "antd";
import { RightOutlined, CheckOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function Kalkulator() {
  const [result, setResult] = useState("");
  const [advice, setAdvice] = useState("");
  const [image, setImage] = useState("");
  const [gender, setGender] = useState(null);

  const handlePredict = async (values) => {
    const { height, age } = values;
    const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ height, age, gender }),
      });

      const data = await response.json();

      if (data.prediction) {
        setResult(`Status Gizi Anak: ${data.prediction}`);
        message.success("Prediksi berhasil!");
        generateAdvice(data.prediction);
      } else if (data.error) {
        setResult(`Error: ${data.error}`);
        message.error("Terjadi kesalahan pada prediksi.");
      }
    } catch (error) {
      setResult(`Error: ${error.message}`);
      message.error("Gagal terhubung ke server.");
    }
  };

  const generateAdvice = (prediction) => {
    let adviceText = "";
    let imageUrl = "";
    switch (prediction) {
      case "normal":
        adviceText =
          "Anak Anda berada dalam status gizi normal. Pastikan untuk menjaga pola makan yang seimbang, cukup protein, vitamin, dan mineral.";
        imageUrl = "/images/status/normal.png";
        break;
      case "stunted":
        adviceText =
          "Anak Anda mengalami stunting. Disarankan untuk konsultasi dengan ahli gizi dan memberikan asupan makanan yang kaya protein, zat besi, dan kalsium.";
        imageUrl = "/images/status/stunted.png";
        break;
      case "severely stunted":
        adviceText =
          "Anak Anda mengalami stunting parah. Segera konsultasikan ke dokter atau ahli gizi untuk penanganan yang tepat dan memberikan suplemen yang diperlukan.";
        imageUrl = "/images/status/severely_stunted.png";
        break;
      case "tinggi":
        adviceText =
          "Anak Anda memiliki tinggi badan yang baik. Pastikan untuk tetap memberikan asupan nutrisi yang seimbang untuk mendukung pertumbuhannya.";
        imageUrl = "/images/status/tinggi.png";
        break;
      default:
        adviceText =
          "Prediksi tidak dikenali. Harap coba lagi atau konsultasikan dengan profesional kesehatan.";
        imageUrl = "/images/status/unknown.png";
    }
    setAdvice(adviceText);
    setImage(imageUrl);
  };

  const selectGender = (selectedGender) => {
    setGender(selectedGender);
  };

  return (
    <Card
      style={{
        maxWidth: 500,
        margin: "40px auto",
        padding: 20,
        borderRadius: 8,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Title level={3} style={{ textAlign: "center", color: "#4CAF50" }}>
        Kalkulator Perhitungan
      </Title>
      <Title
        level={4}
        style={{ textAlign: "center", color: "#4CAF50", marginBottom: 20 }}
      >
        Status Perkembangan Gizi Anak
      </Title>

      <Text
        style={{
          fontSize: 16,
          color: "#333",
          display: "block",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Anak Anda:
      </Text>

      <Row gutter={16} justify="center" style={{ marginBottom: 20 }}>
        <Col span={12} style={{ textAlign: "center" }}>
          <Card
            hoverable
            onClick={() => selectGender(1)}
            style={{
              borderColor: gender === 1 ? "#4CAF50" : "#e0e0e0",
              borderWidth: gender === 1 ? 2 : 1,
              padding: 10,
            }}
            bodyStyle={{ padding: 0 }}
          >
            <img
              src="/images/form/boy.png"
              alt="Laki-laki"
              style={{ width: 80, borderRadius: "50%" }}
            />
            <Text>Laki-laki</Text>
            {gender === 1 && (
              <CheckOutlined
                style={{ color: "#4CAF50", fontSize: 20, marginTop: 5 }}
              />
            )}
          </Card>
        </Col>
        <Col span={12} style={{ textAlign: "center" }}>
          <Card
            hoverable
            onClick={() => selectGender(0)}
            style={{
              borderColor: gender === 0 ? "#4CAF50" : "#e0e0e0",
              borderWidth: gender === 0 ? 2 : 1,
              padding: 10,
            }}
            bodyStyle={{ padding: 0 }}
          >
            <img
              src="/images/form/girl.png"
              alt="Perempuan"
              style={{ width: 80, borderRadius: "50%" }}
            />
            <Text>Perempuan</Text>
            {gender === 0 && (
              <CheckOutlined
                style={{ color: "#4CAF50", fontSize: 20, marginTop: 5 }}
              />
            )}
          </Card>
        </Col>
      </Row>

      <Form
        layout="vertical"
        onFinish={handlePredict}
        style={{ textAlign: "left" }}
      >
        <Form.Item
          label="Usia Anak (0-60 bulan)"
          name="age"
          rules={[{ required: true, message: "Masukkan umur dalam bulan" }]}
        >
          <Input
            addonAfter="Bulan"
            type="number"
            placeholder="Masukkan umur anak"
          />
        </Form.Item>

        <Form.Item
          label="Tinggi Badan Anak"
          name="height"
          rules={[{ required: true, message: "Masukkan tinggi badan anak" }]}
        >
          <Input
            addonAfter="Cm"
            type="number"
            placeholder="Masukkan tinggi badan anak"
          />
        </Form.Item>

        <Text type="secondary" style={{ display: "block", marginBottom: 10 }}>
          Note: Jika anak Anda belum bisa berdiri, pengukuran dilakukan dengan
          cara berbaring.
        </Text>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            icon={<RightOutlined />}
            style={{ backgroundColor: "#4CAF50", borderColor: "#4CAF50" }}
            disabled={gender === null}
          >
            Hitung
          </Button>
        </Form.Item>
      </Form>

      {result && (
        <>
          <Alert
            message={result}
            description={advice}
            type="info"
            showIcon
            style={{ marginTop: 20 }}
          />
        </>
      )}
    </Card>
  );
}

export default Kalkulator;
