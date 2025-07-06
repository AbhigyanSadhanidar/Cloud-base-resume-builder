import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../src/components/ui/card";
import { Badge } from "../../src/components/ui/badge";
import { Separator } from "../../src/components/ui/separator";

interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  education: Education[];
  experience: Experience[];
  skills: string[];
  summary: string;
}

interface ResumePreviewProps {
  data: ResumeData;
  template: string;
}

const ModernTemplate: React.FC<{ data: ResumeData }> = ({ data }) => (
  <div className="bg-white p-8 shadow-lg rounded-lg min-h-[800px]">
    {/* Header */}
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        {data.personalInfo.name || "Your Name"}
      </h1>
      <div className="flex flex-wrap justify-center gap-4 text-gray-600">
        {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
        {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
        {data.personalInfo.address && <span>{data.personalInfo.address}</span>}
      </div>
    </div>

    {/* Summary */}
    {data.summary && (
      <div className="mb-8">
        <h2 className="text-xl font-bold text-blue-600 mb-3 border-b-2 border-blue-600 pb-1">
          PROFESSIONAL SUMMARY
        </h2>
        <p className="text-gray-700 leading-relaxed">{data.summary}</p>
      </div>
    )}

    {/* Experience */}
    {data.experience.some((exp) => exp.company || exp.position) && (
      <div className="mb-8">
        <h2 className="text-xl font-bold text-blue-600 mb-3 border-b-2 border-blue-600 pb-1">
          WORK EXPERIENCE
        </h2>
        <div className="space-y-4">
          {data.experience.map(
            (exp) =>
              (exp.company || exp.position) && (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {exp.position || "Position"}
                      </h3>
                      <p className="text-blue-600 font-medium">
                        {exp.company || "Company"}
                      </p>
                    </div>
                    <span className="text-gray-600 text-sm">
                      {exp.duration}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 text-sm leading-relaxed ml-0">
                      {exp.description}
                    </p>
                  )}
                </div>
              )
          )}
        </div>
      </div>
    )}

    {/* Education */}
    {data.education.some((edu) => edu.school || edu.degree) && (
      <div className="mb-8">
        <h2 className="text-xl font-bold text-blue-600 mb-3 border-b-2 border-blue-600 pb-1">
          EDUCATION
        </h2>
        <div className="space-y-3">
          {data.education.map(
            (edu) =>
              (edu.school || edu.degree) && (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {edu.degree || "Degree"}
                    </h3>
                    <p className="text-gray-700">{edu.school || "School"}</p>
                  </div>
                  <span className="text-gray-600 text-sm">{edu.year}</span>
                </div>
              )
          )}
        </div>
      </div>
    )}

    {/* Skills */}
    {data.skills.some((skill) => skill.trim()) && (
      <div className="mb-8">
        <h2 className="text-xl font-bold text-blue-600 mb-3 border-b-2 border-blue-600 pb-1">
          SKILLS
        </h2>
        <div className="flex flex-wrap gap-2">
          {data.skills
            .filter((skill) => skill.trim())
            .map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-blue-100 text-blue-800"
              >
                {skill}
              </Badge>
            ))}
        </div>
      </div>
    )}
  </div>
);

const CreativeTemplate: React.FC<{ data: ResumeData }> = ({ data }) => (
  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 shadow-lg rounded-lg min-h-[800px]">
    {/* Header */}
    <div className="text-center mb-8 bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
        {data.personalInfo.name || "Your Name"}
      </h1>
      <div className="flex flex-wrap justify-center gap-4 text-gray-600">
        {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
        {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
        {data.personalInfo.address && <span>{data.personalInfo.address}</span>}
      </div>
    </div>

    {/* Summary */}
    {data.summary && (
      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-purple-600 mb-3">✨ ABOUT ME</h2>
        <p className="text-gray-700 leading-relaxed">{data.summary}</p>
      </div>
    )}

    {/* Experience */}
    {data.experience.some((exp) => exp.company || exp.position) && (
      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-purple-600 mb-3">
          🚀 EXPERIENCE
        </h2>
        <div className="space-y-4">
          {data.experience.map(
            (exp) =>
              (exp.company || exp.position) && (
                <div key={exp.id} className="border-l-4 border-purple-300 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {exp.position || "Position"}
                      </h3>
                      <p className="text-purple-600 font-medium">
                        {exp.company || "Company"}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-purple-600 border-purple-300"
                    >
                      {exp.duration}
                    </Badge>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              )
          )}
        </div>
      </div>
    )}

    {/* Education */}
    {data.education.some((edu) => edu.school || edu.degree) && (
      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-purple-600 mb-3">🎓 EDUCATION</h2>
        <div className="space-y-3">
          {data.education.map(
            (edu) =>
              (edu.school || edu.degree) && (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {edu.degree || "Degree"}
                    </h3>
                    <p className="text-gray-700">{edu.school || "School"}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-purple-600 border-purple-300"
                  >
                    {edu.year}
                  </Badge>
                </div>
              )
          )}
        </div>
      </div>
    )}

    {/* Skills */}
    {data.skills.some((skill) => skill.trim()) && (
      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-purple-600 mb-3">💎 SKILLS</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills
            .filter((skill) => skill.trim())
            .map((skill, index) => (
              <Badge
                key={index}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
              >
                {skill}
              </Badge>
            ))}
        </div>
      </div>
    )}
  </div>
);

const ExecutiveTemplate: React.FC<{ data: ResumeData }> = ({ data }) => (
  <div className="bg-white p-8 shadow-lg rounded-lg min-h-[800px] border-t-4 border-gray-900">
    {/* Header */}
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-wide">
        {data.personalInfo.name || "YOUR NAME"}
      </h1>
      <div className="grid grid-cols-2 gap-4 text-gray-600 text-sm">
        {data.personalInfo.email && <div>Email: {data.personalInfo.email}</div>}
        {data.personalInfo.phone && <div>Phone: {data.personalInfo.phone}</div>}
        {data.personalInfo.address && (
          <div className="col-span-2">Address: {data.personalInfo.address}</div>
        )}
      </div>
    </div>

    <Separator className="mb-8" />

    {/* Summary */}
    {data.summary && (
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
          Executive Summary
        </h2>
        <p className="text-gray-700 leading-relaxed text-justify">
          {data.summary}
        </p>
      </div>
    )}

    {/* Experience */}
    {data.experience.some((exp) => exp.company || exp.position) && (
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
          Professional Experience
        </h2>
        <div className="space-y-6">
          {data.experience.map(
            (exp, index) =>
              (exp.company || exp.position) && (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {exp.position || "Position"}
                      </h3>
                      <p className="text-gray-700 font-medium">
                        {exp.company || "Company"}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-600 font-medium">
                        {exp.duration}
                      </span>
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 leading-relaxed text-justify">
                      {exp.description}
                    </p>
                  )}
                  {index < data.experience.length - 1 && (
                    <Separator className="mt-4" />
                  )}
                </div>
              )
          )}
        </div>
      </div>
    )}

    {/* Education */}
    {data.education.some((edu) => edu.school || edu.degree) && (
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
          Education
        </h2>
        <div className="space-y-3">
          {data.education.map(
            (edu) =>
              (edu.school || edu.degree) && (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {edu.degree || "Degree"}
                    </h3>
                    <p className="text-gray-700">{edu.school || "School"}</p>
                  </div>
                  <span className="text-gray-600 font-medium">{edu.year}</span>
                </div>
              )
          )}
        </div>
      </div>
    )}

    {/* Skills */}
    {data.skills.some((skill) => skill.trim()) && (
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
          Core Competencies
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {data.skills
            .filter((skill) => skill.trim())
            .map((skill, index) => (
              <div key={index} className="text-gray-700 text-sm">
                • {skill}
              </div>
            ))}
        </div>
      </div>
    )}
  </div>
);

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, template }) => {
  const renderTemplate = () => {
    switch (template) {
      case "creative":
        return <CreativeTemplate data={data} />;
      case "executive":
        return <ExecutiveTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Resume Preview
          <Badge variant="secondary" className="capitalize">
            {template} Template
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[800px] overflow-y-auto">{renderTemplate()}</div>
      </CardContent>
    </Card>
  );
};

export default ResumePreview;
