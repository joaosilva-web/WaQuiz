import { createContext, ReactNode, useState } from "react";


interface QuestionsProvider {
  children: ReactNode;
}

export const QuestionsAnsweredContext = createContext({} as any);

export function QuestionsAnsweredProvider(props: QuestionsProvider) {
  const [answers, setAnswers] = useState<any[]>([] as any[]);

  function resetAnswers() {
    setAnswers([0]);
  }

  return (
    <QuestionsAnsweredContext.Provider
      value={{ answers, setAnswers, resetAnswers }}
    >
      {props.children}
    </QuestionsAnsweredContext.Provider>
  );
}
