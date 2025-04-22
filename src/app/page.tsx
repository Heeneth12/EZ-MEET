"use client";
import { useState, useEffect, useRef } from 'react';
import { 
  Zap, Video, BarChart2, MessageCircle, Globe, Star, 
  ArrowRight, Shield, Cpu, Github, Calendar, Users, 
  CheckCircle, Sparkles, Menu, X, ChevronRight, ChevronDown
} from 'lucide-react';

export default function VidConfLandingPage() {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activePricingTab, setActivePricingTab] = useState('monthly');
  
  // Refs for section scrolling
  const sectionsRef = useRef({});
  
  // Handle scroll effect for navbar and scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      setShowScrollTop(window.scrollY > 500);
      
      // Determine active section based on scroll position
      const scrollPosition = window.scrollY + 100;
      
      for (const section in sectionsRef.current) {
        const element = sectionsRef.current[section];
        if (element && 
            scrollPosition >= element.offsetTop && 
            scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Update section refs when component mounts
  useEffect(() => {
    sectionsRef.current.home = document.getElementById('home');
    sectionsRef.current.features = document.getElementById('features');
    sectionsRef.current.benefits = document.getElementById('benefits');
    sectionsRef.current.pricing = document.getElementById('pricing');
    sectionsRef.current.faq = document.getElementById('faq');
  }, []);
  
  // Scroll to section function
  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const features = [
    { 
      id: 'getting-started', 
      title: 'Simple Onboarding',
      icon: <Zap size={24} />,
      description: 'Get started in seconds with our intuitive interface. No downloads required - just create a room and share the link.',
      color: 'from-blue-500/20 to-cyan-500/20',
      image: "/api/placeholder/400/300"
    },
    { 
      id: 'run-meeting', 
      title: 'Crystal Clear Meetings',
      icon: <Video size={24} />,
      description: 'Enjoy HD video and audio with adaptive streaming that works beautifully even on unreliable connections.',
      color: 'from-purple-500/20 to-pink-500/20',
      image: "/api/placeholder/400/300"
    },
    { 
      id: 'analyze', 
      title: 'Insightful Analytics',
      icon: <BarChart2 size={24} />,
      description: 'Track participation, engagement metrics, and meeting effectiveness with our detailed reporting dashboard.',
      color: 'from-green-500/20 to-emerald-500/20',
      image: "/api/placeholder/400/300"
    },
    { 
      id: 'feedback', 
      title: 'Collaborative Feedback',
      icon: <MessageCircle size={24} />,
      description: 'Gather real-time reactions and post-meeting surveys to continuously improve your virtual gatherings.',
      color: 'from-amber-500/20 to-orange-500/20',
      image: "/api/placeholder/400/300"
    }
  ];
  
  const additionalFeatures = [
    {
      title: "Scheduling Made Easy",
      description: "Easily schedule and manage meetings with calendar integration and timezone support.",
      icon: <Calendar size={24} />
    },
    {
      title: "Team Collaboration",
      description: "Collaborative tools like whiteboards, polls, and breakout rooms enhance team productivity.",
      icon: <Users size={24} />
    },
    {
      title: "AI Assistance",
      description: "Smart meeting summaries, automated notes, and action item tracking powered by AI.",
      icon: <Sparkles size={24} />
    }
  ];
  
  const benefits = [
    {
      title: "Secure by Design",
      description: "End-to-end encryption and comprehensive security protocols keep your communications safe.",
      icon: <Shield size={24} />
    },
    {
      title: "Resource Efficient",
      description: "Optimized performance that won't drain your battery or bandwidth.",
      icon: <Cpu size={24} />
    },
    {
      title: "Global Infrastructure",
      description: "Low-latency connections with data centers strategically located worldwide.",
      icon: <Globe size={24} />
    }
  ];
  
  const testimonials = [
    {
      name: "Zurich",
      image: "/api/placeholder/120/40",
      quote: "VidConf transformed our hybrid work environment with reliable and secure connections."
    },
    {
      name: "Flowbird",
      image: "/api/placeholder/120/40",
      quote: "The analytics features helped us identify and optimize meeting efficiency across teams."
    },
    {
      name: "Getin",
      image: "/api/placeholder/120/40",
      quote: "Open source flexibility with enterprise-grade security - exactly what we needed."
    },
    {
      name: "TWBS Ltd",
      image: "/api/placeholder/120/40",
      quote: "The developer API allowed us to deeply integrate VidConf into our workflow."
    },
    {
      name: "Road Hero",
      image: "/api/placeholder/120/40",
      quote: "VidConf's performance even on low bandwidth connections was a game changer for our field teams."
    }
  ];
  
  const pricingPlans = [
    {
      name: "Free",
      monthlyPrice: "$0",
      yearlyPrice: "$0",
      description: "Perfect for small teams and personal use",
      features: [
        "Up to 4 participants per meeting",
        "40-minute meeting limit",
        "Basic screen sharing",
        "Chat during meetings",
        "Limited recording (720p)"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      monthlyPrice: "$12",
      yearlyPrice: "$120",
      description: "For growing teams and businesses",
      features: [
        "Up to 50 participants per meeting",
        "Unlimited meeting duration",
        "Advanced screen sharing",
        "Cloud recording storage (10GB)",
        "Analytics dashboard",
        "Custom branding options"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      monthlyPrice: "Custom",
      yearlyPrice: "Custom",
      description: "For large organizations with unique needs",
      features: [
        "Unlimited participants",
        "Dedicated support",
        "99.99% uptime SLA",
        "Advanced security features",
        "SSO integration",
        "Custom API development",
        "Advanced analytics"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];
  
  const faqs = [
    {
      question: "How secure is VidConf for sensitive meetings?",
      answer: "VidConf employs end-to-end encryption for all meetings, ensuring that your conversations remain private. We use industry-standard protocols and regularly conduct security audits. Enterprise plans include additional security features like SSO integration and custom security policies."
    },
    {
      question: "Can I use VidConf on mobile devices?",
      answer: "Yes! VidConf provides native apps for iOS and Android with all the core functionality of the desktop version. You can join or host meetings, share your screen, participate in chats, and access meeting recordings from your mobile device."
    },
    {
      question: "How does the open source model work?",
      answer: "Our core technology is open source, allowing developers to inspect, modify, and contribute to the codebase. We maintain a commercial offering with additional features and support for businesses that need them. This hybrid approach ensures transparency while funding ongoing development."
    },
    {
      question: "What happens if my internet connection is unstable?",
      answer: "VidConf is designed to handle varying internet conditions. The platform automatically adjusts video quality to maintain connection, has smart reconnection capabilities, and can switch to audio-only mode when bandwidth is severely limited. After connectivity is restored, you'll seamlessly rejoin your meeting."
    },
    {
      question: "Can I customize VidConf for my organization?",
      answer: "Absolutely! Our Pro and Enterprise plans offer branding options, including custom logos and URL. For deeper customization, our open API allows for integration with your existing tools and workflows. Enterprise customers can request custom feature development."
    }
  ];

  // State for FAQ accordion
  const [openFaq, setOpenFaq] = useState(null);
  
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-950 text-gray-100 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black overflow-hidden">
      {/* Navigation - Enhanced with active states and smooth transitions */}
      <header className={`py-4 px-6 sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-950/90 backdrop-blur-lg shadow-lg shadow-blue-900/5 border-b border-gray-800' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <div className="h-5 w-5 rounded-full bg-white"></div>
            </div>
            <span className="ml-3 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">VidConf</span>
          </div>
          
          <nav className="hidden lg:flex items-center space-x-8">
            {[
              { id: 'home', label: 'Home' },
              { id: 'features', label: 'Features' },
              { id: 'benefits', label: 'Benefits' },
              { id: 'pricing', label: 'Pricing' },
              { id: 'faq', label: 'FAQ' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors duration-200 relative py-2 
                  ${activeSection === item.id ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'}`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 rounded-full transform scale-x-100 transition-transform duration-300"></span>
                )}
              </button>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center text-gray-300">
              <Star size={16} className="mr-1 text-yellow-400" />
              <span className="font-medium">15K+</span>
            </div>
            <a href="https://github.com" className="text-gray-300 hover:text-white transition-colors duration-200" aria-label="GitHub">
              <Github size={22}/>
            </a>
            <button className="bg-white hover:bg-gray-100 text-gray-900 font-medium text-sm px-5 py-2 rounded-md transition duration-300 shadow-md hover:shadow-lg hover:shadow-blue-500/10 flex items-center">
              Contact Us
              <span className="ml-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">→</span>
            </button>
          </div>
          
          {/* Mobile menu button - Improved animation */}
          <button 
            className="lg:hidden text-gray-300 hover:text-white focus:outline-none" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile menu - Enhanced with animation */}
        <div 
          className={`lg:hidden fixed inset-0 z-40 bg-gray-900/95 backdrop-blur-lg transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex justify-end p-6">
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-300 hover:text-white"
              aria-label="Close Menu"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col space-y-6 p-6">
            {[
              { id: 'home', label: 'Home' },
              { id: 'features', label: 'Features' },
              { id: 'benefits', label: 'Benefits' },
              { id: 'pricing', label: 'Pricing' },
              { id: 'faq', label: 'FAQ' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-xl font-medium transition-colors duration-200 flex items-center
                  ${activeSection === item.id ? 'text-blue-400' : 'text-gray-300'}`}
              >
                {item.label}
                <ChevronRight size={20} className="ml-2" />
              </button>
            ))}
            <div className="pt-6 flex flex-col space-y-4">
              <button className="bg-white hover:bg-gray-100 text-gray-900 font-medium px-4 py-3 rounded-md transition duration-300 flex items-center justify-center">
                Contact Us
                <span className="ml-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">→</span>
              </button>
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-4 py-3 rounded-md transition duration-300">
                Get Started Free
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Hero Content - with enhanced animations and effects */}
      <section id="home" className="relative py-20 md:py-32 px-6 overflow-hidden">
        {/* Background decorative elements - enhanced with more gradients and animations */}
        <div className="absolute inset-0 overflow-hidden z-0">
          {/* Stars with pulse animations */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
          
          {/* Gradient blobs with subtle movement */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-purple-600/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '8s'}}></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-cyan-600/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '10s', animationDelay: '2s'}}></div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e540_1px,transparent_1px),linear-gradient(to_bottom,#4f46e540_1px,transparent_1px)] bg-[size:64px_64px] opacity-5"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Action Button with hover effect */}
          <div className="flex justify-center mb-6">
            <button className="bg-gray-800/60 hover:bg-gray-800/80 text-gray-300 text-sm flex items-center px-4 py-2 rounded-full border border-gray-700/50 shadow-lg shadow-blue-900/5 transition duration-300 backdrop-blur-sm hover:border-blue-500/30 hover:text-blue-300 group">
              <Video size={16} className="mr-2 text-blue-400 group-hover:text-blue-300" />
              WHAT IS VIDCONF?
            </button>
          </div>
          
          {/* Main Heading with gradient text and animation */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-300 inline-block transform transition-all duration-700 hover:scale-105">
              Composable, Open Source<br />
              <span className="text-5xl md:text-6xl lg:text-7xl font-bold">Meeting Platform</span>
            </div>
          </h1>
          
          {/* Subheading */}
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-12">
            Build or enhance your virtual meeting experience, while maintaining control with
            an open-source, full-stack and modular infrastructure.
          </p>
          
          {/* CTA Buttons - enhanced with gradients and effects */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-white text-gray-900 font-medium px-6 py-3 rounded-md transition duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transform hover:-translate-y-0.5 flex items-center justify-center group">
              Get Started
              <span className="ml-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300">→</span>
            </button>
            <button className="bg-gray-800/80 hover:bg-gray-800 border border-gray-700/50 text-white font-medium px-6 py-3 rounded-md transition duration-300 shadow-md hover:shadow-lg hover:shadow-blue-900/10 backdrop-blur-sm transform hover:-translate-y-0.5">
              Deploy Open Source
            </button>
          </div>
          
          {/* Preview Image - New addition */}
          <div className="relative max-w-4xl mx-auto mt-12">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl"></div>
            <div className="relative bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm rounded-xl p-2 shadow-lg shadow-blue-900/10">
              <div className="h-8 bg-gray-900 rounded-t-lg flex items-center px-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="h-64 bg-gray-900 flex items-center justify-center">
                <img src="/api/placeholder/800/400" alt="VidConf Interface Preview" className="max-w-full max-h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Features Section - Enhanced with interactive cards and previews */}
      <section id="features" className="py-20 px-6 relative">
        {/* Background accent */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute -top-40 right-0 w-96 h-96 bg-gradient-to-bl from-blue-600/10 to-purple-600/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block text-blue-400 font-medium mb-2 text-sm">POWERFUL FEATURES</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-300">Everything You Need for Perfect Meetings</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Designed to enhance your virtual communication with intuitive tools that make online meetings feel natural and productive.</p>
          </div>
          
          {/* Interactive Feature Showcase */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-8">
              {features.map((feature) => (
                <div 
                  key={feature.id}
                  className={`group bg-gradient-to-br from-gray-900 to-gray-800/50 backdrop-blur-sm border transition-all duration-300 shadow-lg hover:shadow-xl rounded-lg p-6 cursor-pointer ${
                    hoveredFeature === feature.id 
                      ? 'border-blue-500/30 shadow-blue-900/10 transform -translate-y-1' 
                      : 'border-gray-800/60 hover:border-gray-700/80'
                  }`}
                  onMouseEnter={() => setHoveredFeature(feature.id)}
                  onClick={() => setHoveredFeature(feature.id === hoveredFeature ? null : feature.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 bg-gradient-to-br ${feature.color} rounded-lg text-blue-400 border border-gray-700/30 shadow-lg shadow-blue-900/5 transition-all duration-300 ${
                      hoveredFeature === feature.id ? 'scale-110' : ''
                    }`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-blue-200 transition-colors duration-300">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Feature Preview Window */}
            <div className="flex items-center justify-center">
              <div className="bg-gray-900/90 border border-gray-800 rounded-xl overflow-hidden shadow-2xl shadow-blue-900/5 w-full max-w-md">
                <div className="h-8 bg-gray-800 flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="ml-4 text-xs text-gray-400">
                    {hoveredFeature ? features.find(f => f.id === hoveredFeature)?.title : "Select a feature"}
                  </div>
                </div>
                <div className="h-64 p-4 flex items-center justify-center bg-gray-950">
                  {hoveredFeature ? (
                    <img 
                      src={features.find(f => f.id === hoveredFeature)?.image}
                      alt={features.find(f => f.id === hoveredFeature)?.title}
                      className="max-w-full max-h-full object-cover rounded transition-all duration-500"
                    />
                  ) : (
                    <div className="text-gray-500 flex flex-col items-center">
                      <Video size={48} className="mb-2 opacity-30" />
                      <p>Select a feature to preview</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {additionalFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-gray-900 to-gray-800/50 backdrop-blur-sm border border-gray-800/60 rounded-lg p-6 hover:border-gray-700/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-900/5 transform hover:-translate-y-0.5 group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 mb-4 bg-gradient-to-br from-blue-500/20 to-purple-500/10 rounded-lg text-blue-400 border border-gray-700/30 shadow-lg shadow-blue-900/5">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-200 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Enhanced with animated icons */}
      <section id="benefits" className="py-16 px-6 bg-gradient-to-b from-gray-900/70 to-gray-950 backdrop-blur-sm border-y border-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-blue-400 font-medium mb-2 text-sm">WHY CHOOSE US</span>
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-300">Built for Performance and Security</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Our platform is designed from the ground up for reliability, security, and efficiency.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 bg-gray-900/40 backdrop-blur-sm border border-gray-800/60 rounded-lg transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-900/10 transform hover:-translate-y-1 group">
                <div className="mb-4 p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/10 rounded-full text-blue-400 border border-gray-700/30 shadow-lg shadow-blue-900/5 group-hover:scale-110 transition-all duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-200">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Enhanced with animated counters */}
      <section className="py-16 px-6 relative">
        {/* Background accent */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute -bottom-40 left-0 w-96 h-96 bg-gradient-to-tr from-blue-600/10 to-cyan-600/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800/50 backdrop-blur-sm border border-gray-800/60 rounded-lg p-6 text-center transform transition-all duration-500 hover:scale-105 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-900/10">
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 mb-2">99.9%</p>
              <p className="text-gray-400 text-sm">Uptime</p>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800/50 backdrop-blur-sm border border-gray-800/60 rounded-lg p-6 text-center transform transition-all duration-500 hover:scale-105 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-900/10">
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 mb-2">5M+</p>
              <p className="text-gray-400 text-sm">Users</p>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800/50 backdrop-blur-sm border border-gray-800/60 rounded-lg p-6 text-center transform transition-all duration-500 hover:scale-105 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-900/10">
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 mb-2">50ms</p>
              <p className="text-gray-400 text-sm">Latency</p>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800/50 backdrop-blur-sm border border-gray-800/60 rounded-lg p-6 text-center transform transition-all duration-500 hover:scale-105 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-900/10">
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 mb-2">24/7</p>
              <p className="text-gray-400 text-sm">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - New addition */}
      <section id="pricing" className="py-20 px-6 bg-gradient-to-b from-gray-900/70 to-gray-950 backdrop-blur-sm border-y border-gray-800/30 relative">
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-gradient-to-r from-blue-600/10 via-purple-600/5 to-blue-600/10 rounded-full blur-3xl opacity-30"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block text-blue-400 font-medium mb-2 text-sm">PRICING PLANS</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-300">Choose the Perfect Plan for Your Team</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Flexible pricing options designed to scale with your needs from individual users to enterprise organizations.</p>
          </div>
          
          {/* Pricing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800/60 rounded-full p-1 inline-flex">
              <button 
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activePricingTab === 'monthly' 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActivePricingTab('monthly')}
              >
                Monthly
              </button>
              <button 
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activePricingTab === 'yearly' 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActivePricingTab('yearly')}
              >
                Yearly <span className="text-xs font-normal bg-blue-600/50 rounded-full px-2 py-0.5 ml-1">Save 20%</span>
              </button>
            </div>
          </div>
          
          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-gradient-to-br from-gray-900 to-gray-800/50 backdrop-blur-sm border rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 relative ${
                  plan.popular 
                    ? 'border-blue-500/50 shadow-lg shadow-blue-900/20' 
                    : 'border-gray-800/60 hover:border-gray-700/80'
                }`}
              >
                {plan.popular && (
                  <div className="bg-blue-500 text-white text-xs font-medium py-1 px-3 absolute top-0 right-0 rounded-bl-lg">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">
                      {activePricingTab === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                    </span>
                    {plan.monthlyPrice !== "Custom" && (
                      <span className="text-gray-400 ml-2">
                        {activePricingTab === 'monthly' ? '/month' : '/year'}
                      </span>
                    )}
                  </div>
                  <div className="mb-8">
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle size={18} className="text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button 
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/20' 
                        : 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700/50'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-400">
              Need a custom plan? <a href="#" className="text-blue-400 hover:text-blue-300 underline">Contact our sales team</a>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section - New addition */}
      <section id="faq" className="py-20 px-6 relative">
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute -top-40 right-0 w-96 h-96 bg-gradient-to-bl from-blue-600/10 to-purple-600/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block text-blue-400 font-medium mb-2 text-sm">FAQ</span>
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-300">Frequently Asked Questions</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Find answers to common questions about VidConf's features, security, and implementation.</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-gray-900 to-gray-800/50 backdrop-blur-sm border border-gray-800/60 rounded-lg overflow-hidden transition-all duration-300"
              >
                <button 
                  className="w-full text-left px-6 py-4 flex items-center justify-between focus:outline-none" 
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium text-white">{faq.question}</span>
                  <ChevronDown 
                    size={20} 
                    className={`text-gray-400 transition-transform duration-300 ${openFaq === index ? 'transform rotate-180' : ''}`} 
                  />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-4 text-gray-400">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-900 to-gray-950 relative">
        {/* Background gradient effect */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-gradient-to-r from-blue-600/10 via-purple-600/5 to-blue-600/10 rounded-full blur-3xl opacity-30"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-blue-200">Ready to transform your virtual meetings?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">Join thousands of teams who have improved their communication and collaboration with VidConf</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-6 py-3 rounded-md transition duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transform hover:-translate-y-0.5 flex items-center justify-center">
              Get Started Free
              <ArrowRight size={16} className="ml-2" />
            </button>
            <button className="bg-gray-800/80 hover:bg-gray-800 border border-gray-700/50 text-white font-medium px-6 py-3 rounded-md transition duration-300 shadow-md hover:shadow-lg hover:shadow-blue-900/10 backdrop-blur-sm transform hover:-translate-y-0.5">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-950 border-t border-gray-800/50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <div className="h-4 w-4 rounded-full bg-white"></div>
              </div>
              <span className="ml-2 text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">VidConf</span>
            </div>
            <p className="text-gray-400 text-sm">Open source video conferencing platform for teams of all sizes.</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200"><Globe size={16} /></a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200"><Github size={16}/></a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200"><MessageCircle size={16} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-4 text-white">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-200 hover:underline">Features</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-200 hover:underline">Pricing</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-200 hover:underline">Security</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-200 hover:underline">Enterprise</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4 text-white">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-200 hover:underline">Documentation</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-200 hover:underline">API Reference</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-200 hover:underline">Community</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-200 hover:underline">GitHub</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-200 hover:underline">About</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-200 hover:underline">Careers</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-200 hover:underline">Blog</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-200 hover:underline">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto border-t border-gray-800/50 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-500 text-sm">© 2025 VidConf. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-gray-400 transition-colors duration-200 text-sm hover:underline">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-gray-400 transition-colors duration-200 text-sm hover:underline">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-gray-400 transition-colors duration-200 text-sm hover:underline">Cookie Policy</a>
          </div>
        </div>
      </footer>
      
      {/* Scroll to top button */}
      <button 
        className={`fixed right-6 bottom-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg transition-all duration-300 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ChevronRight size={24} className="transform rotate-270" />
      </button>
    </div>
  );
}