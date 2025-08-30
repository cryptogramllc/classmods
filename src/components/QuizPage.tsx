import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Clock, Award, RotateCcw } from 'lucide-react';
import { getSubjectById, getModule } from '../data/sampleData';

const QuizPage: React.FC = () => {
  const { subjectName, moduleId, lessonId } = useParams<{ subjectName: string; moduleId: string; lessonId: string }>();
  const navigate = useNavigate();
  const [selectedGrade, setSelectedGrade] = useState('k');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  
  const subject = getSubjectById(subjectName || '');
  const module = getModule(subjectName || '', selectedGrade, moduleId || '');
  const lesson = module?.lessons.find(l => l.id === lessonId);

  if (!subject || !module || !lesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Quiz Not Found</h1>
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

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !showResults) {
      handleSubmitQuiz();
    }
  }, [timeLeft, showResults]);

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < lesson.quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);

  };

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);

    setTimeLeft(300);
  };

  const handleContinueToModule = () => {
    navigate(`/subject/${subjectName}/module/${moduleId}`);
  };

  const currentQuestionData = lesson.quiz.questions[currentQuestion];

  const progress = ((currentQuestion + 1) / lesson.quiz.questions.length) * 100;
  const score = lesson.quiz.questions.reduce((acc, question, index) => {
    return acc + (selectedAnswers[index] === question.correctAnswer ? 1 : 0);
  }, 0);
  const percentage = Math.round((score / lesson.quiz.questions.length) * 100);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
                  <h1 className="text-2xl font-bold text-gray-900">{lesson.title} Quiz</h1>
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

        {/* Quiz Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Quiz Progress</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Time: {formatTime(timeLeft)}</span>
              </div>
              <span className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {lesson.quiz.questions.length}
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {!showResults ? (
          /* Quiz Questions */
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            {/* Question */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {currentQuestionData.question}
              </h3>
              
              {/* Answer Options */}
              <div className="space-y-4">
                {currentQuestionData.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                      selectedAnswers[currentQuestion] === option
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswers[currentQuestion] === option
                          ? 'border-indigo-600 bg-indigo-600'
                          : 'border-gray-300'
                      }`}>
                        {selectedAnswers[currentQuestion] === option && (
                          <CheckCircle className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <span className="text-lg">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestion === 0}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 ${
                  currentQuestion === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-600 text-white hover:bg-gray-700'
                }`}
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center space-x-4">
                {currentQuestion === lesson.quiz.questions.length - 1 ? (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={selectedAnswers.length < lesson.quiz.questions.length}
                    className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                      selectedAnswers.length < lesson.quiz.questions.length
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700 transform hover:scale-105'
                    }`}
                  >
                    Submit Quiz
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    disabled={!selectedAnswers[currentQuestion]}
                    className={`px-6 py-3 rounded-lg transition-all duration-200 ${
                      !selectedAnswers[currentQuestion]
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    <span>Next</span>
                    <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                  </button>
                )}
              </div>
            </div>

            {/* Question Indicators */}
            <div className="flex items-center justify-center space-x-2 mt-8">
              {lesson.quiz.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-200 ${
                    index === currentQuestion
                      ? 'bg-indigo-600 scale-125'
                      : selectedAnswers[index]
                      ? 'bg-green-500'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Quiz Results */
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
                percentage >= 80 ? 'bg-green-100' : 'bg-yellow-100'
              }`}>
                {percentage >= 80 ? (
                  <Award className="h-12 w-12 text-green-600" />
                ) : (
                  <XCircle className="h-12 w-12 text-yellow-600" />
                )}
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {percentage >= 80 ? 'Great Job!' : 'Good Effort!'}
              </h3>
              
              <p className="text-xl text-gray-600 mb-8">
                You scored {score} out of {lesson.quiz.questions.length} ({percentage}%)
              </p>

              {/* Score Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Correct Answers</h4>
                  <p className="text-3xl font-bold text-green-600">{score}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Incorrect Answers</h4>
                  <p className="text-3xl font-bold text-red-600">{lesson.quiz.questions.length - score}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={handleRetakeQuiz}
                  className="px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors flex items-center space-x-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Retake Quiz</span>
                </button>
                
                <button
                  onClick={handleContinueToModule}
                  className="px-8 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-semibold"
                >
                  Continue to Module
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Instructions */}
        {!showResults && (
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Quiz Instructions</h3>
            <ul className="text-blue-800 space-y-1">
              <li>• Read each question carefully before answering</li>
              <li>• You can navigate between questions using Previous/Next buttons</li>
              <li>• You must answer all questions to submit the quiz</li>
              <li>• The quiz has a time limit of {lesson.quiz.timeLimit} minutes</li>
              <li>• You need 80% or higher to pass</li>
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default QuizPage;

