import React from "react";
import Head from "next/head";
import Header from "@/layouts/components/landingPage/Header";
import HeroSection from "@/layouts/components/landingPage/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Head>
        <title>EZ_Meet | Simplified Video Conferencing</title>
        <meta
          name="description"
          content="EZ_Meet - Transform your meetings with intelligent video conferencing"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Animated Navigation */}
      <Header />

      {/* Hero Section - Updated with gradient text background */}
      <main className="flex-grow pt-24">
        <HeroSection />
      </main>
    </div>
  );
}
