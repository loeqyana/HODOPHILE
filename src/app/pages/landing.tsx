import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { ArrowRight, Users, Building2, TrendingUp, Sparkles } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-blue-100 flex flex-col relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30" />
      
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-6 py-20 relative z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold">8-Week Transformation Program</span>
            </div>
            
            <h1 className="text-6xl font-bold text-slate-900 tracking-tight leading-tight">
              Build Your First Business
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                in 8 Weeks.
              </span>
            </h1>
            
            <p className="text-2xl text-slate-600">
              Personalized. Practical. Purpose-driven.
            </p>
            
            <div className="pt-4">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 h-auto bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 shadow-lg"
                onClick={() => navigate("/signup")}
              >
                Start My Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Stats */}
            <div className="pt-8 grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">10</div>
                <div className="text-sm text-slate-600">Students Piloted</div>
              </div>
              
              <div className="space-y-2">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">2</div>
                <div className="text-sm text-slate-600">UMKM Assisted</div>
              </div>
              
              <div className="space-y-2">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center shadow-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">5M</div>
                <div className="text-sm text-slate-600">Revenue Tested</div>
              </div>
            </div>

            {/* Tagline */}
            <div className="pt-6 px-6 py-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100 shadow-sm">
              <p className="text-xl text-slate-700 italic font-medium">
                "Not a course. A business journey."
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-orange-400 rounded-3xl blur-2xl opacity-20" />
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-white">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1579389248774-07907f421a6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRyZXByZW5ldXIlMjB5b3VuZyUyMG1hbiUyMHdvcmtpbmd8ZW58MXx8fHwxNzcwOTkyMTgwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Young entrepreneur"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}