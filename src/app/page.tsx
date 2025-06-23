"use client";
import Link from "next/link";
import { ArrowRight, Database } from 'lucide-react';


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10"></div>
          <div className="relative bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-md w-full border border-cyan-500/20">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl mb-4 shadow-lg shadow-cyan-500/25">
                <Database className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-3">
                Student Data Sharing
              </h1>
              <p className="text-gray-300 leading-relaxed">
                Secure platform for sharing student information via controlled links
              </p>
            </div>
            <Link href="/login">
            <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold py-4 rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 mb-4">
              <span className="flex items-center justify-center gap-2">
                Admin Login
                <ArrowRight className="w-5 h-5" />
              </span>
            </button>
            </Link>
            
            <p className="text-sm text-gray-400 text-center">
              Access the admin panel to generate shareable links
            </p>
          </div>
        </div>

  );
}
