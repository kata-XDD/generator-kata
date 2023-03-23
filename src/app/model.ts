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
