import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import axios from 'axios';

const KanbanBoard = ({ tickets, setTickets, onTicketClick }) => {
  // 1. Group tickets by status AND sort them (Newest First)
  const columns = {
    'To Do': tickets
      .filter(t => t.status === 'To Do')
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      
    'In Progress': tickets
      .filter(t => t.status === 'In Progress')
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),

    'Done': tickets
      .filter(t => t.status === 'Done')
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
  };

  const statusOrder = ['To Do', 'In Progress', 'Done'];

  // 2. Handle the "Drop" event
  const onDragEnd = async (result) => {
    if (!result.destination) return; // Dropped outside a list

    const { draggableId, destination } = result;
    const newStatus = destination.droppableId; // The column we dropped into

    // Optimistic UI Update (Update screen immediately)
    const updatedTickets = tickets.map(ticket => {
      if (ticket._id === draggableId) {
        return { ...ticket, status: newStatus };
      }
      return ticket;
    });
    setTickets(updatedTickets);

    // Backend Update (Send change to server)
    try {
      await axios.put(`/api/tickets/${draggableId}`, {
        status: newStatus
      });
    } catch (err) {
      console.error("Failed to update ticket status", err);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col md:flex-row gap-4 h-full overflow-x-auto pb-4">
        {statusOrder.map((status) => (
          <div key={status} className="flex-1 min-w-[250px] bg-gray-200 rounded-lg p-4">
            {/* Column Header */}
            <h3 className="font-bold text-gray-700 mb-4 flex justify-between items-center">
              {status}
              <span className="bg-gray-300 text-gray-600 text-xs px-2 py-1 rounded-full">
                {columns[status].length}
              </span>
            </h3>

            {/* Droppable Area */}
            <Droppable droppableId={status}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="min-h-[100px]" // Ensure empty columns can catch drops
                >
                  {columns[status].map((ticket, index) => (
                    <Draggable key={ticket._id} draggableId={ticket._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => onTicketClick(ticket)} // Handle Click
                          className="bg-white p-3 mb-3 rounded shadow-sm border-l-4 border-blue-500 hover:shadow-md transition cursor-pointer"
                        >
                          <h4 className="font-semibold text-sm mb-1">{ticket.title}</h4>
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <span className={`px-1.5 py-0.5 rounded ${
                                ticket.priority === 'High' ? 'bg-red-100 text-red-700' :
                                ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                              {ticket.priority}
                            </span>
                            <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;