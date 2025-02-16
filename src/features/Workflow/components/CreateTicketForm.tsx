import { Form, Input, Radio } from "antd";

import { PriorityTag } from "@/components";
import { Ticket } from "@/types";

import { priorities, workflow } from "../utils";

type Props = {
  onAddTicket: (values: Ticket) => void;
};

export const CreateTicketForm = ({ onAddTicket }: Props) => {
  return (
    <Form
      name="add-ticket"
      layout="vertical"
      initialValues={{
        workflow: "0",
        priority: "0",
      }}
      onFinish={(data) =>
        onAddTicket({
          ...data,
          workflow: Number(data.workflow),
          priority: Number(data.priority),
        })
      }
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

      <Form.Item label="Prioritate" name="priority">
        <Radio.Group
          options={Object.keys(priorities).map((key) => ({
            label: (
              <PriorityTag priority={Number(key) as keyof typeof priorities} />
            ),
            value: key,
          }))}
        />
      </Form.Item>

      <Form.Item label="Proces de lucru" name="workflow">
        <Radio.Group
          options={Object.entries(workflow).map(([key, value]) => ({
            label: value,
            value: key,
          }))}
        />
      </Form.Item>
    </Form>
  );
};
