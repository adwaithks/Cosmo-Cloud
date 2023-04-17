import FieldGroup from "./FieldGroup/FieldGroup";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { debounce } from "../../utils/debounce";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Box,
  IconButton
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export default function FieldTree({ fields = [], updateFields: setFields }) {
  // add new field under the field with id = id
  const addNewFieldUnderId = (id) => {
    if (!id) {
      const config = [...fields];
      config.push({
        id: uuidv4(),
        name: "addName",
        type: "boolean",
        isRequired: false
      });
      setFields(config);
      return;
    }
    function recursion(config, id) {
      for (const node of config) {
        if (node.id === id && node.type === "object") {
          if (!node.children) {
            alert(
              "Something wrong with your schema! Most probably your forgot to add children prop for object type."
            );
            return;
          }
          node.children.push({
            id: uuidv4(),
            name: "addName",
            type: "boolean",
            isRequired: false
          });
          return;
        }
        if (node.children) recursion(node.children, id);
      }
    }
    const config = [...fields];
    recursion(config, id);
    console.log(config);
    setFields(config);
  };

  const updateFieldName = (id, newName) => {
    function recursion(config, id, newName) {
      for (const node of config) {
        if (node.id === id) {
          node.name = newName;
          return;
        }
        if (node.children) recursion(node.children, id, newName);
      }
    }
    const config = [...fields];
    recursion(config, id, newName);
    console.log(config);
    setFields(config);
  };

  const debouncedUpdateFieldName = debounce(updateFieldName, 500);

  const removeField = (id) => {
    function recursion(config, id) {
      for (const node of config) {
        if (node.id === id) {
          return config.filter((node) => node.id !== id);
        }
        if (node.children) node.children = recursion(node.children, id);
      }

      return config;
    }
    const config = [...fields];
    const res = recursion(config, id);
    console.log(res);
    setFields(res);
  };

  const toggleIsRequired = (id) => {
    function recursion(config, id) {
      for (const node of config) {
        if (node.id === id) {
          node.isRequired = !node.isRequired;
        }
        if (node.children) recursion(node.children, id);
      }
    }
    const config = [...fields];
    recursion(config, id);
    console.log(config);
    setFields(config);
  };

  const updateFieldType = (id, newType) => {
    function recursion(config, id, newType) {
      for (const node of config) {
        if (node.id === id) {
          node.type = newType;
          if (newType !== "object" && node.children) {
            delete node.children;
          } else if (newType === "object") {
            node.children = [];
          }
          return;
        }
        if (node.children) recursion(node.children, id, newType);
      }
    }
    const config = [...fields];
    recursion(config, id, newType);
    console.log(config);
    setFields(config);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Card sx={{ width: "100%" }}>
        <CardHeader
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pb: 0
          }}
        >
          <Heading size="sm">Field name and type</Heading>
          <IconButton onClick={() => addNewFieldUnderId(null)} size="sm">
            <AddIcon />
          </IconButton>
        </CardHeader>

        <CardBody sx={{ pt: 1 }}>
          <FieldGroup
            updateFieldName={debouncedUpdateFieldName}
            updateFieldType={updateFieldType}
            removeField={removeField}
            addNewField={addNewFieldUnderId}
            toggleIsRequired={toggleIsRequired}
            fields={fields}
          />
        </CardBody>
      </Card>
      <pre
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          padding: "10px",
          borderRadius: "4px",
          marginTop: "10px",
          fontSize: "12px"
        }}
      >
        <h1>Data Configuration Live Preview:</h1>
        {JSON.stringify(fields, null, 2)}
      </pre>
    </Box>
  );
}
