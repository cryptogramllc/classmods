
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import HomePage from './components/HomePage';
import SubjectPage from './components/SubjectPage';
import ModulePage from './components/ModulePage';
import LessonPage from './components/LessonPage';
import QuizPage from './components/QuizPage';
import ExamPage from './components/ExamPage';
import PricingPage from './components/PricingPage';
import PaymentPage from './components/PaymentPage';
import GroupsPage from './components/GroupsPage';
import GroupDetailPage from './components/GroupDetailPage';
import './App.css';

function App() {
  return (
    <SubscriptionProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/groups" element={<GroupsPage />} />
            <Route path="/groups/:groupId" element={<GroupDetailPage />} />
            <Route path="/subject/:subjectName" element={<SubjectPage />} />
            <Route path="/subject/:subjectName/module/:moduleId" element={<ModulePage />} />
            <Route path="/subject/:subjectName/module/:moduleId/lesson/:lessonId" element={<LessonPage />} />
            <Route path="/subject/:subjectName/module/:moduleId/quiz/:lessonId" element={<QuizPage />} />
            <Route path="/subject/:subjectName/module/:moduleId/exam" element={<ExamPage />} />
          </Routes>
        </div>
      </Router>
    </SubscriptionProvider>
  );
}

export default App;
