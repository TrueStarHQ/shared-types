# Shared Types

Shared TypeScript types for the TrueStar project, automatically generated from [the API spec file](https://github.com/TrueStarHQ/api/blob/main/public/openapi.yaml):

- API request/response types
- Data models (reviews, analysis results, etc.)
- Zod validation schemas

## Installation

```bash
pnpm add @truestarhq/shared-types
```

## Usage

```typescript
import { AmazonReview, checkAmazonReviewsBody } from "@truestarhq/shared-types";

// Use types
const review: AmazonReview = {
  id: "123",
  rating: 5,
  text: "Great product!",
  // ... other fields
};

// Use Zod schemas for validation
const validationResult = checkAmazonReviewsBody.safeParse(requestData);
if (!validationResult.success) {
  console.error("Validation failed:", validationResult.error);
}
```

## Development

### Updating types

When the OpenAPI spec changes in the API repository:

```bash
pnpm update
```

This fetches the latest spec from GitHub, regenerates types, and cleans up.

### Scripts

- `pnpm update` - Fetch from GitHub, generate types, and clean up
- `pnpm fetch` - Fetch OpenAPI spec from GitHub
- `pnpm codegen` - Generate types from existing openapi.yaml
- `pnpm clean` - Clean generated types and OpenAPI spec

## Publishing

This package is published to npm. To release a new version:

1. Update version in `package.json`
2. Run `pnpm update` to fetch and regenerate types
3. Commit changes
4. Create a git tag
5. Push to repository

## Future development

Package should be automatically published via CI/CD, ideally when updates are made to the API spec file.
