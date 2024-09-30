import React from "react";
import { Form, Input, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

interface SearchPageFormProps {
  domains: string[];
  handleChange: (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleRemoveDomain: (index: number) => void;
  handleAddDomain: () => void;
  isLoading: boolean;
  handleSubmit: () => void;
}

export const SearchPageForm: React.FC<SearchPageFormProps> = ({
  domains,
  handleChange,
  handleRemoveDomain,
  handleAddDomain,
  isLoading,
  handleSubmit,
}) => {
  return (
    <Form onFinish={handleSubmit} className="flex justify-around flex-col">
      {domains.map((domain, index) => (
        <Form.Item key={index} className="w-full">
          <Input
            placeholder="Add domain"
            value={domain}
            onChange={(event) => handleChange(index, event)}
            suffix={
              <CloseOutlined
                onClick={
                  domains.length > 1
                    ? () => handleRemoveDomain(index)
                    : undefined
                }
                style={{
                  cursor: domains.length > 1 ? "pointer" : "not-allowed",
                  color: domains.length > 1 ? undefined : "rgba(0, 0, 0, 0.25)",
                }}
              />
            }
          />
        </Form.Item>
      ))}
      <Form.Item>
        <Button
          type="dashed"
          onClick={handleAddDomain}
          disabled={domains.length >= 5}
        >
          Add one more domain
        </Button>
      </Form.Item>
      <Form.Item>
        <Button
          loading={isLoading}
          type="primary"
          htmlType="submit"
          className="w-full"
        >
          Search
        </Button>
      </Form.Item>
    </Form>
  );
};
