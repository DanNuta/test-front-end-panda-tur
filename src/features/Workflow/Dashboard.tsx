import { Divider, Modal, Input, Row, Col } from "antd";
import { useEffect, useState } from "react";

import { WorkflowWrapper } from "@/components";
import { Ticket } from "@/types";

import { DashboardColumn, EditTicketForm } from "./components";
import { workflow } from "./utils";
import { WorkflowTicket } from "./types";

const { Search } = Input;

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
  const [ticketsDashboard, setTicketsDashboard] = useState(tickets);

  useEffect(() => {
    setTicketsDashboard(tickets);
  }, [tickets]);

  const cols = ticketsDashboard.reduce((accumulator, currentValue) => {
    if (!accumulator[currentValue.workflow]) {
      accumulator[currentValue.workflow] = [];
    }

    accumulator[currentValue.workflow].push(currentValue);

    return accumulator;
  }, {} as Record<number, Ticket[]>);

  const search = (value: string) => {
    setTicketsDashboard(
      tickets.filter(({ title, description, notes }) =>
        [title, description, notes].some((field) =>
          field?.toLowerCase().includes(value.toLowerCase())
        )
      )
    );
  };

  const confirmDelete = (id: string) => {
    Modal.error({
      title: "Ești sigur că dorești să ștergi acest tichet?",
      okText: "Șterge",
      okCancel: true,
      onOk: () => onDelete(id),
    });
  };

  return (
    <>
      <WorkflowWrapper
        title="Dashboard pentru gestionarea tichetelor"
        subTitle="Gestionarea tichetelor de lucru"
        extra={
          <Search
            allowClear
            onChange={(e) => search(e.target.value.trim())}
            className="mw-300"
            placeholder="Căutare"
          />
        }
      >
        <Divider />
        <Row gutter={[24, 24]}>
          {Object.entries(workflow).map(([key, { color, text }]) => (
            <Col key={key} span={8}>
              <DashboardColumn
                color={color}
                tickets={cols[Number(key)]}
                workflowName={`Tichete ${text}`}
                onDelete={confirmDelete}
                onEdit={setIdTicket}
                onDropTicket={(id) => onUpdateWorkflowTicket(Number(key), id)}
              />
            </Col>
          ))}
        </Row>
      </WorkflowWrapper>

      <Modal
        centered
        destroyOnClose
        okText="Salvează"
        title="Modifică tichetul"
        open={!!idTicket}
        okButtonProps={{
          form: "edit-ticket",
          htmlType: "submit",
        }}
        onCancel={() => setIdTicket(null)}
      >
        <EditTicketForm
          name="edit-ticket"
          data={tickets.find(({ id }) => id === idTicket)}
          onFinish={(values) => {
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
