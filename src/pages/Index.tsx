
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, ChartBar, Bell, Clock } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import { toast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import HomeMapboxGlobe from "@/components/HomeMapboxGlobe";
import "@/components/home-mapbox.css";
import APIModal from "@/components/APIModal";
import SubscriptionPlans from "@/components/SubscriptionPlans";
import ChatbotWidget from "@/components/chatbot/ChatbotWidget";
import JourneySection from "@/components/JourneySection";
import SiteMap from "@/components/SiteMap";
import { Separator } from "@/components/ui/separator";
import ScrollAnimations from "@/components/ScrollAnimations";
import { getScrollProgress, getSectionVisibility } from "@/utils/scrollAnimations";
import FAQJourneySection from "@/components/journey/FAQJourneySection";

const Index = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showAPIModal, setShowAPIModal] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Section elements refs
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: "Analytics", path: "#features", anchor: true },
    { name: "Journey", path: "#journey", anchor: true },
    { name: "Plans", path: "#plans", anchor: true },
    { name: "FAQ", path: "#faq", anchor: true }
  ];
  
  // Define sections for scroll animations
  const sections = [
    { id: "hero", name: "Home" },
    { id: "features", name: "Analytics" },
    { id: "journey", name: "Journey" },
    { id: "plans", name: "Plans" },
    { id: "faq", name: "FAQ" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setHasScrolled(scrollPosition > 50);
      
      // Calculate overall scroll progress
      const progress = getScrollProgress();
      setScrollProgress(progress);
      
      // Apply effects to feature cards
      if (featuresRef.current) {
        const visibility = getSectionVisibility("features");
        const cards = featuresRef.current.querySelectorAll('.feature-card');
        
        cards.forEach((card, index) => {
          const delay = index * 0.08; // Reduced delay for smoother overall effect
          const startThreshold = 0.1 + delay;
          
          if (visibility > startThreshold) {
            card.classList.add('revealed');
            (card as HTMLElement).style.transitionDelay = `${delay}s`;
          } else {
            card.classList.remove('revealed');
          }
        });
      }
      
      // Determine active section based on scroll position
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const handleExploreClick = () => {
    toast({
      title: "Welcome to NeuroTicker",
      description: "Start exploring our advanced geospatial financial analytics platform.",
      duration: 5000
    });
  };

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Add offset for navbar height
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  const features = [{
    title: "Geospatial Insights",
    description: "Visualize financial data layered onto geographic maps to identify regional trends and opportunities.",
    icon: Globe
  }, {
    title: "Real-Time Dashboards",
    description: "Monitor market changes with customizable dashboards that update in real-time with global financial data.",
    icon: ChartBar
  }, {
    title: "Custom Alerts",
    description: "Set up personalized notifications for market events based on geospatial and financial parameters.",
    icon: Bell
  }, {
    title: "Portfolio Mapping",
    description: "Plot your investments on a global scale and visualize exposure across different geographic regions.",
    icon: Clock
  }];
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0a0e17] to-[#131b2e] overflow-x-hidden">
      {/* Scroll Animations Component */}
      <ScrollAnimations sections={sections} />
      
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${hasScrolled ? "py-3 bg-black/70 backdrop-blur-md" : "py-5 bg-transparent"}`}>
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="rounded-lg bg-teal p-1 mr-2">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <span className="text-white text-xl font-bold">NeuroTicker</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <button 
                key={link.path}
                onClick={() => handleNavClick(link.path.substring(1))} 
                className={`text-gray-300 hover:text-white transition-colors ${
                  activeSection === link.path.substring(1) ? "text-white font-medium" : ""
                }`}
              >
                {link.name}
              </button>
            ))}
            <Link to="/signin" className="text-gray-300 hover:text-white transition-colors absolute right-20">Sign In</Link>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/signin">
              
            </Link>
            <Link to="/dashboard">
              
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Mapbox Globe */}
      <section className="relative min-h-screen flex items-center hero-section" id="hero">
        {/* Background Globe - replaced with Mapbox Globe */}
        <div className="absolute inset-0 z-0 opacity-78 zoom-bg" 
             style={{ transform: `scale(${1 + scrollProgress * 0.05})` }}>
          <HomeMapboxGlobe className="w-full h-full" />
        </div>
        
        {/* Content overlay */}
        <div className="container mx-auto relative z-10 pt-20 hero-content" ref={heroRef}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="p-2 px-4 rounded-full border border-teal/30 bg-teal/5 backdrop-blur-sm inline-flex items-center">
                <span className="text-sm text-teal font-medium">New Feature: Sonar Powered Deep Research & Stock Comparer added!</span>
              </div>
              <div className="reveal-container">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight reveal-element revealed hero-heading">
                  <span className="gradient-text-animated">Unlock</span> the Power of Geospatial Financial Intelligence
                </h1>
              </div>
              <p className="text-xl text-gray-300 reveal-element revealed" style={{ transitionDelay: '0.2s' }}>
                Visualize market insights with dynamic maps and AI-driven data overlays
              </p>
              <div className="flex flex-wrap gap-4 reveal-element revealed" style={{ transitionDelay: '0.4s' }}>
                <Link to="/dashboard">
                  <Button className="bg-teal-gradient text-white py-6 px-8 rounded-md button-glow">
                    Explore Mapboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/trading">
                  <Button variant="outline" className="border-white/20 text-white py-6 px-8 rounded-md hover:bg-white/10">
                    Trading Platform <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="flex items-center space-x-2 pt-6 reveal-element revealed" style={{ transitionDelay: '0.6s' }}>
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(idx => <div key={idx} className="w-8 h-8 rounded-full bg-gray-500 border-2 border-white/20"></div>)}
                </div>
                <span className="text-gray-400 text-sm font-mono">
                  <span className="text-teal font-bold">1000+</span> stocks analysed deeply using Sonar API!
                </span>
              </div>
            </div>
            <div className="hidden md:block">
              {/* This space is intentionally empty for the hero section layout */}
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-gray-400 mb-2">Scroll to explore</span>
          <ArrowRight className="h-5 w-5 text-teal transform rotate-90" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative content-section" id="features" ref={featuresRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 perspective-container">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 section-transition">
              Advanced Geospatial Analytics
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto section-transition">
              Combine financial data with location intelligence to discover insights that traditional analytics miss.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card reveal-element"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <FeatureCard title={feature.title} description={feature.description} icon={feature.icon} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section id="journey" className="content-section section-transition">
        <JourneySection />
      </section>

      {/* Subscription Plans Section */}
      <section id="plans" className="content-section section-transition">
        <SubscriptionPlans />
      </section>
      
      {/* FAQ Journey Section */}
      <section id="faq" className="content-section section-transition">
        <FAQJourneySection />
      </section>

      {/* Call to Action */}
      <section className="py-20 content-section section-transition">
        <div className="container mx-auto px-4">
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto floating-element">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to transform your financial analysis?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of analysts who have already discovered the power of geospatial financial intelligence.
            </p>
            <Link to="/dashboard">
              <Button className="bg-teal-gradient text-white py-6 px-8 text-lg rounded-md button-glow">
                Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-white/10">
        {/* Site Map Section */}
        <SiteMap onApiModalToggle={() => setShowAPIModal(true)} />
        
        <Separator className="bg-white/10" />
        
        {/* Footer Bottom */}
        <div className="py-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-6 md:mb-0">
                <div className="rounded-lg bg-teal p-1 mr-2">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <span className="text-white text-lg font-bold items-center">NeuroTicker</span>
              </div>
              <div className="mt-6 md:mt-0 text-sm text-gray-500">
                © 2025 NeuroTicker. All rights reserved.              
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* API Modal */}
      <APIModal open={showAPIModal} onClose={() => setShowAPIModal(false)} />

      {/* Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
};

export default Index;
