// This page unlike the other ones does not use a template and is its own thing.

import { useState } from 'react';

export default function Ark360Studios() {
  // Employee data - easily customizable
  const employees = [
    {
      name: "Ark (zenith)",
      role: "Owner of ArkIDE, Main developer and admin.",
      pfpUrl: "https://arkideapi.arc360hub.com/api/v1/users/getpfp?username=zenith", // Set your image path
      profileUrl: "https://arkide.site/profile?user=ark" // Set profile link
    },
    {
      name: "Insomnia64",
      role: "Co-Owner of ArkIDE, Admin, Main artist and event manager.",
      pfpUrl: "https://arkideapi.arc360hub.com/api/v1/users/getpfp?username=insomnia64",
      profileUrl: "https://arkide.site/profile?user=insomnia64"
    },
    {
      name: "w9pti",
      role: "Moderator, Main advertiser.",
      pfpUrl: "https://arkideapi.arc360hub.com/api/v1/users/getpfp?username=w9pti",
      profileUrl: "https://arkide.site/profile?user=w9pti"
    }
  ];

  // Other projects data
  const otherProjects = [
    {
      name: "Ark (snowyy)",
      role: "The soul developer and maintainer of all the other projects.",
      pfpUrl: "https://avatars.githubusercontent.com/u/155182753?v=4&size=64",
      profileUrl: "https://github.com/arc360alt"
    }
  ];


    const products = [
    {
        name: "ArkIDE",
        logoUrl: "/arkide.svg", 
        websiteUrl: "https://arkide.site",
        glowColors: ["#3700ffff"] 
    },
    {
        name: "OptiArk",
        logoUrl: "/optiark.png",
        websiteUrl: "https://optiark.arc360hub.com",
        glowColors: ["#A7AEFF"]
    },
    {
        name: "SyntaxAI",
        logoUrl: "/syntxai.png",
        websiteUrl: "https://syntaxai.arc360hub.com",
        glowColors: ["#337DFF", "#9522FB"]
    }
    ];

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [hoveredLogo, setHoveredLogo] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold mb-2 relative">
        <span 
            className="absolute text-blue-600 blur-3xl opacity-100"
            style={{
            textShadow: 'none'
            }}
        >
            ARK360
        </span>
        <span 
            className="relative text-blue-600"
        >
            ARK360
        </span>
        </h1>
        <h2 className="text-4xl md:text-6xl font-bold mb-4 relative">
        <span 
            className="absolute text-white blur-3xl opacity-100"
        >
            STUDIOS
        </span>
        <span 
            className="relative text-white"
        >
            STUDIOS
        </span>
        </h2>
        <p className="text-xl mb-16">We make things</p>
        
        <div className="animate-bounce">
          <button 
            onClick={scrollToProducts}
            className="focus:outline-none hover:scale-110 transition-transform"
            aria-label="Scroll to products"
          >
            <svg 
              className="w-12 h-12 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* Products Section */}
      <section id="products-section" className="py-20 px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          We are the creators of:
        </h2>
        
        <div className="flex flex-wrap justify-center items-center gap-8 max-w-4xl mx-auto">
          {products.map((product, index) => (
            <a
                    key={index}
                    href={product.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative cursor-pointer transition-all duration-300 transform hover:scale-110 block"
                    onMouseEnter={() => setHoveredLogo(index)}
                    onMouseLeave={() => setHoveredLogo(null)}
                >
                <img 
                src={product.logoUrl} 
                alt=""
                className="absolute h-20 md:h-24 object-contain"
                style={{
                    filter: hoveredLogo === index ? 'blur(20px)' : 'blur(15px)',
                    opacity: hoveredLogo === index ? 0.8 : 0.6
                }}
                />
                <img 
                src={product.logoUrl} 
                alt={product.name}
                className="h-20 md:h-24 object-contain relative z-10"
                />
            </a>
          ))}
        </div>
      </section>

      {/* Employees Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <h2 className="text-4xl font-bold text-center mb-4">
          Employees of Ark360 Studios:
        </h2>
        
        <h3 className="text-2xl font-bold mb-8 px-4 max-w-6xl mx-auto">ArkIDE:</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 mb-16">
          {employees.map((employee, index) => (
            <a
              key={index}
              href={employee.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 bg-opacity-50 rounded-lg p-6 flex items-start gap-4 hover:bg-opacity-70 transition-all duration-300 hover:scale-105 cursor-pointer border border-gray-700 hover:border-blue-500"
            >
              <div className="flex-shrink-0">
                <img
                  src={employee.pfpUrl}
                  alt={employee.name}
                  className="w-16 h-16 rounded-full bg-gray-700 border-2 border-gray-600"
                />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">{employee.name}</h4>
                <p className="text-sm text-gray-300">{employee.role}</p>
              </div>
            </a>
          ))}
        </div>

        <h3 className="text-2xl font-bold mb-8 px-4 max-w-6xl mx-auto">Other Projects:</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {otherProjects.map((person, index) => (
            <a
              key={index}
              href={person.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 bg-opacity-50 rounded-lg p-6 flex items-start gap-4 hover:bg-opacity-70 transition-all duration-300 hover:scale-105 cursor-pointer border border-gray-700 hover:border-blue-500"
            >
              <div className="flex-shrink-0">
                <img
                  src={person.pfpUrl}
                  alt={person.name}
                  className="w-16 h-16 rounded-full bg-gray-700 border-2 border-gray-600"
                />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">{person.name}</h4>
                <p className="text-sm text-gray-300">{person.role}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 text-center">
        <p className="text-xl mb-6 max-w-5xl mx-auto">
          If you think you can help out, Join our discord to get a spot in our team! You can still contribute to our code for free though.
        </p>
        
        <a
          href="https://discord.gg/mYdcjn6YMV"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
        >
          Join our discord!
        </a>
        
        <p className="text-sm text-gray-400 mt-6 max-w-5xl mx-auto">
          (If you join you will be doing this for volunteer work until I get enough money to pay people)
        </p>
      </section>

      {/* Extra Custom Section
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Extra section that I can put extra HTML in later.
          </h2>

          <div className="custom-content-area space-y-8">
            
            <div className="bg-gray-800 bg-opacity-30 rounded-lg p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-4">Custom Section 1</h3>
              <p className="text-gray-300">Add your custom content here...</p>
            </div>
            
            <div className="bg-gray-800 bg-opacity-30 rounded-lg p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-4">Custom Section 2</h3>
              <p className="text-gray-300">Add more content as needed...</p>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Logo Section */}
            <div className="col-span-1 md:col-span-1">
              <h3 className="text-2xl font-bold mb-2">
                <span className="text-blue-600">ARK360 Studios</span>
              </h3>
              <p className="text-sm text-gray-400">We make things</p>
            </div>
            
            {/* Products */}
            <div>
              <h4 className="font-bold mb-4 text-lg">Products</h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://arkide.site" className="text-gray-400 hover:text-blue-500 transition-colors">
                    ArkIDE
                  </a>
                </li>
                <li>
                  <a href="https://optiark.arc360.com" className="text-gray-400 hover:text-blue-500 transition-colors">
                    OptiArk
                  </a>
                </li>
                <li>
                  <a href="https://syntaxai.arc360.com" className="text-gray-400 hover:text-blue-500 transition-colors">
                    SyntaxAI
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Company */}
            <div>
              <h4 className="font-bold mb-4 text-lg">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://arc360hub.com" className="text-gray-400 hover:text-blue-500 transition-colors">
                    Main website
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Social */}
            <div>
              <h4 className="font-bold mb-4 text-lg">Social</h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://discord.gg/mYdcjn6YMV" className="text-gray-400 hover:text-blue-500 transition-colors">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="https://github.com/arc360alt" className="text-gray-400 hover:text-blue-500 transition-colors">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2020-2025 ARK360 Studios. All rights reserved. We are not a real regristerd company.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}