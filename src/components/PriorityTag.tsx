import { priorities, prioritiesColor } from "@/features/Workflow/utils";
import { capitalizeFirstLetter } from "@/utils";
import { Tag } from "antd";

type Props = {
  priority: keyof typeof priorities;
};

export const PriorityTag = ({ priority }: Props) => {
  const ticketPriority = priorities[priority];

  return (
    <Tag color={prioritiesColor[ticketPriority]}>
      {capitalizeFirstLetter(ticketPriority)}
    </Tag>
  );
};
