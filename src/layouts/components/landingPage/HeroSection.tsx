import Link from "next/link";
import React from "react";

export default function HeroSection() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="flex flex-col-reverse lg:flex-row items-center">
        <div className="lg:w-1/2 lg:pr-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            Find what you need
            <br />
            when you need it
            <br />
            with{" "}
            <span className="text-white relative inline-block px-2 py-1 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg">
              AI Assistant
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
            Accomplish more with EZ_Meet Workspace: your AI-first work platform
            featuring AI Assistant 2.0, included at no extra cost.
            <span className="text-sm text-gray-500">*</span>
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/pricing"
              className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 rounded-full hover:opacity-90 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
              Plans & pricing
            </Link>
            <Link
              href="/discover"
              className="text-indigo-600 hover:text-indigo-800 px-8 py-4 font-medium flex items-center group">
              Discover EZ_Meet Workspace
              <svg
                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <div className="relative mx-auto max-w-md lg:max-w-full">
            {/* Background blobs */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-100 rounded-full filter blur-3xl opacity-50"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-indigo-100 rounded-full filter blur-3xl opacity-50"></div>

            {/* Main assistant card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-100 relative z-10">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 flex items-center">
                <div className="bg-white rounded-full p-2 mr-3">
                  <svg
                    className="w-5 h-5 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <div className="font-medium text-white">
                  EZ_Meet AI Assistant
                </div>
              </div>
              <div className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    How can I help you today?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Ask me anything about your meetings or workspace
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-4 bg-gradient-to-br from-indigo-50 to-white rounded-xl border border-indigo-100 hover:shadow-md transition-all group cursor-pointer">
                    <div className="bg-white p-2 rounded-lg shadow-sm mb-3 group-hover:bg-gradient-to-r from-blue-600 to-indigo-700 group-hover:text-white transition-colors">
                      <svg
                        className="w-5 h-5 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-center text-gray-700 group-hover:text-indigo-600 transition-colors">
                      Prepare notes
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-indigo-50 to-white rounded-xl border border-indigo-100 hover:shadow-md transition-all group cursor-pointer">
                    <div className="bg-white p-2 rounded-lg shadow-sm mb-3 group-hover:bg-gradient-to-r from-blue-600 to-indigo-700 group-hover:text-white transition-colors">
                      <svg
                        className="w-5 h-5 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-center text-gray-700 group-hover:text-indigo-600 transition-colors">
                      Catch me up
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-indigo-50 to-white rounded-xl border border-indigo-100 hover:shadow-md transition-all group cursor-pointer">
                    <div className="bg-white p-2 rounded-lg shadow-sm mb-3 group-hover:bg-gradient-to-r from-blue-600 to-indigo-700 group-hover:text-white transition-colors">
                      <svg
                        className="w-5 h-5 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-center text-gray-700 group-hover:text-indigo-600 transition-colors">
                      Action items
                    </p>
                  </div>
                </div>

                <div className="mt-6 bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-2 rounded-md">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700 text-sm">
                        What was discussed in the last meeting?
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <div className="bg-purple-100 text-purple-600 p-2 rounded-md">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                    </div>
                    <div className="ml-3 bg-white p-3 rounded-lg shadow-sm flex-1">
                      <p className="text-gray-700 text-sm">
                        In the last meeting, the team discussed the Q2 roadmap
                        and decided to prioritize the mobile app redesign...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Assistant floating card */}
            <div className="absolute -bottom-6 -right-6 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100 w-48 transform hover:-translate-y-1 hover:shadow-xl transition-all z-20">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-3 flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span className="font-medium text-sm">Ask AI Assistant</span>
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-700">
                  What has the team decided?
                </p>
                <div className="mt-2 flex justify-end">
                  <svg
                    className="w-4 h-4 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
