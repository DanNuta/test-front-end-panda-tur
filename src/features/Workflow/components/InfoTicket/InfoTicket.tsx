import {
  DeleteOutlined,
  EditOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Card, Flex, Typography, CardProps, Divider } from "antd";

import { PriorityTag } from "@/components";
import { Ticket } from "@/types";
import { priorities } from "@/features/Workflow/utils";

import "./style.css";

const { Text, Paragraph } = Typography;

type InfoTicketProps = {
  onDeleteTicket: () => void;
  onEditTicket: () => void;
} & Omit<Ticket, "id"> &
  CardProps;

const workflowIcons = {
  0: <PlusCircleOutlined style={{ fontSize: 30 }} />,
  1: <ClockCircleOutlined style={{ color: "#faad14", fontSize: 30 }} />,
  2: <CheckCircleOutlined style={{ color: "#52c41a", fontSize: 30 }} />,
};

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
      className="info-ticket"
      title={<Text>{title}</Text>}
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
      <Flex vertical>
        <Flex className="mb-24" align="center" vertical gap={12}>
          {workflowIcons[workflow as keyof typeof priorities]}
          <Paragraph
            className="text-center"
            type="secondary"
            ellipsis={{
              rows: 3,
              expandable: "collapsible",
              symbol: (expended) =>
                expended ? "Citește mai puțin" : "Citește mai mult",
            }}
          >
            {description}
          </Paragraph>
        </Flex>

        <div className="priority">
          <Text strong>Prioritate: </Text>
          <PriorityTag priority={priority as keyof typeof priorities} />
        </div>

        {notes && (
          <>
            <Divider />
            <Text strong>Notes: </Text>
            <Paragraph>{notes}</Paragraph>
          </>
        )}
      </Flex>
    </Card>
  );
};
