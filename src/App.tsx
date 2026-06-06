import React, { useState, useEffect, useRef } from 'react';
import { Play, Menu, X, ChevronDown, CheckCircle, ArrowRight, BookOpen, Download, Mail, Star, RefreshCw, Layers, Zap, Award } from 'lucide-react';

// --- APP ASSET IMPORTS ---
import iconCcna from '../images/Icon-ccna.png';
import screenshot1 from '../images/Screenshot_20260603-152235.png';
import screenshot2 from '../images/Screenshot_20260603-152242.png';
import screenshot3 from '../images/Screenshot_20260603-152250.png';
import screenshot4 from '../images/Screenshot_20260603-152300.png';
import screenshot5 from '../images/Screenshot_20260603-152303.png';

// --- STYLESHEET DEFINITION ---
const CSS_STYLES = `
  /* Resets & Fonts */
  html {
    scroll-behavior: smooth;
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    background-color: #F0F7FF;
    color: #0D1B3E;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  *, *::before, *::after {
    box-sizing: inherit;
  }
  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    line-height: 1.7;
  }

  /* Global Classes */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }
  .sec-pad {
    padding: 100px 0;
  }
  .section-title {
    font-size: 36px;
    font-weight: 700;
    color: #0D3B8C;
    text-align: center;
    margin-bottom: 20px;
  }
  .section-tagline {
    font-size: 16px;
    font-weight: 600;
    color: #1A6FD4;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    text-align: center;
    margin-bottom: 48px;
  }
  .gradient-text {
    background: linear-gradient(135deg, #1A6FD4 0%, #38BDF8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Buttons */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 14px 28px;
    border-radius: 9999px;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, background-color 0.2s ease;
  }
  .btn:hover {
    transform: scale(1.03);
  }
  .btn-primary {
    background-color: #1A6FD4;
    color: #FFFFFF;
    box-shadow: 0 4px 14px rgba(26, 111, 212, 0.3);
    border: none;
  }
  .btn-secondary {
    background: rgba(255, 255, 255, 0.15);
    color: #FFFFFF;
    border: 1px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(12px);
  }
  .btn-black {
    background-color: #0D1B3E;
    color: #FFFFFF;
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  }

  /* Cards & Glassmorphism */
  .glass-card {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 16px;
    padding: 24px;
    color: #FFFFFF;
  }
  .white-card {
    background-color: #FFFFFF;
    border-radius: 16px;
    padding: 32px;
    box-shadow: 0 4px 20px rgba(13, 59, 140, 0.05);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }
  .white-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(13, 59, 140, 0.12);
  }

  /* Responsive Layout Grids */
  .hero-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 40px;
    align-items: center;
  }
  .features-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
  .whychoose-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
  }
  .modules-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  .simulators-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
  }
  .preview-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    justify-items: center;
  }
  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 48px;
  }
  .footer-grid {
    display: grid;
    grid-template-columns: 1.5fr repeat(3, 24px);
    grid-template-columns: 1.5fr 1fr 1fr 1fr;
    gap: 40px;
  }

  /* CSS Keyframes */
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  .floating-element {
    animation: float 4s ease-in-out infinite;
  }

  @keyframes pulseOpacity {
    0% { opacity: 0.4; }
    50% { opacity: 1; }
    100% { opacity: 0.4; }
  }
  .pulse-node {
    animation: pulseOpacity 2s ease-in-out infinite;
  }

  /* Fade-in Scroll Animations */
  .section-fade {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .section-fade.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Media Queries for Breakpoints */
  @media (max-width: 1023px) {
    .sec-pad { padding: 80px 0; }
    .hero-grid { grid-template-columns: 1fr; text-align: center; }
    .features-grid { grid-template-columns: repeat(2, 1fr); }
    .modules-grid { grid-template-columns: 1fr; }
    .simulators-grid { grid-template-columns: 1fr; }
    .stats-grid { grid-template-columns: repeat(3, 1fr); }
    .preview-grid { grid-template-columns: 1fr; gap: 40px; }
    .testimonials-grid { grid-template-columns: 1fr; }
    .contact-grid { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 767px) {
    .features-grid { grid-template-columns: 1fr; }
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
    .whychoose-grid { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr; }
    .section-title { font-size: 30px; }
  }
`;

export default function App() {
  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const fadeSections = document.querySelectorAll('.section-fade');
    fadeSections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS_STYLES }} />
      <div style={{ backgroundColor: '#F0F7FF', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* 1. NAVBAR COMPONENT */}
        <Navbar />

        {/* 2. HERO SECTION */}
        <HeroSection />

        {/* 3. STATS SECTION */}
        <StatsSection />

        {/* 4. FEATURES SECTION */}
        <FeaturesSection />

        {/* 5. WHY CHOOSE SECTION */}
        <WhyChooseSection />

        {/* 6. LEARNING MODULES SECTION */}
        <LearningModulesSection />

        {/* 7. INTERACTIVE SIMULATORS SECTION */}
        <SimulatorsSection />

        {/* 8. LEARNING JOURNEY ROADMAP */}
        <LearningJourneySection />

        {/* 9. APP PREVIEW MOCKUPS */}
        <AppPreviewSection />

        {/* 10. TESTIMONIALS SECTION */}
        <TestimonialsSection />

        {/* 11. FAQ SECTION ACCORDION */}
        <FAQSection />

        {/* 12. DOWNLOAD APP CTA SECTION */}
        <DownloadSection />

        {/* 13. CONTACT FORM SECTION */}
        <ContactSection />

        {/* 14. FOOTER COMPONENT */}
        <Footer />

      </div>
    </>
  );
}

// ------ 1. NAVBAR COMPONENT ------
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.65)',
      backdropFilter: 'blur(20px)',
      borderBottom: scrolled ? '1px solid rgba(26, 111, 212, 0.1)' : '1px solid transparent',
      boxShadow: scrolled ? '0 10px 30px -10px rgba(13, 59, 140, 0.08)' : 'none',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '80px'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => scrollTo('hero')}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(13, 59, 140, 0.15)',
            border: '1px solid rgba(26, 111, 212, 0.15)'
          }}>
            <img src={iconCcna} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} referrerPolicy="no-referrer" />
          </div>
          <span style={{ fontSize: '20px', fontWeight: 800, color: '#0D3B8C', letterSpacing: '-0.5px' }}>
            CCNA <span style={{ color: '#1A6FD4' }}>Zero2Hero</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="desktop-links" style={{ display: 'flex', gap: '28px' }}>
          {[
            { label: 'Features', id: 'features' },
            { label: 'Modules', id: 'modules' },
            { label: 'Simulators', id: 'simulators' },
            { label: 'Roadmap', id: 'journey' },
            { label: 'Screens', id: 'preview' },
            { label: 'FAQs', id: 'faq' }
          ].map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              style={{
                fontFamily: 'inherit',
                fontSize: '15px',
                fontWeight: 600,
                color: '#4A6FA5',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s',
                padding: '8px 0'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#1A6FD4')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#4A6FA5')}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <div className="desktop-links" style={{ display: 'flex' }}>
          <button onClick={() => scrollTo('download')} className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '14px' }}>
            Download App
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            display: 'none', // Managed in media queries or responsive triggers below
            border: 'none',
            background: 'none',
            color: '#0D3B8C',
            cursor: 'pointer'
          }}
          className="mobile-toggle-btn"
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* CSS injection specifically for responsiveness inside React */}
      <style>{`
        @media (max-width: 1023px) {
          .desktop-links { display: none !important; }
          .mobile-toggle-btn { display: block !important; }
        }
      `}</style>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '80px',
          left: 0,
          right: 0,
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid rgba(26, 111, 212, 0.1)',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: '0 15px 30px rgba(13, 59, 140, 0.08)',
          zIndex: 999
        }}>
          {[
            { label: 'Features', id: 'features' },
            { label: 'Why Choose Us', id: 'why-choose' },
            { label: 'Learning Modules', id: 'modules' },
            { label: 'Interactive Simulators', id: 'simulators' },
            { label: 'Learning Roadmap', id: 'journey' },
            { label: 'App Preview', id: 'preview' },
            { label: 'FAQs', id: 'faq' },
            { label: 'Contact', id: 'contact' }
          ].map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              style={{
                textAlign: 'left',
                padding: '10px 0',
                border: 'none',
                background: 'none',
                fontSize: '16px',
                fontWeight: 600,
                color: '#0D1B3E',
                cursor: 'pointer'
              }}
            >
              {link.label}
            </button>
          ))}
          <button onClick={() => scrollTo('download')} className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            Download App
          </button>
        </div>
      )}
    </nav>
  );
}

// ------ 2. HERO SECTION ------
function HeroSection() {
  const scrollDown = () => {
    const el = document.getElementById('features');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" style={{
      background: 'linear-gradient(135deg, #0D3B8C 0%, #1A6FD4 50%, #38BDF8 100%)',
      padding: '120px 0 100px 0',
      color: '#FFFFFF',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Decorative Blur Background Element */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-10%',
        width: '500px',
        height: '500px',
        background: 'rgba(56, 189, 248, 0.3)',
        filter: 'blur(120px)',
        borderRadius: '50%'
      }} />

      <div className="container">
        <div className="hero-grid">
          {/* Left Text Column */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h1 style={{
              fontSize: '56px',
              fontWeight: 800,
              lineHeight: 1.15,
              margin: '0 0 24px 0',
              letterSpacing: '-1.5px',
              fontFamily: 'inherit'
            }}>
              Master Networking <br />
              the <span className="gradient-text" style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #38BDF8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Smart Way</span>
            </h1>
            
            <p style={{
              fontSize: '18px',
              lineHeight: 1.7,
              color: 'rgba(240, 247, 255, 0.9)',
              margin: '0 0 36px 0',
              maxWidth: '540px'
            }}>
              Stop reading boring textbooks. Visualize real-world routing, interact with live protocol simulators, and prepare for Cisco <strong>CCNA 200-301</strong> in simplified Hinglish.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '48px' }}>
              <a href="#download" onClick={(e) => { e.preventDefault(); document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn btn-primary" style={{ backgroundColor: '#FFFFFF', color: '#1A6FD4' }}>
                Download Now
              </a>
              <a href="#simulators" onClick={(e) => { e.preventDefault(); document.getElementById('simulators')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn btn-secondary">
                <Play size={18} style={{ marginRight: '8px', fill: 'currentColor' }} /> Watch Demo
              </a>
            </div>

            {/* Trust Badges */}
            <div style={{ 
              display: 'flex', 
              gap: '20px', 
              flexWrap: 'wrap', 
              borderTop: '1px solid rgba(255, 255, 255, 0.15)', 
              paddingTop: '24px' 
            }}>
              {[
                { emoji: '🆓', text: 'Free to Download' },
                { emoji: '🎯', text: 'CCNA 200-301 Aligned' },
                { emoji: '🌱', text: 'Beginner Friendly' },
                { emoji: '🗣️', text: 'Hinglish Explained' }
              ].map((badge, idx) => (
                <div key={idx} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '13px',
                  fontWeight: 600,
                  backdropFilter: 'blur(4px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <span>{badge.emoji}</span>
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right SVG Column */}
          <div className="floating-element" style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <div style={{
              width: '100%',
              maxWidth: '460px',
              height: '380px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '24px',
              padding: '16px',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)'
            }}>
              {/* Hand-coded Networking SVG */}
              <svg viewBox="0 0 500 400" style={{ width: '100%', height: '100%' }}>
                <defs>
                  <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#1A6FD4" />
                  </linearGradient>
                </defs>

                {/* Connecting Lines */}
                <line x1="80" y1="120" x2="220" y2="80" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="2.5" />
                <line x1="80" y1="120" x2="180" y2="250" stroke="rgba(26, 111, 212, 0.4)" strokeWidth="2" />
                <line x1="220" y1="80" x2="380" y2="100" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="2.5" />
                <line x1="220" y1="80" x2="320" y2="280" stroke="rgba(26, 111, 212, 0.4)" strokeWidth="1.5" />
                <line x1="180" y1="250" x2="320" y2="280" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="3" />
                <line x1="180" y1="250" x2="100" y2="340" stroke="rgba(26, 111, 212, 0.4)" strokeWidth="2" />
                <line x1="380" y1="100" x2="420" y2="240" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="2" />
                <line x1="320" y1="280" x2="420" y2="240" stroke="rgba(26, 111, 212, 0.4)" strokeWidth="2" />

                {/* Pulsing Signal Particles traveling on paths */}
                <circle cx="150" cy="100" r="5" fill="#38BDF8">
                  <animate attributeName="cx" values="80;220" dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="120;80" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="250" cy="180" r="5" fill="#38BDF8">
                  <animate attributeName="cx" values="220;320" dur="3.5s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="80;280" dur="3.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="250" cy="265" r="5" fill="#FFFFFF">
                  <animate attributeName="cx" values="180;320" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="250;280" dur="3s" repeatCount="indefinite" />
                </circle>

                {/* Nodes with pulse-node animation */}
                {/* Router Node - Core */}
                <g className="pulse-node" style={{ transformOrigin: '180px 250px' }}>
                  <circle cx="180" cy="250" r="26" fill="#0D3B8C" stroke="#38BDF8" strokeWidth="3" />
                  <text x="180" y="254" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">RTR-A</text>
                </g>

                {/* Switch Node */}
                <g className="pulse-node" style={{ transformOrigin: '220px 80px', animationDelay: '0.4s' }}>
                  <circle cx="220" cy="80" r="22" fill="#0D3B8C" stroke="#38BDF8" strokeWidth="2.5" />
                  <text x="220" y="84" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">SW-1</text>
                </g>

                {/* Host Node */}
                <g className="pulse-node" style={{ transformOrigin: '80px 120px', animationDelay: '0.8s' }}>
                  <circle cx="80" cy="120" r="18" fill="#1A6FD4" stroke="#38BDF8" strokeWidth="2" />
                  <text x="80" y="123" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">PC</text>
                </g>

                {/* Cloud Node */}
                <g className="pulse-node" style={{ transformOrigin: '380px 100px', animationDelay: '1.2s' }}>
                  <circle cx="380" cy="100" r="24" fill="#0D3B8C" stroke="#38BDF8" strokeWidth="2.5" />
                  <text x="380" y="104" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">WAN</text>
                </g>

                {/* Server Node */}
                <g className="pulse-node" style={{ transformOrigin: '320px 280px', animationDelay: '1.6s' }}>
                  <circle cx="320" cy="280" r="22" fill="#1A6FD4" stroke="#38BDF8" strokeWidth="2" />
                  <text x="320" y="284" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">SRV</text>
                </g>

                {/* Switch 2 Node */}
                <g className="pulse-node" style={{ transformOrigin: '420px 240px', animationDelay: '2s' }}>
                  <circle cx="420" cy="240" r="16" fill="#0D3B8C" stroke="#38BDF8" strokeWidth="2" />
                  <text x="420" y="243" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">SW2</text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ------ 3. STATS SECTION ------
function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState({ lessons: 0, flashcards: 0, labs: 0, simulators: 0, modules: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        const duration = 1200; // time in ms
        const stepCount = 40;
        const interval = duration / stepCount;

        let frame = 0;
        const timer = setInterval(() => {
          frame++;
          setStats({
            lessons: Math.min(Math.round((200 / stepCount) * frame), 200),
            flashcards: Math.min(Math.round((500 / stepCount) * frame), 500),
            labs: Math.min(Math.round((50 / stepCount) * frame), 50),
            simulators: Math.min(Math.round((5 / stepCount) * frame), 5),
            modules: Math.min(Math.round((12 / stepCount) * frame), 12),
          });

          if (frame >= stepCount) clearInterval(timer);
        }, interval);
      }
    }, { threshold: 0.1 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section id="stats" ref={containerRef} style={{
      backgroundColor: '#0D3B8C',
      padding: '60px 0',
      color: '#FFFFFF'
    }}>
      <div className="container">
        <div className="stats-grid">
          {[
            { value: stats.lessons, max: '200+', label: 'Video Lessons' },
            { value: stats.flashcards, max: '500+', label: 'Active Flashcards' },
            { value: stats.labs, max: '50+', label: 'Practice Labs' },
            { value: stats.simulators, max: '5', label: 'Interactive Simulators' },
            { value: stats.modules, max: '12', label: 'Learning Modules' }
          ].map((item, index) => (
            <div key={index} style={{
              textAlign: 'center',
              padding: '16px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ fontSize: '42px', fontWeight: 800, color: '#38BDF8', marginBottom: '8px' }}>
                {item.value === 0 ? '0' : `${item.value}${item.max.includes('+') ? '+' : ''}`}
              </div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: '#D0E3FF', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ------ 4. FEATURES SECTION ------
function FeaturesSection() {
  const features = [
    { emoji: '🃏', title: 'Interactive Flashcards', desc: 'Master CLI commands, port numbers, and binary conversions with responsive active-recall cards.' },
    { emoji: '🧪', title: 'Practical Labs', desc: 'Step-by-step CLI exercises designed to simulate live switches and routers on your mobile screen.' },
    { emoji: '📦', title: 'Packet Journey Simulator', desc: 'Visualize dynamic packet propagation hop-by-hop through Layer 2 & 3 network devices.' },
    { emoji: '🤝', title: 'TCP Handshake', desc: 'Trigger segments and observe SYN, SYN-ACK, ACK sequence transitions in a full-mesh mockup.' },
    { emoji: '🌐', title: 'DHCP DORA Sequence', desc: 'Explore the Discover, Offer, Request, Acknowledge packet flow parameters in a visual terminal.' },
    { emoji: '👁️', title: 'Visual Learning Modules', desc: 'High-definition diagrams mapping OSI layers, VLAN tags, subnet topologies, and routing criteria.' },
    { emoji: '🏆', title: 'Gamified Progress', desc: 'Build your daily study streak, gather XP, and unlock badges like Subnet Guru as you learn.' },
    { emoji: '📋', title: 'Exam Preparation', desc: 'Complete realistic mock tests with timers, category filters, and detailed Hinglish explanations.' }
  ];

  return (
    <section id="features" className="sec-pad section-fade" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        <h2 className="section-title">Everything You Need to Master CCNA</h2>
        <p className="section-tagline">Engineered for absolute conceptual clarity</p>

        <div className="features-grid">
          {features.map((feat, index) => (
            <div key={index} className="white-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '24px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #F0F7FF 0%, #E0EFFE 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                marginBottom: '20px',
                border: '1px solid rgba(26, 111, 212, 0.1)'
              }}>
                {feat.emoji}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#0D3B8C', marginBottom: '12px' }}>
                {feat.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#4A6FA5', lineHeight: 1.5, margin: 0 }}>
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ------ 5. WHY CHOOSE SECTION ------
function WhyChooseSection() {
  const points = [
    'Easy Hinglish explanations — no complex vocabulary barrier',
    'Beginner friendly starting from absolute structural zero',
    'Interactive on-device network protocol simulations',
    'Practical, CLI commands sandbox playground',
    'Exam-focused study materials targeting the 200-301 domains',
    'Real-world operational contexts translated to simple metrics'
  ];

  return (
    <section id="why-choose" className="sec-pad section-fade" style={{ backgroundColor: '#F0F7FF' }}>
      <div className="container">
        <div className="whychoose-grid">
          {/* Left Text Row */}
          <div>
            <h2 style={{ fontSize: '36px', fontWeight: 700, color: '#0D3B8C', marginBottom: '16px', lineHeight: 1.2 }}>
              Why Choose <br />CCNA Zero to Hero?
            </h2>
            <p style={{ fontSize: '16px', color: '#4A6FA5', marginBottom: '32px', maxWidth: '480px' }}>
              Textbooks provide dry descriptions. We give you interactive tactile modules that you can touch, slide, and explore. Learn twice as fast with immediate feedback loops.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {points.map((point, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ color: '#1A6FD4', marginTop: '2px' }}>
                    <CheckCircle size={20} fill="rgba(26, 111, 212, 0.1)" />
                  </div>
                  <span style={{ fontSize: '15px', fontWeight: 500, color: '#0D1B3E' }}>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Interactive Card Mock */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '100%',
              maxWidth: '360px',
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '24px',
              boxShadow: '0 15px 40px rgba(13, 59, 140, 0.1)',
              border: '1px solid rgba(26, 111, 212, 0.1)',
              position: 'relative'
            }}>
              {/* Phone Header Indicator */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #F0F7FF', paddingBottom: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#1A6FD4', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22C55E' }}></span>
                  Quiz Simulator Inside Screen
                </span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#4A6FA5' }}>CCNA Quiz Live</span>
              </div>

              {/* Quiz Interaction */}
              <InteractiveQuizDemo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ------ 6. LEARNING MODULES SECTION ------
function LearningModulesSection() {
  const topics = [
    'OSI Model', 'TCP/IP', 'Routing', 'Switching', 'VLANs', 'Subnetting', 'NAT', 'ACLs', 'DHCP', 'DNS', 'Network Security'
  ];

  const initialProgresses = [72, 45, 10];
  const [progress, setProgress] = useState(initialProgresses);

  const handleSliderChange = (idx: number, newVal: number) => {
    const updated = [...progress];
    updated[idx] = newVal;
    setProgress(updated);
  };

  return (
    <section id="modules" className="sec-pad section-fade" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        <h2 className="section-title">Comprehensive Learning Modules</h2>
        <p className="section-tagline">Structured pathways to industry-ready mastery</p>

        {/* Topics grid of pills */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'center',
          marginBottom: '56px',
          maxWidth: '800px',
          margin: '0 auto 56px auto'
        }}>
          {topics.map((topic, i) => (
            <span
              key={i}
              style={{
                backgroundColor: '#F0F7FF',
                color: '#1A6FD4',
                padding: '8px 18px',
                borderRadius: '9999px',
                fontSize: '14px',
                fontWeight: 600,
                border: '1px solid rgba(26, 111, 212, 0.12)',
                transition: 'all 0.25s ease',
                cursor: 'default'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1A6FD4';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(26, 111, 212, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F0F7FF';
                e.currentTarget.style.color = '#1A6FD4';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              #{topic}
            </span>
          ))}
        </div>

        {/* Interactive Progress Demos */}
        <div className="modules-grid">
          {[
            {
              id: 0,
              domain: 'Domain 1',
              title: 'Network Fundamentals',
              count: '24 Video Lessons',
              labs: '15 Active Flashcards'
            },
            {
              id: 1,
              domain: 'Domain 2',
              title: 'Routing & Connectivity',
              count: '32 Video Lessons',
              labs: '12 CLI Practice Labs'
            },
            {
              id: 2,
              domain: 'Domain 3',
              title: 'Security & Automation',
              count: '18 Video Lessons',
              labs: '6 Command Simulators'
            }
          ].map((domainItem, index) => (
            <div key={index} className="white-card" style={{ padding: '28px' }}>
              <div style={{
                display: 'inline-block',
                backgroundColor: '#F0F7FF',
                color: '#1A6FD4',
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '4px',
                marginBottom: '14px',
                textTransform: 'uppercase'
              }}>
                {domainItem.domain}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#0D3B8C', marginBottom: '8px', lineHeight: 1.3 }}>
                {domainItem.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#4A6FA5', marginBottom: '20px' }}>
                Includes {domainItem.count} and {domainItem.labs} to consolidate terms.
              </p>

              {/* Progress interaction indicator */}
              <div style={{ borderTop: '1px solid #F0F7FF', paddingTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, color: '#0D1B3E', marginBottom: '6px' }}>
                  <span>Simulated Progress</span>
                  <span style={{ color: '#1A6FD4' }}>{progress[index]}%</span>
                </div>
                
                {/* Custom Track bar */}
                <div style={{ width: '100%', height: '8px', backgroundColor: '#F0F7FF', borderRadius: '4px', overflow: 'hidden', marginBottom: '14px' }}>
                  <div style={{ width: `${progress[index]}%`, height: '100%', backgroundColor: '#1A6FD4', borderRadius: '4px', transition: 'width 0.3s' }}></div>
                </div>

                {/* Slider controller */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress[index]}
                    onChange={(e) => handleSliderChange(index, parseInt(e.target.value))}
                    style={{ width: '100%', accentColor: '#1A6FD4', cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '11px', color: '#4A6FA5', whiteSpace: 'nowrap' }}>Slide progress</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ------ 7. INTERACTIVE SIMULATORS SECTION ------
function SimulatorsSection() {
  const [activeTab, setActiveTab] = useState<'pj' | 'tcp' | 'dora'>('pj');

  return (
    <section id="simulators" style={{
      background: 'linear-gradient(135deg, #0D1B3E 0%, #0D3B8C 100%)',
      padding: '100px 0',
      color: '#FFFFFF'
    }}>
      <div className="container">
        <h2 className="section-title" style={{ color: '#FFFFFF' }}>Interactive Simulators</h2>
        <p className="section-tagline" style={{ color: '#38BDF8' }}>Learn network operations tactually instead of memorizing definitions</p>

        {/* Tab Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '40px',
          flexWrap: 'wrap'
        }}>
          {[
            { id: 'pj', label: '📦 Packet Journey Simulator' },
            { id: 'tcp', label: '🤝 TCP Handshake Simulator' },
            { id: 'dora', label: '🌐 DHCP DORA Simulator' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'pj' | 'tcp' | 'dora')}
              style={{
                background: activeTab === tab.id ? '#1A6FD4' : 'rgba(255, 255, 255, 0.08)',
                color: '#FFFFFF',
                border: activeTab === tab.id ? '1px solid #38BDF8' : '1px solid rgba(255,255,255,0.15)',
                padding: '12px 24px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.25s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Screen layout wrapper */}
        <div style={{
          backgroundColor: 'rgba(13, 27, 62, 0.65)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '40px 32px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.3)'
        }}>
          {activeTab === 'pj' && <PacketJourneyWidget />}
          {activeTab === 'tcp' && <TCPHandshakeWidget />}
          {activeTab === 'dora' && <DHCPAckWidget />}
        </div>
      </div>
    </section>
  );
}

// SIMULATOR COMPONENT 1: Packet Journey
function PacketJourneyWidget() {
  const [step, setStep] = useState(0);

  const stepsDetails = [
    {
      title: 'Step 1: Frame Generation at Host A',
      desc: 'Local Host A drafts an IP packet. Because destination IP (8.8.8.8) is on a remote subnet, Host A performs an IP lookup to gateway 192.168.1.1, encapsulates the packet inside an Ethernet II Frame with local Gateway MAC, and pushes the bits onto physical copper.'
    },
    {
      title: 'Step 2: Layer 2 Forwarding at Switch',
      desc: 'The Access Switch receives the bits on Port F0/1, reads the Destination MAC header. Finding Router Gate MAC in its local Content Addressable Memory (CAM) table, it switches the frame to outbound Port F0/24 without changing the payload.'
    },
    {
      title: 'Step 3: Route Lookup at Cisco Router',
      desc: 'The Router de-encapsulates the inbound Layer 2 header, validates integrity, and reads the target Destination IP (8.8.8.8). After decrementing TTL by 1, it queries its global routing table, identifies the interface path, encapsulates in a new WAN frame, and transmits.'
    },
    {
      title: 'Step 4: Packet Acceptance at Web Server',
      desc: 'The Web Server accepts the frame, strips off the headers, reads the destination port, and processes the payload. Connectivity works! The packets traveled successfully across the autonomous network boundaries.'
    }
  ];

  const getPositionStyle = () => {
    switch (step) {
      case 0: return { left: '12%' };
      case 1: return { left: '38%' };
      case 2: return { left: '62%' };
      case 3: return { left: '88%' };
      default: return { left: '12%' };
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '16px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#38BDF8', margin: 0 }}>Packet Journey Route Flow</h3>
        <span style={{ fontSize: '12px', background: '#1A6FD4', color: '#FFFFFF', padding: '4px 10px', borderRadius: '4px', fontWeight: 700 }}>CCNA Layer 2 vs Layer 3</span>
      </div>

      {/* Visual Road representation with Nodes */}
      <div style={{ position: 'relative', height: '120px', display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
        {/* Connection Line track with glow */}
        <div style={{ position: 'absolute', left: '12%', right: '12%', height: '4px', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '2px', zIndex: 1 }}>
          <div style={{ width: `${(step / 3) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #1A6FD4, #38BDF8)', borderRadius: '2px', transition: 'width 0.4s ease' }}></div>
        </div>

        {/* Floating Packet Capsule */}
        <div style={{
          position: 'absolute',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '54px',
          height: '24px',
          backgroundColor: '#38BDF8',
          borderRadius: '12px',
          boxShadow: '0 0 15px #38BDF8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#0D1B3E',
          fontSize: '11px',
          fontWeight: 800,
          zIndex: 5,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          ...getPositionStyle()
        }}>
          DATA
        </div>

        {/* Nodes */}
        {[
          { label: 'Host A', ip: '192.168.1.10', pos: '12%' },
          { label: 'Switch', ip: 'Layer 2 CAM', pos: '38%' },
          { label: 'Router GW', ip: '192.168.1.1', pos: '62%' },
          { label: 'Server', ip: '8.8.8.8', pos: '88%' }
        ].map((node, index) => (
          <div key={index} style={{
            position: 'absolute',
            left: node.pos,
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 3
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: step === index ? '#1A6FD4' : '#0D1B3E',
              border: step === index ? '3px solid #38BDF8' : '2px solid rgba(255, 255, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '13px',
              boxShadow: step === index ? '0 0 15px rgba(56, 189, 248, 0.4)' : 'none',
              transition: 'all 0.3s'
            }}>
              {index === 0 && 'PC'}
              {index === 1 && 'SW'}
              {index === 2 && 'RT'}
              {index === 3 && 'SRV'}
            </div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF', marginTop: '6px' }}>{node.label}</span>
            <span style={{ fontSize: '11px', color: '#A0B5D0', marginTop: '2px', fontFamily: 'monospace' }}>{node.ip}</span>
          </div>
        ))}
      </div>

      {/* Explanatory Panel cards */}
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: 600, color: '#38BDF8', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ backgroundColor: '#1A6FD4', width: '20px', height: '20px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyCenter: 'center', justifyContent: 'center', fontSize: '11px', color: '#fff' }}>
            {step + 1}
          </span>
          {stepsDetails[step].title}
        </h4>
        <p style={{ margin: 0, fontSize: '14.5px', color: '#A0B5D0', lineHeight: 1.6 }}>
          {stepsDetails[step].desc}
        </p>
      </div>

      {/* Controls row */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={() => setStep(prev => Math.max(0, prev - 1))}
          disabled={step === 0}
          className="btn"
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            background: step === 0 ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.1)',
            color: step === 0 ? 'rgba(255,255,255,0.3)' : '#FFFFFF',
            border: 'none',
            cursor: step === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          Previous Step
        </button>
        <button
          onClick={() => setStep(prev => Math.min(3, prev + 1))}
          disabled={step === 3}
          className="btn"
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            background: step === 3 ? 'rgba(255,255,255,0.02)' : '#1A6FD4',
            color: '#FFFFFF',
            border: 'none',
            cursor: step === 3 ? 'not-allowed' : 'pointer'
          }}
        >
          {step === 3 ? 'Route Verified ✓' : 'Next Step →'}
        </button>
        <button
          onClick={() => setStep(0)}
          className="btn"
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            background: 'none',
            color: '#A0B5D0',
            border: '1px solid rgba(255,255,255,0.15)'
          }}
        >
          Reset Simulation
        </button>
      </div>
    </div>
  );
}

// SIMULATOR COMPONENT 2: TCP Handshake
function TCPHandshakeWidget() {
  const [step, setStep] = useState(0);

  const tcpSteps = [
    {
      segment: 'SYN',
      sender: 'Client',
      receiver: 'Server',
      flags: 'SYN = 1, ACK = 0',
      seq: 'Client Seq = 1000',
      ackNum: 'Ack = -',
      detail: 'Client initiates communication by sending a SYN packet. This shares the starting Sequence number (1000) and signals intent to establish a formal socket connection.'
    },
    {
      segment: 'SYN-ACK',
      sender: 'Server',
      receiver: 'Client',
      flags: 'SYN = 1, ACK = 1',
      seq: 'Server Seq = 5000',
      ackNum: 'Ack = 1001 (Client Seq + 1)',
      detail: 'Server is responsive! It honors the connection by sending back a SYN-ACK. The ACK number is Client Seq + 1 (1001), serving as a confirmation. It also sends its own starting Sequence number (5000).'
    },
    {
      segment: 'ACK',
      sender: 'Client',
      receiver: 'Server',
      flags: 'SYN = 0, ACK = 1',
      seq: 'Client Seq = 1001',
      ackNum: 'Ack = 5001 (Server Seq + 1)',
      detail: 'Client acknowledges! It transmits a final ACK segment. Flags SYN drops to 0, ACK stays active. The sequence is complete, establishing full reliable, three-way communications.'
    }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '16px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#38BDF8', margin: 0 }}>TCP Three-Way Handshake Connection</h3>
        <span style={{ fontSize: '12px', background: '#1A6FD4', color: '#FFFFFF', padding: '4px 10px', borderRadius: '4px', fontWeight: 700 }}>Connection Oriented (TCP UDP differences)</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center', marginBottom: '32px' }}>
        {/* Animated Handshake panel */}
        <div style={{
          backgroundColor: '#0D1B3E',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '24px',
          position: 'relative',
          height: '240px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          {/* Client Node */}
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#1A6FD4', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '11px', margin: '0 auto 6px auto' }}>C</div>
              <span style={{ fontSize: '11px', color: '#A0B5D0', fontWeight: 'bold' }}>Client Host</span>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#0D3B8C', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '11px', margin: '0 auto 6px auto' }}>S</div>
              <span style={{ fontSize: '11px', color: '#A0B5D0', fontWeight: 'bold' }}>Target Server</span>
            </div>
          </div>

          {/* Flows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative', height: '100px', justifyContent: 'center' }}>
            {/* Step 1 Segment */}
            <div style={{
              width: '100%',
              height: '30px',
              position: 'relative',
              borderRadius: '4px',
              backgroundColor: step >= 1 ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
              border: step >= 1 ? '1px dashed rgba(56,189,248,0.4)' : 'none',
              opacity: step >= 1 ? 1 : 0.2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'opacity 0.3s'
            }}>
              <span style={{ fontSize: '11px', color: '#38BDF8', fontWeight: 700 }}>SYN (Seq=1000) ➔</span>
            </div>

            {/* Step 2 Segment */}
            <div style={{
              width: '100%',
              height: '30px',
              position: 'relative',
              borderRadius: '4px',
              backgroundColor: step >= 2 ? 'rgba(13, 111, 212, 0.12)' : 'transparent',
              border: step >= 2 ? '1px dashed rgba(26,111,212,0.4)' : 'none',
              opacity: step >= 2 ? 1 : 0.2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'opacity 0.3s'
            }}>
              <span style={{ fontSize: '11px', color: '#1A6FD4', fontWeight: 700 }}>⮘ SYN-ACK (Seq=5000, Ack=1001)</span>
            </div>

            {/* Step 3 Segment */}
            <div style={{
              width: '100%',
              height: '30px',
              position: 'relative',
              borderRadius: '4px',
              backgroundColor: step >= 3 ? 'rgba(34, 197, 94, 0.1)' : 'transparent',
              border: step >= 3 ? '1px dashed rgba(34,197,94,0.4)' : 'none',
              opacity: step >= 3 ? 1 : 0.2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'opacity 0.3s'
            }}>
              <span style={{ fontSize: '11px', color: '#22C55E', fontWeight: 700 }}>ACK (Seq=1001, Ack=5001) ➔</span>
            </div>
          </div>
        </div>

        {/* Live Terminal logs */}
        <div>
          <div style={{
            fontFamily: 'monospace',
            backgroundColor: 'rgba(0,0,0,0.3)',
            borderRadius: '12px',
            padding: '20px',
            fontSize: '13px',
            color: '#10B981',
            border: '1px solid rgba(255,255,255,0.05)',
            minHeight: '240px'
          }}>
            <div style={{ color: '#4A6FA5', marginBottom: '8px', borderBottom: '1px dashed rgba(255,255,255,0.1)', paddingBottom: '6px' }}>
              $ tcpdump -nnvv -i eth0 tcp
            </div>
            {step === 0 && (
              <div>
                <span style={{ color: '#EAB308' }}>[READY] No live TCP sockets established.</span> <br />
                Click below to initiate the TCP packet session...
              </div>
            )}
            {step >= 1 && (
              <div>
                <span style={{ color: '#38BDF8' }}>13:02:14.225 Client &gt; Server: Flags [S]</span><br />
                seq 1000, win 65535, options [mss 1460]<br />
                <span style={{ color: '#64748B' }}>// SYN flag active, client synchronizes seq</span>
                <br /><br />
              </div>
            )}
            {step >= 2 && (
              <div>
                <span style={{ color: '#1A6FD4' }}>13:02:14.228 Server &gt; Client: Flags [S.]</span><br />
                seq 5000, ack 1001, win 65535, options [mss 1460]<br />
                <span style={{ color: '#64748B' }}>// Server acknowledges client & shares server seq</span>
                <br /><br />
              </div>
            )}
            {step >= 3 && (
              <div>
                <span style={{ color: '#22C55E' }}>13:02:14.230 Client &gt; Server: Flags [.]</span><br />
                seq 1001, ack 5001, win 65535<br />
                <span style={{ color: '#22C55E' }}>[CONNECTED] Session active. Three-Way Handshake verified.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {step > 0 && (
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '10px',
          padding: '16px 20px',
          marginBottom: '20px'
        }}>
          <span style={{ fontSize: '11px', display: 'block', textTransform: 'uppercase', color: '#38BDF8', fontWeight: 800, marginBottom: '4px' }}>Active Segment: {tcpSteps[step - 1].segment}</span>
          <p style={{ margin: 0, fontSize: '13.5px', color: '#D0E3FF', lineHeight: 1.5 }}>
            {tcpSteps[step - 1].detail}
          </p>
        </div>
      )}

      {/* Buttons controls */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setStep(1)}
          disabled={step === 1}
          className="btn"
          style={{ padding: '8px 16px', fontSize: '13px', background: step === 1 ? '#38BDF8' : 'rgba(255,255,255,0.1)', color: step === 1 ? '#0D1B3E' : '#FFF', border: 'none' }}
        >
          1. Send SYN
        </button>
        <button
          onClick={() => setStep(2)}
          disabled={step < 1 || step === 2}
          className="btn"
          style={{ padding: '8px 16px', fontSize: '13px', background: step === 2 ? '#1A6FD4' : 'rgba(255,255,255,0.1)', color: '#FFF', border: 'none' }}
        >
          2. Send SYN-ACK
        </button>
        <button
          onClick={() => setStep(3)}
          disabled={step < 2 || step === 3}
          className="btn"
          style={{ padding: '8px 16px', fontSize: '13px', background: step === 3 ? '#22C55E' : 'rgba(255,255,255,0.1)', color: '#FFF', border: 'none' }}
        >
          3. Send ACK
        </button>
        <button
          onClick={() => setStep(0)}
          className="btn"
          style={{ padding: '8px 16px', fontSize: '13px', background: 'none', color: '#A0B5D0', border: '1px solid rgba(255,255,255,0.15)' }}
        >
          Reset Handshake
        </button>
      </div>
    </div>
  );
}

// SIMULATOR COMPONENT 3: DHCP DORA
function DHCPAckWidget() {
  const [dora, setDora] = useState<number>(0);

  const steps = [
    {
      code: 'D',
      title: 'DHCP Discover (Broadcast)',
      desc: 'The client PC drops onto the link without static configs. It broadcasts a Discover packet using Source IP 0.0.0.0 and Destination 255.255.255.255 to Port 67 searching for parameters.'
    },
    {
      code: 'O',
      title: 'DHCP Offer (Unicast)',
      desc: 'The responsive DHCP Server answers the broadcast. It locks in an IP lease from its local pools, transmitting a proposal containing IP: 192.168.1.101, Gateway: 192.168.1.1, and Lease: 24hrs.'
    },
    {
      code: 'R',
      title: 'DHCP Request (Broadcast)',
      desc: 'The client accepts the terms. It broadcasts a request to formalize the lease. This informs all other network DHCP gateways that it has successfully claimed this specific IP address.'
    },
    {
      code: 'A',
      title: 'DHCP Acknowledgment (Unicast)',
      desc: 'The DHCP Server confirms! It transmits a final ACK packet. This saves the client MAC to IP binding inside its lease tracking records, and the client initializes its socket settings.'
    }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '16px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#38BDF8', margin: 0 }}>DHCP DORA Allocation Simulator</h3>
        <span style={{ fontSize: '12px', background: '#1A6FD4', color: '#FFFFFF', padding: '4px 10px', borderRadius: '4px', fontWeight: 700 }}>IP Allocation Protocols</span>
      </div>

      {/* Visual Display showing D-O-R-A states */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {steps.map((item, idx) => (
          <div key={idx} style={{
            backgroundColor: dora > idx ? 'rgba(26, 111, 212, 0.2)' : dora === idx ? '#1A6FD4' : 'rgba(255,255,255,0.03)',
            borderRadius: '12px',
            border: dora === idx ? '2px solid #38BDF8' : '1px solid rgba(255,255,255,0.1)',
            padding: '16px',
            textAlign: 'center',
            transition: 'all 0.3s'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: dora > idx ? '#22C55E' : dora === idx ? '#FFFFFF' : 'rgba(255,255,255,0.1)',
              color: dora === idx ? '#1A6FD4' : '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto',
              fontWeight: 'bold',
              fontSize: '15px'
            }}>
              {item.code}
            </div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title.split(' ')[1]}</div>
            <span style={{ fontSize: '11px', color: '#A0B5D0' }}>Step {idx + 1}</span>
          </div>
        ))}
      </div>

      {dora > 0 && (
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '24px'
        }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 600, color: '#38BDF8' }}>
            {steps[dora - 1].title}
          </h4>
          <p style={{ margin: 0, fontSize: '14px', color: '#D0E3FF', lineHeight: 1.5 }}>
            {steps[dora - 1].desc}
          </p>
        </div>
      )}

      {/* Action triggers */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setDora(1)}
          className="btn"
          style={{ padding: '8px 16px', fontSize: '13px', background: dora === 1 ? '#38BDF8' : 'rgba(255,255,255,0.1)', color: '#FFF', border: 'none' }}
        >
          Trigger Discover
        </button>
        <button
          onClick={() => setDora(2)}
          disabled={dora < 1}
          className="btn"
          style={{ padding: '8px 16px', fontSize: '13px', background: dora === 2 ? '#1A6FD4' : 'rgba(255,255,255,0.1)', color: '#FFF', border: 'none' }}
        >
          Send Offer
        </button>
        <button
          onClick={() => setDora(3)}
          disabled={dora < 2}
          className="btn"
          style={{ padding: '8px 16px', fontSize: '13px', background: dora === 3 ? '#1A6FD4' : 'rgba(255,255,255,0.1)', color: '#FFF', border: 'none' }}
        >
          Trigger Request
        </button>
        <button
          onClick={() => setDora(4)}
          disabled={dora < 3}
          className="btn"
          style={{ padding: '8px 16px', fontSize: '13px', background: dora === 4 ? '#22C55E' : 'rgba(255,255,255,0.1)', color: '#FFF', border: 'none' }}
        >
          Send Ack
        </button>
        <button
          onClick={() => setDora(0)}
          className="btn"
          style={{ padding: '8px 16px', fontSize: '13px', background: 'none', color: '#A0B5D0', border: '1px solid rgba(255,255,255,0.15)' }}
        >
          Reset Session
        </button>
      </div>
    </div>
  );
}

// ------ 8. LEARNING JOURNEY ROADMAP ------
function LearningJourneySection() {
  const [activeStep, setActiveStep] = useState(0);

  const timeline = [
    { emoji: '🌱', label: 'Beginner State', title: 'Introductory Groundwork', detail: 'Understand basic networking architectures, LAN topologies, copper Ethernet cabling specifications, and visual computer structures from standard absolute zero.' },
    { emoji: '🔌', label: 'Fundatmentals', title: 'OSI Reference Model & TCP/IP', detail: 'Deconstruct layered communications. Study OSI Layers 1–7 encapsulation, standard TCP vs connectionless UDP flows, and IPv4 address classes.' },
    { emoji: '🧪', title: 'Subnetting & Labs', label: 'Practical Configuration', detail: 'Learn variable length subnet mask (VLSM) calculations, binary routing rules, and execute basic ping and traceroute configurations on devices.' },
    { emoji: '📡', title: 'Routing Protocols', label: 'Network Operations', detail: 'Configure dynamic administrative distances, explore OSPF area linkages, switch trunk structures, and active Access Control List (ACL) parameters.' },
    { emoji: '🎓', title: 'Full Exam Readiness', label: 'Cisco Certified Pass', detail: 'Unlock authentic 200-301 simulation sandboxes, review summary cheat sheets, and practice full testing modules to guarantee passing on your try.' }
  ];

  return (
    <section id="journey" className="sec-pad section-fade" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        <h2 className="section-title">Your Learning Roadmap</h2>
        <p className="section-tagline">The path from absolute zero to certified Cisco professional</p>

        {/* Journey stepper list */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Timeline Nodes Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', marginBottom: '40px' }}>
            {/* Horizontal connection track line background */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '10%',
              right: '10%',
              height: '3px',
              backgroundColor: '#F0F7FF',
              zIndex: 1
            }}>
              <div style={{
                height: '100%',
                width: `${(activeStep / 4) * 100}%`,
                backgroundColor: '#1A6FD4',
                transition: 'width 0.4s'
              }}></div>
            </div>

            {timeline.map((stepItem, index) => (
              <div
                key={index}
                onClick={() => setActiveStep(index)}
                style={{
                  position: 'relative',
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  width: '18%'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: activeStep === index ? '#1A6FD4' : '#FFFFFF',
                  border: activeStep === index ? '3px solid #38BDF8' : '2px solid rgba(26, 111, 212, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  boxShadow: activeStep === index ? '0 5px 15px rgba(26, 111, 212, 0.3)' : 'none',
                  transition: 'all 0.3s'
                }}>
                  {stepItem.emoji}
                </div>
                <span style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: activeStep === index ? '#1A6FD4' : '#4A6FA5',
                  textAlign: 'center',
                  marginTop: '8px',
                  lineHeight: 1.2
                }}>
                  {stepItem.label}
                </span>
              </div>
            ))}
          </div>

          {/* Stepper Details */}
          <div style={{
            backgroundColor: '#F0F7FF',
            borderRadius: '16px',
            border: '1px solid rgba(26, 111, 212, 0.1)',
            padding: '32px'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0D3B8C', marginBottom: '12px' }}>
              Step {activeStep + 1}: {timeline[activeStep].title}
            </h3>
            <p style={{ fontSize: '15px', color: '#4A6FA5', lineHeight: 1.6, margin: 0 }}>
              {timeline[activeStep].detail}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ------ 9. APP PREVIEW MOCKUPS ------
function AppPreviewSection() {
  const [currentTab, setCurrentTab] = useState<'screenshots' | 'playgrounds'>('screenshots');
  const [activeScreenshotIndex, setActiveScreenshotIndex] = useState(0);
  const [activeFlip, setActiveFlip] = useState(false);
  const [terminalCmd, setTerminalCmd] = useState<string[]>([]);
  const [cliInput, setCliInput] = useState('');

  const appScreens = [
    {
      img: screenshot1,
      name: "Dashboard & Syllabus Tracker",
      heading: "Comprehensive Syllabus Guidance In Hinglish",
      badge: "SYLLABUS HOME",
      desc: "An intuitive dashboard keeping track of video lectures, flashcards, active labs, and study streaks. Learn step-by-step with structured modules calibrated perfectly to real CCNA 200-301 domains."
    },
    {
      img: screenshot2,
      name: "Cisco iOS Sandbox Terminal",
      heading: "Configure Live Networks On Mobile Devices",
      badge: "LIVE COMMAND LINE",
      desc: "Gain tactile hardware configuration experience in physical network systems. Practice commands like show ip route, running-config, ip dhcp pool, and terminal status indicators with direct feedback."
    },
    {
      img: screenshot3,
      name: "Interactive Theory & Concept Maps",
      heading: "Deconstruct Core Layers Visually",
      badge: "CONCEPT OVERVIEW",
      desc: "Stop memorizing dry rules. Study network packet movements, subnet bounds, routing logic, and standard port numbers through clear drawings and simplified localized explanation sheets."
    },
    {
      img: screenshot4,
      name: "Active Recall Flashcards",
      heading: "Practice Questions & Commands Swiftly",
      badge: "FLASHCARDS SANDBOX",
      desc: "Our responsive card flips trigger long-term conceptual memorization. Perfect for learning key Cisco port numbers, administrative distances, physical cabling specifications, and visual protocols."
    },
    {
      img: screenshot5,
      name: "Complete Exam Practice Gate",
      heading: "Authentic Mock Exam Portals",
      badge: "EXAM READINESS",
      desc: "Test yourself with authentic custom questions. Manage full timer configurations, review previous attempts, and access incredibly detailed review guides detailing correct or incorrect pathways."
    }
  ];

  const submitCLI = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = cliInput.trim().toLowerCase();
    let response = `Router: Command "${cliInput}" unrecognized.`;
    
    if (clean === 'enable') {
      response = 'Router#';
    } else if (clean === 'configure terminal' || clean === 'conf t') {
      response = 'Router(config)#';
    } else if (clean === 'show ip interface brief') {
      response = 'Interface   IP-Address   OK? Method Status\nFast0/1     192.168.1.1  YES manual up';
    } else if (clean === 'help') {
      response = 'Available directions: enable, conf t, show ip interface brief, help';
    }

    setTerminalCmd(prev => [...prev, `Router> ${cliInput}`, response]);
    setCliInput('');
  };

  return (
    <section id="preview" className="sec-pad section-fade" style={{ backgroundColor: '#F0F7FF' }}>
      <div className="container">
        <h2 className="section-title">See our Live Application</h2>
        <p className="section-tagline">Experience why students love our modern visual interfaces</p>

        {/* Tab Selection */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '50px',
          backgroundColor: 'rgba(26, 111, 212, 0.08)',
          padding: '6px',
          borderRadius: '9999px',
          maxWidth: '480px',
          margin: '0 auto 50px auto'
        }}>
          <button
            onClick={() => setCurrentTab('screenshots')}
            style={{
              flex: 1,
              backgroundColor: currentTab === 'screenshots' ? '#FFFFFF' : 'transparent',
              color: currentTab === 'screenshots' ? '#1A6FD4' : '#4A6FA5',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '14.5px',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              boxShadow: currentTab === 'screenshots' ? '0 4px 10px rgba(13, 59, 140, 0.08)' : 'none'
            }}
          >
            📱 Real App Screens
          </button>
          <button
            onClick={() => setCurrentTab('playgrounds')}
            style={{
              flex: 1,
              backgroundColor: currentTab === 'playgrounds' ? '#FFFFFF' : 'transparent',
              color: currentTab === 'playgrounds' ? '#1A6FD4' : '#4A6FA5',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '14.5px',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              boxShadow: currentTab === 'playgrounds' ? '0 4px 10px rgba(13, 59, 140, 0.08)' : 'none'
            }}
          >
            ⚙️ Interactive Sandboxes
          </button>
        </div>

        {/* Tab Content 1: REAL SCREENSHOTS */}
        {currentTab === 'screenshots' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: '48px',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            padding: '48px',
            borderRadius: '24px',
            boxShadow: '0 20px 40px rgba(13, 59, 140, 0.05)',
            border: '1px solid rgba(26, 111, 212, 0.08)'
          }} className="screenshot-container-grid">
            {/* Left Box: Smartphone Frame */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '300px',
                height: '600px',
                borderRadius: '42px',
                border: '14px solid #0D1B3E',
                boxShadow: '0 25px 60px rgba(13, 59, 140, 0.25)',
                backgroundColor: '#0F172A',
                overflow: 'hidden',
                position: 'relative'
              }}>
                {/* Notch */}
                <div style={{
                  width: '130px',
                  height: '22px',
                  backgroundColor: '#0D1B3E',
                  borderBottomLeftRadius: '16px',
                  borderBottomRightRadius: '16px',
                  margin: '0 auto',
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  top: 0,
                  zIndex: 10
                }} />

                {/* Display Image */}
                <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={appScreens[activeScreenshotIndex].img}
                    alt={appScreens[activeScreenshotIndex].name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Dot Indicators */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
                {appScreens.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setActiveScreenshotIndex(dotIdx)}
                    style={{
                      width: activeScreenshotIndex === dotIdx ? '24px' : '8px',
                      height: '8px',
                      borderRadius: '9999px',
                      backgroundColor: activeScreenshotIndex === dotIdx ? '#1A6FD4' : '#CBD5E1',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease'
                    }}
                    aria-label={`Show screenshot ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right Box: Description Details and Quick Tabs */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'left' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: '#F0F7FF',
                color: '#1A6FD4',
                fontSize: '11px',
                fontWeight: 800,
                padding: '6px 14px',
                borderRadius: '9999px',
                letterSpacing: '1px',
                width: 'fit-content',
                textTransform: 'uppercase',
                marginBottom: '16px',
                border: '1px solid rgba(26, 111, 212, 0.12)'
              }}>
                {appScreens[activeScreenshotIndex].badge}
              </div>

              <h3 style={{
                fontSize: '28px',
                fontWeight: 800,
                color: '#0D3B8C',
                lineHeight: 1.2,
                marginBottom: '16px'
              }}>
                {appScreens[activeScreenshotIndex].heading}
              </h3>

              <p style={{
                fontSize: '15.5px',
                color: '#4A6FA5',
                lineHeight: 1.6,
                marginBottom: '36px',
                maxHeight: '120px',
                overflow: 'hidden'
              }}>
                {appScreens[activeScreenshotIndex].desc}
              </p>

              {/* Sidebar Accordion-style Tab selectors */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {appScreens.map((screen, sIdx) => {
                  const isCur = activeScreenshotIndex === sIdx;
                  return (
                    <div
                      key={sIdx}
                      onClick={() => setActiveScreenshotIndex(sIdx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        padding: '14px 18px',
                        borderRadius: '12px',
                        backgroundColor: isCur ? '#F0F7FF' : 'transparent',
                        border: isCur ? '1px solid rgba(26, 111, 212, 0.15)' : '1px solid transparent',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        if (!isCur) e.currentTarget.style.backgroundColor = '#F8FAFC';
                      }}
                      onMouseLeave={(e) => {
                        if (!isCur) e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: isCur ? '#1A6FD4' : '#E2E8F0',
                        color: isCur ? '#FFFFFF' : '#4A6FA5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '12px'
                      }}>
                        {sIdx + 1}
                      </div>

                      <span style={{
                        fontSize: '15px',
                        fontWeight: isCur ? 700 : 600,
                        color: isCur ? '#0D3B8C' : '#4A6FA5'
                      }}>
                        {screen.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: ORIGINAL INTERACTIVE PLAYGROUNDS */}
        {currentTab === 'playgrounds' && (
          <div className="preview-grid">
            {/* Mockup 1: Flashcards interactive phone */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '280px',
                height: '520px',
                borderRadius: '36px',
                border: '12px solid #0D1B3E',
                boxShadow: '0 20px 40px rgba(13, 59, 140, 0.12)',
                backgroundColor: '#FFFFFF',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}>
                {/* Phone Notch */}
                <div style={{ width: '120px', height: '20px', backgroundColor: '#0D1B3E', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px', margin: '0 auto', position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 0, zIndex: 10 }}></div>

                {/* Status Header */}
                <div style={{ backgroundColor: '#1A6FD4', color: '#FFFFFF', padding: '24px 16px 16px 16px', textAlign: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: 800 }}>CCNA Flashcard Active</span>
                </div>

                {/* Screen Body */}
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                  {/* Flip Card Design */}
                  <div
                    onClick={() => setActiveFlip(!activeFlip)}
                    style={{
                      width: '100%',
                      height: '240px',
                      perspective: '1000px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{
                      width: '100%',
                      height: '100%',
                      position: 'relative',
                      transformStyle: 'preserve-3d',
                      transition: 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      transform: activeFlip ? 'rotateY(180deg)' : 'none'
                    }}>
                      {/* Front */}
                      <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '16px',
                        border: '2px solid rgba(26, 111, 212, 0.15)',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        boxShadow: '0 4px 12px rgba(13, 59, 140, 0.05)'
                      }}>
                        <div style={{ fontSize: '24px', marginBottom: '12px' }}>🤔</div>
                        <h4 style={{ margin: 0, fontSize: '15px', color: '#0D1B3E', fontWeight: 700 }}>What default AD value is assigned to static routing path weights?</h4>
                        <span style={{ fontSize: '11px', color: '#4A6FA5', marginTop: '14px' }}>Tap card to flip</span>
                      </div>

                      {/* Back */}
                      <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        backgroundColor: '#1E293B',
                        color: '#FFFFFF',
                        borderRadius: '16px',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        transform: 'rotateY(180deg)'
                      }}>
                        <div style={{ fontSize: '24px', marginBottom: '12px' }}>🎯</div>
                        <h4 style={{ margin: 0, fontSize: '28px', color: '#38BDF8', fontWeight: 800 }}>AD = 1</h4>
                        <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#94A3B8' }}>Administrative Distance 1 means it is highly trustworthy next only to connected links (AD=0).</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#0D3B8C', marginTop: '16px' }}>1. Flashcards Portal</span>
            </div>

            {/* Mockup 2: CLI Terminal Interactive Phone */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '280px',
                height: '520px',
                borderRadius: '36px',
                border: '12px solid #0D1B3E',
                boxShadow: '0 20px 40px rgba(13, 59, 140, 0.12)',
                backgroundColor: '#0F172A',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}>
                {/* Notch */}
                <div style={{ width: '120px', height: '20px', backgroundColor: '#0D1B3E', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px', margin: '0 auto', position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 0, zIndex: 10 }}></div>

                {/* Header */}
                <div style={{ backgroundColor: '#1E293B', padding: '24px 16px 12px 16px', borderBottom: '1px solid #334155' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#38BDF8', fontFamily: 'monospace' }}>Cisco iOS Terminal Sandbox</span>
                </div>

                {/* Terminal Logs */}
                <div style={{ padding: '16px', flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px', fontFamily: 'monospace', color: '#10B981', alignContent: 'flex-start' }}>
                  <div>Router config loader v0.2 ...</div>
                  <div>Type "help" for options.</div>
                  
                  {terminalCmd.map((txt, index) => (
                    <div key={index} style={{ whiteSpace: 'pre-wrap', color: index % 2 === 0 ? '#38BDF8' : '#A7F3D0' }}>{txt}</div>
                  ))}

                  {/* Form input */}
                  <form onSubmit={submitCLI} style={{ display: 'flex', marginTop: 'auto' }}>
                    <span style={{ color: '#F43F5E', marginRight: '4px' }}>&gt;</span>
                    <input
                      type="text"
                      value={cliInput}
                      onChange={(e) => setCliInput(e.target.value)}
                      placeholder="Type enable..."
                      style={{
                        background: 'none',
                        border: 'none',
                        outline: 'none',
                        color: '#10B981',
                        fontFamily: 'monospace',
                        fontSize: '11px',
                        flexGrow: 1
                      }}
                    />
                  </form>
                </div>
              </div>
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#0D3B8C', marginTop: '16px' }}>2. Live iOS CLI Terminal</span>
            </div>

            {/* Mockup 3: Circular Tracker Progress screen Mock */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '280px',
                height: '520px',
                borderRadius: '36px',
                border: '12px solid #0D1B3E',
                boxShadow: '0 20px 40px rgba(13, 59, 140, 0.12)',
                backgroundColor: '#FFFFFF',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}>
                {/* Notch */}
                <div style={{ width: '120px', height: '20px', backgroundColor: '#0D1B3E', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px', margin: '0 auto', position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 0, zIndex: 10 }}></div>

                {/* Header */}
                <div style={{ backgroundColor: '#1A6FD4', color: '#FFFFFF', padding: '24px 16px 16px 16px', textAlign: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: 800 }}>Profile Progress</span>
                </div>

                {/* Progress Panel */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
                  {/* Circular ring */}
                  <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: 'conic-gradient(#1A6FD4 0% 74%, #F0F7FF 74% 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    boxShadow: '0 4px 15px rgba(26,111,212,0.1)'
                  }}>
                    {/* Inner cut circle info */}
                    <div style={{
                      width: '96px',
                      height: '96px',
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ fontSize: '24px', fontWeight: 800, color: '#0D3B8C', lineHeight: 1 }}>74%</span>
                      <span style={{ fontSize: '10px', color: '#4A6FA5', marginTop: '2px', fontWeight: 600 }}>Syllabus Done</span>
                    </div>
                  </div>

                  {/* Day streak element */}
                  <div style={{
                    backgroundColor: '#FFFBEB',
                    border: '1px solid #FEF3C7',
                    borderRadius: '12px',
                    padding: '10px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    width: '100%'
                  }}>
                    <span style={{ fontSize: '18px' }}>🔥</span>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#D97706', lineHeight: 1.1 }}>14 Days Streak</div>
                      <span style={{ fontSize: '9px', color: '#B45309' }}>Daily activity active!</span>
                    </div>
                  </div>

                  {/* Achievements List */}
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#0D1B3E' }}>Unlocked Badges</span>
                      <span style={{ fontSize: '10px', color: '#1A6FD4', fontWeight: 600 }}>View All</span>
                    </div>
                    
                    {[
                      { badge: '📶', title: 'Subnet Master', desc: 'VLSM calculations certified' },
                      { badge: '⚡', title: 'Socket Wizard', desc: 'Handshake simulator completed' }
                    ].map((ach, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'center', border: '1px solid #F0F7FF', borderRadius: '8px', padding: '6px' }}>
                        <span style={{ fontSize: '16px' }}>{ach.badge}</span>
                        <div>
                          <div style={{ fontSize: '11px', fontWeight: 700, color: '#0D1B3E', lineHeight: 1 }}>{ach.title}</div>
                          <span style={{ fontSize: '9px', color: '#4A6FA5' }}>{ach.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#0D3B8C', marginTop: '16px' }}>3. Gamified Tracker</span>
            </div>
          </div>
        )}
      </div>

      {/* Styled class injection for the grid configuration to sustain responsiveness */}
      <style>{`
        @media (max-width: 1023px) {
          .screenshot-container-grid {
            grid-template-columns: 1fr !important;
            padding: 32px 24px !important;
            gap: 36px !important;
          }
        }
      `}</style>
    </section>
  );
}

// ------ 10. TESTIMONIALS SECTION ------
function TestimonialsSection() {
  const reviews = [
    {
      name: 'Aryan Sharma',
      city: 'Delhi',
      initials: 'AS',
      quote: 'Started as a complete beginner. CCNA Zero to Hero made subnetting actually fun! Passed my actual 200-301 CCNA certification exam in just 3 months of dynamic study.'
    },
    {
      name: 'Priya Verdi',
      city: 'Mumbai',
      initials: 'PV',
      quote: 'The Hinglish explanations are a true game changer. Finally understanding complex OSI layer mappings and administrative distances without reading dry and boring textbooks!'
    },
    {
      name: 'Rohit Mishra',
      city: 'Bangalore',
      initials: 'RM',
      quote: 'The interactive packet simulators details are incredible. TCP handshakes were always confusing until I saw them visually simulated step-by-step on my mobile.'
    }
  ];

  return (
    <section id="testimonials" className="sec-pad section-fade" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        <h2 className="section-title">What Students Say</h2>
        <p className="section-tagline">Join thousands of successful network security professionals</p>

        <div className="testimonials-grid">
          {reviews.map((rev, index) => (
            <div key={index} className="white-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', gap: '2px', marginBottom: '16px' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={15} fill="#F59E0B" color="#F59E0B" />)}
                </div>
                <p style={{ fontSize: '15px', color: '#4A6FA5', lineHeight: 1.6, fontStyle: 'italic', margin: '0 0 24px 0' }}>
                  "{rev.quote}"
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid #F0F7FF', paddingTop: '16px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1A6FD4 0%, #0D3B8C 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}>
                  {rev.initials}
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#0D3B8C', lineHeight: 1.1 }}>{rev.name}</div>
                  <span style={{ fontSize: '12px', color: '#4A6FA5' }}>{rev.city} • <span style={{ color: '#22C55E', fontWeight: 600 }}>Verified Student</span></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ------ 11. FAQ SECTION ------
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: 'Is this app suitable for complete beginners?', a: 'Yes! The app is designed to start from absolute zero networking context. We build up technical terminology slowly, explaining core physical topologies before moving to complex IP address routing structures.' },
    { q: 'Does the app cover the full CCNA 200-301 syllabus?', a: 'Definitely. All six standard core Cisco exam domains, including Network Fundamentals, Network Access, IP Connectivity, IP Services, Security Fundamentals, and automation/programmability are cataloged.' },
    { q: 'What is Hinglish-style teaching?', a: 'Hinglish combines simplified English technical terms with intuitive Hindi conversational flows. This minimizes vocabulary blocks for South-Asian learners, making abstract theories highly memorable.' },
    { q: 'Are the simulators fully interactive?', a: 'Yes! The Packet Journey, TCP Handshake, and DHCP DORA networks respond directly to your actions. You can trigger, step forwards, and analyze header configuration values in real-time.' },
    { q: 'Is the app free to download?', a: 'Yes, downloading the app is completely free. This unlocks core learning pathways, introduction videos, select quiz trials, and the initial simulator tiers permanently.' },
    { q: 'Do I need any real networking equipment or Cisco hardware?', a: 'No equipment or packet tracers required. The simulated terminal sandboxes run natively inside our mobile codebase, letting you configure protocols directly in your palm.' }
  ];

  return (
    <section id="faq" className="sec-pad section-fade" style={{ backgroundColor: '#F0F7FF' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-tagline">Everything you need to know about CCNA Zero to Hero</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid rgba(26, 111, 212, 0.1)',
                  boxShadow: '0 4px 12px rgba(13, 59, 140, 0.02)',
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: 'none',
                    background: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#0D3B8C', paddingRight: '12px' }}>
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={20}
                    color="#1A6FD4"
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.25s'
                    }}
                  />
                </button>
                
                {isOpen && (
                  <div style={{
                    padding: '0 24px 20px 24px',
                    fontSize: '14.5px',
                    color: '#4A6FA5',
                    lineHeight: 1.6,
                    borderTop: '1px solid #F0F7FF'
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ------ 12. DOWNLOAD CTA SECTION ------
function DownloadSection() {
  return (
    <section id="download" style={{
      background: 'linear-gradient(135deg, #0D3B8C 0%, #1A6FD4 100%)',
      padding: '100px 0',
      color: '#FFFFFF',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative floating blur ring */}
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '-10%',
        width: '400px',
        height: '400px',
        background: 'rgba(56, 189, 248, 0.2)',
        filter: 'blur(100px)',
        borderRadius: '50%'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <h2 style={{ fontSize: '42px', fontWeight: 800, color: '#FFFFFF', marginBottom: '16px', lineHeight: 1.2 }}>
          Start Your CCNA Journey Today — For Free
        </h2>
        <p style={{ fontSize: '18px', color: 'rgba(240, 247, 255, 0.9)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto' }}>
          Stop delaying your networking goals. Gain actual operational mastery and certification with our pocket-sized companion.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
          <button className="btn btn-black btn-scale" style={{ display: 'inline-flex', gap: '8px', padding: '14px 28px' }}>
            <span>🎮</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.7, lineHeight: 1 }}>Download on</div>
              <div style={{ fontSize: '15px', fontWeight: 700 }}>Google Play</div>
            </div>
          </button>
          <button className="btn btn-black btn-scale" style={{ display: 'inline-flex', gap: '8px', padding: '14px 28px' }}>
            <span>🍎</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.7, lineHeight: 1 }}>Download on the</div>
              <div style={{ fontSize: '15px', fontWeight: 700 }}>App Store</div>
            </div>
          </button>
        </div>

        {/* Sub Badges */}
        <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            'No Credit Card Required',
            'Free Forever Core Access',
            '10,000+ Active Worldwide Learners'
          ].map((inf, idx) => (
            <span key={idx} style={{ fontSize: '14px', fontWeight: 600, color: '#38BDF8', display: 'flex', alignItems: 'center', gap: '6px' }}>
              ✓ <span style={{ color: '#FFFFFF' }}>{inf}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ------ 13. CONTACT FORM SECTION ------
function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <section id="contact" className="sec-pad section-fade" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        <div className="contact-grid">
          {/* Info Details Row */}
          <div>
            <h2 style={{ fontSize: '36px', fontWeight: 700, color: '#0D3B8C', marginBottom: '16px' }}>Get in Touch</h2>
            <p style={{ fontSize: '15px', color: '#4A6FA5', marginBottom: '32px', maxWidth: '440px' }}>
              Have questions about licensing, enterprise features, or corporate packages? Send us a ticket and our technical support staff will reach out.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#F0F7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A6FD4' }}>
                  <Mail size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#4A6FA5', lineHeight: 1 }}>Support Mail</div>
                  <a href="mailto:ccnazerotohero@gmail.com" style={{ fontSize: '15px', fontWeight: 600, color: '#0D1B3E', textDecoration: 'none' }}>ccnazerotohero@gmail.com</a>
                </div>
              </div>
            </div>

            {/* Social profiles linking */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { label: '📧', url: 'mailto:ccnazerotohero@gmail.com' },
                { label: '🔗', url: 'https://linkedin.com/' },
                { label: '📸', url: 'https://instagram.com/' },
                { label: '▶️', url: 'https://youtube.com/' }
              ].map((soc, idx) => (
                <a
                  key={idx}
                  href={soc.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#F0F7FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    textDecoration: 'none',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                >
                  {soc.label}
                </a>
              ))}
            </div>
          </div>

          {/* Action form Row */}
          <div style={{
            backgroundColor: '#F0F7FF',
            borderRadius: '20px',
            border: '1px solid rgba(26, 111, 212, 0.1)',
            padding: '40px'
          }}>
            {success ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📬</div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0D3B8C', marginBottom: '8px' }}>Thank You!</h3>
                <p style={{ fontSize: '15px', color: '#4A6FA5', margin: 0 }}>We have successfully received your ticket and will reach back out soon.</p>
                <button onClick={() => setSuccess(false)} className="btn btn-primary" style={{ marginTop: '24px', padding: '10px 24px' }}>Send Another Ticket</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#0D1B3E', marginBottom: '6px' }}>Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid rgba(26, 111, 212, 0.15)',
                      backgroundColor: '#FFFFFF',
                      fontSize: '14.5px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#0D1B3E', marginBottom: '6px' }}>Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter email address"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid rgba(26, 111, 212, 0.15)',
                      backgroundColor: '#FFFFFF',
                      fontSize: '14.5px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#0D1B3E', marginBottom: '6px' }}>Your Message</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe how we can help you..."
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid rgba(26, 111, 212, 0.15)',
                      backgroundColor: '#FFFFFF',
                      fontSize: '14.5px',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Submit Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ------ MINI WIDGET helper for Why-Choose Quiz ------
function InteractiveQuizDemo() {
  const [selected, setSelected] = useState<number | null>(null);
  const [complete, setComplete] = useState(false);

  const options = [
    { text: 'A) 255.255.255.0', correct: false },
    { text: 'B) 255.255.255.192', correct: true },
    { text: 'C) 255.255.255.128', correct: false },
    { text: 'D) 255.255.255.240', correct: false }
  ];

  const handleSelect = (idx: number) => {
    setSelected(idx);
    if (options[idx].correct) {
      setComplete(true);
    }
  };

  return (
    <div>
      <h4 style={{ margin: '0 0 14px 0', fontSize: '15px', fontWeight: 700, color: '#0D3B8C' }}>
        A Cisco router needs to evaluate a subnet prefix /26. What is the correct binary subnet mask equivalent value?
      </h4>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {options.map((option, r) => {
          let bg = '#FFFFFF';
          let border = '1px solid rgba(26, 111, 212, 0.15)';
          let color = '#0D1B3E';

          if (selected === r) {
            if (option.correct) {
              bg = '#DCFCE7';
              border = '1px solid #22C55E';
              color = '#15803D';
            } else {
              bg = '#FEE2E2';
              border = '1px solid #EF4444';
              color = '#B91C1C';
            }
          }

          return (
            <button
              key={r}
              onClick={() => handleSelect(r)}
              disabled={selected !== null}
              style={{
                width: '100%',
                backgroundColor: bg,
                textAlign: 'left',
                border: border,
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '13.5px',
                fontWeight: 600,
                color: color,
                cursor: selected !== null ? 'default' : 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {option.text}
            </button>
          );
        })}
      </div>

      {complete && (
        <div style={{ marginTop: '16px', backgroundColor: '#F0FDF4', borderRadius: '8px', padding: '10px', textAlign: 'center', border: '1px solid #BBF7D0' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#166534' }}>🎉 Correct! Class C subnet /26 borrows 2 host bits (128+64 = 192).</span>
        </div>
      )}

      {selected !== null && !complete && (
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <button
            onClick={() => { setSelected(null); setComplete(false); }}
            style={{
              border: 'none',
              background: 'none',
              color: '#1A6FD4',
              fontSize: '11px',
              fontFamily: 'inherit',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <RefreshCw size={12} /> Try Again
          </button>
        </div>
      )}
    </div>
  );
}

// ------ 14. FOOTER COMPONENT ------
function Footer() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer style={{
      backgroundColor: '#0D1B3E',
      color: '#A0B5D0',
      padding: '80px 0 20px 0',
      fontSize: '14px',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      <div className="container">
        <div className="footer-grid" style={{ marginBottom: '48px' }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}>
                <img src={iconCcna} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} referrerPolicy="no-referrer" />
              </div>
              <span style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF' }}>CCNA <span style={{ color: '#1A6FD4' }}>Zero2Hero</span></span>
            </div>
            <p style={{ margin: '0 0 20px 0', fontSize: '13.5px', color: '#94A3B8', lineHeight: 1.6, maxWidth: '240px' }}>
              The ultimate pocket laboratory teaching network architectures, protocol routes, and Cisco commands interactively.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: 700, margin: '0 0 16px 0' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Home Page', id: 'hero' },
                { label: 'Features Grid', id: 'features' },
                { label: 'Interactive Simulators', id: 'simulators' },
                { label: 'FAQ Dropdowns', id: 'faq' },
                { label: 'Form Contact', id: 'contact' }
              ].map((lnk, j) => (
                <button
                  key={j}
                  onClick={() => scrollTo(lnk.id)}
                  style={{
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: '#94A3B8',
                    cursor: 'pointer',
                    fontSize: '13.5px'
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
                  onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
                >
                  {lnk.label}
                </button>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: 700, margin: '0 0 16px 0' }}>Resources</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Cisco Certification Prep', 'Subnet Mask Chart', 'OSPF Command Sheet', 'VLAN Tagging Guide', 'DHCP Lease Manual'].map((resItem, x) => (
                <span
                  key={x}
                  style={{ cursor: 'pointer', fontSize: '13.5px' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
                  onMouseLeave={e => e.currentTarget.style.color = '#A0B5D0'}
                >
                  {resItem}
                </span>
              ))}
            </div>
          </div>

          {/* Legal columns */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: 700, margin: '0 0 16px 0' }}>Legal</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Privacy Policy', 'Terms of Usage Agreement', 'Cookie Control Settings', 'EULA License Rules'].map((leg, y) => (
                <span
                  key={y}
                  style={{ cursor: 'pointer', fontSize: '13.5px' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
                  onMouseLeave={e => e.currentTarget.style.color = '#A0B5D0'}
                >
                  {leg}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright segment */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <span style={{ fontSize: '12px', color: '#64748B' }}>© 2026 CCNA Zero to Hero. Developed for certified excellence. All rights saved.</span>
          <span style={{ fontSize: '12px', color: '#64748B' }}>Enterprise licensing available worldwide.</span>
        </div>
      </div>
    </footer>
  );
}
