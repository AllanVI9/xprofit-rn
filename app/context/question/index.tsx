import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the Question type
import { Question } from '@/services/question-interface';

// Define the shape of the context
type QuestionContextType = {
  question: Question | null;
  setQuestion: (user: Question | null) => void;
};

// Create the QuestionContext
const QuestionContext = createContext<QuestionContextType | undefined>(undefined);

// QuestionProvider component to wrap app and provide question state
const QuestionProvider = ({ children }: { children: ReactNode }) => {
  const [question, setQuestion] = useState<Question | null>(null);
  return (
    <QuestionContext.Provider value={{ question, setQuestion }}>
      {children}
    </QuestionContext.Provider>
  );
};

// Custom hook to use UserContext
export const useQuestionContext = () => {
  const context = useContext(QuestionContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};

export { QuestionProvider };
export default useQuestionContext;
