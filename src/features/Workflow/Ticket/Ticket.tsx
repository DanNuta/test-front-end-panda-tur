import { Row, Col, Button, Modal, Flex, Divider, Typography } from "antd";
import { useState } from "react";

import { WorkflowWrapper } from "@/components";

import { InfoTicket, CreateTicketForm, EditTicketForm } from "../components";
import { WorkflowTicket } from "../types";

const { Title } = Typography;

export const Ticket = ({
  tickets,
  onDelete,
  onUpdate,
  onAdd,
}: WorkflowTicket) => {
  const [idTicket, setIdTicket] = useState<string | null>(null);
  const [isOpenAddTicketModal, setIsOpenAddTicketModal] = useState(false);

  const confirmDelete = (id: string) => {
    Modal.error({
      title: "Ești sigur că dorești să ștergi acest tichet?",
      okText: "Sterge",
      okCancel: true,
      onOk: () => onDelete(id),
    });
  };

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
                  onDeleteTicket={() => confirmDelete(id)}
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
        <Flex justify="center">
          <Flex vertical gap={8} align="center">
            <Title level={4}>Nu există niciun tichet disponibil</Title>
            <Button
              type="primary"
              onClick={() => setIsOpenAddTicketModal(true)}
            >
              Adaugă un tichet nou
            </Button>
          </Flex>
        </Flex>
      )}

      <Modal
        okText="Crează"
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
          name="add-ticket"
          onFinish={({ workflow, priority, ...values }) => {
            onAdd({
              ...values,
              workflow: Number(workflow),
              priority: Number(priority),
            });
            setIsOpenAddTicketModal(false);
          }}
        />
      </Modal>

      <Modal
        okText="Salvează"
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
    </WorkflowWrapper>
  );
};
