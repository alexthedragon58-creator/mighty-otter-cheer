import React, { useState } from 'react';
import { useLms } from '../../context/LmsContext';
import { 
  MessageSquare, 
  ThumbsUp, 
  Sparkles, 
  Send, 
  Tag, 
  Filter, 
  CheckCircle,
  Plus
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';

export const CommunityForumTab: React.FC = () => {
  const { forumPosts, upvotePost, addPostReply, createForumPost, courses } = useLms();
  const [showNewThreadModal, setShowNewThreadModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // New Thread form
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCourse, setNewCourse] = useState(courses[0]?.title || 'General');
  const [newTags, setNewTags] = useState('Next.js 15, React');

  // Reply Input state map
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});
  const [expandedPostId, setExpandedPostId] = useState<string | null>(forumPosts[0]?.id || null);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    createForumPost({
      courseTitle: newCourse,
      title: newTitle,
      content: newContent,
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean)
    });

    setNewTitle('');
    setNewContent('');
    setShowNewThreadModal(false);
  };

  const handleSendReply = (postId: string) => {
    const text = replyInputs[postId];
    if (!text || !text.trim()) return;
    addPostReply(postId, text);
    setReplyInputs(prev => ({ ...prev, [postId]: '' }));
  };

  const allTags = Array.from(new Set(forumPosts.flatMap(p => p.tags)));
  const filteredPosts = selectedTag ? forumPosts.filter(p => p.tags.includes(selectedTag)) : forumPosts;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Forum Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200 text-xs font-bold">
              Peer & Mentor Community
            </Badge>
            <span className="text-xs text-slate-500">Ask questions, share code snippets & collaborate</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">Learner Discussion Hub</h1>
        </div>

        <Button
          onClick={() => setShowNewThreadModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold gap-1.5 shadow-sm h-10 px-4"
        >
          <Plus className="h-4 w-4" />
          <span>Start New Thread</span>
        </Button>
      </div>

      {/* Filter Tags */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
        <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1">
          <Filter className="h-3.5 w-3.5" /> Topics:
        </span>
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors shrink-0 ${
            selectedTag === null ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          All Topics
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors shrink-0 ${
              selectedTag === tag ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map(post => {
          const isExpanded = expandedPostId === post.id;

          return (
            <div key={post.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={post.author.avatar} alt={post.author.name} className="h-9 w-9 rounded-full object-cover ring-2 ring-indigo-100" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-xs">{post.author.name}</span>
                      <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${post.author.role === 'Instructor' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-slate-50 text-slate-600'}`}>
                        {post.author.role}
                      </Badge>
                    </div>
                    <span className="text-[11px] text-slate-400">{post.timeAgo} • in <span className="font-medium text-slate-600">{post.courseTitle}</span></span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => upvotePost(post.id)}
                  className={`rounded-xl text-xs gap-1.5 h-8 px-3 ${post.hasUpvoted ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-bold' : 'text-slate-600'}`}
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>{post.upvotes}</span>
                </Button>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-bold text-slate-900 text-base">{post.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{post.content}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {post.tags.map((tag, idx) => (
                  <span key={idx} className="text-[11px] font-semibold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Replies Toggle */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => setExpandedPostId(isExpanded ? null : post.id)}
                  className="font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>{post.replyCount} {post.replyCount === 1 ? 'Reply' : 'Replies'}</span>
                </button>
              </div>

              {/* Expanded Replies Section */}
              {isExpanded && (
                <div className="pt-3 space-y-3 bg-slate-50/80 -mx-5 -mb-5 p-5 rounded-b-2xl border-t border-slate-100">
                  {post.replies?.map(rep => (
                    <div key={rep.id} className={`p-3 rounded-xl border text-xs space-y-1.5 ${rep.isInstructorAnswer ? 'bg-purple-50/70 border-purple-200' : 'bg-white border-slate-200'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img src={rep.author.avatar} alt={rep.author.name} className="h-6 w-6 rounded-full object-cover" />
                          <span className="font-bold text-slate-900">{rep.author.name}</span>
                          {rep.isInstructorAnswer && (
                            <Badge className="bg-purple-600 text-white text-[10px] font-bold">
                              Instructor Verified
                            </Badge>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400">{rep.timeAgo}</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed pl-8">{rep.content}</p>
                    </div>
                  ))}

                  {/* Add Reply Input */}
                  <div className="flex gap-2 pt-1">
                    <Input
                      placeholder="Write your constructive response..."
                      value={replyInputs[post.id] || ''}
                      onChange={(e) => setReplyInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleSendReply(post.id); }}
                      className="bg-white rounded-xl text-xs"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleSendReply(post.id)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs px-4"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal: New Thread */}
      {showNewThreadModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900">Create Discussion Thread</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowNewThreadModal(false)} className="rounded-full text-xs">
                Cancel
              </Button>
            </div>

            <form onSubmit={handlePostSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Related Course / Category</label>
                <Input
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                  placeholder="e.g. Next.js 15 Masterclass or General"
                  className="rounded-xl text-xs"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Thread Title</label>
                <Input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. What is the difference between RAG chunking and semantic splitters?"
                  className="rounded-xl text-xs"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Details / Question</label>
                <Textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Provide context, snippets, or the exact error message you're running into..."
                  className="rounded-xl text-xs min-h-[100px]"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Tags (comma separated)</label>
                <Input
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="React, Next.js, AI, TypeScript"
                  className="rounded-xl text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowNewThreadModal(false)} className="rounded-xl text-xs">
                  Cancel
                </Button>
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold">
                  Publish Question
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};