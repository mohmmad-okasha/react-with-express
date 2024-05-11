import { Menu, MenuProps, theme } from "antd";
import styles from "./styles.css";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

type MenuItem = Required<MenuProps>["items"][number];

export default function App() {
  const router = useRouter();
  const [_, setCookies] = useCookies(["loading"]);//for loading page

  const items: MenuItem[] = [
    {
      key: "1",
      icon: <PieChartOutlined />,
      label: "Home",
      onClick: () => {
        router.push("/");
      },
    },
    {
      key: "2",
      icon: <DesktopOutlined />,
      label: "Users",
      onClick: () => {
        router.push("/users");
        setCookies('loading',true)
      },
    },
    { key: "3", icon: <ContainerOutlined />, label: "Option 3" },
    {
      key: "sub1",
      label: "Navigation One",
      icon: <MailOutlined />,
      children: [
        { key: "5", label: "Option 5" },
        { key: "6", label: "Option 6" },
        { key: "7", label: "Option 7" },
        { key: "8", label: "Option 8" },
      ],
    },
    {
      key: "sub2",
      label: "Navigation Two",
      icon: <AppstoreOutlined />,
      children: [
        { key: "9", label: "Option 9" },
        { key: "10", label: "Option 10" },
        {
          key: "sub3",
          label: "Submenu",
          children: [
            { key: "11", label: "Option 11" },
            { key: "12", label: "Option 12" },
          ],
        },
      ],
    },
  ];

  //collaps or not on button click
  const [collaps, setCollaps] = useState(false);
  const changeCollaps = () => {
    setCollaps(!collaps);
  };

  return (
    <>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        collapsed={collaps}
        onCollapse={changeCollaps}
        
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          style={styles.menu}
        />
      </Sider>
    </>
  );
}
