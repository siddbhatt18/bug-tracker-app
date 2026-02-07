import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import KanbanBoard from '../components/KanbanBoard';
import TicketModal from '../components/TicketModal';
import { Search, Filter } from 'lucide-react';

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', priority: 'Medium', status: 'To Do' });
  
  // Filter States
  const [search, setSearch] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');

  // Fetch Project & Tickets
  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectRes = await axios.get(`/api/projects/${id}`);
        setProject(projectRes.data);

        const ticketRes = await axios.get(`/api/tickets/project/${id}`, {
          params: {
            priority: filterPriority,
            search: search
          }
        });
        setTickets(ticketRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [id, filterPriority, search]);

  // Create Ticket
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/tickets', { ...formData, projectId: id });
      setTickets([res.data, ...tickets]); 
      setFormData({ title: '', description: '', priority: 'Medium', status: 'To Do' });
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Ticket Update (from Modal)
  const handleTicketUpdate = (updatedTicket) => {
    const updatedList = tickets.map(t => 
      t._id === updatedTicket._id ? updatedTicket : t
    );
    setTickets(updatedList);
    setSelectedTicket(updatedTicket); // Keep modal open with new data
  };

  // Handle Ticket Delete (from Modal)
  const handleTicketDelete = (ticketId) => {
    const updatedList = tickets.filter(t => t._id !== ticketId);
    setTickets(updatedList);
    setSelectedTicket(null); // Close modal
  };

  if (!project) return <div className="p-8">Loading...</div>;

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col">
      
      {/* Header & Filters */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{project.name}</h1>
          <p className="text-gray-600 text-sm">{project.description}</p>
        </div>

        {/* Filter Bar */}
        <div className="flex gap-2 bg-white p-2 rounded shadow-sm border">
          <div className="flex items-center gap-2 px-2 border-r">
            <Search size={18} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search tickets..." 
              className="outline-none text-sm w-32 md:w-48"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 px-2">
            <Filter size={18} className="text-gray-400" />
            <select 
              className="outline-none text-sm bg-transparent cursor-pointer"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 h-full overflow-hidden">
        
        {/* Left: Create Ticket Form */}
        <div className="md:w-1/4 bg-white p-4 rounded shadow h-fit overflow-y-auto">
          <h2 className="text-lg font-bold mb-4">New Ticket</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input 
              type="text" placeholder="Title" className="w-full border p-2 rounded text-sm" required
              value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} 
            />
            <textarea 
              placeholder="Description" className="w-full border p-2 rounded text-sm" rows="2" required
              value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} 
            ></textarea>
            <div className="flex gap-2">
              <select className="w-full border p-2 rounded text-sm" 
                value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
                Add
              </button>
            </div>
          </form>
        </div>

        {/* Right: Kanban Board */}
        <div className="md:w-3/4 h-full overflow-hidden">
           <KanbanBoard 
             tickets={tickets} 
             setTickets={setTickets} 
             onTicketClick={setSelectedTicket} 
           />
        </div>

      </div>

      {/* Render Modal if ticket is selected */}
      {selectedTicket && (
        <TicketModal 
          ticket={selectedTicket} 
          onClose={() => setSelectedTicket(null)}
          onUpdate={handleTicketUpdate}
          onDelete={handleTicketDelete}
        />
      )}
      
    </div>
  );
};

export default Project;