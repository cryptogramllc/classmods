import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, PlayCircle, Pause, Volume2 } from 'lucide-react';
import { getSubjectById, getModule } from '../data/sampleData';

const LessonPage: React.FC = () => {
  const { subjectName, moduleId, lessonId } = useParams<{ subjectName: string; moduleId: string; lessonId: string }>();
  const navigate = useNavigate();
  const [selectedGrade, setSelectedGrade] = useState('k');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  
  const subject = getSubjectById(subjectName || '');
  const module = getModule(subjectName || '', selectedGrade, moduleId || '');
  const lesson = module?.lessons.find(l => l.id === lessonId);

  if (!subject || !module || !lesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Lesson Not Found</h1>
          <button 
            onClick={() => navigate(`/subject/${subjectName}/module/${moduleId}`)}
            className="text-indigo-600 hover:text-indigo-800"
          >
            Go back to module
          </button>
        </div>
      </div>
    );
  }

  const gradeOptions = [
    { id: 'k', name: 'Kindergarten' },
    { id: '1', name: '1st Grade' },
    { id: '2', name: '2nd Grade' },
    { id: '3', name: '3rd Grade' },
    { id: '4', name: '4th Grade' },
    { id: '5', name: '5th Grade' }
  ];

  const handleNextSlide = () => {
    if (currentSlide < lesson.content.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // Lesson completed
      setLessonCompleted(true);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleCompleteLesson = () => {
    // In a real app, this would update the lesson completion status
    setLessonCompleted(true);
  };

  const handleTakeQuiz = () => {
    navigate(`/subject/${subjectName}/module/${moduleId}/quiz/${lessonId}`);
  };

  const progress = ((currentSlide + 1) / lesson.content.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(`/subject/${subjectName}/module/${moduleId}`)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Module</span>
              </button>
              <div className="h-8 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-2xl"
                  style={{ backgroundColor: subject.color }}
                >
                  {subject.icon}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
                  <p className="text-sm text-gray-600">{subject.name} • {module.title}</p>
                </div>
              </div>
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

        {/* Lesson Progress */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Lesson Progress</h2>
            <span className="text-sm text-gray-600">
              Slide {currentSlide + 1} of {lesson.content.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {/* Slide Navigation */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={handlePrevSlide}
              disabled={currentSlide === 0}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                currentSlide === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <PlayCircle className="h-4 w-4" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors">
                <Volume2 className="h-4 w-4" />
                <span>Audio</span>
              </button>
            </div>

            <button
              onClick={handleNextSlide}
              disabled={currentSlide === lesson.content.length - 1}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                currentSlide === lesson.content.length - 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              <span>Next</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Current Slide Content */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-12 mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                {lesson.title}
              </h3>
              <div className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                {lesson.content[currentSlide]}
              </div>
            </div>

            {/* Interactive Elements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Example: Interactive counting for math */}
              {subject.id === 'math' && currentSlide === 0 && (
                <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Let's Practice Counting!</h4>
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <div
                        key={num}
                        className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold text-white cursor-pointer hover:bg-yellow-500 transition-colors"
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">Click on the numbers to practice counting!</p>
                </div>
              )}

              {/* Example: Interactive senses for science */}
              {subject.id === 'science' && currentSlide === 0 && (
                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Explore Your Senses!</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="p-4 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors">
                      👁️ Sight
                    </button>
                    <button className="p-4 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors">
                      👂 Hearing
                    </button>
                    <button className="p-4 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors">
                      👃 Smell
                    </button>
                    <button className="p-4 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors">
                      👅 Taste
                    </button>
                  </div>
                </div>
              )}

              {/* Example: Interactive letters for reading */}
              {subject.id === 'reading' && currentSlide === 0 && (
                <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Practice the Letter A!</h4>
                  <div className="text-6xl font-bold text-orange-600 mb-4">A</div>
                  <div className="space-y-2">
                    <button className="w-full p-3 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors">
                      A is for Apple 🍎
                    </button>
                    <button className="w-full p-3 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors">
                      A is for Ant 🐜
                    </button>
                    <button className="w-full p-3 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors">
                      A is for Airplane ✈️
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex items-center justify-center space-x-2">
            {lesson.content.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide
                    ? 'bg-indigo-600 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Lesson Actions */}
        {lessonCompleted ? (
          <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl p-8 text-center text-white">
            <CheckCircle className="h-16 w-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Lesson Complete!</h3>
            <p className="text-lg mb-6">
              Great job! You've completed "{lesson.title}". Now let's test your knowledge with a quiz.
            </p>
            <button
              onClick={handleTakeQuiz}
              className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors transform hover:scale-105"
            >
              Take Quiz
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Ready to Continue?</h3>
            <p className="text-gray-600 mb-6">
              Complete all slides to finish this lesson and unlock the quiz.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={handleCompleteLesson}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Mark as Complete</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default LessonPage;

