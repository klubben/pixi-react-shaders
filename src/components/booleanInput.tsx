import { Flex, Switch } from "antd";
import { useCallback, useState } from "react";
import { UniformDict } from "../types.ts";

type BooleanInputProps = {
  name: string;
  defaultChecked: boolean;
  update: (uniforms: UniformDict) => void;
};

export const BooleanInput = ({
  name,
  defaultChecked,
  update,
}: BooleanInputProps) => {
  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = useCallback(
    (value: boolean) => {
      setChecked(value);
      update({
        [name]: value,
      });
    },
    [name, update],
  );

  return (
    <Flex vertical>
      {name}:
      <Flex gap={3}>
        <Switch checked={checked} onChange={handleChange} />
      </Flex>
    </Flex>
  );
};
