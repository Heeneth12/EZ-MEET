"use client";
import React, { useState } from 'react';
import { Calendar, Clock, FileText, MessageSquare, Phone, PlusCircle, Search, Settings, User, Video } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-16 md:w-64 bg-white border-r border-gray-200">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-blue-600 hidden md:block">EZ Meet</h1>
            <div className="md:hidden flex justify-center">
              <span className="text-blue-600 font-bold text-2xl">EZ</span>
            </div>
          </div>
          
          <nav className="flex-1 p-2">
            <ul className="space-y-1">
              <NavItem 
                icon={<Clock />} 
                label="Dashboard" 
                active={activeTab === 'dashboard'} 
                onClick={() => setActiveTab('dashboard')} 
              />
              <NavItem 
                icon={<Video />} 
                label="Meetings" 
                active={activeTab === 'meetings'} 
                onClick={() => setActiveTab('meetings')} 
              />
              <NavItem 
                icon={<MessageSquare />} 
                label="Chat" 
                active={activeTab === 'chat'} 
                onClick={() => setActiveTab('chat')} 
              />
              <NavItem 
                icon={<FileText />} 
                label="Files" 
                active={activeTab === 'files'} 
                onClick={() => setActiveTab('files')} 
              />
              <NavItem 
                icon={<Calendar />} 
                label="Schedule" 
                active={activeTab === 'schedule'} 
                onClick={() => setActiveTab('schedule')} 
              />
              <NavItem 
                icon={<User />} 
                label="Contacts" 
                active={activeTab === 'contacts'} 
                onClick={() => setActiveTab('contacts')} 
              />
            </ul>
          </nav>
          
          <div className="p-4 border-t border-gray-200">
            <NavItem 
              icon={<Settings />} 
              label="Settings" 
              active={activeTab === 'settings'} 
              onClick={() => setActiveTab('settings')} 
            />
            <div className="mt-4 flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                JD
              </div>
              <div className="ml-2 hidden md:block">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-500">john@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'meetings' && 'Meetings'}
              {activeTab === 'chat' && 'Chat'}
              {activeTab === 'files' && 'Files'}
              {activeTab === 'schedule' && 'Schedule'}
              {activeTab === 'contacts' && 'Contacts'}
              {activeTab === 'settings' && 'Settings'}
            </h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 md:w-64"
                  placeholder="Search..."
                />
              </div>
              <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center gap-2">
                <PlusCircle size={16} />
                <span className="hidden md:inline">New Meeting</span>
              </button>
            </div>
          </div>
        </header>
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {activeTab === 'dashboard' && <DashboardContent />}
          {activeTab === 'chat' && <ChatContent />}
          {activeTab === 'files' && <FilesContent />}
          {activeTab === 'schedule' && <ScheduleContent />}
          {activeTab === 'meetings' && <MeetingsContent />}
          {activeTab === 'contacts' && <div>Contacts Content</div>}
       
        </main>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <li>
      <button
        onClick={onClick}
        className={`flex items-center w-full p-2 rounded-md transition-colors ${
          active ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <span className="w-6 h-6">{icon}</span>
        <span className="ml-3 hidden md:block">{label}</span>
      </button>
    </li>
  );
}

function DashboardContent() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard 
          icon={<Video className="text-blue-600" />} 
          title="Upcoming Meeting" 
          time="Today, 3:00 PM"
          label="Team Weekly Sync"
          actionLabel="Join"
        />
        <DashboardCard 
          icon={<MessageSquare className="text-green-600" />} 
          title="Recent Chat" 
          time="10 min ago"
          label="Sarah Johnson"
          actionLabel="Reply"
        />
        <DashboardCard 
          icon={<FileText className="text-purple-600" />} 
          title="Shared File" 
          time="Yesterday"
          label="Project_Proposal.pdf"
          actionLabel="View"
        />
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <ActivityItem 
            icon={<Video className="text-blue-600" />}
            title="Meeting Completed" 
            description="Client Presentation - 45 minutes"
            time="Today, 10:30 AM" 
          />
          <ActivityItem 
            icon={<FileText className="text-purple-600" />}
            title="File Shared" 
            description="Marketing_Plan.docx shared by Alex"
            time="Yesterday, 2:15 PM" 
          />
          <ActivityItem 
            icon={<Calendar className="text-orange-600" />}
            title="Meeting Scheduled" 
            description="Product Review with Design Team"
            time="Yesterday, 11:20 AM" 
          />
          <ActivityItem 
            icon={<MessageSquare className="text-green-600" />}
            title="New Message" 
            description="Michael sent you a message"
            time="Apr 17, 5:30 PM" 
          />
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ icon, title, time, label, actionLabel }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-start">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          {icon}
        </div>
        <span className="text-sm text-gray-500">{time}</span>
      </div>
      <h3 className="mt-4 font-medium">{title}</h3>
      <p className="text-gray-700 mt-1">{label}</p>
      <button className="mt-4 text-blue-600 font-medium text-sm hover:text-blue-700">
        {actionLabel} →
      </button>
    </div>
  );
}

function ActivityItem({ icon, title, description, time }) {
  return (
    <div className="flex items-start py-3 border-b border-gray-100 last:border-b-0">
      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <span className="text-xs text-gray-500 whitespace-nowrap">{time}</span>
    </div>
  );
}

function ChatContent() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex mb-4 items-center justify-between">
        <h3 className="text-lg font-medium">Recent Conversations</h3>
        <button className="text-blue-600 flex items-center gap-1 text-sm">
          <PlusCircle size={16} />
          <span>New Chat</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 h-full gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                className="pl-10 pr-4 py-2 bg-gray-50 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                placeholder="Search messages..."
              />
            </div>
          </div>
          
          <div className="overflow-y-auto flex-1">
            {['Sarah Johnson', 'Marketing Team', 'David Miller', 'Project Alpha', 'Tech Support'].map((chat, i) => (
              <div key={i} className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${i === 0 ? 'bg-blue-50' : ''}`}>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-medium mr-3">
                    {chat.split(' ').map(word => word[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{chat}</h4>
                    <p className="text-sm text-gray-600 truncate">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">10:30 AM</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-medium mr-3">
                SJ
              </div>
              <div>
                <h4 className="font-medium">Sarah Johnson</h4>
                <p className="text-xs text-gray-500">Online</p>
              </div>
              <div className="ml-auto flex gap-2">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                  <Phone size={18} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                  <Video size={18} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                  <FileText size={18} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="flex items-end gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-medium">
                SJ
              </div>
              <div className="bg-gray-100 rounded-lg p-3 max-w-md">
                <p>Hi there! Do you have those presentation slides ready for tomorrow's meeting?</p>
                <span className="text-xs text-gray-500 mt-1 block">10:15 AM</span>
              </div>
            </div>
            
            <div className="flex items-end gap-2 justify-end">
              <div className="bg-blue-100 rounded-lg p-3 max-w-md">
                <p>Yes, I'm just adding the final touches. I'll share the file in a moment.</p>
                <span className="text-xs text-gray-500 mt-1 block">10:18 AM</span>
              </div>
            </div>
            
            <div className="flex items-end gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-medium">
                SJ
              </div>
              <div className="bg-gray-100 rounded-lg p-3 max-w-md">
                <p>Great! Looking forward to seeing them. Can you also add some notes on the market analysis section?</p>
                <span className="text-xs text-gray-500 mt-1 block">10:20 AM</span>
              </div>
            </div>
            
            <div className="flex items-end gap-2 justify-end">
              <div className="bg-blue-100 rounded-lg p-3 max-w-md">
                <p>Of course, I'll include detailed notes for that section. Would you like me to highlight any specific metrics?</p>
                <span className="text-xs text-gray-500 mt-1 block">10:25 AM</span>
              </div>
            </div>
            
            <div className="flex items-end gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-medium">
                SJ
              </div>
              <div className="bg-gray-100 rounded-lg p-3 max-w-md">
                <p>Yes, please focus on the quarterly growth numbers and competitive analysis.</p>
                <span className="text-xs text-gray-500 mt-1 block">10:30 AM</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                <PlusCircle size={20} />
              </button>
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message..."
              />
              <button className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
                <MessageSquare size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilesContent() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex mb-4 items-center justify-between">
        <h3 className="text-lg font-medium">Files</h3>
        <button className="text-blue-600 flex items-center gap-1 text-sm">
          <PlusCircle size={16} />
          <span>Upload Files</span>
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-wrap gap-4 mb-6">
          <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md font-medium">All Files</button>
          <button className="px-4 py-2 hover:bg-gray-100 rounded-md">Shared with me</button>
          <button className="px-4 py-2 hover:bg-gray-100 rounded-md">Recent</button>
          <button className="px-4 py-2 hover:bg-gray-100 rounded-md">Starred</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Owner</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Last Modified</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Size</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Project_Proposal.pdf', owner: 'You', modified: 'Today, 2:30 PM', size: '2.4 MB' },
                { name: 'Meeting_Notes.docx', owner: 'Sarah Johnson', modified: 'Yesterday', size: '546 KB' },
                { name: 'Budget_2023.xlsx', owner: 'You', modified: 'Apr 15, 2023', size: '1.2 MB' },
                { name: 'Client_Presentation.pptx', owner: 'David Miller', modified: 'Apr 12, 2023', size: '5.8 MB' },
                { name: 'Product_Images.zip', owner: 'Marketing Team', modified: 'Apr 10, 2023', size: '12.6 MB' },
              ].map((file, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <FileText className="text-gray-500 mr-2" size={18} />
                      <span>{file.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{file.owner}</td>
                  <td className="py-3 px-4 text-gray-600">{file.modified}</td>
                  <td className="py-3 px-4 text-gray-600">{file.size}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button className="p-1 text-gray-600 hover:bg-gray-200 rounded">Download</button>
                      <button className="p-1 text-gray-600 hover:bg-gray-200 rounded">Share</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ScheduleContent() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex mb-4 items-center justify-between">
        <h3 className="text-lg font-medium">Meeting Schedule</h3>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center gap-2">
          <PlusCircle size={16} />
          <span>Schedule Meeting</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-medium">April 2025</h4>
            <div className="flex gap-2">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                Previous
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                Today
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                Next
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
              <div key={i} className="text-center py-2 text-gray-600 font-medium">{day}</div>
            ))}

            {/* Example calendar cells for April */}
            {Array.from({ length: 30 }).map((_, i) => {
              const day = i + 1;
              let hasMeeting = [3, 8, 15, 19, 22, 27].includes(day);
              
              return (
                <div key={i} className={`border rounded-md p-2 h-24 ${day === 19 ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm font-medium ${day === 19 ? 'text-blue-600' : ''}`}>{day}</span>
                    {hasMeeting && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                  </div>
                  
                  {day === 19 && (
                    <div className="bg-blue-100 text-blue-800 text-xs p-1 rounded mb-1">
                      3:00 PM - Team Weekly Sync
                    </div>
                  )}
                  
                  {day === 8 && (
                    <div className="bg-green-100 text-green-800 text-xs p-1 rounded mb-1">
                      10:00 AM - Client Meeting
                    </div>
                  )}
                  
                  {day === 15 && (
                    <div className="bg-purple-100 text-purple-800 text-xs p-1 rounded mb-1">
                      2:30 PM - Design Review
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="font-medium mb-4">Upcoming Meetings</h4>
          
          <div className="space-y-4">
            <div className="p-3 border border-blue-200 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-start">
                <h5 className="font-medium">Team Weekly Sync</h5>
                <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">Today</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">3:00 PM - 4:00 PM</p>
              <div className="mt-3 flex items-center gap-2">
                <button className="bg-blue-600 text-white py-1 px-3 rounded text-sm">Join</button>
                <button className="text-gray-600 py-1 px-3 rounded text-sm border border-gray-300">Details</button>
              </div>
            </div>
            
            <div className="p-3 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-start">
                <h5 className="font-medium">Project Planning</h5>
                <span className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded">Tomorrow</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">11:00 AM - 12:30 PM</p>
              <div className="mt-3 flex items-center gap-2">
                <button className="text-gray-600 py-1 px-3 rounded text-sm border border-gray-300">Details</button>
              </div>
            </div>
            
            <div className="p-3 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-start">
                <h5 className="font-medium">Marketing Review</h5>
                <span className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded">Apr 22</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">2:00 PM - 3:00 PM</p>
              <div className="mt-3 flex items-center gap-2">
                <button className="text-gray-600 py-1 px-3 rounded text-sm border border-gray-300">Details</button>
              </div>
            </div>
            
            <button className="w-full text-blue-600 text-sm hover:text-blue-700 py-2">
              View All Meetings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MeetingsContent() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex mb-4 items-center justify-between">
        <h3 className="text-lg font-medium">Meetings</h3>
        <div className="flex gap-2">
          <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200">
            Join with Code
          </button>
          <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center gap-2">
            <PlusCircle size={16} />
            <span>New Meeting</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Video className="text-blue-600" size={24} />
            </div>
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">Now</span>
          </div>
          <h4 className="font-medium text-lg">Start Instant Meeting</h4>
          <p className="text-gray-600 mt-1">Create and join a meeting instantly</p>
          <div className="mt-6 flex gap-2">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex-1">
              Start Now
            </button>
            <button className="border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-100">
              Schedule
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <Clock className="text-gray-600" size={24} />
            </div>
            <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm">Today</span>
          </div>
          <h4 className="font-medium text-lg">Team Weekly Sync</h4>
          <p className="text-gray-600 mt-1">3:00 PM - 4:00 PM</p>
          <div className="mt-3 text-sm text-gray-600">5 participants</div>
          <div className="mt-4 flex gap-2">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex-1">
              Join
            </button>
            <button className="border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-100">
              Details
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <Calendar className="text-gray-600" size={24} />
            </div>
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">Tomorrow</span>
          </div>
          <h4 className="font-medium text-lg">Project Kickoff</h4>
          <p className="text-gray-600 mt-1">11:00 AM - 12:30 PM</p>
          <div className="mt-3 text-sm text-gray-600">3 participants</div>
          <div className="mt-4 flex gap-2">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex-1">
              Join
            </button>
            <button className="border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-100">
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}