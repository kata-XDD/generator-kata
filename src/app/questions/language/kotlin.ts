import Generator from 'yeoman-generator';
import { kebabCaseValidation, nonBlankValidation, validateWith } from '@clowder-generator/utils';

export interface Answer {
    // kotlinPackageName
    // mavenArtifactId
    // mavenScenarioName
    artifactId: string;
}

export const question: Generator.Question = {
    type: 'input',
    name: 'artifactId' as keyof Answer,
    message: 'What will the artifactId will be ?',
    validate: validateWith([
        nonBlankValidation('ArtifactId cannot be blank'),
        kebabCaseValidation('ArtifactId must be in kebab-case')
    ], {
        trimmed: true
    })
};
