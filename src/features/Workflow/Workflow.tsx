import { Tabs, TabsProps } from "antd";

import { Ticket as TicketType } from "@/types";
import { LOCAL_STORAGE_TICKETS } from "@/app-constants";
import { useLocalStorage } from "@/hooks";
import { getLocalStorage } from "@/features/Workflow/utils";

import { Ticket } from "./Ticket";
import { EditTicketData } from "./components";
import { Dashboard } from "./Dashboard";

const localStorageTikes = getLocalStorage(LOCAL_STORAGE_TICKETS) as
  | TicketType[]
  | undefined;

export const Workflow = () => {
  const [tickets, setTickets] = useLocalStorage(
    LOCAL_STORAGE_TICKETS,
    localStorageTikes ?? []
  );

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

  const updateWorkflowTicket = (workflow: number, ticketId: string) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, workflow } : ticket
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
          onUpdateWorkflowTicket={updateWorkflowTicket}
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
