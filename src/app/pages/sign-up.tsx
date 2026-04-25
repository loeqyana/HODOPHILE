import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Sparkles } from "lucide-react";

export function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    campus: "",
    hasIdea: "no",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save user data to localStorage
    localStorage.setItem("userData", JSON.stringify(formData));
    
    // Navigate to entrepreneur scan
    navigate("/scan");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-blue-100 flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20" />
      
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left - Image */}
        <div className="hidden md:block">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-orange-500 rounded-3xl blur-2xl opacity-20" />
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-white p-8">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-orange-100 text-blue-700 px-4 py-2 rounded-full">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-semibold">Join the Community</span>
                </div>
                <h2 className="text-3xl font-bold text-slate-900">
                  Your entrepreneurial journey starts here
                </h2>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1733004441442-c3bf86d6e6f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwYXZhdGFyJTIwaWxsdXN0cmF0aW9uJTIwY2FydG9vbnxlbnwxfHx8fDE3NzA5OTIxODB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Entrepreneur illustration"
                  className="w-full rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right - Form */}
        <Card className="shadow-2xl border-2 border-blue-100">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              Join the Journey
            </CardTitle>
            <CardDescription className="text-base">
              Let's start building your business together
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="border-blue-200 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="border-blue-200 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="campus">Campus</Label>
                <Input
                  id="campus"
                  placeholder="Your university"
                  value={formData.campus}
                  onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                  required
                  className="border-blue-200 focus:border-blue-500"
                />
              </div>

              <div className="space-y-3">
                <Label>Do you have a business idea?</Label>
                <RadioGroup
                  value={formData.hasIdea}
                  onValueChange={(value) => setFormData({ ...formData, hasIdea: value })}
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg border-2 border-blue-100 hover:border-blue-300 hover:bg-blue-50 transition-all">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes" className="font-normal cursor-pointer flex-1">
                      I have an idea
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border-2 border-orange-100 hover:border-orange-300 hover:bg-orange-50 transition-all">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no" className="font-normal cursor-pointer flex-1">
                      I don't have an idea yet
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 shadow-lg" 
                size="lg"
              >
                Start My Entrepreneur Scan
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}