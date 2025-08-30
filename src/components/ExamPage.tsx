import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Clock, Award, RotateCcw, AlertTriangle, Trophy } from 'lucide-react';
import { getSubjectById, getModule } from '../data/sampleData';

const ExamPage: React.FC = () => {
  const { subjectName, moduleId } = useParams<{ subjectName: string; moduleId: string }>();
  const navigate = useNavigate();
  const [selectedGrade, setSelectedGrade] = useState('k');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [examStarted, setExamStarted] = useState(false);

  
  const subject = getSubjectById(subjectName || '');
  const module = getModule(subjectName || '', selectedGrade, moduleId || '');

  if (!subject || !module) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Module Not Found</h1>
          <button 
            onClick={() => navigate(`/subject/${subjectName}`)}
            className="text-indigo-600 hover:text-indigo-800"
          >
            Go back to subject
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
    if (examStarted && timeLeft > 0 && !showResults) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !showResults) {
      handleSubmitExam();
    }
  }, [timeLeft, showResults, examStarted]);

  const handleStartExam = () => {
    setExamStarted(true);
  };

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < module.exam.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitExam = () => {
    setShowResults(true);

  };

  const handleRetakeExam = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);

    setTimeLeft(900);
    setExamStarted(false);
  };

  const handleContinueToSubject = () => {
    navigate(`/subject/${subjectName}`);
  };

  const currentQuestionData = module.exam.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / module.exam.questions.length) * 100;
  const score = module.exam.questions.reduce((acc, question, index) => {
    return acc + (selectedAnswers[index] === question.correctAnswer ? 1 : 0);
  }, 0);
  const percentage = Math.round((score / module.exam.questions.length) * 100);
  const passed = percentage >= module.exam.passingScore;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!examStarted) {
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
                    <h1 className="text-2xl font-bold text-gray-900">Final Module Exam</h1>
                    <p className="text-sm text-gray-600">{subject.name} • {module.title}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

          {/* Exam Instructions */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="h-12 w-12 text-red-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Final Module Exam</h2>
              <p className="text-xl text-gray-600">
                This is your comprehensive final exam for "{module.title}"
              </p>
            </div>

            {/* Exam Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Time Limit</h3>
                <p className="text-2xl font-bold text-blue-600">{module.exam.timeLimit} minutes</p>
              </div>
              <div className="bg-green-50 rounded-xl p-6 text-center">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Questions</h3>
                <p className="text-2xl font-bold text-green-600">{module.exam.questions.length}</p>
              </div>
              <div className="bg-yellow-50 rounded-xl p-6 text-center">
                <Award className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Passing Score</h3>
                <p className="text-2xl font-bold text-yellow-600">{module.exam.passingScore}%</p>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200 mb-8">
              <h3 className="text-lg font-semibold text-yellow-900 mb-3">Important Notes:</h3>
              <ul className="text-yellow-800 space-y-2">
                <li>• This exam covers all material from the entire module</li>
                <li>• You cannot pause or return to the exam once started</li>
                <li>• You must answer all questions to submit</li>
                <li>• Passing this exam is required to complete the module</li>
                <li>• Make sure you're in a quiet environment with no distractions</li>
              </ul>
            </div>

            {/* Start Button */}
            <div className="text-center">
              <button
                onClick={handleStartExam}
                className="bg-red-600 text-white px-12 py-4 rounded-xl font-semibold text-xl hover:bg-red-700 transition-colors transform hover:scale-105"
              >
                Start Final Exam
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-2xl"
                  style={{ backgroundColor: subject.color }}
                >
                  {subject.icon}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Final Module Exam</h1>
                  <p className="text-sm text-gray-600">{subject.name} • {module.title}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-red-600 font-semibold">
                <Clock className="h-5 w-5" />
                <span className="text-lg">{formatTime(timeLeft)}</span>
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

        {/* Exam Progress */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Exam Progress</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Time: {formatTime(timeLeft)}</span>
              </div>
              <span className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {module.exam.questions.length}
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-red-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {!showResults ? (
          /* Exam Questions */
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
                        ? 'border-red-600 bg-red-50 text-red-900'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswers[currentQuestion] === option
                          ? 'border-red-600 bg-red-600'
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
                {currentQuestion === module.exam.questions.length - 1 ? (
                  <button
                    onClick={handleSubmitExam}
                    disabled={selectedAnswers.length < module.exam.questions.length}
                    className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                      selectedAnswers.length < module.exam.questions.length
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-red-600 text-white hover:bg-red-700 transform hover:scale-105'
                    }`}
                  >
                    Submit Final Exam
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    disabled={!selectedAnswers[currentQuestion]}
                    className={`px-6 py-3 rounded-lg transition-all duration-200 ${
                      !selectedAnswers[currentQuestion]
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-red-600 text-white hover:bg-red-700'
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
              {module.exam.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-200 ${
                    index === currentQuestion
                      ? 'bg-red-600 scale-125'
                      : selectedAnswers[index]
                      ? 'bg-green-500'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Exam Results */
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 ${
                passed ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {passed ? (
                  <Trophy className="h-16 w-16 text-green-600" />
                ) : (
                  <XCircle className="h-16 w-16 text-red-600" />
                )}
              </div>
              
              <h3 className="text-4xl font-bold text-gray-900 mb-4">
                {passed ? 'Congratulations!' : 'Keep Learning!'}
              </h3>
              
              <p className="text-xl text-gray-600 mb-8">
                {passed 
                  ? `You've successfully completed "${module.title}" with a score of ${percentage}%!`
                  : `You scored ${percentage}% but need ${module.exam.passingScore}% to pass. Keep studying!`
                }
              </p>

              {/* Score Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Score</h4>
                  <p className={`text-4xl font-bold ${passed ? 'text-green-600' : 'text-red-600'}`}>
                    {percentage}%
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Correct</h4>
                  <p className="text-4xl font-bold text-green-600">{score}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Incorrect</h4>
                  <p className="text-4xl font-bold text-red-600">{module.exam.questions.length - score}</p>
                </div>
              </div>

              {/* Pass/Fail Status */}
              <div className={`rounded-xl p-6 mb-8 ${
                passed ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <h4 className={`text-xl font-semibold mb-2 ${passed ? 'text-green-900' : 'text-red-900'}`}>
                  {passed ? 'Module Status: PASSED' : 'Module Status: NOT PASSED'}
                </h4>
                <p className={passed ? 'text-green-800' : 'text-red-800'}>
                  {passed 
                    ? `You've successfully graduated from "${module.title}" and can move on to the next module!`
                    : `You need to retake this exam to complete the module. Review the material and try again.`
                  }
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={handleRetakeExam}
                  className="px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors flex items-center space-x-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Retake Exam</span>
                </button>
                
                <button
                  onClick={handleContinueToSubject}
                  className="px-8 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-semibold"
                >
                  Continue to Subject
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ExamPage;

