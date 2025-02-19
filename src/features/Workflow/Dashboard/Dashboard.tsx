import { Flex, Modal } from "antd";
import { useState } from "react";

import { WorkflowWrapper } from "@/components";
import { Ticket } from "@/types";

import { DashboardColumn, EditTicketForm } from "../components";
import { workflow } from "../utils";
import { WorkflowTicket } from "../types";

type Props = {
  onUpdateWorkflowTicket: (workflow: number, id: string) => void;
} & Omit<WorkflowTicket, "onAdd">;

export const Dashboard = ({
  tickets,
  onDelete,
  onUpdate,
  onUpdateWorkflowTicket,
}: Props) => {
  const [idTicket, setIdTicket] = useState<string | null>(null);

  const col = tickets.reduce((accumulator, currentValue) => {
    if (!accumulator[currentValue.workflow]) {
      accumulator[currentValue.workflow] = [];
    }

    accumulator[currentValue.workflow].push(currentValue);

    return accumulator;
  }, {} as Record<number, Ticket[]>);

  return (
    <>
      <WorkflowWrapper
        title="Tablou de bord al fluxului de lucru"
        subTitle="Panoul de lucru"
      >
        <Flex gap={24} justify="space-between">
          <DashboardColumn
            color="secondary"
            tickets={col[0]}
            workflowName={workflow[0]}
            onDelete={onDelete}
            onEdit={setIdTicket}
            onDropTicket={(id) => onUpdateWorkflowTicket(0, id)}
          />

          <DashboardColumn
            color="warning"
            tickets={col[1]}
            workflowName={workflow[1]}
            onDelete={onDelete}
            onEdit={setIdTicket}
            onDropTicket={(id) => onUpdateWorkflowTicket(1, id)}
          />

          <DashboardColumn
            color="success"
            tickets={col[2]}
            workflowName={workflow[2]}
            onDelete={onDelete}
            onEdit={setIdTicket}
            onDropTicket={(id) => onUpdateWorkflowTicket(2, id)}
          />
        </Flex>
      </WorkflowWrapper>

      <Modal
        okButtonProps={{
          form: "edit-ticket",
          htmlType: "submit",
        }}
        centered
        destroyOnClose
        open={!!idTicket}
        onCancel={() => setIdTicket(null)}
        title="Modifică tichetul"
      >
        <EditTicketForm
          data={tickets.find(({ id }) => id === idTicket)}
          onEditTicket={(values) => {
            if (idTicket) {
              onUpdate(values, idTicket);
              setIdTicket(null);
            }
          }}
        />
      </Modal>
    </>
  );
};
