import { Rocket } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type StartScreenProps = {
  onStart: () => void;
};

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <Card className="w-full">
      <CardHeader className="items-center text-center">
        <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
          <Rocket className="w-8 h-8 text-primary" />
        </div>
        <CardTitle className="text-3xl font-bold tracking-tight mt-2">
          Welcome to TestPilot
        </CardTitle>
        <CardDescription className="max-w-md">
          Ready to test your knowledge? This is a short, AI-graded quiz. Take a
          deep breath and let's begin!
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full" size="lg" onClick={onStart}>
          Start Test
        </Button>
      </CardFooter>
    </Card>
  );
}
