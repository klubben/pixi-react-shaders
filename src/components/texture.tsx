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
        src={imageMap[value as keyof typeof imageMap]}
        onClick={openModal}
        style={{
          cursor: "pointer",
          maxHeight: "150px",
          maxWidth: "150px",
          objectFit: "contain",
        }}
      />
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        footer={null}
        onClose={closeModal}
        onCancel={closeModal}
        width={"90%"}
      >
        <Space wrap>
          {Object.keys(imageMap).map((key) => (
            <div
              key={key}
              style={{
                textAlign: "center",
                padding: "6px",
                border: key === value ? "5px solid #555" : "5px solid #aaa",
                borderRadius: "5px",
              }}
            >
              <img
                src={imageMap[key as keyof typeof imageMap]}
                width={150}
                onClick={() => {
                  setValue(key);
                  handleTextureChange(key);
                  closeModal();
                }}
                style={{
                  cursor: "pointer",
                  maxHeight: "150px",
                  maxWidth: "150px",
                  objectFit: "contain",
                }}
              />
              <br />
              {key}
            </div>
          ))}
        </Space>
      </Modal>
    </Flex>
  );
};
