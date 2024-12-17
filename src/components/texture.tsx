import { Flex, Modal, Space } from "antd";
import { useCallback, useState } from "react";
import { imageMap, UniformDict } from "../types.ts";

type TextureProps = {
  name: string;
  defaultValue: string;
  update: (uniforms: UniformDict) => void;
};

export const Texture = ({ name, defaultValue, update }: TextureProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleTextureChange = useCallback(
    (texture: string) => {
      update({
        [name]: texture,
      });
    },
    [name, update],
  );

  return (
    <Flex vertical>
      {name}:
      <img
        width={150}
        src={imageMap[value as keyof typeof imageMap]}
        onClick={openModal}
        style={{ cursor: "pointer" }}
      />
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        footer={null}
        onClose={closeModal}
        onCancel={closeModal}
      >
        <Space>
          {Object.keys(imageMap).map((key) => (
            <img
              key={key}
              src={imageMap[key as keyof typeof imageMap]}
              width={150}
              onClick={() => {
                setValue(key);
                handleTextureChange(key);
                closeModal();
              }}
              style={{
                cursor: "pointer",
                border:
                  key === value ? "5px solid aqua" : "5px solid transparent",
              }}
            />
          ))}
        </Space>
      </Modal>
    </Flex>
  );
};
