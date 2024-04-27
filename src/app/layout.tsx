import React from 'react';
import type { Metadata } from "next";
import Header from "./components/header/header";
import ProviderComponent from './provider';
import { ToastContainer } from 'react-toastify';
import "./styles/globals.scss";

export const metadata: Metadata = {
  title: "LearnLingo",
  description: "LearnLingo description",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ProviderComponent>
          <Header />
          {modal}
          {children}
          <ToastContainer />
        </ProviderComponent>
      </body>
    </html>
  );
}
