"use client";
import React, { useState } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {
  Alert,
  Avatar,
  Button,
  Card,
  ConfigProvider,
  Flex,
  Form,
  FormProps,
  Input,
  Layout,
  theme,
} from "antd";
import axios from "axios";
import { useCookies } from "react-cookie";

const { Meta } = Card;
type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

//const App: React.FC = () => (
export default function App() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [_, setCookies] = useCookies(["token"]); //for check login

  const onFinish = async () => {
    const response = await axios.post("http://localhost:3001/login", {
      name,
      password,
    });

    if (response.data.token) {
      setCookies("token", response.data.token);
      window.localStorage.setItem("userId", response.data.userId);
    }

    setErrors(response.data.message);
  };
  return (
    <ConfigProvider
      theme={{
        // 1. Use dark algorithm
        algorithm: theme.defaultAlgorithm, //defaultAlgorithm
      }}
    >
      
      <Layout
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div style={{ width: "25vh" }}>
          <Flex justify="center" align="middle">
            <Avatar
              //style={{ backgroundColor: "#87d068" }}
              size={60}
              icon={<UserOutlined />}
            />
          </Flex>
          <br />
          <br />
          <Form name="normal_login" className="login-form" onFinish={onFinish}>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Button
              block
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form>
          <br />
          {errors && <Alert description={errors} type="error" showIcon />}
        </div>
      </Layout>
    </ConfigProvider>
  );
}
