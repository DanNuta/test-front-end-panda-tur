import { Card, Flex, Modal } from "antd";
import { useState } from "react";

import { WorkflowWrapper } from "@/components";
import { Ticket } from "@/types";

import { DashboardColumn, EditTicketForm } from "../components";
import { workflow } from "../utils";
import { WorkflowTicket } from "../types";

export const Dashboard = ({
  tickets,
  onDelete,
  onUpdate,
}: Omit<WorkflowTicket, "onAdd">) => {
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
      <WorkflowWrapper title="Workflow Dashboard" subTitle="Panoul de lucru">
        <Card>
          <Flex gap={24} justify="space-between">
            <DashboardColumn
              onDelete={onDelete}
              onEdit={(id) => setIdTicket(id)}
              color="secondary"
              tickets={col[0]}
              workflowName={workflow[0]}
            />

            <DashboardColumn
              onDelete={onDelete}
              onEdit={(id) => setIdTicket(id)}
              color="warning"
              tickets={col[1]}
              workflowName={workflow[1]}
            />

            <DashboardColumn
              onDelete={onDelete}
              onEdit={(id) => setIdTicket(id)}
              color="success"
              tickets={col[2]}
              workflowName={workflow[2]}
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
