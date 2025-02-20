import { Flex, Card } from "antd";
import { BaseType } from "antd/es/typography/Base";
import { useState } from "react";

import { WorkflowTicket } from "@/features/Workflow/types";

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
  const [showDropArea, setShowDropArea] = useState(false);

  const drop = (e: React.DragEvent) => {
    onDropTicket(e.dataTransfer.getData("ticket"));
    setShowDropArea(false);
  };

  const dragLeave = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setShowDropArea(false);
    }
  };

  return (
    <Card
      className={`dashboard-column ${
        showDropArea ? "drop-area" : "hide-drop-area"
      }`}
      onDrop={drop}
      onDragLeave={dragLeave}
      onDragEnter={() => setShowDropArea(true)}
      onDragOver={(e) => e.preventDefault()}
    >
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
      </Flex>
    </Card>
  );
};
