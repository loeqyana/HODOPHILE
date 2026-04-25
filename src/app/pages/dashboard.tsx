import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Button } from "../components/ui/button";
import { Rocket, FileText, Award, ArrowRight } from "lucide-react";

export function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Student");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const data = JSON.parse(userData);
      setUserName(data.name || "Student");
    }

    // Calculate progress based on completed tasks
    const sprintData = localStorage.getItem("sprintData");
    if (sprintData) {
      const data = JSON.parse(sprintData);
      const totalTasks = 8 * 3; // 8 weeks × 3 tasks per week
      const completedTasks = Object.values(data).flat().filter(Boolean).length;
      setProgress(Math.round((completedTasks / totalTasks) * 100));
    } else {
      setProgress(12); // Default initial progress
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-blue-100 px-6 py-12 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-10" />
      
      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center shadow-lg">
              <span className="text-2xl">👨‍💼</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              Welcome, {userName}.
            </h1>
          </div>
          <div className="space-y-2 bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-100">
            <div className="flex items-center justify-between">
              <p className="text-lg text-slate-600">
                Your Business Stage: <span className="font-bold text-blue-600">{progress}% Complete</span>
              </p>
            </div>
            <Progress value={progress} className="h-4 bg-blue-100" />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* My Sprint */}
          <Card className="hover:shadow-2xl transition-all cursor-pointer group border-2 border-green-200 hover:border-green-400 hover:-translate-y-1" onClick={() => navigate("/sprint")}>
            <CardHeader>
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Rocket className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="flex items-center justify-between text-xl">
                My Sprint
                <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-green-600 transition-colors" />
              </CardTitle>
              <CardDescription className="text-base">
                8-week structured journey to build your business from scratch
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full border-2 border-green-200 hover:bg-green-50 hover:border-green-400">
                Continue Sprint
              </Button>
            </CardContent>
          </Card>

          {/* My Canvas */}
          <Card className="hover:shadow-2xl transition-all cursor-pointer group border-2 border-orange-200 hover:border-orange-400 hover:-translate-y-1" onClick={() => navigate("/canvas")}>
            <CardHeader>
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="flex items-center justify-between text-xl">
                My Canvas
                <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-orange-600 transition-colors" />
              </CardTitle>
              <CardDescription className="text-base">
                Design and refine your business model with our interactive canvas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full border-2 border-orange-200 hover:bg-orange-50 hover:border-orange-400">
                Open Canvas
              </Button>
            </CardContent>
          </Card>

          {/* Impact */}
          <Card className="hover:shadow-2xl transition-all cursor-pointer group border-2 border-blue-200 hover:border-blue-400 hover:-translate-y-1" onClick={() => navigate("/impact")}>
            <CardHeader>
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Award className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="flex items-center justify-between text-xl">
                Impact
                <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </CardTitle>
              <CardDescription className="text-base">
                Track your business impact and unlock achievement badges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-400">
                View Impact
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <Card className="border-2 border-blue-200 shadow-xl bg-gradient-to-br from-white to-blue-50">
          <CardHeader>
            <CardTitle className="text-2xl">Your Journey Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2 p-4 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200">
                <p className="text-sm text-slate-600 font-medium">Current Week</p>
                <p className="text-4xl font-bold text-blue-700">Week 1</p>
              </div>
              <div className="space-y-2 p-4 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200">
                <p className="text-sm text-slate-600 font-medium">Tasks Completed</p>
                <p className="text-4xl font-bold text-orange-700">
                  {Math.round((progress / 100) * 24)}/24
                </p>
              </div>
              <div className="space-y-2 p-4 rounded-xl bg-gradient-to-br from-blue-100 to-orange-100">
                <p className="text-sm text-slate-600 font-medium">Days Remaining</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-orange-600 bg-clip-text text-transparent">56</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}