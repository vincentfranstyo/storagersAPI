import type { Request, Response } from 'express';
import express from 'express';
import {body} from 'express-validator';

import * as PerusahaanService from './perusahaan.service';
import {Perusahaan} from './perusahaan.service';

export const perusahaanRouter = express.Router();

perusahaanRouter.get('/', )