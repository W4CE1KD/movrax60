'use server';
/**
 * @fileOverview A Genkit flow for evaluating short-answer questions.
 *
 * - evaluateShortAnswer - A function that handles the evaluation process.
 * - EvaluateShortAnswerInput - The input type for the evaluateShortAnswer function.
 * - EvaluateShortAnswerOutput - The return type for the evaluateShortAnswer function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const EvaluateShortAnswerInputSchema = z.object({
  userAnswer: z.string().describe("The user's submitted short answer to a question."),
  correctAnswer: z.string().describe("The correct answer to the short answer question."),
});
export type EvaluateShortAnswerInput = z.infer<typeof EvaluateShortAnswerInputSchema>;

const EvaluateShortAnswerOutputSchema = z.object({
  isCorrect: z.boolean().describe("True if the user's answer is correct and complete (score of 1), false otherwise."),
  feedback: z.string().describe("Constructive feedback explaining the correctness and completeness of the user's answer, and suggesting improvements if necessary."),
  score: z.number().min(0).max(1).describe("A score between 0 and 1, representing the correctness and completeness of the user's answer. 1 means perfectly correct and complete, 0 means completely incorrect."),
});
export type EvaluateShortAnswerOutput = z.infer<typeof EvaluateShortAnswerOutputSchema>;

export async function evaluateShortAnswer(input: EvaluateShortAnswerInput): Promise<EvaluateShortAnswerOutput> {
  return evaluateShortAnswerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'evaluateShortAnswerPrompt',
  input: { schema: EvaluateShortAnswerInputSchema },
  output: { schema: EvaluateShortAnswerOutputSchema },
  prompt: `You are a helpful, fair, and experienced test grader. Your task is to evaluate a user's short answer against a provided correct answer for correctness and completeness.

Provide constructive feedback that explains why the answer is correct or incorrect, and suggest any necessary improvements.
Assign a numerical score between 0 and 1.
- A score of 1 indicates a perfectly correct and complete answer.
- A score between 0.5 and 0.9 indicates a partially correct answer, with the score reflecting the degree of correctness and completeness.
- A score of 0 indicates a completely incorrect or irrelevant answer.
Set 'isCorrect' to true only if the score is 1.

Here is the user's answer:
"""
{{{userAnswer}}}
"""

Here is the correct answer:
"""
{{{correctAnswer}}}
"""`,
});

const evaluateShortAnswerFlow = ai.defineFlow(
  {
    name: 'evaluateShortAnswerFlow',
    inputSchema: EvaluateShortAnswerInputSchema,
    outputSchema: EvaluateShortAnswerOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to get output from prompt.');
    }
    return output;
  }
);
