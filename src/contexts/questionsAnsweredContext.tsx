import { createContext, ReactNode, useEffect, useState } from "react";




interface QuestionsContextData {
   
}

interface QuestionsProvider {
    children: ReactNode;
}

export const QuestionsAnsweredContext = createContext({} as any);

export function QuestionsAnsweredProvider(props: QuestionsProvider) {
   
    const [answers, setAnswers] = useState<any[]>([] as any[]);
  
    
    
        
   return(
    <QuestionsAnsweredContext.Provider value={{answers, setAnswers}} >
        {props.children}
    </QuestionsAnsweredContext.Provider>
   )
}