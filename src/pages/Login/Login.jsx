import { useState } from "react";
import { Layout, Button, Row, Col, Typography, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const { Content } = Layout;
const { Title } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleLogin = async () => {
    navigate("/dashboard", { replace: true });
  };

  const onValuesChange = (changedValues, allValues) => {
    const { username, password } = allValues;
    setIsButtonDisabled(!(username && password));
  };

  return (
    <Layout className="layout-default">
      <Content className="login-container">
        <div className="background-decor"></div>
        <div className="login-box">
          <Title className="login-title" level={2}>Stunting</Title>
          <Title className="subtitle" level={5}>Website Resmi</Title>
          <Form
            form={form}
            onFinish={handleLogin}
            layout="vertical"
            onValuesChange={onValuesChange}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Please input your username!" }]}
            >
              <Input placeholder="Username" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-button"
                disabled={isButtonDisabled}
              >
                SIGN IN
              </Button>
            </Form.Item>

            <div className="forgot-password">Forgot password?</div>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default LoginPage;
