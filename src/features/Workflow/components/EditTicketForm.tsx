import { Form, Input } from "antd";
import { useEffect } from "react";

import { Ticket } from "@/types";

export type EditTicketData = Pick<Ticket, "title" | "description" | "notes">;

type Props = {
  data?: EditTicketData;
  onEditTicket: (values: EditTicketData) => void;
};

const { TextArea } = Input;

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
        <TextArea rows={3} />
      </Form.Item>

      <Form.Item label="Notițe" name="notes">
        <TextArea rows={2} placeholder="Notițe" />
      </Form.Item>
    </Form>
  );
};
