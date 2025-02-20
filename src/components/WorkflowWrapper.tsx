import { PropsWithChildren } from "react";
import { Flex, Typography } from "antd";

const { Title, Text } = Typography;

type Props = {
  title: string;
  subTitle: string;
  extra?: React.ReactNode;
};

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
