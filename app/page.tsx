'use client'

import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AnimatedBackground } from '@/components/AnimatedBackground';

export default function HomePage() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    const checkAuth = () => {
      const isAuth = localStorage.getItem('isSignedIn') === 'true';
      setIsSignedIn(isAuth);
      if (isAuth) {
        router.push('/dashboard');
      }
    };
    checkAuth();
  }, [router]);

  if (!isMounted) {
    return null;
  }

  const handleSignIn = () => {
    localStorage.setItem('isSignedIn', 'true');
    setIsSignedIn(true);
    router.push('/dashboard');
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex justify-center items-center min-h-screen -mt-40">
          {isSignedIn ? (
            <p className="text-blue-600 text-xl">Redirecting to your dashboard...</p>
          ) : (
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-6 text-blue-600 animate-fade-in-up">Bizwise AI</h1>
              <p className="text-2xl text-green-600 mb-8 animate-fade-in-up animation-delay-500">
                Optimizing hiring operations with AI and business insights
              </p>
              <button
                onClick={handleSignIn}
                className="transition-all duration-300 hover:scale-105 bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl animate-fade-in-up animation-delay-1000"
              >
                Get Started Free
              </button>
              <p className="text-sm text-green-600 mt-4 animate-fade-in-up animation-delay-1500">No credit card required</p>

              <div className="pt-12 flex items-center justify-center gap-8 animate-fade-in-up animation-delay-2000">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-blue-500 h-6 w-6" />
                  <span className="text-green-600">AI-Powered</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-blue-500 h-6 w-6" />
                  <span className="text-green-600">Instant Results</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-blue-500 h-6 w-6" />
                  <span className="text-green-600">Free to Try</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

