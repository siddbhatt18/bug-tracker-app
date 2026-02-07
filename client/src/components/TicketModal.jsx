import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast'; // Import Toast
import { X, Trash2, Edit2, Save } from 'lucide-react';

const TicketModal = ({ ticket, onClose, onUpdate, onDelete }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  
  // Edit Mode State
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: ticket.title,
    description: ticket.description,
    priority: ticket.priority,
    status: ticket.status
  });

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/comments/${ticket._id}`);
        setComments(res.data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load comments');
      }
    };
    fetchComments();
  }, [ticket._id]);

  // Handle Save (Update Ticket)
  const handleSave = async () => {
    try {
      const res = await axios.put(`/api/tickets/${ticket._id}`, editData);
      onUpdate(res.data);
      setIsEditing(false);
      toast.success('Ticket updated successfully!'); // Success Toast
    } catch (err) {
      console.error(err);
      toast.error('Failed to update ticket'); // Error Toast
    }
  };

  // Handle Delete
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      try {
        await axios.delete(`/api/tickets/${ticket._id}`);
        onDelete(ticket._id);
        toast.success('Ticket deleted'); // Success Toast
      } catch (err) {
        console.error(err);
        toast.error('Failed to delete ticket'); // Error Toast
      }
    }
  };

  // Handle Comment Submit
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const res = await axios.post(`/api/comments/${ticket._id}`, { content: newComment });
      setComments([res.data, ...comments]);
      setNewComment('');
      toast.success('Comment added');
    } catch (err) { 
      console.error(err);
      toast.error('Failed to add comment');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative shadow-xl">
        
        {/* Header Actions */}
        <div className="flex justify-end gap-2 mb-4">
          {!isEditing ? (
            <>
              <button onClick={() => setIsEditing(true)} className="text-gray-500 hover:text-blue-600 p-1 transition">
                <Edit2 size={20} />
              </button>
              <button onClick={handleDelete} className="text-gray-500 hover:text-red-600 p-1 transition">
                <Trash2 size={20} />
              </button>
            </>
          ) : (
            <button onClick={handleSave} className="text-green-600 hover:text-green-800 p-1 flex items-center gap-1 font-semibold transition">
              <Save size={20} /> Save
            </button>
          )}
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 p-1 ml-2 border-l pl-3 transition">
            <X size={24} />
          </button>
        </div>

        {/* Edit Mode vs View Mode */}
        {isEditing ? (
          <div className="space-y-4 mb-6">
            <input 
              className="w-full border p-2 rounded text-2xl font-bold focus:ring-2 focus:ring-blue-500 outline-none"
              value={editData.title}
              onChange={e => setEditData({...editData, title: e.target.value})}
            />
            <div className="flex gap-4">
              <select 
                className="border p-2 rounded w-1/3 focus:ring-2 focus:ring-blue-500 outline-none"
                value={editData.status}
                onChange={e => setEditData({...editData, status: e.target.value})}
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>
              <select 
                className="border p-2 rounded w-1/3 focus:ring-2 focus:ring-blue-500 outline-none"
                value={editData.priority}
                onChange={e => setEditData({...editData, priority: e.target.value})}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <textarea 
              className="w-full border p-2 rounded h-32 focus:ring-2 focus:ring-blue-500 outline-none"
              value={editData.description}
              onChange={e => setEditData({...editData, description: e.target.value})}
            />
          </div>
        ) : (
          <>
            {/* View Mode */}
            <h2 className="text-2xl font-bold mb-2 break-words">{ticket.title}</h2>
            <div className="flex gap-4 text-sm text-gray-500 mb-6">
              <span className={`px-2 py-1 rounded ${
                ticket.status === 'Done' ? 'bg-green-100 text-green-800' : 
                ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
              }`}>{ticket.status}</span>
              <span className={`px-2 py-1 rounded ${
                ticket.priority === 'High' ? 'bg-red-100 text-red-800' : 
                ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
              }`}>{ticket.priority}</span>
              <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-700 mb-8 p-4 bg-gray-50 rounded border whitespace-pre-wrap break-words">
              {ticket.description}
            </p>
          </>
        )}

        {/* Comments Section */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-bold mb-4">Comments</h3>
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <textarea
              className="w-full border p-3 rounded mb-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
              rows="2" placeholder="Add a comment..."
              value={newComment} onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition">
              Post
            </button>
          </form>
          <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            {comments.map((comment) => (
              <div key={comment._id} className="flex gap-3 animate-fade-in">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-gray-600 text-sm">
                  {comment.user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <span className="font-bold text-sm block mb-1">{comment.user.name}</span>
                    <p className="text-sm text-gray-800 break-words">{comment.content}</p>
                  </div>
                  <span className="text-xs text-gray-400 ml-1">{new Date(comment.createdAt).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TicketModal;