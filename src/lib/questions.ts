export type Question = {
  id: number;
  questionText: string;
  correctAnswer: string;
};

export const questions: Question[] = [
  {
    id: 1,
    questionText: 'What is the function of the mitochondria in a cell?',
    correctAnswer:
      'The mitochondrion is an organelle found in the cells of most eukaryotes. It is often referred to as the "powerhouse" of the cell because it generates most of the cell\'s supply of adenosine triphosphate (ATP), used as a source of chemical energy.',
  },
  {
    id: 2,
    questionText: 'Briefly explain the concept of photosynthesis.',
    correctAnswer:
      'Photosynthesis is a process used by plants, algae, and some bacteria to convert light energy into chemical energy, through a process that converts carbon dioxide and water into glucose (sugar) and oxygen.',
  },
  {
    id: 3,
    questionText: 'What is the capital of Japan?',
    correctAnswer: 'The capital of Japan is Tokyo.',
  },
  {
    id: 4,
    questionText: 'What is a blockchain?',
    correctAnswer:
      'A blockchain is a decentralized, distributed, and often public, digital ledger consisting of records called blocks that is used to record transactions across many computers so that any involved block cannot be altered retroactively, without the alteration of all subsequent blocks.',
  },
];
