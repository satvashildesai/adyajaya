import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Welcome to Streak Tracker</h1>
      <p className="text-lg mb-8 text-center max-w-md">
        Build better habits and track your daily progress.
      </p>
      <Link 
        href="/home" 
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Get Started
      </Link>
    </div>
  );
}
