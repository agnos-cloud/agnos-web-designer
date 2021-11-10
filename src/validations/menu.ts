import Ajv from "ajv";

const ajv = new Ajv();

const schema = {
    type: "object",
    properties: {
        id: { type: "string" },
        text: { type: "string" },
        actions: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: { type: "string" },
                    text: { type: "string" },
                    isDivider: { type: "boolean" },
                    image: {
                        type: "object",
                        properties: {
                            src: { type: "string" }
                        },
                        required: ["src"],
                    },
                    paths: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                d: { type: "string" },
                                fill: { type: "string" },
                                stroke: { type: "string" },
                                style: { type: "string" },
                                transform: { type: "string" },
                            },
                            required: ["d"],
                        },
                    },
                },
                required: ["id"],
            }
        },
    },
    required: ["id", "actions"],
    additionalProperties: false,
};

const validate = ajv.compile(schema);

export function validateMenu(check) {
    const valid = validate(check);
  
    return [valid, validate.errors];
}