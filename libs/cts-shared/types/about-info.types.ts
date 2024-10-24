import { z } from 'zod';
import { aboutInfoBaseSchema, getAboutInfoDefaultSchema, getAboutInfoSchema, updateAboutInfoSchema } from '../schemas/about-info.schemas';

export type GetAboutInfoBaseDto = z.infer<typeof aboutInfoBaseSchema>;
export type GetAboutInfoDto = z.infer<typeof getAboutInfoSchema>;
export type UpdateAboutInfoDto = z.infer<typeof updateAboutInfoSchema>;
export type GetAboutInfoDefaultDto = z.infer<typeof getAboutInfoDefaultSchema>;
