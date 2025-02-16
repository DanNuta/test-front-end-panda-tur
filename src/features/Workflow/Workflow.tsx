import { Tabs, TabsProps } from "antd";
import { useState } from "react";

import { Ticket as TicketType } from "@/types";

import { Ticket } from "./Ticket";
import { EditTicketData } from "./components";
import { Dashboard } from "./Dashboard";

export const Workflow = () => {
  const [tickets, setTickets] = useState<TicketType[]>([]);

  const addTicket = (ticket: Omit<TicketType, "id">) => {
    setTickets((prev) => [...prev, { id: crypto.randomUUID(), ...ticket }]);
  };

  const deleteTicket = (id: string) => {
    setTickets((prev) => prev.filter(({ id: stateId }) => stateId !== id));
  };

  const updateTicket = (values: EditTicketData, idTicket: string) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === idTicket ? { ...ticket, ...values } : ticket
      )
    );
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Tickets",
      children: (
        <Ticket
          tickets={tickets}
          onDelete={deleteTicket}
          onUpdate={updateTicket}
          onAdd={addTicket}
        />
      ),
    },
    {
      key: "2",
      label: "Dashboard",
      children: (
        <Dashboard
          onDelete={deleteTicket}
          onUpdate={updateTicket}
          tickets={tickets}
        />
      ),
    },
  ];

  return (
    <div className="px-64 py-90">
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};
