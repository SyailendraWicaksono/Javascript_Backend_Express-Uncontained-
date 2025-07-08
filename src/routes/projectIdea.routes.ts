import express from 'express';
import {
  getProjectIdeas,
  getProjectIdeaById,
  createProjectIdea,
  updateProjectIdea,
  deleteProjectIdea
} from '../controllers/projectIdea.controller';
import { validate } from '../middlewares/validate';
import {
  createProjectIdeaSchema,
  updateProjectIdeaSchema
} from '../validations/projectIdea.validation';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

router.get('/', getProjectIdeas);
router.get('/:id', getProjectIdeaById);
router.post('/', createProjectIdea);
router.put('/:id', updateProjectIdea);
router.delete('/:id', deleteProjectIdea);
router.post('/', validate(createProjectIdeaSchema), createProjectIdea);
router.put('/:id', validate(updateProjectIdeaSchema), updateProjectIdea);
router.post('/', authenticate, validate(createProjectIdeaSchema), createProjectIdea);
router.put('/:id', authenticate, validate(updateProjectIdeaSchema), updateProjectIdea);
router.delete('/:id', authenticate, deleteProjectIdea);

export default router;