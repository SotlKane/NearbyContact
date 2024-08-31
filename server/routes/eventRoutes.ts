import {Router} from 'express';
import {
    changeEventStatusHandler,
    createEventHandler,
    editEventHandler,
    getAllOpenEventHandler, getSpecificEventHandler,
} from '../controllers/eventController';
import {authenticateToken} from "../middleware/authMiddleware.ts";

const router = Router();

router.post('/create', authenticateToken, createEventHandler);
router.post('/edit', authenticateToken, editEventHandler);
router.post('/changeStatus', authenticateToken, changeEventStatusHandler);
router.get('/allEvents', getAllOpenEventHandler);
router.get('/:eventId', getSpecificEventHandler);

export const eventRoutes = router;