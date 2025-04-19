"use client";
import React, { useState, useEffect } from "react";
import { Dialog, Popover } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Code, Video } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg w-full transition-all duration-300 ">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="flex items-center gap-2 -m-1.5 p-1.5 group">
            <div className="flex items-center">
              <div className="bg-white p-2 rounded-full mr-3">
                <Video size={28} className="text-blue-600" />
              </div>
              <h1 className="text-3xl font-extrabold text-white">EZ-MeeT</h1>
            </div>
          </a>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white hover:bg-blue-500 transition-colors duration-300">
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        <Popover.Group className="hidden lg:flex lg:gap-x-8">
          <a
            href="/languages"
            className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors duration-300">
            Products
          </a>

          <a
            href="/languages"
            className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors duration-300">
            Languages
          </a>

          <a
            href="/examples"
            className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors duration-300">
            Examples
          </a>

          <a
            href="/docs"
            className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors duration-300">
            Docs
          </a>
        </Popover.Group>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <a
            href="auth/login"
            className="rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors duration-300 border border-white">
            Log in
          </a>
          <a
            href="auth/login"
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-colors duration-300">
            Sign up
          </a>
        </div>
      </nav>

      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10 bg-black/20" aria-hidden="true" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center gap-2 -m-1.5 p-1.5">
              <div className="bg-white p-2 rounded-lg">
                <Video size={28} className="text-blue-600" />
              </div>
              <span className="text-white font-bold text-xl">EZ-CodE</span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-white hover:bg-blue-500 transition-colors duration-300">
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-white/10">
              <div className="space-y-2 py-6">
                <a
                  href="/products"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-blue-500 transition-all duration-300">
                  Products
                </a>

                <a
                  href="/languages"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-blue-500 transition-all duration-300">
                  Languages
                </a>

                <a
                  href="/examples"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-blue-500 transition-all duration-300">
                  Examples
                </a>

                <a
                  href="/docs"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-blue-500 transition-all duration-300">
                  Docs
                </a>
              </div>

              <div className="py-6 space-y-3">
                <a
                  href="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-white transition-colors duration-300 text-center border border-white hover:bg-blue-500">
                  Log in
                </a>
                <a
                  href="/register"
                  className="-mx-3 block rounded-lg bg-white px-3 py-2.5 text-base font-semibold text-blue-600 hover:bg-gray-100 transition-colors duration-300 text-center">
                  Sign up
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
