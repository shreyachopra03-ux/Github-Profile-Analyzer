import axios from "axios";
import { IGithubRawData, IProfileInsight } from "../interfaces/profileInterface";

export class GithubService {

public async fetchGithubProfile(username: string) {

    try {
        const response = await axios.get<IGithubRawData>(`https://api.github.com/users/${username}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
            }
        });
      
        // console.log("Received info", response.data);

        const rawData = response.data;

        const createdDate = new Date(rawData.created_at);
        const currentDate = new Date();

        const yearsDifference = (currentDate.getFullYear() - createdDate.getFullYear()) * 12;
        const monthsDifference = currentDate.getMonth() - createdDate.getMonth();
        const totalMonths = yearsDifference + monthsDifference;

        const calculatedScore = (rawData.followers * 2) + rawData.public_repos;

        const processedProfile: IProfileInsight = {
            username: rawData.login,
            name: rawData.name,
            followers: rawData.followers,
            publicRepos: rawData.public_repos,
            bio: rawData.bio,
            following: rawData.following,
            accountAgeMonths: totalMonths < 0 ? 0 : totalMonths,
            profileScore: calculatedScore
        }

        return processedProfile;
    } 
    catch (err: any) {
        if (err.response && err.response.status === 404) {
            throw new Error(`Can't find GitHub user ${username} ! Check profile handle`);
        }
        throw new Error(`Problem contacting the GitHub API: ${err.message}`);
    }
}};
