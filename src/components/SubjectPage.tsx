import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, CheckCircle, Award, Target, Clock, Users, Star } from 'lucide-react';
import { getSubjectById } from '../data/sampleData';

const SubjectPage: React.FC = () => {
  const { subjectName } = useParams<{ subjectName: string }>();
  const navigate = useNavigate();
  const [selectedGrade, setSelectedGrade] = useState('k');
  
  const subject = getSubjectById(subjectName || '');
  const gradeLevel = subject?.gradeLevels.find(grade => grade.id === selectedGrade);

  if (!subject) {
    return (
      <div className="min-h-screen gradient-primary flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Subject Not Found</h1>
            <Link to="/" className="btn-primary inline-flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5" />
              <span>Go back home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const gradeOptions = [
    { id: 'k', name: 'Kindergarten', color: 'from-pink-400 to-rose-500', icon: '🌟' },
    { id: '1', name: '1st Grade', color: 'from-blue-400 to-cyan-500', icon: '📚' },
    { id: '2', name: '2nd Grade', color: 'from-green-400 to-emerald-500', icon: '🎯' },
    { id: '3', name: '3rd Grade', color: 'from-purple-400 to-violet-500', icon: '🚀' },
    { id: '4', name: '4th Grade', color: 'from-orange-400 to-red-500', icon: '⚡' },
    { id: '5', name: '5th Grade', color: 'from-indigo-400 to-blue-500', icon: '🏆' }
  ];

  const handleModuleClick = (moduleId: string) => {
    navigate(`/subject/${subjectName}/module/${moduleId}`);
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'from-green-500 to-emerald-500';
    if (progress >= 70) return 'from-yellow-500 to-orange-500';
    if (progress >= 40) return 'from-orange-500 to-red-500';
    return 'from-gray-400 to-gray-500';
  };

  const totalModules = gradeLevel?.modules.length || 0;
  const completedModules = gradeLevel?.modules.filter(m => m.isCompleted).length || 0;
  const overallProgress = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

  return (
    <div className="min-h-screen gradient-primary">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/90 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="group flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Back to Subjects</span>
              </button>
              <div className="h-8 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-3">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
                  style={{ backgroundColor: subject.color }}
                >
                  {subject.icon}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{subject.name}</h1>
                  <p className="text-sm text-gray-600">{subject.description}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="glass px-4 py-2 rounded-full">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Learning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Grade Selection */}
        <div className="mb-16 animate-slide-up">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center space-x-3">
              <Target className="h-8 w-8 text-indigo-600" />
              <span>Select Your Grade Level</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Choose the grade level that matches your current learning stage</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {gradeOptions.map((grade, index) => (
              <button
                key={grade.id}
                onClick={() => setSelectedGrade(grade.id)}
                className={`group relative px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-500 ease-out transform hover:scale-110 hover:-translate-y-2 ${
                  selectedGrade === grade.id
                    ? `bg-gradient-to-r ${grade.color} text-white shadow-2xl shadow-current/30`
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-xl border border-gray-200/50'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-2xl mr-3">{grade.icon}</span>
                <span className="relative z-10">{grade.name}</span>
                {selectedGrade === grade.id && (
                  <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Subject Overview */}
        <div className="glass rounded-3xl p-8 mb-12 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-10 w-10 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Modules</h3>
              <p className="text-3xl font-bold text-indigo-600">{totalModules}</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Completed</h3>
              <p className="text-3xl font-bold text-green-600">{completedModules}</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Award className="h-10 w-10 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Progress</h3>
              <p className="text-3xl font-bold text-yellow-600">{overallProgress}%</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-100 to-violet-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Star className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Rating</h3>
              <p className="text-3xl font-bold text-purple-600">4.9/5</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
              <span className="font-medium">Overall Progress</span>
              <span className="font-semibold">{overallProgress}%</span>
            </div>
            <div className="progress-bar">
              <div
                className={`progress-fill bg-gradient-to-r ${getProgressColor(overallProgress)}`}
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Available Modules</h3>
            <p className="text-gray-600">Start with any module and progress at your own pace</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gradeLevel?.modules.map((module, index) => (
              <div
                key={module.id}
                className="group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${300 + index * 150}ms` }}
              >
                <div className="card h-full transform transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-2">
                  <div className="p-6">
                    {/* Module Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
                          style={{ backgroundColor: subject.color }}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{module.title}</h3>
                          <p className="text-sm text-gray-500">Module {index + 1}</p>
                        </div>
                      </div>
                      {module.isCompleted && (
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-2 shadow-lg">
                          <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Module Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                      {module.description}
                    </p>

                    {/* Module Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-lg font-bold text-indigo-600">{module.lessons.length}</div>
                        <div className="text-xs text-gray-500">Lessons</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{module.lessons.filter(l => l.isCompleted).length}</div>
                        <div className="text-xs text-gray-500">Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">{module.exam.timeLimit}m</div>
                        <div className="text-xs text-gray-500">Exam Time</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span>Progress</span>
                        <span>{module.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className={`progress-fill bg-gradient-to-r ${getProgressColor(module.progress)}`}
                          style={{ width: `${module.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Module Actions */}
                    <div className="space-y-3">
                      <button
                        onClick={() => handleModuleClick(module.id)}
                        className="w-full btn-primary flex items-center justify-center space-x-2"
                      >
                        <BookOpen className="h-4 w-4" />
                        <span>{module.isCompleted ? 'Review Module' : 'Start Module'}</span>
                      </button>
                      
                      {module.isCompleted && (
                        <div className="text-center">
                          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-1 rounded-full">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-700">Completed!</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Tips */}
        <div className="glass rounded-3xl p-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Learning Tips</h3>
            <p className="text-gray-600">Maximize your learning potential with these strategies</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Study Regularly",
                description: "Dedicate 20-30 minutes daily for consistent progress"
              },
              {
                icon: Users,
                title: "Take Breaks",
                description: "Short breaks help maintain focus and retention"
              },
              {
                icon: Target,
                title: "Practice Daily",
                description: "Regular practice reinforces learning and builds confidence"
              }
            ].map((tip, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <tip.icon className="h-8 w-8 text-indigo-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{tip.title}</h4>
                <p className="text-gray-600">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubjectPage;

