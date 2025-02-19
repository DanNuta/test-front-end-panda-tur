import { Row, Col, Button, Modal, Flex, Divider } from "antd";
import { useState } from "react";

import { WorkflowWrapper } from "@/components";

import { InfoTicket, CreateTicketForm, EditTicketForm } from "../components";

import { WorkflowTicket } from "../types";

export const Ticket = ({
  tickets,
  onDelete,
  onUpdate,
  onAdd,
}: WorkflowTicket) => {
  const [idTicket, setIdTicket] = useState<string | null>(null);
  const [isOpenAddTicketModal, setIsOpenAddTicketModal] = useState(false);

  return (
    <WorkflowWrapper
      title={`Flux de lucru pentru tichete (${tickets.length})`}
      subTitle="Crearea tichetelor de lucru"
      extra={
        <Button type="primary" onClick={() => setIsOpenAddTicketModal(true)}>
          Adaugă un tichet nou
        </Button>
      }
    >
      <Divider />
      {tickets.length ? (
        <Row gutter={[24, 24]}>
          {tickets.map(
            ({ title, description, id, priority, notes, workflow }) => (
              <Col key={id} span={4}>
                <InfoTicket
                  hoverable
                  onDeleteTicket={() => onDelete(id)}
                  onEditTicket={() => setIdTicket(id)}
                  description={description}
                  notes={notes}
                  priority={priority}
                  title={title}
                  workflow={workflow}
                />
              </Col>
            )
          )}
        </Row>
      ) : (
        <Flex justify="center">Nu există niciun tichet disponibil</Flex>
      )}

      <Modal
        okButtonProps={{
          form: "add-ticket",
          htmlType: "submit",
        }}
        centered
        destroyOnClose
        open={isOpenAddTicketModal}
        onCancel={() => setIsOpenAddTicketModal(false)}
        title="Adaugă un tichet nou"
      >
        <CreateTicketForm
          onAddTicket={(values) => {
            onAdd(values);
            setIsOpenAddTicketModal(false);
          }}
        />
      </Modal>

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
    </WorkflowWrapper>
  );
};
