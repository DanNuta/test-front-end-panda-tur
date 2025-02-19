import { Card, Divider, Flex, Modal } from "antd";
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
        title="Dashboard pentru gestionarea tichetelor"
        subTitle="Gestionarea biletelor de lucru"
      >
        <Divider />
        <Card>
          <Flex gap={24} justify="space-between">
            <DashboardColumn
              color={workflow[0].color}
              tickets={col[0]}
              workflowName={`Tichete ${workflow[0].text}`}
              onDelete={onDelete}
              onEdit={setIdTicket}
              onDropTicket={(id) => onUpdateWorkflowTicket(0, id)}
            />

            <DashboardColumn
              color={workflow[1].color}
              tickets={col[1]}
              workflowName={`Tichete ${workflow[1].text}`}
              onDelete={onDelete}
              onEdit={setIdTicket}
              onDropTicket={(id) => onUpdateWorkflowTicket(1, id)}
            />

            <DashboardColumn
              color={workflow[2].color}
              tickets={col[2]}
              workflowName={`Tichete ${workflow[2].text}`}
              onDelete={onDelete}
              onEdit={setIdTicket}
              onDropTicket={(id) => onUpdateWorkflowTicket(2, id)}
            />
          </Flex>

          {!tickets.length && (
            <Flex justify="center">Nu există niciun tichet disponibil</Flex>
          )}
        </Card>
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
