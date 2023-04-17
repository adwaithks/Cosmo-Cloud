import "./styles.css";
import React from "react";
import FieldTree from "../src/components/FieldTree";
import { Box } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [fields, setFields] = React.useState([
    {
      id: uuidv4(),
      name: "id",
      type: "number",
      isRequired: false
    },
    {
      id: uuidv4(),
      name: "person",
      type: "object",
      isRequired: false,
      children: [
        {
          id: uuidv4(),
          name: "name",
          type: "string",
          isRequired: false
        },
        {
          id: uuidv4(),
          name: "location",
          type: "string",
          isRequired: false
        }
      ]
    },
    {
      id: uuidv4(),
      name: "employee",
      type: "object",
      isRequired: false,
      children: []
    }
  ]);

  const updateFields = (fields) => {
    setFields(fields);
  };

  return (
    <Box className="App">
      <Box className="field-tree">
        <FieldTree fields={fields} updateFields={updateFields} />
      </Box>
    </Box>
  );
}
