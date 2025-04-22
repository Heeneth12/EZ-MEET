"use client";
import { useState } from 'react';
import { 
  Mail, Phone, MapPin, Globe, MessageCircle, 
  Send, Github, CheckCircle, ChevronRight, Menu, X
} from 'lucide-react';

export default function ContactPage() {
  const [activeSection, setActiveSection] = useState('contact');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    submitting: false,
    error: null
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ submitted: false, submitting: true, error: null });
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus({ submitted: true, submitting: false, error: null });
    }, 1500);
  };

  // For a real implementation you would handle form submission differently
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      subject: '',
      message: ''
    });
    setTimeout(() => {
      setFormStatus({ submitted: false, submitting: false, error: null });
    }, 3000);
  };

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

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-950 text-gray-100 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black overflow-hidden">
      {/* Navigation */}
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
              { id: 'contact', label: 'Contact' }
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
            <a href="https://github.com" className="text-gray-300 hover:text-white transition-colors duration-200" aria-label="GitHub">
              <Github size={22}/>
            </a>
            <button className="bg-white hover:bg-gray-100 text-gray-900 font-medium text-sm px-5 py-2 rounded-md transition duration-300 shadow-md hover:shadow-lg hover:shadow-blue-500/10 flex items-center">
              Login
              <span className="ml-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">→</span>
            </button>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="lg:hidden text-gray-300 hover:text-white focus:outline-none" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile menu */}
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
              { id: 'contact', label: 'Contact' }
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
                Login
                <span className="ml-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">→</span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Contact Header */}
      <section id="contact-header" className="relative py-16 md:py-20 px-6 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden z-0">
          {/* Stars with pulse animations */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          
          {/* Gradient blobs with subtle movement */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-purple-600/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '8s'}}></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-cyan-600/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '10s', animationDelay: '2s'}}></div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e540_1px,transparent_1px),linear-gradient(to_bottom,#4f46e540_1px,transparent_1px)] bg-[size:64px_64px] opacity-5"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <span className="inline-block text-blue-400 font-medium mb-2 text-sm">GET IN TOUCH</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-300">Contact Us</h1>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Have questions about VidConf? Our team is here to help. Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-8 px-6 relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="order-2 md:order-1">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800/50 backdrop-blur-sm border border-gray-800/60 rounded-xl p-8 shadow-lg h-full">
              <h2 className="text-2xl font-bold mb-6 text-white">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg text-blue-400 border border-gray-700/30 shadow-lg shadow-blue-900/5 mr-4">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-200 mb-1">Email</h3>
                    <p className="text-gray-400">support@vidconf.example</p>
                    <p className="text-gray-400">sales@vidconf.example</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg text-blue-400 border border-gray-700/30 shadow-lg shadow-blue-900/5 mr-4">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-200 mb-1">Phone</h3>
                    <p className="text-gray-400">(+1) 123-456-7890 (Support)</p>
                    <p className="text-gray-400">(+1) 123-456-7891 (Sales)</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg text-blue-400 border border-gray-700/30 shadow-lg shadow-blue-900/5 mr-4">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-200 mb-1">Office</h3>
                    <p className="text-gray-400">123 Tech Plaza</p>
                    <p className="text-gray-400">San Francisco, CA 94105</p>
                    <p className="text-gray-400">United States</p>
                  </div>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-gray-800/50">
                <h3 className="font-medium text-gray-200 mb-4">Connect with us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="p-3 bg-gray-800/80 hover:bg-gray-800 text-gray-400 hover:text-blue-400 rounded-lg transition-all duration-300">
                    <Globe size={20} />
                  </a>
                  <a href="#" className="p-3 bg-gray-800/80 hover:bg-gray-800 text-gray-400 hover:text-blue-400 rounded-lg transition-all duration-300">
                    <Github size={20} />
                  </a>
                  <a href="#" className="p-3 bg-gray-800/80 hover:bg-gray-800 text-gray-400 hover:text-blue-400 rounded-lg transition-all duration-300">
                    <MessageCircle size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="order-1 md:order-2">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800/50 backdrop-blur-sm border border-gray-800/60 rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-white">Send Us a Message</h2>
              
              {formStatus.submitted ? (
                <div className="bg-blue-500/20 border border-blue-500/30 text-blue-200 p-6 rounded-lg text-center">
                  <div className="flex justify-center mb-4">
                    <CheckCircle size={48} className="text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p className="mb-6">Thank you for contacting us. We'll get back to you as soon as possible.</p>
                  <button 
                    onClick={resetForm}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-md transition duration-300"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-300 mb-2 font-medium">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-300 mb-2 font-medium">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-gray-300 mb-2 font-medium">Company (Optional)</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      placeholder="Your Company"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-gray-300 mb-2 font-medium">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      placeholder="How can we help you?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-gray-300 mb-2 font-medium">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="5"
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none"
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={formStatus.submitting}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-6 py-3 rounded-md transition duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 w-full flex items-center justify-center"
                  >
                    {formStatus.submitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        Send Message
                        <Send size={16} className="ml-2" />
                      </>
                    )}
                  </button>
                </form>
              )}
              
              <div className="mt-6 text-gray-400 text-sm text-center">
                <p>We respect your privacy. All information will be kept confidential.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map or Location */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800/50 backdrop-blur-sm border border-gray-800/60 rounded-xl overflow-hidden shadow-lg">
            <div className="h-80 bg-gray-800 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={48} className="text-blue-400 mx-auto mb-4 opacity-50" />
                <p className="text-gray-400">Map placeholder - would integrate Google Maps or similar service here</p>
              </div>
            </div>
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
    </div>
  );
}