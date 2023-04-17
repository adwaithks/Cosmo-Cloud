import { Box } from "@chakra-ui/react";
import React from "react";
import Field from "../Field/Field";

const FieldGroup = ({
  fields,
  removeField,
  toggleIsRequired,
  addNewField,
  updateFieldName,
  updateFieldType,
  depth = 0
}) => {
  return (
    <Box
      sx={{
        borderLeft: depth >= 1 && "solid 1px lightgray"
      }}
    >
      {fields.map((field, idx) => {
        return (
          <Field
            updateFieldName={updateFieldName}
            updateFieldType={updateFieldType}
            removeField={removeField}
            toggleIsRequired={toggleIsRequired}
            addNewField={addNewField}
            field={field}
            depth={depth}
            key={idx}
          />
        );
      })}
    </Box>
  );
};

export default FieldGroup;
