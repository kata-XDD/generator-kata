import Generator from 'yeoman-generator';
import { Validator } from '@clowder-generator/utils';

export interface Answer {
    name: string;
}

export const question: Generator.Question = {
    type: 'input',
    name: 'name' as keyof Answer,
    message: 'What will be the name of the application ?',
    default: 'application name',
    validate: Validator.nonBlankValidation('The package name should not be empty')
};
