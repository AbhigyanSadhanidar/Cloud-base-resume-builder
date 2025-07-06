import { useState } from "react";
import { Button } from "../../src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../src/components/ui/card";
import { Badge } from "../../src/components/ui/badge";
import {
  ArrowRight,
  FileText,
  Sparkles,
  Download,
  Eye,
  Edit3,
  Zap,
  Target,
  Award,
} from "lucide-react";
import ResumeBuilder from "../../src/components/ResumeBuilder";
import { Dialog, DialogContent } from "../../src/components/ui/dialog";

const Index = () => {
  const [showBuilder, setShowBuilder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "",
    experience: "",
    email: "",
    skills: "",
    summary: "",
    education: "",
  });

  const handleSubmitUserFormData = async () => {
    console.log("Submitting the profile data...");
    setLoading(true);

    const payload = {
      name: profileData.fullName,
      email: profileData.email,
      experience: profileData.experience,
      education: profileData.education,
      skills: profileData.skills.split(",").map((skill) => skill.trim()),
      summary: profileData.summary,
    };

    try {
      console.log("input data", payload);

      const response = await fetch(
        "https://30chj74s89.execute-api.ap-south-1.amazonaws.com/prod/resume",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      console.log("✅ Response status:", response.status);
      console.log("📦 Response body:", result);

      if (response.ok) {
        alert("Resume saved successfully!");
      } else {
        alert("Failed to save resume: " + result.message);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      alert("An error occurred while saving resume.");
    } finally {
      setLoading(false);
    }
  };

  if (showBuilder) {
    return <ResumeBuilder onBack={() => setShowBuilder(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Professional Resume Builder
            </h1>
          </div>
          <Button
            onClick={() => setShowDialog(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Create Resume
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <Badge
            variant="secondary"
            className="mb-6 px-4 py-2 text-sm font-medium bg-blue-100 text-blue-800 border-blue-200"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Resume Builder
          </Badge>

          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Resume Builder
            </span>
          </h2>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Create stunning, professional resumes with our AI-powered builder.
            Choose from beautiful templates and land your dream job.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              onClick={() => setShowDialog(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6 h-auto"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 h-auto border-2 hover:bg-gray-50"
            >
              <Eye className="w-5 h-5 mr-2" />
              View Templates
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-20">
          {[
            {
              icon: <Zap className="w-8 h-8 text-white" />,
              title: "AI-Powered",
              desc: "Let our AI generate compelling summaries and optimize your content for maximum impact.",
              color: "from-blue-500 to-blue-600",
            },
            {
              icon: <Target className="w-8 h-8 text-white" />,
              title: "Professional Templates",
              desc: "Choose from carefully crafted templates designed by professionals for different industries.",
              color: "from-purple-500 to-purple-600",
            },
            {
              icon: <Award className="w-8 h-8 text-white" />,
              title: "Land Your Dream Job",
              desc: "Stand out from the competition with resumes that get noticed by hiring managers.",
              color: "from-green-500 to-green-600",
            },
          ].map((item, idx) => (
            <Card
              key={idx}
              className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md"
            >
              <CardHeader>
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  {item.icon}
                </div>
                <CardTitle className="text-2xl mb-2">{item.title}</CardTitle>
                <CardDescription className="text-base">
                  {item.desc}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Your Dashboard
            </h3>
            <p className="text-lg text-gray-600">
              Manage your resumes and track your progress
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Quick Actions */}
            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Edit3 className="w-5 h-5 mr-2 text-blue-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => setShowDialog(true)}
                  className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Create New Resume
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Download Templates
                </Button>
              </CardContent>
            </Card>

            {/* Modal Dialog */}
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
              <DialogContent className="max-w-2xl sm:max-w-3xl p-0 border-0 shadow-lg">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      Start Building Your Resume
                    </CardTitle>
                    <CardDescription>
                      Fill out your details to begin
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Full Name
                      </label>
                      <input
                        value={profileData.fullName}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            fullName: e.target.value,
                          }))
                        }
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <input
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        type="email"
                        placeholder="john@example.com"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Experience
                      </label>
                      <textarea
                        value={profileData.experience}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            experience: e.target.value,
                          }))
                        }
                        placeholder="Write about your relevant experience"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        rows={2}
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Education
                      </label>
                      <input
                        value={profileData.education}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            education: e.target.value,
                          }))
                        }
                        type="education"
                        placeholder="Bachelor's in technology"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Skills
                      </label>
                      <input
                        value={profileData.skills}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            skills: e.target.value,
                          }))
                        }
                        type="skills"
                        placeholder="Add relevant skills"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Summary
                      </label>
                      <textarea
                        value={profileData.summary}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            summary: e.target.value,
                          }))
                        }
                        placeholder="A brief professional summary..."
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        rows={4}
                      ></textarea>
                    </div>
                    <div className="flex justify-between pt-4">
                      <Button
                        onClick={() => setShowDialog(false)}
                        variant="outline"
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-blue-600 to-purple-600"
                        onClick={() => {
                          setShowDialog(false);
                          setShowBuilder(true);
                          handleSubmitUserFormData();
                        }}
                      >
                        {loading ? "Submitting..." : "Save and continue"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </DialogContent>
            </Dialog>

            {/* Templates */}
            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <FileText className="w-5 h-5 mr-2 text-purple-600" />
                  Available Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Modern Professional</span>
                    <Badge variant="secondary">Popular</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Creative Designer</span>
                    <Badge variant="outline">New</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Executive Classic</span>
                    <Badge variant="outline">Premium</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Sparkles className="w-5 h-5 mr-2 text-green-600" />
                  Tips & Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-green-800">
                      Resume Writing Tips
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      Learn the best practices
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">
                      Interview Preparation
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      Get ready for success
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm font-medium text-purple-800">
                      Industry Insights
                    </p>
                    <p className="text-xs text-purple-600 mt-1">
                      Stay ahead of trends
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Resume Builder</span>
          </div>
          <p className="text-gray-400">
            Create professional resumes that get you hired.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
