# Completed Tasks (According to guidelines)

1. Schema design
2. Add field
3. Edit field name
4. Edit field type
5. Nested fields for type object.
6. Update is required flag

# Some assumptions that i made :

1. No limit for nesting. Currently we can create infinite amount of nested objects
2. If a field's type is changed from "object" to something else, it looses all its nested object.

# Third party libraries used:

1. Chakra-UI for components

# Schema

Schema for this component is an array of objects. (kinda like a n-ary tree). Single object looks something like this :

{
id: uuid,
name: string,
type: string,
isRequired: boolean
children?: IField[](optional)
}

Eg. Schema :

```
[
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
          type: "object",
          isRequired: false,
          children: [
            {
              id: uuidv4(),
              name: "state",
              type: "string",
              isRequired: false
            }
          ]
        }
      ]
    }
```

# Component Structure

- FieldTree
  - FieldGroup
    - Field
      - FieldInfo
    - Field
      - FieldInfo
    - Field
      - FieldInfo
      - FieldGroup (for nested groups)

# Component Architectures

1. FieldTree

- fields: IField[]
- updateFields: (fields: IField[]) => void

2. Field

- updateFieldName: (id) => void
- updateFieldType: (id, newType) => void
- removeField: (id) => void
- toggleIsRequired: (id) => void
- addNewField: (id) => void
- field: IField
- depth?: number

3. FieldGroup

- updateFieldName: (id) => void
- updateFieldType: (id, newType) => void
- removeField: (id) => void
- toggleIsRequired: (id) => void
- addNewField: (id) => void
- fields: IField[]

4. FieldInfo

- updateFieldName: (id) => void
- updateFieldType: (id, newType) => void
- removeField: (id) => void
- toggleIsRequired: (id) => void
- addNewField: (id) => void
- fields: IField

Where,

IField: {
id: number,
name: string,
type: enum,
children?: IField[]
}

Thought process behing architecture:
I really don't want the users to write their own CRUD operations, that is going to involve recursive traversing through the state. That lead to the idea of hiding these functions from users, and only allowing them to pass in the intital field value and the field updater function to the FieldTree component (root component). Thereby taking away a lot of pain for reusing the component.

# How to see the configuration behind the UI?

I have added a <pre> tag in the index.jsx (in FieldTree folder).
It will render the configuration as you make changes in the UI. I didn't implement the save button. (one less click!)

# Things that I feel is bad

1. UI looks are okay-ish. (Since I had to spent some time for the actual logic for CRUD operations)

Thank you for considering my application, Have a nice day :)
