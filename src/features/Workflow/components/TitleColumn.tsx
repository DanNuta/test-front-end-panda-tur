import { Tag, TagProps, Flex, Typography } from "antd";
import { BaseType } from "antd/es/typography/Base";

import { capitalizeFirstLetter } from "@/utils";

type Props = {
  count: number;
  title: string;
  color: Exclude<BaseType, "danger">;
} & Omit<TagProps, "color">;

export const TitleColumn = ({ title, color, count, ...restProps }: Props) => {
  return (
    <Flex gap={8} className="mb-24">
      <Tag bordered={false} color={color} {...restProps}>
        <Typography.Text type={color}>
          {capitalizeFirstLetter(title)}
        </Typography.Text>
      </Tag>

      {!!count && (
        <Tag bordered={false} color={color} {...restProps}>
          <Typography.Text type={color}>{count}</Typography.Text>
        </Tag>
      )}
    </Flex>
  );
};
