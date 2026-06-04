
export interface IGithubRawData {
    login : string,
    avatar_url: string,
    url: string,
    name: string,
    public_repos: number,
    followers: number,
    following: number,
    created_at: string,
    bio: string | null,
}

export interface IProfileInsight {
    username: string,
    name: string | null,
    followers: number,
    following: number
    publicRepos: number,
    bio: string | null,
    accountAgeMonths: number;
    profileScore: number;
}

