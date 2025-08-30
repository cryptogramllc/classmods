import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Plus, 
  Users, 
  MessageCircle, 
  BookOpen, 
  Target, 
  Star,
  TrendingUp,
  Calendar,
  Tag
} from 'lucide-react';
import { sampleGroups, getGroupsBySubject, getGroupsByGrade } from '../data/groupData';
import { useSubscription } from '../contexts/SubscriptionContext';

const GroupsPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentPlan, canAccessFeature } = useSubscription();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'recent' | 'name'>('popular');

  const subjects = ['all', 'math', 'science', 'reading', 'writing'];
  const grades = ['all', 'k', '1', '2', '3', '4', '5'];

  // Filter and sort groups
  const filteredGroups = sampleGroups
    .filter(group => {
      const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          group.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesSubject = selectedSubject === 'all' || group.subject === selectedSubject;
      const matchesGrade = selectedGrade === 'all' || group.gradeLevel === selectedGrade;
      
      return matchesSearch && matchesSubject && matchesGrade;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.currentMembers - a.currentMembers;
        case 'recent':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const handleGroupClick = (groupId: string) => {
    navigate(`/groups/${groupId}`);
  };

  const handleCreateGroup = () => {
    if (!canAccessFeature('includesCustomContent')) {
      // Show upgrade prompt
      return;
    }
    navigate('/groups/create');
  };

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'math': return '🔢';
      case 'science': return '🔬';
      case 'reading': return '📚';
      case 'writing': return '✍️';
      default: return '📖';
    }
  };

  const getGradeName = (grade: string) => {
    switch (grade) {
      case 'k': return 'Kindergarten';
      case '1': return '1st Grade';
      case '2': return '2nd Grade';
      case '3': return '3rd Grade';
      case '4': return '4th Grade';
      case '5': return '5th Grade';
      default: return grade;
    }
  };

  const getSubjectName = (subject: string) => {
    switch (subject) {
      case 'math': return 'Mathematics';
      case 'science': return 'Science';
      case 'reading': return 'Reading & Language Arts';
      case 'writing': return 'Creative Writing';
      default: return subject;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <span>← Back to Home</span>
              </button>
              <div className="h-8 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Learning Groups</h1>
                  <p className="text-sm text-gray-600">Connect, collaborate, and learn together</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleCreateGroup}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Create Group</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search groups by name, description, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Subject Filter */}
            <div>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>
                    {subject === 'all' ? 'All Subjects' : getSubjectName(subject)}
                  </option>
                ))}
              </select>
            </div>

            {/* Grade Filter */}
            <div>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {grades.map(grade => (
                  <option key={grade} value={grade}>
                    {grade === 'all' ? 'All Grades' : getGradeName(grade)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort Options */}
          <div className="mt-4 flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <div className="flex space-x-2">
              {[
                { key: 'popular', label: 'Most Popular', icon: TrendingUp },
                { key: 'recent', label: 'Recently Created', icon: Calendar },
                { key: 'name', label: 'Name', icon: Tag }
              ].map(option => (
                <button
                  key={option.key}
                  onClick={() => setSortBy(option.key as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    sortBy === option.key
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <option.icon className="h-4 w-4" />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              onClick={() => handleGroupClick(group.id)}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:scale-105"
            >
              {/* Group Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-2xl">
                      {group.avatar}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {group.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {getSubjectName(group.subject)} • {getGradeName(group.gradeLevel)}
                      </p>
                    </div>
                  </div>
                  {group.isPrivate && (
                    <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                      Private
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {group.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {group.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                  {group.tags.length > 3 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                      +{group.tags.length - 3} more
                    </span>
                  )}
                </div>

                {/* Group Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 text-blue-600">
                      <Users className="h-4 w-4" />
                      <span className="text-sm font-semibold">{group.currentMembers}</span>
                    </div>
                    <div className="text-xs text-gray-500">Members</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 text-green-600">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm font-semibold">Active</span>
                    </div>
                    <div className="text-xs text-gray-500">Chat</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 text-purple-600">
                      <BookOpen className="h-4 w-4" />
                      <span className="text-sm font-semibold">Learning</span>
                    </div>
                    <div className="text-xs text-gray-500">Content</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Membership</span>
                    <span>{Math.round((group.currentMembers / group.maxMembers) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(group.currentMembers / group.maxMembers) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Topics */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Topics:</h4>
                  <div className="flex flex-wrap gap-1">
                    {group.topics.slice(0, 3).map((topic, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Join Button */}
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Join Group</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No groups found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or filters to find more groups.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedSubject('all');
                setSelectedGrade('all');
              }}
              className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Create Group CTA */}
        <div className="mt-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Plus className="h-10 w-10" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Can't find the right group?</h3>
          <p className="text-lg mb-6 opacity-90">
            Create your own learning group and invite friends to join! Start discussions, 
            share resources, and learn together.
          </p>
          <button
            onClick={handleCreateGroup}
            className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Create New Group
          </button>
        </div>
      </main>
    </div>
  );
};

export default GroupsPage;

