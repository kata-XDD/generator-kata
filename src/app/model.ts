export interface GeneratorContext {
    language: string;
    kotlin?: {
        groupId: string;
        groupPath: string;
        artifactId: string;
        packageName: string;
    };
    java?: {
        version: string;
        groupId: string;
        groupPath: string;
        artifactId: string;
        packageName: string;
    };

}

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface TemplateData {
    [name: string]: any;
}

export class Context<T> {
    private readonly answers: T;

    constructor(answers: T) {
        this.answers = answers;
    }

    get templateContext(): TemplateData {
        return {}; // TODO complete me
    }

    get destinationPathProcessor(): ((path: string) => string) | undefined {
        return undefined; // TODO complete me
    }
}
