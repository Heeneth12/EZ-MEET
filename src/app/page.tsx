// components/LandingPage.tsx
"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, Video, Shield, Users, Calendar, Globe, MessageCircle } from "lucide-react";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Video className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">EZ_<span className="text-blue-600">MeeT</span></span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition">How It Works</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition">Pricing</a>
            <a href="#support" className="text-gray-600 hover:text-blue-600 transition">Support</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="hidden md:block text-blue-600 font-medium hover:text-blue-700 transition">Log in</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition font-medium">
              Sign up free
            </button>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 md:space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
                Meetings Made <span className="text-blue-600">Simple</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700">
                Connect with anyone, anywhere with our hassle-free video conferencing platform.
                No downloads, no complications, just easy meetings.
              </p>
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-medium text-lg flex items-center justify-center">
                  Start a Meeting
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 transition font-medium text-lg">
                  Join a Meeting
                </button>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img 
                src="/api/placeholder/600/400" 
                alt="EZ_MeeT in action" 
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need in One Place
            </h2>
            <p className="text-lg text-gray-700">
              EZ_MeeT combines simplicity with powerful features to make your virtual meetings productive and enjoyable.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="bg-blue-100 p-3 rounded-lg inline-block mb-4">
                <Video className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Crystal Clear Video</h3>
              <p className="text-gray-700">HD video quality that adapts to your network conditions for smooth meetings every time.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="bg-blue-100 p-3 rounded-lg inline-block mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure by Design</h3>
              <p className="text-gray-700">End-to-end encryption and secure meeting codes keep your conversations private and protected.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="bg-blue-100 p-3 rounded-lg inline-block mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Team Collaboration</h3>
              <p className="text-gray-700">Share screens, files, and collaborate in real-time with intuitive tools built for teamwork.</p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="bg-blue-100 p-3 rounded-lg inline-block mb-4">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Scheduling</h3>
              <p className="text-gray-700">Easily plan and schedule meetings with calendar integration and automatic reminders.</p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="bg-blue-100 p-3 rounded-lg inline-block mb-4">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Downloads Required</h3>
              <p className="text-gray-700">Works directly in your browser on any device, no software installation or updates needed.</p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="bg-blue-100 p-3 rounded-lg inline-block mb-4">
                <MessageCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Chat & Notes</h3>
              <p className="text-gray-700">Keep conversations going with built-in chat and collaborative note-taking during meetings.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How EZ_MeeT Works
            </h2>
            <p className="text-lg text-gray-700">
              Get started in seconds with our simple three-step process.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-blue-600 text-white text-2xl font-bold h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Create a Room</h3>
              <p className="text-gray-700">Click "Start a Meeting" to instantly create your own secure meeting room.</p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-blue-600 text-white text-2xl font-bold h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Share Your Link</h3>
              <p className="text-gray-700">Send the meeting link or room ID to anyone you want to join your meeting.</p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-blue-600 text-white text-2xl font-bold h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect & Collaborate</h3>
              <p className="text-gray-700">Everyone joins with one click, no accounts or downloads required.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300"></div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
                  <p className="text-gray-600 text-sm">Marketing Director</p>
                </div>
              </div>
              <p className="text-gray-700">
                "EZ_MeeT has transformed how our team collaborates remotely. The interface is so intuitive that even our less tech-savvy team members have no trouble using it."
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300"></div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Michael Chen</h4>
                  <p className="text-gray-600 text-sm">Small Business Owner</p>
                </div>
              </div>
              <p className="text-gray-700">
                "As a small business, we needed an affordable solution without compromising on quality. EZ_MeeT delivers everything we need without the hefty price tag."
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300"></div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Jessica Taylor</h4>
                  <p className="text-gray-600 text-sm">Education Consultant</p>
                </div>
              </div>
              <p className="text-gray-700">
                "I use EZ_MeeT for online tutoring and the reliable connection and easy screen sharing make teaching remotely a breeze. Highly recommended!"
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-blue-600">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to make your meetings easier?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied users who have switched to EZ_MeeT for simpler, more reliable video conferencing.
          </p>
          <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-3 sm:space-y-0">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-blue-50 transition font-medium text-lg">
              Get Started for Free
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-md hover:bg-blue-700 transition font-medium text-lg">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>
      
      {/* Simple Pricing */}
      <section id="pricing" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-700">
              Choose the plan that works for you, with no hidden fees or complicated tiers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="border border-gray-200 rounded-xl p-8 bg-gray-50 hover:shadow-md transition">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Basic</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">$0</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Up to 4 participants
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  40-minute limit per meeting
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Screen sharing
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Chat feature
                </li>
              </ul>
              <button className="w-full border border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-50 transition font-medium">
                Sign Up Free
              </button>
            </div>
            
            {/* Pro Plan */}
            <div className="border-2 border-blue-600 rounded-xl p-8 bg-white shadow-lg relative">
              <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Pro</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">$12</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Up to 100 participants
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Unlimited meeting duration
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Cloud recording (10 GB)
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Advanced meeting controls
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition font-medium">
                Get Pro
              </button>
            </div>
            
            {/* Business Plan */}
            <div className="border border-gray-200 rounded-xl p-8 bg-gray-50 hover:shadow-md transition">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Business</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">$20</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Up to 250 participants
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Unlimited meeting duration
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Cloud recording (25 GB)
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Admin dashboard & analytics
                </li>
              </ul>
              <button className="w-full border border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-50 transition font-medium">
                Get Business
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Video className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">EZ_<span className="text-blue-400">MeeT</span></span>
              </div>
              <p className="text-gray-400">
                The simplest way to connect with anyone, anywhere through high-quality video meetings.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Security</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Tutorials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Support Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2025 EZ_MeeT. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c-6.617 0-11.999 5.383-11.999 11.999S5.383 26.162 12 26.162s11.999-5.383 11.999-11.999S18.617 2.163 12 2.163zm0 21.674c-5.4 0-9.675-4.275-9.675-9.675S6.6 4.487 12 4.487s9.675 4.275 9.675 9.675-4.275 9.675-9.675 9.675zm-.001-15c-.553 0-.999-.447-.999-.999s.447-.999 .999-.999c1.104 0 .999-.447 .999-.999s-.447-.999-.999-.999c-.553 0-.999 .447-.999 .999s-.447 .999 .999 .999zm1 .001c1.104 0 .999 .447 .999 .999s-.447 .999-.999 .999c-.553 0-.998-.447-.998-.998s1e-3 -.998 .998 -.998zm3 .001c1.104 0 .998 .447 .998 .998s1e-3 .998 -.998 .998c-.553 0 -.998 -.447 -.998 -.998s1e-3 -.998 .998 -.998z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c-6.617 0-11.999 5.383-11.999 11.999S5.383 26.162 12 26.162s11.999-5.383 11.999-11.999S18.617 2.163 12 2.163zm0 21.674c-5.4 0-9.675-4.275-9.675-9.675S6.6 4.487 12 4.487s9.675 4.275 9.675 9.675-4.275 9.675-9.675 9.675zm-.001-15c-.553 0-.999-.447-.999-.999s1e-3 -.999 .999 -.999c1.104 0 .999-.447 .999-.999s1e-3 -.998 -.999 -.998c-.553 0-.999 .447-.999 .998s1e-3 .998 .999 .998zm1 .001c1.104 0 .999 .447 .999 .998s1e-3 .998 -.999 .998c-.553 0-.998-.447-.998-.998s1e-3 -.998 .998 -.998zm3 .001c1.104 0 .998 .447 .998 .998s1e-3 .998 -.998 .998c-.553 0 -.998 -.447 -.998 -.998s1e-3 -.998 .998 -.998z"></path>
                </svg>
              </a>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default LandingPage;     