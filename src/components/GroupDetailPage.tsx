import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Users, 
  MessageCircle, 
  BookOpen, 
  Target, 
  Calendar,
  Plus,
  Send,
  Heart,
  Reply,
  MoreVertical,
  Pin,
  Lock,
  Star,
  Trophy,
  FileText,
  Video,
  Link,
  HelpCircle,
  Clock,
  CheckCircle,
  X,
  Edit,
  Trash2,
  Settings,
  UserPlus,
  Share2
} from 'lucide-react';
import { 
  getGroupById, 
  getGroupMembers, 
  getGroupMessages, 
  getGroupDiscussions,
  getGroupQuizzes,
  getGroupStudySessions,
  getGroupStats
} from '../data/groupData';
import type { GroupMessage, GroupDiscussion, GroupQuiz, GroupStudySession } from '../types/groups';

const GroupDetailPage: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'chat' | 'discussions' | 'quizzes' | 'sessions' | 'members'>('chat');
  const [newMessage, setNewMessage] = useState('');
  const [newDiscussion, setNewDiscussion] = useState({ title: '', content: '' });
  const [showNewDiscussion, setShowNewDiscussion] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [showReplyForm, setShowReplyForm] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const group = getGroupById(groupId || '');
  const members = getGroupMembers(groupId || '');
  const messages = getGroupMessages(groupId || '');
  const discussions = getGroupDiscussions(groupId || '');
  const quizzes = getGroupQuizzes(groupId || '');
  const studySessions = getGroupStudySessions(groupId || '');
  const stats = getGroupStats(groupId || '');

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!group) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Group Not Found</h1>
          <button 
            onClick={() => navigate('/groups')}
            className="text-blue-600 hover:text-blue-800"
          >
            Go back to groups
          </button>
        </div>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleCreateDiscussion = () => {
    if (newDiscussion.title.trim() && newDiscussion.content.trim()) {
      // In a real app, this would create the discussion
      console.log('Creating discussion:', newDiscussion);
      setNewDiscussion({ title: '', content: '' });
      setShowNewDiscussion(false);
    }
  };

  const handleReply = (discussionId: string) => {
    if (replyContent.trim()) {
      // In a real app, this would add the reply
      console.log('Adding reply to discussion:', discussionId, replyContent);
      setReplyContent('');
      setShowReplyForm(null);
    }
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

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/groups')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Groups</span>
              </button>
              <div className="h-8 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-2xl">
                  {group.avatar}
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{group.name}</h1>
                  <p className="text-sm text-gray-600">
                    {getSubjectIcon(group.subject)} {group.subject} • {getGradeName(group.gradeLevel)} • {group.currentMembers}/{group.maxMembers} members
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2">
                <UserPlus className="h-4 w-4" />
                <span>Invite</span>
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Group Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              {/* Group Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About This Group</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {group.description}
                </p>
              </div>

              {/* Group Rules */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Group Rules</h4>
                <ul className="space-y-2">
                  {group.rules.map((rule, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Group Topics */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Learning Topics</h4>
                <div className="flex flex-wrap gap-2">
                  {group.topics.map((topic, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-medium"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Group Stats */}
              {stats && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Group Activity</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Messages</span>
                      <span className="font-medium">{stats.totalMessages}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Discussions</span>
                      <span className="font-medium">{stats.totalDiscussions}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Quizzes</span>
                      <span className="font-medium">{stats.totalQuizzes}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Study Sessions</span>
                      <span className="font-medium">{stats.totalStudySessions}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Top Contributors */}
              {stats && stats.topContributors.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Top Contributors</h4>
                  <div className="space-y-2">
                    {stats.topContributors.slice(0, 3).map((contributor, index) => (
                      <div key={contributor.userId} className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-xs text-white font-bold">
                          {index + 1}
                        </div>
                        <span className="text-sm text-gray-700">{contributor.displayName}</span>
                        <span className="text-xs text-gray-500">({contributor.contributionScore})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Tab Navigation */}
            <div className="bg-white rounded-2xl shadow-lg mb-6">
              <div className="flex border-b border-gray-200">
                {[
                  { key: 'chat', label: 'Chat', icon: MessageCircle, count: messages.length },
                  { key: 'discussions', label: 'Discussions', icon: BookOpen, count: discussions.length },
                  { key: 'quizzes', label: 'Quizzes', icon: HelpCircle, count: quizzes.length },
                  { key: 'sessions', label: 'Study Sessions', icon: Calendar, count: studySessions.length },
                  { key: 'members', label: 'Members', icon: Users, count: members.length }
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors ${
                      activeTab === tab.key
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                    {tab.count > 0 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl shadow-lg">
              {/* Chat Tab */}
              {activeTab === 'chat' && (
                <div className="h-96 flex flex-col">
                  {/* Chat Messages */}
                  <div 
                    ref={chatContainerRef}
                    className="flex-1 overflow-y-auto p-6 space-y-4"
                  >
                    {messages.map((message) => (
                      <div key={message.id} className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                          {message.senderId === 'student-alex' ? 'A' : 
                           message.senderId === 'student-maya' ? 'M' : 'J'}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-gray-900">
                              {message.senderId === 'student-alex' ? 'Alex Chen' :
                               message.senderId === 'student-maya' ? 'Maya Rodriguez' : 'Jake Thompson'}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatTime(message.timestamp)}
                            </span>
                          </div>
                          <div className="bg-gray-100 rounded-lg p-3">
                            <p className="text-gray-800">{message.content}</p>
                          </div>
                          {/* Reactions */}
                          {message.reactions.length > 0 && (
                            <div className="flex items-center space-x-1 mt-2">
                              {message.reactions.map((reaction) => (
                                <span
                                  key={reaction.id}
                                  className="bg-white border border-gray-200 rounded-full px-2 py-1 text-xs"
                                >
                                  {reaction.emoji}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="border-t border-gray-200 p-4">
                    <div className="flex space-x-3">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Discussions Tab */}
              {activeTab === 'discussions' && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Group Discussions</h3>
                    <button
                      onClick={() => setShowNewDiscussion(true)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>New Discussion</span>
                    </button>
                  </div>

                  {/* Discussions List */}
                  <div className="space-y-4">
                    {discussions.map((discussion) => (
                      <div key={discussion.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            {discussion.isPinned && <Pin className="h-4 w-4 text-yellow-500" />}
                            {discussion.isLocked && <Lock className="h-4 w-4 text-red-500" />}
                            <h4 className="text-lg font-medium text-gray-900">{discussion.title}</h4>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{discussion.content}</p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                          <span>Started by Teacher • {new Date(discussion.createdAt).toLocaleDateString()}</span>
                          <div className="flex items-center space-x-4">
                            <span>{discussion.replies.length} replies</span>
                            <span>{discussion.views} views</span>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {discussion.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
                            <Heart className="h-4 w-4" />
                            <span>Like</span>
                          </button>
                          <button 
                            onClick={() => setShowReplyForm(discussion.id)}
                            className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
                          >
                            <Reply className="h-4 w-4" />
                            <span>Reply</span>
                          </button>
                        </div>

                        {/* Reply Form */}
                        {showReplyForm === discussion.id && (
                          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <textarea
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                              placeholder="Write your reply..."
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                              rows={3}
                            />
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleReply(discussion.id)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                              >
                                Post Reply
                              </button>
                              <button
                                onClick={() => setShowReplyForm(null)}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Replies */}
                        {discussion.replies.length > 0 && (
                          <div className="mt-4 space-y-3">
                            {discussion.replies.map((reply) => (
                              <div key={reply.id} className="ml-6 border-l-2 border-gray-200 pl-4">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="text-sm font-medium text-gray-900">
                                    {reply.authorId === 'student-alex' ? 'Alex Chen' : 'Maya Rodriguez'}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {new Date(reply.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-gray-700">{reply.content}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quizzes Tab */}
              {activeTab === 'quizzes' && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Group Quizzes</h3>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Create Quiz</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {quizzes.map((quiz) => (
                      <div key={quiz.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-lg font-medium text-gray-900">{quiz.title}</h4>
                            <p className="text-gray-600">{quiz.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">
                              {quiz.questions.length} questions
                            </div>
                            <div className="text-sm text-gray-500">
                              {quiz.timeLimit} min time limit
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Starts: {new Date(quiz.startDate).toLocaleDateString()}</span>
                            <span>Ends: {new Date(quiz.endDate).toLocaleDateString()}</span>
                          </div>
                          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                            Take Quiz
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Study Sessions Tab */}
              {activeTab === 'sessions' && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Study Sessions</h3>
                    <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Schedule Session</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {studySessions.map((session) => (
                      <div key={session.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-lg font-medium text-gray-900">{session.title}</h4>
                            <p className="text-gray-600">{session.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">
                              {session.currentParticipants}/{session.maxParticipants} participants
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Topic: {session.topic}</span>
                            <span>Date: {new Date(session.startTime).toLocaleDateString()}</span>
                            <span>Time: {new Date(session.startTime).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })} - {new Date(session.endTime).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}</span>
                          </div>
                          <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
                            Join Session
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Members Tab */}
              {activeTab === 'members' && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Group Members</h3>
                    <div className="text-sm text-gray-500">
                      {members.length} of {group.maxMembers} members
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {members.map((member) => (
                      <div key={member.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                            {member.profile.displayName.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900">
                                {member.profile.displayName}
                              </span>
                              {member.role === 'admin' && (
                                <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                                  Admin
                                </span>
                              )}
                              {member.role === 'moderator' && (
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                                  Moderator
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-gray-500">
                              {member.profile.grade} • {member.profile.subjects.join(', ')}
                            </div>
                            <div className="text-xs text-gray-400">
                              Joined {new Date(member.joinedAt).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <div className="text-xs text-gray-500 mt-1">Active</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* New Discussion Modal */}
      {showNewDiscussion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Start New Discussion</h3>
              <button
                onClick={() => setShowNewDiscussion(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discussion Title
                </label>
                <input
                  type="text"
                  value={newDiscussion.title}
                  onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
                  placeholder="Enter discussion title..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  value={newDiscussion.content}
                  onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
                  placeholder="Write your discussion content..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleCreateDiscussion}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Create Discussion
              </button>
              <button
                onClick={() => setShowNewDiscussion(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupDetailPage;
