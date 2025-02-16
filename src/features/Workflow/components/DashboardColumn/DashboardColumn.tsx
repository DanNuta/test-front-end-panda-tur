import { HTMLAttributes } from "react";
import { Flex } from "antd";
import { BaseType } from "antd/es/typography/Base";

import { WorkflowTicket } from "@/features/Workflow/types";

import { TitleColumn } from "../TitleColumn";
import { InfoTicket } from "../InfoTicket";

import "./style.css";

type Props = {
  workflowName: string;
  color: Exclude<BaseType, "danger">;
  onEdit: (id: string) => void;
} & HTMLAttributes<HTMLDivElement> &
  Omit<WorkflowTicket, "onAdd" | "onUpdate">;

export const DashboardColumn = ({
  tickets,
  workflowName,
  color,
  onDelete,
  onEdit,
  ...restProps
}: Props) => {
  return (
    <div className="dashboard-column" {...restProps}>
      <TitleColumn title={workflowName} color={color} count={tickets?.length} />

      <Flex vertical gap={12}>
        {tickets?.map((ticket) => (
          <InfoTicket
            {...ticket}
            onDeleteTicket={() => onDelete(ticket.id)}
            onEditTicket={() => onEdit(ticket.id)}
            key={ticket.id}
            className="ticket-card"
          />
        ))}
      </Flex>
    </div>
  );
};
