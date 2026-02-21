import type { EvaluateShortAnswerOutput } from '@/ai/flows/evaluate-short-answer-flow';
import type { Question } from './questions';

export type QuizResult = {
  question: Question;
  userAnswer: string;
  evaluation: EvaluateShortAnswerOutput;
};
