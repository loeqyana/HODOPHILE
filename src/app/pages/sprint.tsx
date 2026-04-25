import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { Progress } from "../components/ui/progress";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";

interface WeekTask {
  id: string;
  title: string;
  completed: boolean;
  content?: string;
}

interface Week {
  week: number;
  title: string;
  tasks: WeekTask[];
}

const initialWeeks: Week[] = [
  {
    week: 1,
    title: "Define Your Problem",
    tasks: [
      { id: "1-1", title: "Write problem statement", completed: false },
      { id: "1-2", title: "Identify target market", completed: false },
      { id: "1-3", title: "Validate with 3 people", completed: false },
    ],
  },
  {
    week: 2,
    title: "Market Research",
    tasks: [
      { id: "2-1", title: "Analyze competitors", completed: false },
      { id: "2-2", title: "Interview potential customers", completed: false },
      { id: "2-3", title: "Document key insights", completed: false },
    ],
  },
  {
    week: 3,
    title: "Solution Design",
    tasks: [
      { id: "3-1", title: "Sketch your solution", completed: false },
      { id: "3-2", title: "Define core features", completed: false },
      { id: "3-3", title: "Create value proposition", completed: false },
    ],
  },
  {
    week: 4,
    title: "MVP Development",
    tasks: [
      { id: "4-1", title: "Build minimum viable product", completed: false },
      { id: "4-2", title: "Set up basic operations", completed: false },
      { id: "4-3", title: "Prepare testing plan", completed: false },
    ],
  },
  {
    week: 5,
    title: "Testing & Validation",
    tasks: [
      { id: "5-1", title: "Test with 10 users", completed: false },
      { id: "5-2", title: "Collect feedback", completed: false },
      { id: "5-3", title: "Iterate based on learnings", completed: false },
    ],
  },
  {
    week: 6,
    title: "Business Model",
    tasks: [
      { id: "6-1", title: "Define revenue streams", completed: false },
      { id: "6-2", title: "Calculate unit economics", completed: false },
      { id: "6-3", title: "Plan cost structure", completed: false },
    ],
  },
  {
    week: 7,
    title: "Go-to-Market",
    tasks: [
      { id: "7-1", title: "Create marketing plan", completed: false },
      { id: "7-2", title: "Launch to first customers", completed: false },
      { id: "7-3", title: "Track initial metrics", completed: false },
    ],
  },
  {
    week: 8,
    title: "Scale & Optimize",
    tasks: [
      { id: "8-1", title: "Analyze performance data", completed: false },
      { id: "8-2", title: "Plan next growth phase", completed: false },
      { id: "8-3", title: "Present final results", completed: false },
    ],
  },
];

export function Sprint() {
  const navigate = useNavigate();
  const [weeks, setWeeks] = useState<Week[]>(initialWeeks);
  const [expandedWeek, setExpandedWeek] = useState<number>(1);
  const [taskInputs, setTaskInputs] = useState<Record<string, string>>({});

  useEffect(() => {
    const saved = localStorage.getItem("sprintData");
    if (saved) {
      const savedData = JSON.parse(saved);
      setWeeks(savedData);
    }
  }, []);

  const saveProgress = (updatedWeeks: Week[]) => {
    localStorage.setItem("sprintData", JSON.stringify(updatedWeeks));
  };

  const toggleTask = (weekIndex: number, taskIndex: number) => {
    const newWeeks = [...weeks];
    newWeeks[weekIndex].tasks[taskIndex].completed = !newWeeks[weekIndex].tasks[taskIndex].completed;
    setWeeks(newWeeks);
    saveProgress(newWeeks);
  };

  const updateTaskContent = (taskId: string, content: string) => {
    setTaskInputs({ ...taskInputs, [taskId]: content });
  };

  const totalTasks = weeks.reduce((acc, week) => acc + week.tasks.length, 0);
  const completedTasks = weeks.reduce(
    (acc, week) => acc + week.tasks.filter((t) => t.completed).length,
    0
  );
  const progress = (completedTasks / totalTasks) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-blue-100 px-6 py-12 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-10" />
      
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="space-y-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/dashboard")}
            className="hover:bg-blue-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <div className="flex items-center space-x-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg">
              <span className="text-2xl">🚀</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                My Sprint
              </h1>
              <p className="text-lg text-slate-600 mt-1">
                8-Week Business Building Journey
              </p>
            </div>
          </div>
          <div className="space-y-2 bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-100">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 font-medium">Overall Progress</span>
              <span className="font-bold text-blue-600">{completedTasks}/{totalTasks} tasks</span>
            </div>
            <Progress value={progress} className="h-3 bg-blue-100" />
          </div>
        </div>

        {/* Weeks List */}
        <div className="space-y-4">
          {weeks.map((week, weekIndex) => {
            const weekProgress = (week.tasks.filter((t) => t.completed).length / week.tasks.length) * 100;
            const isExpanded = expandedWeek === week.week;

            return (
              <Card key={week.week} className="border-2 border-blue-200 hover:border-blue-300 transition-colors shadow-lg">
                <CardHeader
                  className="cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-orange-50 transition-colors rounded-t-lg"
                  onClick={() => setExpandedWeek(isExpanded ? 0 : week.week)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center space-x-3">
                        <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-orange-500 text-white font-bold">
                          {week.week}
                        </span>
                        <span className="text-slate-600">–</span>
                        <span>{week.title}</span>
                      </CardTitle>
                      <div className="mt-3 flex items-center space-x-4">
                        <Progress value={weekProgress} className="h-2 flex-1 bg-blue-100" />
                        <span className="text-sm text-slate-600 min-w-12 font-medium">
                          {week.tasks.filter((t) => t.completed).length}/{week.tasks.length}
                        </span>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-blue-500 ml-4" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-400 ml-4" />
                    )}
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent className="space-y-6 pt-0">
                    {week.tasks.map((task, taskIndex) => (
                      <div key={task.id} className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-orange-50 border-2 border-blue-100">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id={task.id}
                            checked={task.completed}
                            onCheckedChange={() => toggleTask(weekIndex, taskIndex)}
                            className="mt-1 border-2 border-blue-400"
                          />
                          <div className="flex-1">
                            <label
                              htmlFor={task.id}
                              className={`cursor-pointer text-base font-medium ${
                                task.completed ? "line-through text-slate-500" : "text-slate-900"
                              }`}
                            >
                              {task.title}
                            </label>
                          </div>
                        </div>

                        {!task.completed && (
                          <div className="ml-7 space-y-2">
                            {task.id === "1-1" || task.id === "2-3" || task.id === "3-2" ? (
                              <Textarea
                                placeholder="Write your response here..."
                                value={taskInputs[task.id] || ""}
                                onChange={(e) => updateTaskContent(task.id, e.target.value)}
                                rows={3}
                                className="border-2 border-blue-200 focus:border-blue-400"
                              />
                            ) : (
                              <Input
                                placeholder="Add link or notes..."
                                value={taskInputs[task.id] || ""}
                                onChange={(e) => updateTaskContent(task.id, e.target.value)}
                                className="border-2 border-blue-200 focus:border-blue-400"
                              />
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}