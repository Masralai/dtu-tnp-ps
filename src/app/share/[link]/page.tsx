"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation" 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, Users } from "lucide-react"

interface Student {
  first_name: string
  last_name: string
  email: string
  roll_no: string
}




export default function SharePage() {
  const { link: uniqueId } = useParams() as { link: string }; 

  const [students, setStudents] = useState<Student[]>([])
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([])
  const [emailFilter, setEmailFilter] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

 

    useEffect(() => {
  if (uniqueId) {
    setLoading(true);
    
    fetch(`/api/shared-data/${uniqueId}`) 
      .then(res => {
        if (!res.ok) throw new Error('Invalid or expired link');
        return res.json();
      })
      .then(data => {
        setStudents(data.students); 
        setFilteredStudents(data.students);
        setLoading(false);
      })
      .catch(_err => {
        console.log(_err)
        setError("Failed to load student data or invalid link");
        setLoading(false);
      });
  }
}, [uniqueId]);

  useEffect(() => {
    if (students.length > 0) {
      if (emailFilter) {
        const filtered = students.filter((student) =>
          student.email.toLowerCase().includes(emailFilter.toLowerCase())
        )
        setFilteredStudents(filtered)
      } else {
        setFilteredStudents(students)
      }
    }
  }, [emailFilter, students])


  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="p-6 text-center">
            <p className="text-lg font-semibold">Loading student data...</p>
            <p className="text-sm text-muted-foreground mt-2">Please wait.</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-6 h-6 text-blue-600" />
            <h1 className="text-3xl font-bold">TnP Student Data</h1>
          </div>
          <p className="text-muted-foreground">Shared student information - {students.length} records</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search & Filter
            </CardTitle>
            <CardDescription>Filter students by email address</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-w-md">
              <Label htmlFor="email-filter">Email Filter</Label>
              <Input
                id="email-filter"
                type="text"
                placeholder="Enter email to filter..."
                value={emailFilter}
                onChange={(e) => setEmailFilter(e.target.value)}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Student Records ({filteredStudents.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">Name</th>
                    <th className="text-left p-3 font-semibold">Email</th>
                    <th className="text-left p-3 font-semibold">Roll Number</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{`${student.first_name} ${student.last_name}`}</td>
                      <td className="p-3 text-blue-600">{student.email}</td>
                      <td className="p-3">{student.roll_no}</td>
                    </tr>
                  ))}
                </tbody>
              </table>


              {filteredStudents.length === 0 && !emailFilter && !loading && (
                <div className="text-center py-8 text-muted-foreground">No student records available.</div>
              )}
              {filteredStudents.length === 0 && emailFilter && (
                <div className="text-center py-8 text-muted-foreground">No students found matching &quot;{emailFilter}&quot;</div> 
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}