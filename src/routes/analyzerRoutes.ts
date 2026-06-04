import { Router } from 'express';
import AnalyzerController from '../controllers/analyzerContoller';

const router = Router();

router.post('/:username', AnalyzerController.analyzeProfile);

router.get('/', AnalyzerController.getHistory);

router.get('/:username', AnalyzerController.getSingleProfile);

export default router;