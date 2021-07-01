export const API_CONFIG_REPOSITORY_TOKEN = 'ApiConfigRepository';

export interface ApiConfigRepository {
    setString(feature: string, path: string, value: string): Promise<void>;
    getString(feature: string, path: string): Promise<string | null>;
}
