import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import { Card, CardContent } from "../components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Question {
  id: number;
  category: string;
  question: string;
  options: { value: string; label: string }[];
}

const questions: Question[] = [
  // RISK PROFILE
  {
    id: 1,
    category: "Risk Profile",
    question: "When facing risk, I usually:",
    options: [
      { value: "A", label: "Take it immediately" },
      { value: "B", label: "Calculate first" },
      { value: "C", label: "Avoid it" },
      { value: "D", label: "Test on a small scale" },
    ],
  },
  {
    id: 2,
    category: "Risk Profile",
    question: "If my first product fails, I will:",
    options: [
      { value: "A", label: "Pivot and try again quickly" },
      { value: "B", label: "Analyze the mistakes deeply" },
      { value: "C", label: "Feel discouraged and pause" },
      { value: "D", label: "Improve small parts gradually" },
    ],
  },
  {
    id: 3,
    category: "Risk Profile",
    question: "When starting something new, I prefer:",
    options: [
      { value: "A", label: "Fast action" },
      { value: "B", label: "Clear planning" },
      { value: "C", label: "Waiting until fully ready" },
      { value: "D", label: "Experimenting step by step" },
    ],
  },
  // FINANCIAL BEHAVIOR
  {
    id: 4,
    category: "Financial Behavior",
    question: "When I receive money, I usually:",
    options: [
      { value: "A", label: "Reinvest into new ideas" },
      { value: "B", label: "Allocate based on budgeting" },
      { value: "C", label: "Spend based on need" },
      { value: "D", label: "Save first, then plan" },
    ],
  },
  {
    id: 5,
    category: "Financial Behavior",
    question: "I track my expenses:",
    options: [
      { value: "A", label: "Rarely" },
      { value: "B", label: "Only for big purchases" },
      { value: "C", label: "Sometimes" },
      { value: "D", label: "Consistently" },
    ],
  },
  {
    id: 6,
    category: "Financial Behavior",
    question: "Profit for me means:",
    options: [
      { value: "A", label: "Growth opportunity" },
      { value: "B", label: "Stability" },
      { value: "C", label: "Personal reward" },
      { value: "D", label: "Business sustainability" },
    ],
  },
  // LEADERSHIP STYLE
  {
    id: 7,
    category: "Leadership Style",
    question: "In group projects, I usually:",
    options: [
      { value: "A", label: "Lead naturally" },
      { value: "B", label: "Organize and structure tasks" },
      { value: "C", label: "Support behind the scenes" },
      { value: "D", label: "Focus on creative ideas" },
    ],
  },
  {
    id: 8,
    category: "Leadership Style",
    question: "When conflicts happen, I:",
    options: [
      { value: "A", label: "Confront directly" },
      { value: "B", label: "Mediate logically" },
      { value: "C", label: "Avoid tension" },
      { value: "D", label: "Find compromise solutions" },
    ],
  },
  {
    id: 9,
    category: "Leadership Style",
    question: "I feel most confident when:",
    options: [
      { value: "A", label: "Making decisions" },
      { value: "B", label: "Planning strategies" },
      { value: "C", label: "Supporting execution" },
      { value: "D", label: "Creating concepts" },
    ],
  },
  // SUSTAINABILITY MINDSET
  {
    id: 10,
    category: "Sustainability Mindset",
    question: "A business should primarily:",
    options: [
      { value: "A", label: "Scale fast" },
      { value: "B", label: "Solve real problems" },
      { value: "C", label: "Generate profit" },
      { value: "D", label: "Create long-term impact" },
    ],
  },
  {
    id: 11,
    category: "Sustainability Mindset",
    question: "I care about environmental/social impact when:",
    options: [
      { value: "A", label: "It strengthens branding" },
      { value: "B", label: "It aligns with my values" },
      { value: "C", label: "It becomes mandatory" },
      { value: "D", label: "It benefits community directly" },
    ],
  },
  {
    id: 12,
    category: "Sustainability Mindset",
    question: "My long-term goal as an entrepreneur is to:",
    options: [
      { value: "A", label: "Build a scalable company" },
      { value: "B", label: "Create a stable income system" },
      { value: "C", label: "Achieve financial independence" },
      { value: "D", label: "Empower others through business" },
    ],
  },
];

export function EntrepreneurScan() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result and save to localStorage
      const counts = { A: 0, B: 0, C: 0, D: 0 };
      Object.values(answers).forEach((answer) => {
        counts[answer as keyof typeof counts]++;
      });

      let type = "";
      let strength = "";
      let weakness = "";
      let focus = "";

      const max = Math.max(counts.A, counts.B, counts.C, counts.D);
      
      if (counts.A === max) {
        type = "Visionary";
        strength = "Bold decision-making";
        weakness = "Risk management";
        focus = "Strategic Planning";
      } else if (counts.B === max) {
        type = "Strategist";
        strength = "Analytical thinking";
        weakness = "Speed of execution";
        focus = "Rapid Prototyping";
      } else if (counts.C === max) {
        type = "Operator";
        strength = "Steady execution";
        weakness = "Innovation";
        focus = "Market Research";
      } else {
        type = "Builder";
        strength = "Execution";
        weakness = "Vision clarity";
        focus = "Market Validation";
      }

      const result = {
        type,
        strength,
        weakness,
        focus,
        scores: counts,
        answers,
      };

      localStorage.setItem("scanResult", JSON.stringify(result));
      navigate("/result");
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-blue-100 flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-200 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-20" />
      
      <div className="w-full max-w-3xl space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-100 to-orange-100 rounded-full mb-2">
            <span className="text-4xl">🧬</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
            HOPE DNA Assessment
          </h1>
          <p className="text-lg text-slate-600">
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <Progress value={progress} className="h-3 bg-blue-100" />
        </div>

        {/* Question Card */}
        <Card className="shadow-2xl border-2 border-blue-100">
          <CardContent className="pt-8 space-y-6">
            <div>
              <div className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-3 bg-gradient-to-r from-blue-100 to-orange-100 text-blue-700">
                {currentQ.category}
              </div>
              <h2 className="text-2xl font-semibold text-slate-900">
                {currentQ.question}
              </h2>
            </div>

            <RadioGroup
              value={answers[currentQ.id] || ""}
              onValueChange={(value) =>
                setAnswers({ ...answers, [currentQ.id]: value })
              }
            >
              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <div
                    key={option.value}
                    className={`flex items-start space-x-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      answers[currentQ.id] === option.value
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : index % 2 === 0
                        ? "border-blue-100 hover:border-blue-300 hover:bg-blue-50"
                        : "border-orange-100 hover:border-orange-300 hover:bg-orange-50"
                    }`}
                    onClick={() =>
                      setAnswers({ ...answers, [currentQ.id]: option.value })
                    }
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={`${currentQ.id}-${option.value}`}
                      className="mt-0.5"
                    />
                    <Label
                      htmlFor={`${currentQ.id}-${option.value}`}
                      className="flex-1 cursor-pointer text-base font-normal"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentQuestion === 0}
            className="border-2 border-blue-200 hover:bg-blue-50"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!answers[currentQ.id]}
            className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 shadow-lg"
          >
            {currentQuestion === questions.length - 1 ? "See My Result" : "Next"}
            {currentQuestion < questions.length - 1 && (
              <ChevronRight className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}