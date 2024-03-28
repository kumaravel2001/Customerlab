import React, { useState } from "react";
import { Modal, Input, Avatar, Button, Typography, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import SchemaSegment from "./helper/SaveSegmentForm";

const DashBoard = () => {
  const [visible, setVisible] = useState(false);
  const [segmentName, setSegmentName] = useState("");

  const [dynamicDropdowns, setDynamicDropdowns] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const schemaOptions = [
    { label: "First Name", value: "first_name", type: "user" },
    { label: "Last Name", value: "last_name", type: "user" },
    { label: "Gender", value: "gender", type: "user" },
    { label: "Age", value: "age", type: "user" },
    { label: "Account Name", value: "account_name", type: "group" },
    { label: "City", value: "city", type: "group" },
    { label: "State", value: "state", type: "group" },
  ];

  const handleSaveSegment = () => {
    console.log(dynamicDropdowns);

    const formattedSchema = dynamicDropdowns.map((option) => {
      const foundOption = schemaOptions.find(
        (schema) => schema.value === option
      );
      return { [option]: foundOption.label };
    });

    const dataToSend = {
      segment_name: segmentName,
      schema: formattedSchema,
    };

    if (dataToSend.schema && dataToSend.schema.length > 0) {
      message.loading({ key: "1", content: "Processing...", duration: 1 });
      setTimeout(() => {
        message.success({ key: "1", content: "Success" });
        setVisible(false);
        setDynamicDropdowns([]);
        setSelectedOptions([]);
        setVisible(false);
      }, 1000);

      setDynamicDropdowns([]);
      setSelectedOptions([]);
      setSegmentName("");
    } else {
      message.info("Add at least 1 Schema before submitting");
    }
  };

  return (
    <div className="savesegment-container">
      <Button onClick={() => setVisible(true)}>Save Segment</Button>
      <Modal
        title={
          <div className="modal-title">
            <Button
              type="text"
              className="savesegmant-Lefticon"
              onClick={() => setVisible(false)}
            >
              <ArrowLeftOutlined />
            </Button>

            <span
              style={{
                marginLeft: "14px",
                fontWeight: "bolder",
                fontSize: "1.2rem",
              }}
            >
              Save Segment
            </span>
          </div>
        }
        closable={false}
        open={visible}
        footer={
          <div className="">
            <Button
              type="primary"
              className="footer-Savebtn"
              onClick={handleSaveSegment}
              style={{ marginTop: "10px" }}
            >
              Save the segment
            </Button>
            <Button
              type="primary"
              className="footer-CloseBtn"
              onClick={() => setVisible(false)}
              style={{ marginTop: "10px" }}
            >
              Close
            </Button>
          </div>
        }
        centered
        width={600}
        className="custom-modal"
      >
        <div className="modal-content">
          <Typography.Text level={5} className="segment-instruct">
            Enter the Name of the Segment
          </Typography.Text>
          <Input
            placeholder="Segment Name"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
          />

          <Typography.Text className="segment-instruct">
            To save your segment, you need to add the schemas to build the
            query.
          </Typography.Text>
          {/*  */}

          <div className="segment-instruction">
            <div>
              <Avatar
                className="rounded-circle green-bg"
                style={{ marginRight: "10px" }}
              />
              - User Traits
            </div>

            <div>
              <Avatar
                className="rounded-circle red-bg"
                style={{ marginRight: "10px" }}
              />
              - Group Traits
            </div>
          </div>
          {/* form component here */}
          <SchemaSegment
            setDynamicDropdowns={setDynamicDropdowns}
            dynamicDropdowns={dynamicDropdowns}
            schemaOptions={schemaOptions}
            setSelectedOptions={setSelectedOptions}
            selectedOptions={selectedOptions}
          />
        </div>
        {/* <Button
          onClick={handleAddSchema}
          style={{ margin: "20px", backgroundColor: "blue", color: "white" }}
        >
          +Add new schema
        </Button> */}
      </Modal>
    </div>
  );
};

export default DashBoard;
