import { priorities } from "@/features/Workflow/utils";
import { capitalizeFirstLetter } from "@/utils";
import { Tag } from "antd";

type Props = {
  priority: keyof typeof priorities;
};

export const PriorityTag = ({ priority }: Props) => {
  const { color, text } = priorities[priority];
  return <Tag color={color}>{capitalizeFirstLetter(text)}</Tag>;
};
