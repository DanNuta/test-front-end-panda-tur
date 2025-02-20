import { Form, Input } from "antd";
import { useEffect } from "react";

import { Ticket } from "@/types";
import { FormProps } from "antd/lib";

export type EditTicketData = Pick<Ticket, "title" | "description" | "notes">;

type Props = {
  data?: EditTicketData;
} & FormProps;

const { TextArea } = Input;

export const EditTicketForm = ({ data, ...props }: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  return (
    <Form form={form} layout="vertical" {...props}>
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
