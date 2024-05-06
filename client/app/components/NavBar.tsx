import { Button, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import Link from "next/link";
import React, { useState } from "react";
import { PoweroffOutlined } from "@ant-design/icons";

export default function app() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  return (
    <>
      <Header
        style={{
          textAlign: "right",
          marginLeft: -30,
          background: colorBgContainer,
        }}
      >
        <Link href="/login">
          <Button icon={<PoweroffOutlined />} />
        </Link>
      </Header>
    </>
  );
}
