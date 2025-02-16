import { Form, Input } from "antd";
import { useEffect } from "react";

import { Ticket } from "@/types";

export type EditTicketData = Pick<Ticket, "title" | "description" | "notes">;

type Props = {
  data?: EditTicketData;
  onEditTicket: (values: EditTicketData) => void;
};

export const EditTicketForm = ({ onEditTicket, data }: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  return (
    <Form
      form={form}
      name="edit-ticket"
      layout="vertical"
      onFinish={onEditTicket}
    >
      <Form.Item rules={[{ required: true }]} label="Titlu" name="title">
        <Input />
      </Form.Item>

      <Form.Item
        rules={[{ required: true }]}
        label="Descriere"
        name="description"
      >
        <Input />
      </Form.Item>

      <Form.Item label="Notite" name="notes">
        <Input />
      </Form.Item>
    </Form>
  );
};
