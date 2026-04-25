import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { ArrowLeft, Leaf, Lightbulb, Rocket, Award, TrendingUp, Users } from "lucide-react";

interface ImpactMetrics {
  revenueGrowth: number;
  problemRelevance: number;
  sustainability: number;
}

export function Impact() {
  const navigate = useNavigate();
  const [impactScore, setImpactScore] = useState(68);
  const [metrics, setMetrics] = useState<ImpactMetrics>({
    revenueGrowth: 20,
    problemRelevance: 25,
    sustainability: 23,
  });
  const [badges, setBadges] = useState<string[]>([]);

  useEffect(() => {
    // Calculate impact based on sprint progress
    const sprintData = localStorage.getItem("sprintData");
    if (sprintData) {
      const data = JSON.parse(sprintData);
      const totalTasks = 8 * 3;
      const completedTasks = Object.values(data).flat().filter(Boolean).length;
      const completionRate = completedTasks / totalTasks;

      // Update metrics based on progress
      setMetrics({
        revenueGrowth: Math.round(completionRate * 30),
        problemRelevance: Math.round(completionRate * 35),
        sustainability: Math.round(completionRate * 35),
      });

      const score = Math.round(
        (completionRate * 30) + (completionRate * 35) + (completionRate * 35)
      );
      setImpactScore(score);

      // Award badges based on progress
      const earnedBadges = [];
      if (completedTasks >= 3) earnedBadges.push("Student Founder");
      if (completedTasks >= 12) earnedBadges.push("Local Impact");
      if (completedTasks >= 24) earnedBadges.push("MVP Launched");
      setBadges(earnedBadges);
    } else {
      // Default badges for new users
      setBadges(["Student Founder"]);
    }
  }, []);

  const badgeConfig = {
    "Local Impact": {
      icon: Leaf,
      color: "bg-green-100 text-green-700 border-green-300",
      description: "Creating impact in your local community",
    },
    "Student Founder": {
      icon: Lightbulb,
      color: "bg-yellow-100 text-yellow-700 border-yellow-300",
      description: "Embarked on the entrepreneurship journey",
    },
    "MVP Launched": {
      icon: Rocket,
      color: "bg-purple-100 text-purple-700 border-purple-300",
      description: "Successfully launched your minimum viable product",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-blue-100 px-6 py-12 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20" />
      
      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="space-y-2">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/dashboard")}
            className="hover:bg-blue-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <div className="flex items-center space-x-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
              <span className="text-2xl">🏆</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                My Impact
              </h1>
              <p className="text-lg text-slate-600">
                Track your business impact and achievements
              </p>
            </div>
          </div>
        </div>

        {/* Impact Score Card */}
        <Card className="border-4 border-blue-200 bg-gradient-to-br from-blue-50 via-white to-orange-50 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-lg text-slate-600">My Impact Score</CardTitle>
            <div className="pt-6 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-48 w-48 rounded-full bg-gradient-to-br from-blue-200 to-orange-200 blur-2xl opacity-40" />
              </div>
              <div className="relative">
                <div className="text-8xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                  {impactScore}
                </div>
                <div className="text-3xl text-slate-600 font-semibold">/100</div>
              </div>
            </div>
            <CardDescription className="pt-6 text-base">
              Your score reflects revenue growth, problem relevance, and sustainability principles
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Metrics Breakdown */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-2 border-green-200 hover:shadow-2xl transition-all hover:-translate-y-1">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-base">Revenue Growth</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                {metrics.revenueGrowth}/30
              </div>
              <Progress value={(metrics.revenueGrowth / 30) * 100} className="h-3 bg-green-100" />
              <p className="text-sm text-slate-600">
                Based on business model and market validation
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 hover:shadow-2xl transition-all hover:-translate-y-1">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-base">Problem Relevance</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                {metrics.problemRelevance}/35
              </div>
              <Progress value={(metrics.problemRelevance / 35) * 100} className="h-3 bg-blue-100" />
              <p className="text-sm text-slate-600">
                How well your solution addresses real needs
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200 hover:shadow-2xl transition-all hover:-translate-y-1">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-base">Sustainability</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                {metrics.sustainability}/35
              </div>
              <Progress value={(metrics.sustainability / 35) * 100} className="h-3 bg-orange-100" />
              <p className="text-sm text-slate-600">
                Long-term viability and positive impact
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Badges Section */}
        <Card className="border-2 border-blue-200 shadow-xl">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Your Achievement Badges</CardTitle>
                <CardDescription>
                  Unlock badges as you progress through your journey
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(badgeConfig).map(([badgeName, config]) => {
                const isEarned = badges.includes(badgeName);
                const Icon = config.icon;

                return (
                  <div
                    key={badgeName}
                    className={`p-6 rounded-2xl border-2 transition-all ${
                      isEarned
                        ? "bg-gradient-to-br from-white to-blue-50 border-blue-200 shadow-lg"
                        : "bg-slate-50 border-slate-200 opacity-60"
                    }`}
                  >
                    <div
                      className={`h-20 w-20 rounded-2xl flex items-center justify-center mb-4 shadow-lg ${
                        isEarned ? config.color : "bg-slate-200"
                      }`}
                    >
                      <Icon
                        className={`h-10 w-10 ${
                          isEarned ? "" : "text-slate-400"
                        }`}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-bold text-slate-900">{badgeName}</h3>
                        {isEarned && (
                          <Badge variant="secondary" className="text-xs bg-gradient-to-r from-blue-100 to-orange-100 text-blue-700 border-blue-200">
                            Earned
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-600">{config.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Motivational Message */}
        <Card className="bg-gradient-to-r from-blue-100 via-orange-50 to-blue-100 border-2 border-blue-200 shadow-xl">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <div className="text-4xl mb-4">
                {impactScore < 40 ? "💪" : impactScore < 70 ? "🚀" : "🌟"}
              </div>
              <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                {impactScore < 40
                  ? "Every great journey starts with a single step. Keep going!"
                  : impactScore < 70
                  ? "You're making excellent progress! Your business is taking shape."
                  : "Outstanding work! You're building something truly impactful."}
              </p>
              <p className="text-slate-600 font-medium">
                Complete more sprint tasks to increase your impact score
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}