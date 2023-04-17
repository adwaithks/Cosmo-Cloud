import React from "react";
import FieldGroup from "../FieldGroup/FieldGroup";
import FieldInfo from "./FieldInfo";
import { Box } from "@chakra-ui/react";

const Field = (props) => {
  const {
    field,
    removeField,
    updateFieldName,
    updateFieldType,
    toggleIsRequired,
    addNewField,
    depth
  } = props;

  return (
    <Box
      sx={{
        marginLeft: depth >= 1 && `${depth + 30}px`,
        my: 1
      }}
    >
      <FieldInfo
        updateFieldName={updateFieldName}
        updateFieldType={updateFieldType}
        removeField={removeField}
        addNewField={addNewField}
        toggleIsRequired={toggleIsRequired}
        field={field}
      />
      {field?.children && (
        <FieldGroup
          updateFieldName={updateFieldName}
          updateFieldType={updateFieldType}
          removeField={removeField}
          addNewField={addNewField}
          toggleIsRequired={toggleIsRequired}
          depth={depth + 1}
          fields={field.children}
        />
      )}
    </Box>
  );
};

export default Field;
