import pool from '../config/db.js';
import { IProfileInsight } from '../interfaces/profileInterface.js';

const ProfileModel = {
  saveProfile: async (profile: IProfileInsight & { following: number }): Promise<void> => {

    const query = `
      INSERT INTO github_profiles (
        username, name, bio, public_repos, followers, following, account_age_months, profile_score
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?) 
      ON DUPLICATE KEY UPDATE 
        name = VALUES(name),
        bio = VALUES(bio),
        public_repos = VALUES(public_repos),
        followers = VALUES(followers),
        following = VALUES(following),
        account_age_months = VALUES(account_age_months),
        profile_score = VALUES(profile_score)
    `;

    const values = [
      profile.username,
      profile.name,
      profile.bio,
      profile.publicRepos,
      profile.followers,
      profile.following, 
      profile.accountAgeMonths,
      profile.profileScore
    ];

    await pool.query(query, values);
  },

  getProfileByUsername: async (username: string): Promise<any | null> => {
    const query = `SELECT * FROM github_profiles WHERE username = ?`;
    const [rows]: any = await pool.query(query, [username]);

    if (rows.length === 0) {
      return null;
    }

    const row = rows[0];
    return {
      username: row.username,
      name: row.name,
      bio: row.bio,
      publicRepos: row.public_repos,
      followers: row.followers,
      following: row.following,
      accountAgeMonths: row.account_age_months,
      profileScore: row.profile_score
    };
  },

  getAllProfiles: async (): Promise<any[]> => {
    const query = `SELECT * FROM github_profiles ORDER BY created_at DESC`;
    const [rows]: any = await pool.query(query);

    return rows.map((row: any) => ({
      username: row.username,
      name: row.name,
      bio: row.bio,
      publicRepos: row.public_repos,
      followers: row.followers,
      following: row.following,
      accountAgeMonths: row.account_age_months,
      profileScore: row.profile_score
    }));
  }
};

export default ProfileModel;