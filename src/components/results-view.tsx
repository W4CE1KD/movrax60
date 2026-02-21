import { useMemo } from 'react';
import { CheckCircle2, Info, FileText, ChevronRight } from 'lucide-react';

import type { QuizResult } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Progress } from './ui/progress';

type ResultsViewProps = {
  results: QuizResult[];
  onRestart: () => void;
};

export function ResultsView({ results, onRestart }: ResultsViewProps) {
  const totalScore = useMemo(() => {
    if (results.length === 0) return 0;
    const total = results.reduce((sum, result) => sum + result.evaluation.score, 0);
    return Math.round((total / results.length) * 100);
  }, [results]);

  const getScoreColor = (score: number) => {
    if (score === 1) return 'bg-accent';
    if (score > 0.5) return 'bg-yellow-500';
    return 'bg-destructive';
  }

  return (
    <Card className="w-full">
      <CardHeader className="items-center text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">
          Test Complete!
        </CardTitle>
        <CardDescription>Here's how you did.</CardDescription>
        <div className="py-4">
          <div className="text-6xl font-bold text-primary">{totalScore}%</div>
          <p className="text-sm text-muted-foreground">Overall Score</p>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold mb-2 text-center">Detailed Results</h3>
        <Accordion type="single" collapsible className="w-full">
          {results.map((result, index) => (
            <AccordionItem value={`item-${index}`} key={result.question.id}>
              <AccordionTrigger>
                <div className="flex items-center gap-3 flex-1">
                  {result.evaluation.isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                  ) : (
                    <Info className="h-5 w-5 text-destructive" />
                  )}
                  <span className="font-medium text-left flex-1">
                    Question {index + 1}
                  </span>
                  <Badge variant={result.evaluation.isCorrect ? 'default' : 'destructive'} className={cn(result.evaluation.isCorrect && "bg-accent hover:bg-accent/90")}>
                    {Math.round(result.evaluation.score * 100)}%
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <p className="font-semibold text-card-foreground">
                  {result.question.questionText}
                </p>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">Your Answer:</h4>
                  <p className="text-sm text-muted-foreground p-3 bg-muted rounded-md border">
                    {result.userAnswer}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">AI Feedback:</h4>
                  <div className="text-sm p-3 bg-muted rounded-md border space-y-2">
                    <p>{result.evaluation.feedback}</p>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Score:</span>
                        <Progress value={result.evaluation.score * 100} className="w-24 h-2" indicatorClassName={getScoreColor(result.evaluation.score)} />
                    </div>
                  </div>
                </div>
                {!result.evaluation.isCorrect && (
                  <div>
                    <h4 className="font-semibold mb-2">Correct Answer Guide:</h4>
                    <p className="text-sm text-muted-foreground p-3 bg-muted/50 rounded-md border">
                      {result.question.correctAnswer}
                    </p>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onRestart} variant="default">
          Take Test Again
        </Button>
      </CardFooter>
    </Card>
  );
}
