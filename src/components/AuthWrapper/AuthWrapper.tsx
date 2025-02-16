import { PropsWithChildren } from "react";
import { Flex } from "antd";

import "./style.css";

export const AuthWrapper = ({ children }: PropsWithChildren) => {
  return (
    <Flex vertical justify="center" className="auth-wrapper | vh-100">
      {children}
    </Flex>
  );
};
