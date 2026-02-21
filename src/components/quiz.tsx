'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { questions, type Question } from '@/lib/questions';
import type { QuizResult } from '@/lib/types';
import { StartScreen } from '@/components/start-screen';
import { QuestionView } from '@/components/question-view';
import { ResultsView } from '@/components/results-view';

type QuizState = 'start' | 'in-progress' | 'results';

export function Quiz() {
  const [quizState, setQuizState] = useState<QuizState>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [results, setResults] = useState<QuizResult[]>([]);

  const handleStart = () => {
    setCurrentQuestionIndex(0);
    setResults([]);
    setQuizState('in-progress');
  };

  const handleRestart = () => {
    setQuizState('start');
  };

  const handleQuestionComplete = (
    userAnswer: string,
    evaluation: QuizResult['evaluation']
  ) => {
    const question = questions[currentQuestionIndex];
    const newResults = [...results, { question, userAnswer, evaluation }];
    setResults(newResults);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizState('results');
    }
  };
  
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={quizState + currentQuestionIndex}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl"
      >
        {quizState === 'start' && <StartScreen onStart={handleStart} />}
        {quizState === 'in-progress' && (
          <QuestionView
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onComplete={handleQuestionComplete}
          />
        )}
        {quizState === 'results' && (
          <ResultsView results={results} onRestart={handleRestart} />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
