import { Flex } from "antd";
import { useState } from "react";

import "./style.css";

type Props = {
  onDrop: (id: string) => void;
};

export const DropArea = ({ onDrop }: Props) => {
  const [showDropArea, setShowDropArea] = useState(false);

  const drop = (e: React.DragEvent) => {
    onDrop(e.dataTransfer.getData("ticket"));
    setShowDropArea(false);
  };

  return (
    <Flex
      align="center"
      justify="center"
      className={showDropArea ? "drop-area" : "hide-drop-area"}
      onDragEnter={() => setShowDropArea(true)}
      onDragLeave={() => setShowDropArea(false)}
      onDrop={drop}
      onDragOver={(e) => e.preventDefault()}
    >
      Plasează aici
    </Flex>
  );
};
