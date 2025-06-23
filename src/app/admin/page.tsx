"use client"

import React from "react";
import axios from "axios";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"


interface ShareLink {
    id: string
    token: string
    url: string
}

export default function Admin() {
    const [shareLinks, setShareLinks] = useState<ShareLink[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()
    useEffect(() => {
        checkAuth()
        loadShareLinks()
    }, [])

    const checkAuth = async () => {
        try {
            await axios.get("/api/auth/verify");

        } catch (err) {
            console.error("Authentication check failed:", err);
            router.push("/login");
        }
    };

    const loadShareLinks = async () => {
        try {
            const response = await axios.get("/api/resolve-link/[id]");
            setShareLinks(response.data.links);
        } catch (err) {
            console.error("Failed to load share links:", err);

        }
    };

    const generateShareLink = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await axios.post("/api/generate-link");

            const newLink = response.data.link;
            setShareLinks((prev) => [newLink, ...prev]);
            setError("");

        } catch (err) {
            console.error("Failed to generate share link:", err);

            if (axios.isAxiosError(err)) {

                if (err.response) {
                    setError(err.response.data.error || "Failed to generate share link from server.");
                    console.error("Server error details:", err.response.status, err.response.data);
                } else if (err.request) {
                    setError("Network error: Unable to connect to the backend API.");
                    console.error("No response from server:", err.request);
                } else {
                    setError(err.message || "An unexpected client-side error occurred.");
                    console.error("Error setting up request:", err.message);
                }
            } else {
                setError("An unexpected error occurred.");
                console.error("Non-Axios error:", err);
            }
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = async (url: string) => {
        try {
            await navigator.clipboard.writeText(url);
            console.log("Copied to clipboard:", url);
        } catch (err) {
            console.error("Failed to copy to clipboard:", err);

        }
    };

    const logout = async () => {
        try {

            await axios.post("/api/auth/logout");

            router.push("/login");
        } catch (err) {

            console.error("Logout request failed, but redirecting to login:", err);
            router.push("/login");

        }
    };



    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Admin Panel</h1>
                        <p className="text-gray-600">Generate and manage shareable links for student data</p>
                    </div>
                    <Button variant="outline" onClick={logout}>

                        Logout
                    </Button>
                </div>

                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Generate New Share Link</CardTitle>
                            <CardDescription>Create a unique, shareable link to access student data without login</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-2">
                                <Button onClick={generateShareLink} disabled={loading}>
                                    {loading ? (
                                        <>
                                            Generating...
                                        </>
                                    ) : (
                                        "Generate Share Link"
                                    )}
                                </Button>
                            </div>
                            {error && (
                                <Alert variant="destructive" className="mt-4">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Generated Links</CardTitle>
                            <CardDescription>Previously generated shareable links</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {shareLinks.length === 0 ? (
                                <p className="text-gray-500">No share links generated yet</p>
                            ) : (
                                <div className="space-y-4">
                                    {shareLinks.map((link) => (
                                        <div key={link.id} className="flex items-center justify-between p-4 border rounded-lg">
                                            <div className="flex-1 min-w-0">
                                                <Input value={link.url} readOnly className="font-mono text-sm" />

                                            </div>
                                            <div className="flex gap-2 ml-4">
                                                <Button variant="outline" size="sm" onClick={() => copyToClipboard(link.url)}>
                                                </Button>
                                                <Button variant="outline" size="sm" onClick={() => window.open(link.url, "_blank")}>
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}