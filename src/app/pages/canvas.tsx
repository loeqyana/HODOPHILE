import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { ArrowLeft, Download } from "lucide-react";

interface CanvasData {
  keyPartners: string;
  keyActivities: string;
  valuePropositions: string;
  customerRelationships: string;
  customerSegments: string;
  keyResources: string;
  channels: string;
  costStructure: string;
  revenueStreams: string;
}

export function Canvas() {
  const navigate = useNavigate();
  const [canvasData, setCanvasData] = useState<CanvasData>({
    keyPartners: "",
    keyActivities: "",
    valuePropositions: "",
    customerRelationships: "",
    customerSegments: "",
    keyResources: "",
    channels: "",
    costStructure: "",
    revenueStreams: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("canvasData");
    if (saved) {
      setCanvasData(JSON.parse(saved));
    }
  }, []);

  const handleChange = (field: keyof CanvasData, value: string) => {
    const newData = { ...canvasData, [field]: value };
    setCanvasData(newData);
    localStorage.setItem("canvasData", JSON.stringify(newData));
  };

  const downloadAsPDF = () => {
    // In a real implementation, this would generate a PDF
    alert("PDF download functionality would be implemented here. For now, your canvas is saved locally.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-blue-100 px-6 py-12 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-10" />
      
      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between">
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
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg">
                <span className="text-2xl">📋</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                  Business Model Canvas
                </h1>
                <p className="text-lg text-slate-600">
                  Design and visualize your business model
                </p>
              </div>
            </div>
          </div>
          <Button 
            onClick={downloadAsPDF}
            className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 shadow-lg"
          >
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>

        {/* Canvas Grid */}
        <div className="grid grid-cols-5 gap-4">
          {/* Row 1 */}
          <Card className="col-span-1 border-2 border-blue-200 shadow-lg">
            <CardHeader className="pb-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-t-lg">
              <CardTitle className="text-base text-blue-900">Key Partners</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Who are your key partners and suppliers?"
                value={canvasData.keyPartners}
                onChange={(e) => handleChange("keyPartners", e.target.value)}
                rows={8}
                className="resize-none border-2 border-blue-200 focus:border-blue-400"
              />
            </CardContent>
          </Card>

          <div className="col-span-2 space-y-4">
            <Card className="border-2 border-orange-200 shadow-lg">
              <CardHeader className="pb-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-t-lg">
                <CardTitle className="text-base text-orange-900">Key Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="What key activities do you need to perform?"
                  value={canvasData.keyActivities}
                  onChange={(e) => handleChange("keyActivities", e.target.value)}
                  rows={3}
                  className="resize-none border-2 border-orange-200 focus:border-orange-400"
                />
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200 shadow-lg">
              <CardHeader className="pb-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-t-lg">
                <CardTitle className="text-base text-orange-900">Key Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="What key resources do you need?"
                  value={canvasData.keyResources}
                  onChange={(e) => handleChange("keyResources", e.target.value)}
                  rows={3}
                  className="resize-none border-2 border-orange-200 focus:border-orange-400"
                />
              </CardContent>
            </Card>
          </div>

          <Card className="col-span-1 border-2 border-blue-200 shadow-lg">
            <CardHeader className="pb-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-t-lg">
              <CardTitle className="text-base text-blue-900">Value Propositions</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="What value do you deliver to customers?"
                value={canvasData.valuePropositions}
                onChange={(e) => handleChange("valuePropositions", e.target.value)}
                rows={8}
                className="resize-none border-2 border-blue-200 focus:border-blue-400"
              />
            </CardContent>
          </Card>

          <div className="col-span-1 space-y-4">
            <Card className="border-2 border-orange-200 shadow-lg">
              <CardHeader className="pb-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-t-lg">
                <CardTitle className="text-base text-orange-900">Customer Relationships</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="How do you interact with customers?"
                  value={canvasData.customerRelationships}
                  onChange={(e) => handleChange("customerRelationships", e.target.value)}
                  rows={3}
                  className="resize-none border-2 border-orange-200 focus:border-orange-400"
                />
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200 shadow-lg">
              <CardHeader className="pb-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-t-lg">
                <CardTitle className="text-base text-orange-900">Channels</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="How do you reach customers?"
                  value={canvasData.channels}
                  onChange={(e) => handleChange("channels", e.target.value)}
                  rows={3}
                  className="resize-none border-2 border-orange-200 focus:border-orange-400"
                />
              </CardContent>
            </Card>
          </div>

          <Card className="col-span-1 border-2 border-blue-200 shadow-lg">
            <CardHeader className="pb-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-t-lg">
              <CardTitle className="text-base text-blue-900">Customer Segments</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Who are your target customers?"
                value={canvasData.customerSegments}
                onChange={(e) => handleChange("customerSegments", e.target.value)}
                rows={8}
                className="resize-none border-2 border-blue-200 focus:border-blue-400"
              />
            </CardContent>
          </Card>

          {/* Row 2 */}
          <Card className="col-span-2 border-2 border-blue-200 shadow-lg">
            <CardHeader className="pb-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-t-lg">
              <CardTitle className="text-base text-blue-900">Cost Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="What are your major costs?"
                value={canvasData.costStructure}
                onChange={(e) => handleChange("costStructure", e.target.value)}
                rows={4}
                className="resize-none border-2 border-blue-200 focus:border-blue-400"
              />
            </CardContent>
          </Card>

          <Card className="col-span-3 border-2 border-orange-200 shadow-lg">
            <CardHeader className="pb-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-t-lg">
              <CardTitle className="text-base text-orange-900">Revenue Streams</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="How will you make money?"
                value={canvasData.revenueStreams}
                onChange={(e) => handleChange("revenueStreams", e.target.value)}
                rows={4}
                className="resize-none border-2 border-orange-200 focus:border-orange-400"
              />
            </CardContent>
          </Card>
        </div>

        {/* Auto-save indicator */}
        <div className="text-center py-4 bg-white rounded-xl border-2 border-blue-100 shadow-md">
          <p className="text-sm text-blue-600 font-medium flex items-center justify-center space-x-2">
            <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>All changes are automatically saved</span>
          </p>
        </div>
      </div>
    </div>
  );
}