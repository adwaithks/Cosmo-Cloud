import React from "react";
import { Box, IconButton, Select, Text, Switch, Input } from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

const FieldInfo = ({
  field,
  removeField,
  updateFieldName,
  updateFieldType,
  toggleIsRequired,
  addNewField
}) => {
  const [showOptions, setShowOptions] = React.useState(false);
  const [fieldName, setFieldName] = React.useState("");

  React.useEffect(() => {
    setFieldName(field.name);
  }, [field.name]);

  const getFieldTypeOptions = () => {
    const allOptions = ["string", "boolean", "object", "number"];
    return allOptions.filter((option) => option !== field.type);
  };

  return (
    <Box
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "solid 1px rgba(0, 0, 0, 0.1)",
        height: 8,
        backgroundColor: showOptions ? "rgba(0, 0, 0, 0.04)" : "white"
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/* field name */}
        <Input
          size="sm"
          width="90px"
          value={fieldName}
          sx={{ mr: 2, p: 1, border: "none" }}
          onChange={(e) => {
            setFieldName(e.target.value);
            updateFieldName(field.id, e.target.value);
          }}
        />

        {/* field type */}
        <Select
          width="95px"
          onChange={(e) => updateFieldType(field.id, e.target.value)}
          sx={{ mr: 2 }}
          placeholder={field.type}
          size="xs"
        >
          {getFieldTypeOptions().map((option) => {
            return (
              <option value={option} key={option}>
                {option}
              </option>
            );
          })}
        </Select>
      </Box>

      <Box>
        {showOptions && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* is required */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Text fontSize="sm">Required</Text>
              <Switch
                sx={{ mr: 2, ml: 2 }}
                size="sm"
                isChecked={field.isRequired}
                onChange={() => toggleIsRequired(field.id)}
              />
            </Box>
            {/* add new field */}
            {field.type === "object" && (
              <IconButton onClick={() => addNewField(field.id)} size="sm">
                <AddIcon />
              </IconButton>
            )}
            {/* remove field */}
            <IconButton
              sx={{ ml: 2 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeField(field.id);
              }}
              size="sm"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FieldInfo;
