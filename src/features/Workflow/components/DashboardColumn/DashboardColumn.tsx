import { Flex } from "antd";
import { BaseType } from "antd/es/typography/Base";

import { WorkflowTicket } from "@/features/Workflow/types";
import { DropArea } from "@/components";

import { TitleColumn } from "../TitleColumn";
import { InfoTicket } from "../InfoTicket";

import "./style.css";

type Props = {
  workflowName: string;
  color: Exclude<BaseType, "danger">;
  onEdit: (id: string) => void;
  onDropTicket: (id: string) => void;
} & Omit<WorkflowTicket, "onAdd" | "onUpdate">;

export const DashboardColumn = ({
  tickets,
  workflowName,
  color,
  onDelete,
  onEdit,
  onDropTicket,
}: Props) => {
  return (
    <div className="dashboard-column">
      <TitleColumn title={workflowName} color={color} count={tickets?.length} />

      <Flex vertical gap={12}>
        {tickets?.map(({ id, ...ticket }) => (
          <InfoTicket
            {...ticket}
            key={id}
            className="ticket-card"
            draggable
            onDeleteTicket={() => onDelete(id)}
            onEditTicket={() => onEdit(id)}
            onDragStart={(e) => {
              e.dataTransfer.setData("ticket", id);
            }}
          />
        ))}
        <DropArea onDrop={onDropTicket} />
      </Flex>
    </div>
  );
};
