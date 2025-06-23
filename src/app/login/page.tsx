"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Info, Eye, EyeOff } from "lucide-react"
import axios from "axios"

export default function Login() {
    const [credentials, setCredentials] = useState({ username: "", password: "" })
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const response = await axios.post('/api/auth/login', credentials, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            
            if (response.data.success) {
                router.push("/admin")
            } else {
                setError(response.data.message || "Login failed")
            }
        } catch (error: any) {
            if (error.response?.data?.message) {
                setError(error.response.data.message)
            } else if (error.response?.status === 401) {
                setError("Invalid credentials")
            } else if (error.response?.status >= 500) {
                setError("Server error. Please try again later.")
            } else {
                setError("Login failed. Please check your connection.")
            }
            console.error('Login error:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full border border-white/20">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Login</h1>
                    <p className="text-gray-600">Enter your credentials to access the admin panel</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    <div className="relative">
                        <input
                            type="text"
                            value={credentials.username}
                            onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                            className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-colors peer placeholder-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                            placeholder="Username"
                            id="username"
                            required
                            disabled={loading}
                        />
                        <label
                            htmlFor="username"
                            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                                credentials.username 
                                    ? 'text-xs -top-2 bg-white px-2 text-blue-600' 
                                    : 'text-gray-500 top-4 peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-white peer-focus:px-2 peer-focus:text-blue-600'
                            }`}
                        >
                            Username
                        </label>
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={credentials.password}
                            onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                            className="w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-colors peer placeholder-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                            placeholder="Password"
                            id="password"
                            required
                            disabled={loading}
                        />
                        <label
                            htmlFor="password"
                            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                                credentials.password 
                                    ? 'text-xs -top-2 bg-white px-2 text-blue-600' 
                                    : 'text-gray-500 top-4 peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-white peer-focus:px-2 peer-focus:text-blue-600'
                            }`}
                        >
                            Password
                        </label>
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                            disabled={loading}
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>

                    
                    {error && (
                        <Alert variant="destructive" className="rounded-2xl">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    
                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:transform-none disabled:hover:shadow-none"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </form>

                
                <div className="mt-6 p-4 bg-blue-50 rounded-2xl">
                    <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-blue-800 mb-1">Demo credentials:</p>
                            <p className="text-sm text-blue-700">Username: admin</p>
                            <p className="text-sm text-blue-700">Password: admin</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}