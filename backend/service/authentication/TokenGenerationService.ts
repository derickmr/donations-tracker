export interface TokenGenerationService {
    generate(): Promise<string>;
}