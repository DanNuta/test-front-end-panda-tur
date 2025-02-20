import { Form, Input, Radio } from "antd";
import { FormProps } from "antd/lib";

import { PriorityTag } from "@/components";
import { Ticket } from "@/types";
import { getWorkflowSingular } from "@/utils";

import { priorities, workflow } from "../utils";

type FormValues = Pick<
  Ticket,
  "title" | "description" | "notes" | "workflow" | "priority"
>;

export const CreateTicketForm = (props: FormProps<FormValues>) => {
  return (
    <Form
      name="add-ticket"
      layout="vertical"
      initialValues={{
        workflow: "0",
        priority: "0",
      }}
      {...props}
    >
      <Form.Item rules={[{ required: true }]} label="Titlu" name="title">
        <Input placeholder="Titlu" />
      </Form.Item>

      <Form.Item
        rules={[{ required: true }]}
        label="Descriere"
        name="description"
      >
        <Input.TextArea placeholder="Descriere" />
      </Form.Item>

      <Form.Item label="Notițe" name="notes">
        <Input.TextArea rows={2} placeholder="Notițe" />
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
          options={Object.keys(workflow).map((key) => ({
            label: getWorkflowSingular(Number(key)),
            value: key,
          }))}
        />
      </Form.Item>
    </Form>
  );
};
