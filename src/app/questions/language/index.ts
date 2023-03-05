import Generator from 'yeoman-generator';

export interface Answer {
    language: string;
}

export const question: Generator.Question = {
    type: 'list',
    name: 'language' as keyof Answer,
    message: 'What language do you want to use ?',
    choices: [
        'kotlin',
        'java'
    ]
};
