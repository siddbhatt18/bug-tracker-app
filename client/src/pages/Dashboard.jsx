import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Trash2, Edit2 } from 'lucide-react'; // Import icons
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Fetch Projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('/api/projects');
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProjects();
  }, []);

  // Create Project
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/projects', { name, description });
      setProjects([res.data, ...projects]);
      setName('');
      setDescription('');
      toast.success('Project created!');
    } catch (err) {
      toast.error('Failed to create project');
    }
  };

  // Delete Project
  const handleDelete = async (e, projectId) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation(); // Stop event bubbling

    if (window.confirm('Are you sure? This will delete the project and all its tickets.')) {
      try {
        await axios.delete(`/api/projects/${projectId}`);
        setProjects(projects.filter(p => p._id !== projectId));
        toast.success('Project deleted');
      } catch (err) {
        toast.error('Failed to delete project');
      }
    }
  };

  // Edit Project (Rename)
  const handleEdit = async (e, project) => {
    e.preventDefault();
    e.stopPropagation();

    const newName = window.prompt("Enter new project name:", project.name);
    if (!newName || newName === project.name) return;

    try {
      const res = await axios.put(`/api/projects/${project._id}`, {
        name: newName,
        description: project.description
      });
      
      // Update local state
      setProjects(projects.map(p => p._id === project._id ? res.data : p));
      toast.success('Project renamed');
    } catch (err) {
      toast.error('Failed to update project');
    }
  };

  return (
    <div className=""> {/* Removed padding to fix layout issues */}
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {/* Create Project Form */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input 
            type="text" placeholder="Project Name" 
            className="border p-2 rounded flex-1 focus:ring-2 focus:ring-blue-500 outline-none"
            value={name} onChange={(e) => setName(e.target.value)} required 
          />
          <input 
            type="text" placeholder="Description (Optional)" 
            className="border p-2 rounded flex-1 focus:ring-2 focus:ring-blue-500 outline-none"
            value={description} onChange={(e) => setDescription(e.target.value)} 
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Create
          </button>
        </form>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link to={`/project/${project._id}`} key={project._id} className="block group relative">
            <div className="bg-white p-6 rounded shadow hover:shadow-lg transition border border-transparent hover:border-blue-500">
              
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-blue-600 truncate pr-8">{project.name}</h3>
                
                {/* Action Buttons (Visible on Hover) */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity absolute top-4 right-4 bg-white pl-2">
                  <button 
                    onClick={(e) => handleEdit(e, project)}
                    className="p-1 text-gray-400 hover:text-blue-600 rounded"
                    title="Rename"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={(e) => handleDelete(e, project._id)}
                    className="p-1 text-gray-400 hover:text-red-600 rounded"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <p className="text-gray-600 mt-2 text-sm line-clamp-2 min-h-[40px]">
                {project.description || "No description provided."}
              </p>
              <p className="text-xs text-gray-400 mt-4 border-t pt-2">
                Created: {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;