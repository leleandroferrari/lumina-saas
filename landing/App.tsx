
import React from 'react';
import { ThemeProvider } from './themeContext';
import Navbar from './components/landing/Navbar';
import Hero from './components/landing/Hero';
import Features from './components/landing/Features';
import CallToAction from './components/landing/CallToAction';
import Footer from './components/landing/Footer';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-700">
        <Navbar />
        <main>
          <Hero />
          <Features />
          <CallToAction />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
