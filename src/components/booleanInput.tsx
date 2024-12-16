import { Flex, Switch } from "antd";

type BooleanInputProps = {
  title: string;
  checked: boolean;
  onChange?: (value: boolean) => void;
};

export const BooleanInput = ({
  title,
  checked,
  onChange,
}: BooleanInputProps) => {
  return (
    <Flex vertical>
      {title}:
      <Flex gap={3}>
        <Switch checked={checked} onChange={onChange} />
      </Flex>
    </Flex>
  );
};
