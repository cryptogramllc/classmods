import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { subjects } from '../data/sampleData';
import { BookOpen, GraduationCap, Trophy, Sparkles, Target, Users, Star } from 'lucide-react';
import SubscriptionStatus from './SubscriptionStatus';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedGrade, setSelectedGrade] = useState('k');

  const handleSubjectClick = (subjectId: string) => {
    navigate(`/subject/${subjectId}`);
  };

  const gradeOptions = [
    { id: 'k', name: 'Kindergarten', color: 'from-pink-400 to-rose-500' },
    { id: '1', name: '1st Grade', color: 'from-blue-400 to-cyan-500' },
    { id: '2', name: '2nd Grade', color: 'from-green-400 to-emerald-500' },
    { id: '3', name: '3rd Grade', color: 'from-purple-400 to-violet-500' },
    { id: '4', name: '4th Grade', color: 'from-orange-400 to-red-500' },
    { id: '5', name: '5th Grade', color: 'from-indigo-400 to-blue-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-200/20 to-rose-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-900">ClassMods</h1>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">Progress Tracker</span>
              </div>
              <button
                onClick={() => navigate('/groups')}
                className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <Users className="h-5 w-5" />
                <span className="text-sm font-medium">Learning Groups</span>
              </button>
              <SubscriptionStatus />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Grade Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Your Grade Level</h2>
          <div className="flex flex-wrap gap-3">
            {gradeOptions.map((grade) => (
              <button
                key={grade.id}
                onClick={() => setSelectedGrade(grade.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedGrade === grade.id
                    ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-indigo-50 hover:shadow-md'
                }`}
              >
                {grade.name}
              </button>
            ))}
          </div>
        </div>

        {/* Welcome Message */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Your Learning Journey!
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose a subject below to start learning. Each subject has interactive lessons, 
            quizzes, and comprehensive exams to help you master the material.
          </p>
        </div>

        {/* Subject Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              onClick={() => handleSubjectClick(subject.id)}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div
                className="relative overflow-hidden rounded-2xl shadow-xl h-80 flex flex-col items-center justify-center text-center p-8"
                style={{ backgroundColor: subject.color }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-20 h-20 rounded-full bg-white"></div>
                  <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-white"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-white"></div>
                </div>

                {/* Subject Icon */}
                <div className="text-8xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {subject.icon}
                </div>

                {/* Subject Name */}
                <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-2xl transition-all duration-300">
                  {subject.name}
                </h3>

                {/* Subject Description */}
                <p className="text-white/90 text-lg leading-relaxed group-hover:text-white transition-all duration-300">
                  {subject.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/90 rounded-full p-4">
                    <BookOpen className="h-8 w-8 text-gray-800" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">1</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Choose a Subject</h4>
              <p className="text-gray-600">Select from Math, Science, Reading, and more</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">2</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Complete Lessons</h4>
              <p className="text-gray-600">Work through interactive lessons and take quizzes</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">3</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Take Final Exam</h4>
              <p className="text-gray-600">Complete the comprehensive exam to graduate from the module</p>
            </div>
          </div>
        </div>

        {/* Learning Groups CTA */}
        <div className="mt-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="h-10 w-10" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Learn Together with Friends!</h3>
          <p className="text-lg mb-6 opacity-90">
            Join learning groups, participate in discussions, take group quizzes, and study together 
            with students who share your interests and grade level.
          </p>
          <button
            onClick={() => navigate('/groups')}
            className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Explore Learning Groups
          </button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;

