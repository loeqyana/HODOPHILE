import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";
import { Sparkles, TrendingUp, AlertCircle, Target } from "lucide-react";

interface ScanResult {
  type: string;
  strength: string;
  weakness: string;
  focus: string;
  scores: { A: number; B: number; C: number; D: number };
}

export function ScanResult() {
  const navigate = useNavigate();
  const [result, setResult] = useState<ScanResult | null>(null);

  useEffect(() => {
    const savedResult = localStorage.getItem("scanResult");
    if (savedResult) {
      setResult(JSON.parse(savedResult));
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!result) {
    return null;
  }

  const chartData = [
    { trait: "Risk Taking", value: (result.scores.A / 12) * 100 },
    { trait: "Planning", value: (result.scores.B / 12) * 100 },
    { trait: "Stability", value: (result.scores.C / 12) * 100 },
    { trait: "Innovation", value: (result.scores.D / 12) * 100 },
  ];

  const motivationalMessages: Record<string, string> = {
    Visionary: "You see opportunities where others see obstacles. Channel that vision into action.",
    Strategist: "Your analytical mind is your superpower. Use it to build sustainable systems.",
    Operator: "Consistency creates success. Your steady approach will build something lasting.",
    Builder: "You turn ideas into reality. That execution power will drive your business forward.",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-blue-100 px-6 py-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20" />
      
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-100 to-orange-100 rounded-full mb-4">
            <Sparkles className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
            Your HOPE DNA Result
          </h1>
          <p className="text-lg text-slate-600">
            Understanding your entrepreneurial profile
          </p>
        </div>

        {/* Main Result Card */}
        <Card className="border-4 border-blue-200 bg-gradient-to-br from-blue-50 to-orange-50 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-4xl bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              The {result.type}
            </CardTitle>
            <CardDescription className="text-lg italic pt-3 text-slate-700 font-medium">
              {motivationalMessages[result.type]}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-white rounded-xl p-4 shadow-inner">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={chartData}>
                  <PolarGrid stroke="#cbd5e1" />
                  <PolarAngleAxis dataKey="trait" tick={{ fill: '#475569' }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="Your Profile"
                    dataKey="value"
                    stroke="#f97316"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Insights Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="border-2 border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-lg">Strength</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 font-medium">{result.strength}</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-lg">Growth Area</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 font-medium">{result.weakness}</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-lg">Recommended Focus</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 font-medium">{result.focus}</p>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="flex justify-center pt-4">
          <Button 
            size="lg" 
            onClick={() => navigate("/dashboard")}
            className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 shadow-lg text-lg px-8"
          >
            Continue to My Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}