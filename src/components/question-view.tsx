'use client';

import { useState } from 'react';
import { CheckCircle2, Loader2, Info } from 'lucide-react';

import type { Question } from '@/lib/questions';
import type { EvaluateShortAnswerOutput } from '@/ai/flows/evaluate-short-answer-flow';
import { evaluateShortAnswer } from '@/ai/flows/evaluate-short-answer-flow';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type QuestionViewProps = {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onComplete: (
    userAnswer: string,
    evaluation: EvaluateShortAnswerOutput
  ) => void;
};

type ViewState = 'answering' | 'evaluating' | 'feedback';

export function QuestionView({
  question,
  questionNumber,
  totalQuestions,
  onComplete,
}: QuestionViewProps) {
  const [answer, setAnswer] = useState('');
  const [viewState, setViewState] = useState<ViewState>('answering');
  const [evaluation, setEvaluation] =
    useState<EvaluateShortAnswerOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (answer.trim().length < 5) {
      toast({
        title: 'Answer too short',
        description: 'Please provide a more detailed answer.',
        variant: 'destructive',
      });
      return;
    }
    setViewState('evaluating');
    try {
      const evalResult = await evaluateShortAnswer({
        userAnswer: answer,
        correctAnswer: question.correctAnswer,
      });
      setEvaluation(evalResult);
      setViewState('feedback');
    } catch (error) {
      console.error('Evaluation failed:', error);
      toast({
        title: 'Evaluation Error',
        description: 'Something went wrong while evaluating your answer. Please try again.',
        variant: 'destructive',
      });
      setViewState('answering');
    }
  };

  const progress = (questionNumber / totalQuestions) * 100;

  const scoreColorClass = (score: number) => {
    if (score === 1) return 'bg-accent';
    if (score > 0.5) return 'bg-yellow-500';
    return 'bg-destructive';
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
            <CardDescription>
            Question {questionNumber} of {totalQuestions}
            </CardDescription>
        </div>
        <Progress value={progress} className="h-2" />
        <CardTitle className="pt-4 text-2xl">{question.questionText}</CardTitle>
      </CardHeader>
      <CardContent>
        {viewState === 'answering' || viewState === 'evaluating' ? (
          <Textarea
            placeholder="Type your answer here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={5}
            disabled={viewState === 'evaluating'}
            className="text-base"
          />
        ) : (
          <p className="p-3 rounded-md bg-muted border text-sm text-muted-foreground">{answer}</p>
        )}
        {viewState === 'feedback' && evaluation && (
          <Alert
            className={cn(
              'mt-4',
              evaluation.isCorrect ? 'border-accent/50' : 'border-destructive/50'
            )}
          >
            {evaluation.isCorrect ? (
                <CheckCircle2 className="h-4 w-4 text-accent" />
            ) : (
                <Info className="h-4 w-4" />
            )}
            <AlertTitle
              className={cn(evaluation.isCorrect ? 'text-accent' : '')}
            >
              {evaluation.isCorrect ? 'Correct!' : 'Feedback'}
            </AlertTitle>
            <AlertDescription>
                <p className="mb-2">{evaluation.feedback}</p>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Score:</span>
                    <Progress value={evaluation.score * 100} className="w-24 h-2" indicatorClassName={scoreColorClass(evaluation.score)} />
                    <span className="text-sm font-semibold">{Math.round(evaluation.score * 100)}%</span>
                </div>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        {viewState === 'answering' && (
          <Button className="w-full" onClick={handleSubmit}>
            Submit Answer
          </Button>
        )}
        {viewState === 'evaluating' && (
          <Button className="w-full" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Evaluating...
          </Button>
        )}
        {viewState === 'feedback' && evaluation && (
          <Button
            className="w-full"
            onClick={() => onComplete(answer, evaluation)}
            variant="default"
          >
            {questionNumber === totalQuestions ? 'Finish Test' : 'Next Question'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
