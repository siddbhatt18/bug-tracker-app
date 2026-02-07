const TicketCard = ({ ticket }) => {
  const priorityColors = {
    Low: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    High: "bg-red-100 text-red-800",
  };

  const statusColors = {
    "To Do": "bg-gray-100 text-gray-800",
    "In Progress": "bg-blue-100 text-blue-800",
    "Done": "bg-green-100 text-green-800",
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4 border-l-4 border-blue-500">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-bold">{ticket.title}</h3>
        <span className={`text-xs px-2 py-1 rounded ${priorityColors[ticket.priority]}`}>
          {ticket.priority}
        </span>
      </div>
      <p className="text-gray-600 mt-2 text-sm">{ticket.description}</p>
      
      <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
        <span className={`px-2 py-1 rounded ${statusColors[ticket.status]}`}>
          {ticket.status}
        </span>
        <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default TicketCard;