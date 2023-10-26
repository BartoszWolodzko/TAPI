import express from 'express';
import getPlan from "../controllers/plan/getPlan";

const plan = express.Router()

plan.get('/', getPlan)

export default plan