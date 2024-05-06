"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import Login from "./login/page";

import { Layout, theme } from "antd";
import { useState } from "react";

const { Content, Footer } = Layout;

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [Authed, setAuthed] = useState(true);

  return (
    <html lang="en">
      <body className={inter.className}>
        {!Authed && <Login />}
        {Authed && (
          <Layout hasSider style={{ minHeight: "100vh" }}>
            <SideBar />

            <Layout style={{ marginLeft: 30 }}>
              <NavBar />
              <br /> <br /> <br />
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
        )}
      </body>
    </html>
  );
}