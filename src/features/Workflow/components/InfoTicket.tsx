import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Typography, CardProps, Tag } from "antd";

import { PriorityTag } from "@/components";
import { Ticket } from "@/types";
import { getWorkflowSingular } from "@/utils";

import { priorities } from "../utils";

const { Text, Paragraph } = Typography;

type InfoTicketProps = {
  onDeleteTicket: () => void;
  onEditTicket: () => void;
} & Omit<Ticket, "id"> &
  CardProps;

export const InfoTicket = ({
  title,
  description,
  notes,
  priority,
  workflow,
  onDeleteTicket,
  onEditTicket,
  ...restProps
}: InfoTicketProps) => {
  return (
    <Card
      title={title}
      extra={
        <Flex gap={4}>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => onEditTicket()}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDeleteTicket()}
          />
        </Flex>
      }
      {...restProps}
    >
      <Flex vertical gap={12}>
        <Flex align="center" gap={8}>
          <Text strong>Descriere: </Text>
          <Text italic>{description}</Text>
        </Flex>

        <Flex align="center" gap={8}>
          <Text strong>Flux de lucru: </Text>
          <Tag>{getWorkflowSingular(workflow)}</Tag>
        </Flex>

        <Flex align="center" gap={8}>
          <Text strong>Prioritate: </Text>
          <PriorityTag priority={priority as keyof typeof priorities} />
        </Flex>

        {notes && (
          <Flex align="center" gap={8}>
            <Text strong>Notes: </Text>
            <Paragraph>{notes}</Paragraph>
          </Flex>
        )}
      </Flex>
    </Card>
  );
};
