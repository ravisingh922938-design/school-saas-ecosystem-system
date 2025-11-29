import React, { useState } from 'react';
import { MessageSquare, Paperclip, Send } from 'lucide-react';

const SupportTickets = () => {
  const initialTickets = [
    {
      id: 101,
      title: "Login Issue",
      tenant: "Beta Coaching",
      status: "Open",
      description: "User is unable to log in to their account. They have tried resetting their password but it did not work. Please investigate.",
      conversation: [
        { id: 1, sender: "User", message: "I can't log in.", timestamp: "2023-10-25 10:00 AM" },
        { id: 2, sender: "Admin", message: "Please provide your username or email.", timestamp: "2023-10-25 10:05 AM" },
        { id: 3, sender: "User", message: "My email is user@betacoaching.com", timestamp: "2023-10-25 10:10 AM" },
      ],
    },
    {
      id: 102,
      title: "Payment Receipt not received",
      tenant: "DPS School",
      status: "In Progress",
      description: "A payment was made on Oct 20th but the receipt has not been sent to the registered email.",
      conversation: [
        { id: 1, sender: "User", message: "Missing payment receipt.", timestamp: "2023-10-26 09:00 AM" },
        { id: 2, sender: "Admin", message: "Checking payment records now.", timestamp: "2023-10-26 09:10 AM" },
      ],
    },
    {
      id: 103,
      title: "Add new Admin request",
      tenant: "Alpha School",
      status: "Resolved",
      description: "Request to add a new administrator account for the school portal.",
      conversation: [
        { id: 1, sender: "User", message: "Need to add a new admin user.", timestamp: "2023-10-24 02:00 PM" },
        { id: 2, sender: "Admin", message: "Admin account has been created successfully.", timestamp: "2023-10-24 03:00 PM" },
      ],
    },
  ];

  const [tickets, setTickets] = useState(initialTickets);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [newStatus, setNewStatus] = useState('');

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300';
      case 'Resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-gray-100';
    }
  };

  const openTicketModal = (ticket) => {
    setSelectedTicket(ticket);
    setNewStatus(ticket.status);
    setIsModalOpen(true);
  };

  const closeTicketModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
    setReplyMessage('');
    setNewStatus('');
  };

  const handleReply = () => {
    if (replyMessage.trim() && selectedTicket) {
      const newConversation = [
        ...selectedTicket.conversation,
        { id: selectedTicket.conversation.length + 1, sender: "Admin", message: replyMessage, timestamp: new Date().toLocaleString() },
      ];
      setSelectedTicket({ ...selectedTicket, conversation: newConversation });
      setReplyMessage('');
      alert('Reply sent!');
    }
  };

  const handleStatusChange = () => {
    if (selectedTicket && newStatus !== selectedTicket.status) {
      const updatedTickets = tickets.map((ticket) =>
        ticket.id === selectedTicket.id ? { ...ticket, status: newStatus } : ticket
      );
      setTickets(updatedTickets);
      setSelectedTicket({ ...selectedTicket, status: newStatus });
      alert(`Ticket status changed to ${newStatus}`);
    }
  };

  const ticketsByStatus = tickets.reduce((acc, ticket) => {
    (acc[ticket.status] = acc[ticket.status] || []).push(ticket);
    return acc;
  }, {});

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 dark:text-gray-100">Support Tickets</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Open Tickets */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100 dark:bg-slate-800 dark:border-slate-700 dark:shadow-md">
          <h2 className="text-xl font-semibold text-red-700 mb-4 dark:text-red-400">Open</h2>
          <div className="space-y-4">
            {(ticketsByStatus.Open || []).map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white p-4 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition dark:bg-slate-700 dark:text-gray-100 dark:shadow-sm dark:hover:shadow-lg"
                onClick={() => openTicketModal(ticket)}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-gray-800 dark:text-gray-100">Ticket #{ticket.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </div>
                <p className="text-gray-700 text-sm mb-1 dark:text-gray-100">{ticket.title}</p>
                <p className="text-gray-500 text-xs dark:text-gray-300">Tenant: {ticket.tenant}</p>
              </div>
            ))}
          </div>
        </div>

        {/* In Progress Tickets */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100 dark:bg-slate-800 dark:border-slate-700 dark:shadow-md">
          <h2 className="text-xl font-semibold text-yellow-700 mb-4 dark:text-yellow-400">In Progress</h2>
          <div className="space-y-4">
            {(ticketsByStatus['In Progress'] || []).map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white p-4 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition dark:bg-slate-700 dark:text-gray-100 dark:shadow-sm dark:hover:shadow-lg"
                onClick={() => openTicketModal(ticket)}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-gray-800 dark:text-gray-100">Ticket #{ticket.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </div>
                <p className="text-gray-700 text-sm mb-1 dark:text-gray-100">{ticket.title}</p>
                <p className="text-gray-500 text-xs dark:text-gray-300">Tenant: {ticket.tenant}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Resolved Tickets */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100 dark:bg-slate-800 dark:border-slate-700 dark:shadow-md">
          <h2 className="text-xl font-semibold text-green-700 mb-4 dark:text-green-400">Resolved</h2>
          <div className="space-y-4">
            {(ticketsByStatus.Resolved || []).map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white p-4 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition dark:bg-slate-700 dark:text-gray-100 dark:shadow-sm dark:hover:shadow-lg"
                onClick={() => openTicketModal(ticket)}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-gray-800 dark:text-gray-100">Ticket #{ticket.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </div>
                <p className="text-gray-700 text-sm mb-1 dark:text-gray-100">{ticket.title}</p>
                <p className="text-gray-500 text-xs dark:text-gray-300">Tenant: {ticket.tenant}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ticket Modal */}
      {isModalOpen && selectedTicket && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center dark:bg-gray-900 dark:bg-opacity-80">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full relative dark:bg-slate-800 dark:shadow-2xl dark:border dark:border-slate-700">
            <button
              onClick={closeTicketModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl dark:text-gray-300 dark:hover:text-gray-100"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">Ticket #{selectedTicket.id}: {selectedTicket.title}</h2>
            <p className="text-gray-600 text-sm mb-4 dark:text-gray-300">Tenant: {selectedTicket.tenant} | Status: <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(selectedTicket.status)}`}>{selectedTicket.status}</span></p>

            <div className="mb-6 max-h-60 overflow-y-auto border p-3 rounded-md bg-gray-50 dark:bg-slate-700 dark:border-slate-600">
              <h3 className="font-semibold mb-2 dark:text-gray-100">Conversation Thread</h3>
              {selectedTicket.conversation.map((msg) => (
                <div key={msg.id} className="mb-2 p-2 bg-white rounded-md shadow-sm text-sm dark:bg-slate-600 dark:text-gray-100">
                  <p className="font-medium dark:text-gray-100">{msg.sender}:</p>
                  <p className="dark:text-gray-100">{msg.message}</p>
                  <p className="text-xs text-gray-500 text-right dark:text-gray-300">{msg.timestamp}</p>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <label htmlFor="reply" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Reply</label>
              <textarea
                id="reply"
                rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:border-slate-600 dark:text-gray-100 dark:placeholder-gray-400"
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Type your reply here..."
              ></textarea>
              <button
                onClick={handleReply}
                className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md flex items-center gap-2 ml-auto dark:bg-indigo-700 dark:hover:bg-indigo-600"
              >
                <Send size={18} /> Send Reply
              </button>
            </div>

            <div>
              <label htmlFor="status-change" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Change Status</label>
              <select
                id="status-change"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-gray-100"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
              <button
                onClick={handleStatusChange}
                className="mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md ml-auto dark:bg-green-700 dark:hover:bg-green-600"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportTickets;
