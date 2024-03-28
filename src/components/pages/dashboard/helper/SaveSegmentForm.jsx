import React, { useState, useEffect } from "react";
import { Select, Button, Avatar, message } from "antd";

import { MinusOutlined } from "@ant-design/icons";

const { Option } = Select;

const SchemaSegment = ({
  setDynamicDropdowns,
  dynamicDropdowns,
  schemaOptions,
  setSelectedOptions,
  selectedOptions,
}) => {
  const [newSchema, setNewSchema] = useState("");

  useEffect(() => {
    console.log("Dynamic Dropdowns:", dynamicDropdowns);
    console.log("Selected Options:", selectedOptions);
  }, [dynamicDropdowns, selectedOptions]);

  const handleNewSchemaAddition = () => {
    if (newSchema) {
      setDynamicDropdowns((prev) => [...prev, newSchema]);
      setSelectedOptions((prev) => [...prev, newSchema]);
      setNewSchema("");

      console.log(dynamicDropdowns, selectedOptions);
      message.success("Schema added successfully");
    }
  };

  const handleDynamicDropdownChange = (value, index) => {
    const updatedDynamicDropdowns = [...dynamicDropdowns];

    updatedDynamicDropdowns[index] = value;

    if (!dynamicDropdowns.includes(value)) {
      setDynamicDropdowns(updatedDynamicDropdowns);
    }

    setSelectedOptions((prev) => {
      const filteredOptions = updatedDynamicDropdowns.filter(
        (option) => option !== "" && option !== null
      );

      const allSelected = schemaOptions.every((option) =>
        filteredOptions.includes(option.value)
      );

      if (allSelected) {
        setNewSchema("");
      }

      return filteredOptions;
    });
  };

  const handleRemoveOption = (value) => {
    setSelectedOptions((prev) => [
      ...prev.filter((option) => option !== value),
    ]);
    setDynamicDropdowns((prev) => [
      ...prev.filter((option) => option !== value),
    ]);
  };

  return (
    <div>
      <div className={dynamicDropdowns.length > 0 ? "addedschema" : ""}>
        {dynamicDropdowns.map((dropdown, index) => (
          <div
            key={dropdown}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            {index % 2 === 0 ? (
              <Avatar
                className="rounded-circle green-bg"
                style={{ marginRight: "10px" }}
              />
            ) : (
              <Avatar
                className="rounded-circle red-bg"
                style={{ marginRight: "10px" }}
              />
            )}

            {/* </Tag> */}
            <Select
              value={dropdown}
              onChange={(value) => handleDynamicDropdownChange(value, index)}
              style={{ width: "calc(100% - 70px)", marginRight: "10px" }}
            >
              <Option value="">-- Select an option --</Option>
              {schemaOptions.map(
                (option) =>
                  !dynamicDropdowns.includes(option.value) && (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  )
              )}
            </Select>
            <Button
              type="default"
              className="removeSchemaBtn"
              style={{ backgroundColor: "#c3d2d6" }}
              onClick={() => handleRemoveOption(dropdown)}
              icon={<MinusOutlined />}
            />
          </div>
        ))}
      </div>
      <div className="orignalSchemaList">
        <Select
          value={newSchema}
          onChange={(value) => setNewSchema(value)}
          style={{ width: "calc(100% - 70px)", marginTop: "10px" }}
        >
          <Option value="">-- Add schema to segment --</Option>
          {schemaOptions.map(
            (option) =>
              !selectedOptions.includes(option.value) && (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              )
          )}
        </Select>

        <Button
          type="text"
          onClick={handleNewSchemaAddition}
          className="addschemamoreBtn"
        >
          + Add new schema
        </Button>
      </div>
    </div>
  );
};

export default SchemaSegment;
