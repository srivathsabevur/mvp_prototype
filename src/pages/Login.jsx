import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleOnFinish = (values) => {
    console.log(values);
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 h-screen p-2">
      <div className="flex justify-center w-full min-h-[70vh]">
        <div className="p-3 bg-white border border-black/10 rounded-lg max-w-md w-full h-fit shadow-sm">
          <h1 className="text-3xl font-semibold  text-center mb-3">Login</h1>
          <h3 className="font-medium text-center mb-3">Welcome back user 👋</h3>
          <Form
            name="login"
            autoComplete="off"
            style={{ maxWidth: 700 }}
            onFinish={handleOnFinish}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please enter email" }]}
            >
              <Input
                type="email"
                prefix={<UserOutlined />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please enter password" }]}
            >
              <Input
                prefix={<LockOutlined />}
                placeholder="Password"
                type="password"
              />
            </Form.Item>
            <Form.Item>
              <a
                href="#"
                className="bg-blue-400 font-medium flex justify-center items-center"
              >
                Forgot password?
              </a>
            </Form.Item>
            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
