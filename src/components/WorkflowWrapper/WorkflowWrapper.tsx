import { PropsWithChildren } from "react";
import { Flex } from "antd";

const { Title, Text } = Typography;

type Props = {
  title: string;
  subTitle: string;
  extra?: React.ReactNode;
};

import "./style.css";
import { Typography } from "antd";

export const WorkflowWrapper = ({
  children,
  subTitle,
  title,
  extra,
}: PropsWithChildren<Props>) => {
  return (
    <div>
      <Flex
        justify="space-between"
        align="center"
        className="header-bottom-space"
      >
        <div>
          <Title level={2}>{title}</Title>
          <Text type="secondary">{subTitle}</Text>
        </div>

        {extra}
      </Flex>

      {children}
    </div>
  );
};
