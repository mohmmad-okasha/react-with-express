"use client";
import React, { useState } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {
  Alert,
  Avatar,
  Button,
  Card,
  Checkbox,
  Form,
  FormProps,
  Input,
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
  const [_, setCookies] = useCookies(["token"]);//for check login

  const onFinish = async () => {
    const response = await axios.post("http://localhost:3001/login", {
      name,
      password,
    });

    if (response.data.token) {
      setCookies("token",response.data.token)
      window.localStorage.setItem('userId',response.data.userId)
    }

    setErrors(response.data.message);
  };

  // return (
  //   <div
  //     style={{
  //       display: "flex",
  //       justifyContent: "center",
  //       alignItems: "center",
  //       height: "100vh",
  //     }}
  //   >
  //     <Card loading={false} style={{ width: 500 }}>
  //       <Meta
  //         avatar={
  //           <Avatar
  //             size={50}
  //             src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"
  //           />
  //         }
  //         title="Login"
  //       />
  //       <br />
  //       <br />
  //       <br />
  //       <Form
  //         name="basic"
  //         labelCol={{ span: 8 }}
  //         wrapperCol={{ span: 16 }}
  //         style={{ maxWidth: 500 }}
  //         initialValues={{ remember: false }}
  //         onFinish={onFinish}
  //         onFinishFailed={onFinishFailed}
  //         autoComplete="off"
  //       >
  //         <Form.Item<FieldType>
  //           label="Username"
  //           name="username"
  //           rules={[{ required: true, message: "Please input your username!" }]}
  //         >
  //           <Input
  //             onChange={(e) => {
  //               setName(e.target.value);
  //             }}
  //           />
  //         </Form.Item>

  //         <Form.Item<FieldType>
  //           label="Password"
  //           name="password"
  //           rules={[{ required: true, message: "Please input your password!" }]}
  //         >
  //           <Input.Password
  //             onChange={(e) => {
  //               setPassword(e.target.value);
  //             }}
  //           />
  //         </Form.Item>

  //         <Form.Item<FieldType>
  //           name="remember"
  //           valuePropName="checked"
  //           wrapperCol={{ offset: 8, span: 16 }}
  //         >
  //           <Checkbox>Remember me</Checkbox>
  //         </Form.Item>

  //         <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
  //           <Button type="primary" htmlType="submit">
  //             Login
  //           </Button>
  //         </Form.Item>
  //         <br/>
  //         <Alert
  //           message="Error"
  //           description={errors}
  //           type="error"
  //           showIcon
  //         />
  //       </Form>
  //     </Card>
  //   </div>
  // );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card loading={false} style={{ width: "35vh" }}>
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
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
            rules={[{ required: true, message: "Please input your Password!" }]}
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
        {errors && < Alert description={errors} type="error" showIcon />}
      </Card>
    </div>
  );
}
