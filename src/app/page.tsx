"use client";
import { useState } from 'react';
import { Zap, Users, Video, BarChart2, MessageCircle, Check, ChevronRight, Globe} from 'lucide-react';
import EnhancedNetworkVisualization from '@/layouts/components/meetingRoom/Test';
import NetworkVisualization from '@/layouts/components/landingPage/NetworkVisualization';

export default function VidConfLandingPage() {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const features = [
    { 
      id: 'getting-started', 
      title: 'Simple Onboarding',
      icon: <Zap size={24} />,
      description: 'Get started in seconds with our intuitive interface. No downloads required - just create a room and share the link.',
      color: 'blue'
    },
    { 
      id: 'run-meeting', 
      title: 'Crystal Clear Meetings',
      icon: <Video size={24} />,
      description: 'Enjoy HD video and audio with adaptive streaming that works beautifully even on unreliable connections.',
      color: 'green'
    },
    { 
      id: 'analyze', 
      title: 'Insightful Analytics',
      icon: <BarChart2 size={24} />,
      description: 'Track participation, engagement metrics, and meeting effectiveness with our detailed reporting dashboard.',
      color: 'purple'
    },
    { 
      id: 'feedback', 
      title: 'Collaborative Feedback',
      icon: <MessageCircle size={24} />,
      description: 'Gather real-time reactions and post-meeting surveys to continuously improve your virtual gatherings.',
      color: 'orange'
    }
  ];
  
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechGrowth Inc.",
      text: "VidConf transformed how our distributed team collaborates. The quality is exceptional and the analytics help us run more effective meetings.",
      image: "/api/placeholder/64/64"
    },
    {
      name: "Michael Chen",
      role: "CEO",
      company: "StartupBoost",
      text: "We've tried every video conferencing solution out there, and VidConf is the only one that truly delivers on both quality and ease of use.",
      image: "/api/placeholder/64/64"
    },
    {
      name: "Elena Rodriguez",
      role: "Head of Remote",
      company: "GlobalTeams",
      text: "The advanced features like real-time transcription and meeting insights have made our international meetings significantly more productive.",
      image: "/api/placeholder/64/64"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-800">
      {/* Navigation */}
      <header className="py-4 px-6 sticky top-0 z-50 shadow-sm backdrop-blur-lg bg-white/90">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <div className="h-5 w-5 rounded-full bg-white"></div>
            </div>
            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">VidConf</span>
          </div>
          
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium text-sm">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium text-sm">How It Works</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium text-sm">Pricing</a>
            <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium text-sm">Testimonials</a>
            <a href="#faq" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium text-sm">FAQ</a>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-blue-600 font-medium text-sm px-5 py-2.5 rounded-md transition duration-200 hover:bg-gray-50">Login</button>
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-full transition duration-300 shadow-md hover:shadow-lg transform hover:translate-y-px">Sign Up Free</button>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="lg:hidden text-gray-700 hover:text-blue-600 focus:outline-none" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 px-4">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>How It Works</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>Pricing</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>Testimonials</a>
              <a href="#faq" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>FAQ</a>
              <div className="pt-2 flex flex-col space-y-3">
                <button className="text-gray-700 hover:text-blue-600 font-medium border border-gray-200 rounded-lg px-4 py-2 text-center">Login</button>
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-4 py-2 rounded-lg transition duration-300">Sign Up Free</button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-16 md:py-24 px-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -left-1/4 -bottom-1/4 w-1/2 h-1/2 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <div>
              <span className="inline-block bg-blue-500/30 text-blue-100 rounded-full px-4 py-1 text-sm font-medium mb-6">Trusted by 10,000+ teams worldwide</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">Connect, Collaborate, Communicate with Clarity</h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-lg">Experience the next generation of video conferencing with crystal-clear audio, adaptive video, and intelligent meeting tools.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white hover:bg-gray-50 text-blue-700 flex items-center justify-center px-6 py-3 rounded-full font-medium transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <Zap size={20} className="mr-2" />
                Start Free Trial
              </button>
              <button className="bg-blue-600/30 hover:bg-blue-600/40 border border-blue-400/30 text-white flex items-center justify-center px-6 py-3 rounded-full font-medium transition duration-300">
                <Video size={20} className="mr-2" />
                See How It Works
              </button>
            </div>
          </div>
          
          <div className="relative flex justify-center">
           <NetworkVisualization/>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-blue-600 font-semibold mb-2">POWERFUL FEATURES</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Everything You Need for Perfect Meetings</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Designed to enhance your virtual communication with intuitive tools that make online meetings feel natural and productive.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16 mb-16">
            {features.map((feature) => (
              <div 
                key={feature.id}
                className="group flex gap-6 items-start"
                onMouseEnter={() => setHoveredFeature(feature.id)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className={`flex-shrink-0 w-14 h-14 rounded-lg flex items-center justify-center transition-all duration-300
                  ${hoveredFeature === feature.id 
                    ? `bg-${feature.color}-500 text-white shadow-lg shadow-${feature.color}-500/20` 
                    : `bg-${feature.color}-100 text-${feature.color}-500`}`
                }>
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Feature showcase */}
          <div className="rounded-2xl overflow-hidden shadow-xl bg-white mt-24">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="text-blue-600 font-semibold mb-2">SMART COLLABORATION</span>
                <h3 className="text-2xl md:text-3xl font-bold mb-6">Enhanced Meeting Experience</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                      <Check size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg mb-1">AI-Powered Noise Cancellation</h4>
                      <p className="text-gray-600 text-sm">Automatically filters out background noises for crystal clear communication.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                      <Check size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg mb-1">Live Transcription & Notes</h4>
                      <p className="text-gray-600 text-sm">Convert speech to text in real-time and generate smart meeting summaries.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                      <Check size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg mb-1">Interactive Presentation Tools</h4>
                      <p className="text-gray-600 text-sm">Share screens, annotate documents, and collaborate in real-time with ease.</p>
                    </div>
                  </div>
                </div>
                
                <button className="mt-10 inline-flex items-center text-blue-600 font-medium group">
                  <span>Explore All Features</span>
                  <ChevronRight size={18} className="ml-1 group-hover:ml-2 transition-all duration-300" />
                </button>
              </div>
              
              <div className="bg-gray-100 p-8 flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="mb-4 opacity-80">
                        <Video size={48} className="mx-auto" />
                      </div>
                      <p className="text-sm opacity-70">Video preview</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-blue-600 font-semibold mb-2">HOW IT WORKS</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Start a Meeting in Three Simple Steps</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">No downloads. No complex setup. Just easy, high-quality video conferencing.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Your Room",
                description: "Click 'Start Meeting' to instantly generate your personal meeting room with a unique link.",
                icon: <Globe className="text-blue-500" size={32} />
              },
              {
                step: "02",
                title: "Invite Participants",
                description: "Share your meeting link via email, message, or calendar invite with anyone you want to join.",
                icon: <Users className="text-green-500" size={32} />
              },
              {
                step: "03",
                title: "Connect & Collaborate",
                description: "Enjoy HD video, clear audio, and powerful collaboration tools for productive meetings.",
                icon: <Video className="text-purple-500" size={32} />
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-100 relative group">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white font-bold flex items-center justify-center text-lg shadow-lg">
                  {item.step}
                </div>
                <div className="mb-6 text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-8 py-4 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Try It Now - No Credit Card Required
            </button>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-blue-600 font-semibold mb-2">TESTIMONIALS</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Don't just take our word for it — hear from some of our satisfied users.</p>
          </div>
          
          <div className="relative">
            <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-12 shadow-lg overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full opacity-20 transform translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-200 rounded-full opacity-20 transform -translate-x-1/3 translate-y-1/3 blur-3xl"></div>
              
              <div className="relative z-10 text-center max-w-3xl mx-auto">
                <div className="mb-8 text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 24 24" className="mx-auto">
                    <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.944.776-2.984.677-1.04 1.835-1.84 3.475-2.4.304-.105.4-.37.25-.624l-.554-.92c-.12-.2-.342-.277-.646-.202-1.692.41-3.18 1.29-4.46 2.64-1.28 1.35-2.02 2.98-2.21 4.89-.192 1.91.154 3.61 1.036 5.08.883 1.47 2.26 2.5 4.127 3.09.144.04.277.01.396-.07.12-.08.21-.21.266-.38l.34-1.06c.16-.5.03-.82-.37-.95-1.402-.48-2.357-1.27-2.865-2.39-.51-1.12-.594-2.37-.25-3.75.45.82 1.09 1.41 1.93 1.77.82.36 1.73.39 2.74.09.16-.05.33.01.49.14.16.14.25.33.27.58l.07 1.21c.01.18.05.31.11.38a.42.42 0 00.3.18c.1.02.21 0 .33-.06l1.28-.65a.455.455 0 00.24-.65l-.26-.52c-.06-.11-.17-.17-.33-.17-.16 0-.27.06-.32.17-.13.25-.34.41-.61.48-.28.07-.54.01-.79-.18s-.42-.45-.48-.75c-.22-1.34.03-2.43.75-3.28.72-.85 1.76-1.18 3.11-.99.21.03.37-.05.47-.22.1-.18.12-.38.04-.59l-.46-1.24c-.06-.17-.18-.27-.35-.32-.17-.05-.35-.01-.53.08-.7.36-1.47.59-2.32.67-.85.09-1.64-.02-2.38-.3-.74-.29-1.36-.7-1.84-1.24-.24-.27-.39-.53-.45-.78-.06-.26.02-.48.23-.69.22-.19.49-.35.81-.47.32-.12.59-.14.82-.07h.09z"/>
                  </svg>
                </div>
                
                <blockquote className="text-xl md:text-2xl font-medium mb-8">
                  {testimonials[activeTestimonial].text}
                </blockquote>
                
                <div className="flex items-center justify-center">
                  <img 
                    src={testimonials[activeTestimonial].image} 
                    className="w-12 h-12 rounded-full mr-4"
                    alt={testimonials[activeTestimonial].name}
                  />
                  <div className="text-left">
                    <div className="font-bold">{testimonials[activeTestimonial].name}</div>
                    <div className="text-gray-600 text-sm">{testimonials[activeTestimonial].role}, {testimonials[activeTestimonial].company}</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeTestimonial === index ? "bg-blue-600 w-8" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-blue-600 to-indigo-800 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your online meetings?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">Join thousands of satisfied users experiencing better video conferencing today.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white hover:bg-gray-100 text-blue-700 font-medium px-8 py-4 rounded-full transition duration-300 shadow-lg hover:shadow-xl">
              Start Your Free Trial
            </button>
            <button className="bg-blue-700/40 hover:bg-blue-700/60 border border-blue-400/30 text-white font-medium px-8 py-4 rounded-full transition duration-300">
              Schedule a Demo
            </button>
          </div>
          
          <p className="text-sm text-blue-200 mt-6">No credit card required. 14-day free trial.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center mb-6">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-white"></div>
                </div>
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">VidConf</span>
              </div>
              <p className="text-gray-500 mb-6">Making remote communication feel as natural as being in the same room.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.059 10.059 0 01-3.13 1.2 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.16a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-6">Product</h3>
              <ul className="space-y-4 text-gray-600">
                <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Features</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Security</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Enterprise</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Customer Stories</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-6">Resources</h3>
              <ul className="space-y-4 text-gray-600">
                <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Blog</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Tutorials</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">Developers</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors duration-200">API Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-6">Contact</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>support@vidconf.com</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+1 (234) 567-8900</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>123 Conference St, San Francisco, CA</span>
                </li>
              </ul>
              
              <div className="mt-8">
                <h4 className="font-medium mb-3">Subscribe to our newsletter</h4>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="bg-gray-50 border border-gray-200 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-grow"
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg px-4 transition duration-300">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm">
              © 2025 VidConf. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0 flex space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-blue-600 transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600 transition-colors duration-200">Terms of Service</a>
              <a href="#" className="hover:text-blue-600 transition-colors duration-200">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
      <EnhancedNetworkVisualization/>
      {/* Floating chat button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-14 w-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label="Chat with support"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </div>
    </div>
  );
}