module.exports = {
  truestar: {
    input: "./openapi.yaml",
    output: {
      client: "zod",
      target: "./generated/zod.ts",
      schemas: "./generated",
      prettier: true,
      override: {
        zod: {
          strict: {
            query: true,
            param: true,
            header: true,
            body: true,
          },
        },
      },
    },
  },
};
