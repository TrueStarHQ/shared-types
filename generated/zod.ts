/**
 * Generated by orval v6.31.0 🍺
 * Do not edit manually.
 * TrueStar API
 * API for fake review detection services
 * OpenAPI spec version: 1.0.0
 */
import { z as zod } from "zod";

/**
 * @summary Health check endpoint
 */
export const getHealthResponse = zod
  .object({
    timestamp: zod.string().datetime(),
  })
  .and(
    zod.object({
      status: zod.enum(["ok"]),
    }),
  );

/**
 * Analyzes a batch of Amazon product reviews to detect patterns of fake or manipulated reviews.
Returns trust score, red flags (suspicious patterns), and green flags (authenticity indicators).

The API uses LLM analysis to identify common fake review patterns such as review bombing,
repeated phrases, and excessively positive language, while also recognizing authenticity
signals like high verified purchase rates and natural rating distributions.

 * @summary Check Amazon product reviews for authenticity
 */
export const checkAmazonProductBodyReviewsItemRatingMax = 5;
export const checkAmazonProductBodyReviewsMax = 100;

export const checkAmazonProductBody = zod
  .object({
    reviews: zod
      .array(
        zod
          .object({
            id: zod.string(),
            rating: zod
              .number()
              .min(1)
              .max(checkAmazonProductBodyReviewsItemRatingMax),
            text: zod.string().min(1),
            author: zod.string(),
            verified: zod.boolean(),
            date: zod.string().optional(),
            helpfulVotes: zod.number().optional(),
            totalVotes: zod.number().optional(),
            productVariation: zod.string().optional(),
            isVineReview: zod.boolean().optional(),
            badges: zod.array(zod.string()).optional(),
          })
          .strict(),
      )
      .min(1)
      .max(checkAmazonProductBodyReviewsMax),
  })
  .strict();

export const checkAmazonProductResponseSummaryTrustScoreMin = 0;

export const checkAmazonProductResponseSummaryTrustScoreMax = 100;
export const checkAmazonProductResponseGreenFlagsItemConfidenceMin = 0;

export const checkAmazonProductResponseGreenFlagsItemConfidenceMax = 1;
export const checkAmazonProductResponseGreenFlagsItemDetailsPercentageMin = 0;

export const checkAmazonProductResponseGreenFlagsItemDetailsPercentageMax = 100;
export const checkAmazonProductResponseRedFlagsItemConfidenceMin = 0;

export const checkAmazonProductResponseRedFlagsItemConfidenceMax = 1;
export const checkAmazonProductResponseRedFlagsItemConfidenceMinOne = 0;

export const checkAmazonProductResponseRedFlagsItemConfidenceMaxOne = 1;
export const checkAmazonProductResponseRedFlagsItemConfidenceMinTwo = 0;

export const checkAmazonProductResponseRedFlagsItemConfidenceMaxTwo = 1;

export const checkAmazonProductResponse = zod
  .object({
    timestamp: zod.string().datetime(),
  })
  .and(
    zod.object({
      summary: zod.object({
        trustScore: zod
          .number()
          .min(checkAmazonProductResponseSummaryTrustScoreMin)
          .max(checkAmazonProductResponseSummaryTrustScoreMax),
      }),
      greenFlags: zod
        .array(
          zod
            .object({
              type: zod.string(),
              confidence: zod
                .number()
                .min(checkAmazonProductResponseGreenFlagsItemConfidenceMin)
                .max(checkAmazonProductResponseGreenFlagsItemConfidenceMax),
              details: zod.object({}),
            })
            .and(
              zod.object({
                type: zod.enum(["high_verified_purchases"]).optional(),
                details: zod
                  .object({
                    percentage: zod
                      .number()
                      .min(
                        checkAmazonProductResponseGreenFlagsItemDetailsPercentageMin,
                      )
                      .max(
                        checkAmazonProductResponseGreenFlagsItemDetailsPercentageMax,
                      ),
                  })
                  .optional(),
              }),
            ),
        )
        .optional(),
      redFlags: zod
        .array(
          zod
            .object({
              type: zod.string(),
              confidence: zod
                .number()
                .min(checkAmazonProductResponseRedFlagsItemConfidenceMin)
                .max(checkAmazonProductResponseRedFlagsItemConfidenceMax),
              details: zod.object({}),
            })
            .and(
              zod.object({
                type: zod.enum(["review_bombing"]).optional(),
                details: zod
                  .object({
                    date: zod.string().date(),
                    reviewCount: zod.number(),
                    hoursSpan: zod.number(),
                    reviewIds: zod.array(zod.string()).optional(),
                  })
                  .optional(),
              }),
            )
            .or(
              zod
                .object({
                  type: zod.string(),
                  confidence: zod
                    .number()
                    .min(checkAmazonProductResponseRedFlagsItemConfidenceMinOne)
                    .max(
                      checkAmazonProductResponseRedFlagsItemConfidenceMaxOne,
                    ),
                  details: zod.object({}),
                })
                .and(
                  zod.object({
                    type: zod.enum(["phrase_repetition"]).optional(),
                    details: zod
                      .object({
                        phrase: zod.string(),
                        reviewIds: zod.array(zod.string()),
                      })
                      .optional(),
                  }),
                ),
            )
            .or(
              zod
                .object({
                  type: zod.string(),
                  confidence: zod
                    .number()
                    .min(checkAmazonProductResponseRedFlagsItemConfidenceMinTwo)
                    .max(
                      checkAmazonProductResponseRedFlagsItemConfidenceMaxTwo,
                    ),
                  details: zod.object({}),
                })
                .and(
                  zod.object({
                    type: zod.enum(["excessive_positivity"]).optional(),
                    details: zod
                      .object({
                        reviewIds: zod.array(zod.string()),
                        keywords: zod.array(zod.string()).optional(),
                      })
                      .optional(),
                  }),
                ),
            ),
        )
        .optional(),
      metrics: zod.object({
        analyzed: zod.number(),
        total: zod.number(),
      }),
    }),
  );
