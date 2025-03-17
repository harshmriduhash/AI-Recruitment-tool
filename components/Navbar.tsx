'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { SiAirtel } from "react-icons/si"
import { SettingsModal } from "@/components/SettingsModal"
import { useState, useEffect } from "react"
import { Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"

const secondaryNav = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Job Listings', href: '/job-listings' },
  { name: 'Applicants', href: '/applicants' },
]

export function Navbar() {
  const pathname = usePathname();
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = localStorage.getItem('isSignedIn') === 'true';
      setIsSignedIn(isAuth);
    };
    checkAuth();
  }, []);

  const handleSignOut = () => {
    localStorage.setItem('isSignedIn', 'false');
    setIsSignedIn(false);
    window.location.href = '/';
  };

  const handleSignIn = () => {
    localStorage.setItem('isSignedIn', 'true');
    setIsSignedIn(true);
    window.location.href = '/dashboard';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-blue-100 to-green-200 backdrop-blur supports-[backdrop-filter]:bg-opacity-80">
      <div className="container flex h-14 items-center justify-between">
        {/* Left side - AI Hiring Manager */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <SiAirtel className="text-blue-600 w-6 h-6" /> 
            <span className="font-bold text-blue-600">
              Bizwise AI
            </span>
          </Link>
        </div>

        {/* Right side - Dashboard, Jobs, Applicants, and Settings or Log In */}
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {isSignedIn ? (
            <>
              {secondaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "transition-colors hover:text-green-800",
                    pathname === item.href ? "text-green-700" : "text-green-600"
                  )}>
                  {item.name}
                </Link>
              ))}
              <SettingsModal>
                <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-800">
                  <Settings className="h-[1.2rem] w-[1.2rem]" />
                  <span className="sr-only">Settings</span>
                </Button>
              </SettingsModal>
              <button
                onClick={handleSignOut}
                className="transition-colors hover:bg-green-200 bg-green-100 text-green-600 px-4 py-2 rounded"
              >
                Log Out
              </button>
            </>
          ) : (
            <button
              onClick={handleSignIn}
              className="transition-colors hover:bg-green-200 bg-green-100 text-green-600 px-4 py-2 rounded"
            >
              Log In
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

