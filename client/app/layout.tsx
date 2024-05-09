"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import Login from "./login/page";

import { ConfigProvider, Layout, theme } from "antd";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

const { Content, Footer } = Layout;

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [Authed, setAuthed] = useState('');
  const [cookies,setCookies] = useCookies(["token"])

  useEffect(()=>{
    if(cookies.token) setAuthed('true')
      else setAuthed('false')
  },[cookies.token])

  return (
    <html lang="en">
      <body className={inter.className}>
        {Authed==='false' && <Login />}
        {Authed==='true' && 
          <ConfigProvider>
            <Layout hasSider style={{ minHeight: "100vh" }}>
              <SideBar />

              <Layout style={{ marginLeft: 30 }}>
                <NavBar />
                <br />
                <Content
                  style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                  }}
                >
                  {children} {/* content will show here */}
                </Content>
                <Footer style={{ textAlign: "center" }}>
                  ©{new Date().getFullYear()} Created by Mohammad Okasha
                </Footer>
              </Layout>
            </Layout>
          </ConfigProvider>
        }
      </body>
    </html>
  );
}
