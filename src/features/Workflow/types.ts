import { Ticket } from "@/types";
import { EditTicketData } from "./components";

export type WorkflowTicket = {
  tickets: Ticket[];
  onDelete: (id: string) => void;
  onUpdate: (values: EditTicketData, id: string) => void;
  onAdd: (values: Omit<Ticket, "id">) => void;
};
