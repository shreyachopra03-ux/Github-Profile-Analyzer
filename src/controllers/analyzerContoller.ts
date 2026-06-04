import { Request, Response } from 'express';
import { GithubService } from '../services/githubService';
import ProfileModel from '../models/profileModel.js';

const AnalyzerController = {

  analyzeProfile: async (req: Request, res: Response): Promise<void> => {
    try {
      const { username } = req.params;

      if (!username) {
        res.status(400).json({ success: false, message: 'Username parameter is required!' });
        return;
      }

      const existingProfile = await ProfileModel.getProfileByUsername(username as string);

      if (existingProfile) {
        res.status(200).json({
          success: true,
          source: 'Database (Cache)',
          data: existingProfile
        });
        return;
      }

      const freshProfileData = await new GithubService().fetchGithubProfile(username as string);

      await ProfileModel.saveProfile(freshProfileData);

      res.status(201).json({
        success: true,
        source: 'GitHub API (Fresh)',
        data: freshProfileData
      });

    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'An internal backend error occurred while analyzing the profile.'
      });
    }
  },

  getHistory: async (req: Request, res: Response): Promise<void> => {
    try {
      const history = await ProfileModel.getAllProfiles();
      
      res.status(200).json({
        success: true,
        count: history.length,
        data: history
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve profile search history: ' + error.message
      });
    }
  },

  getSingleProfile: async (req: Request, res: Response): Promise<void> => {
    try {
      const { username } = req.params;
      const profile = await ProfileModel.getProfileByUsername(username as string);

      if (!profile) {
        res.status(404).json({
          success: false,
          message: `Profile data for '${username}' has not been analyzed yet. Execute a POST request first!`
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: profile
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch the requested profile: ' + error.message
      });
    }
  }
};

export default AnalyzerController;