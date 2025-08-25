import { z } from 'zod';

export const roamingCheckoutSchema = z.object({
  product_id: z.number().int().positive(),
  qty: z.number().int().positive(),
  email: z.string().email(),
  payment_provider: z.enum(['stripe','kriptomus']).default('stripe'),
  amount: z.number().positive(),
  currency: z.string().min(3)
});

export const userIdCheckoutSchema = z.object({
  product_id: z.number().int().positive(),
  email: z.string().email(),
  username: z.string().min(1).optional(),
  payment_provider: z.enum(['stripe','kriptomus']).default('stripe'),
  amount: z.number().positive(),
  currency: z.string().min(3)
});

export const webhookSchema = z.object({
  provider_ref: z.string().min(1),
  status: z.enum(['paid'])
});

export const adminCompleteSchema = z.object({
  final_username: z.string().min(3),
  final_password: z.string().min(8)
});
