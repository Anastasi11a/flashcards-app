export type Card = {
    id: string;
    question: string;
    answer: string;
};

export type Deck = {
    id: string;
    title: string;
    cards: Card[];
};

export const initialDecks: Deck[] = [
    {
        id: '1',
        title: 'JavaScript Basics',
        cards: [
            { 
                id: '1', 
                question: 'What is a closure?', 
                answer: 'A function that retains access to variables in its lexical scope.' 
            },
            { 
                id: '2', 
                question: 'What is hoisting?', 
                answer: 'JavaScript moves declarations to the top of the scope.' 
            },
        ],
    },
    {
        id: '2',
        title: 'React Native',
        cards: [
            { 
                id: '1', 
                question: 'What is a component?', 
                answer: 'Reusable piece of UI in React.' 
            },
            { 
                id: '2', 
                question: 'What is useState?', 
                answer: 'A hook to manage state in functional components.' 
            },
        ],
    },
];
