import { Button, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import Link from "next/link";
import React, { useState } from "react";
import { PoweroffOutlined } from "@ant-design/icons";
import { useCookies } from "react-cookie";

export default function app() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [_, setCookies] = useCookies(["token"]);

  const logout = () =>{
    setCookies('token','')
    window.localStorage.removeItem('userId')
  }

  return (
    <>
      <Header
        style={{
          textAlign: "right",
          marginLeft: -30,
          background: colorBgContainer,
        }}
      >
        <Button onClick={logout} icon={<PoweroffOutlined />} />
      </Header>
    </>
  );
}
