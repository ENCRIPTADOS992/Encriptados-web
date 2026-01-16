import { z } from 'zod';

export const roamingCheckoutSchema = z.object({
  product_id: z.number().int().positive(),
  qty: z.number().int().positive(),
  email: z.string().email(),
  payment_provider: z.enum(['stripe','kriptomus']).default('stripe'),
  amount: z.number().positive(),
  currency: z.string().min(3),
  variant_id: z.number().int().positive().optional(),
  sku: z.string().min(1).optional(),
  licensetime: z.union([z.number().int().nonnegative(), z.string().min(1)]).optional(),
  coupon_code: z.string().min(1).optional(),
  discount: z.number().nonnegative().optional(),
  source_url: z.string().min(1).optional(),
  selected_option: z.number().int().positive().optional(),
  silent_phone_mode: z.string().min(1).optional(),
  usernames: z.array(z.string().min(1)).optional(),
  meta: z.record(z.string(), z.any()).optional(),
});

export const userIdCheckoutSchema = z.object({
  product_id: z.number().int().positive(),
  email: z.string().email(),
  username: z.string().min(1).optional(),
  payment_provider: z.enum(['stripe','kriptomus']).default('stripe'),
  amount: z.number().positive(),
  currency: z.string().min(3),
  qty: z.number().int().positive().optional(),
  variant_id: z.number().int().positive().optional(),
  sku: z.string().min(1).optional(),
  licensetime: z.union([z.number().int().nonnegative(), z.string().min(1)]).optional(),
  license_type: z.enum(['new', 'renew']).optional(),
  renew_id: z.string().min(1).optional(),
  os_type: z.enum(['android', 'ios']).optional(),
  silent_phone_mode: z.string().min(1).optional(),
  usernames: z.array(z.string().min(1)).optional(),
  coupon_code: z.string().min(1).optional(),
  discount: z.number().nonnegative().optional(),
  source_url: z.string().min(1).optional(),
  selected_option: z.number().int().positive().optional(),
  meta: z.record(z.string(), z.any()).optional(),
});

export const webhookSchema = z.object({
  provider_ref: z.string().min(1),
  status: z.enum(['paid'])
});

export const adminCompleteSchema = z.object({
  final_username: z.string().min(3),
  final_password: z.string().min(8)
});

export const adminAddLicensesSchema = z.object({
  product_id: z.number().int().positive(),
  licenses: z.array(z.string().min(1)).min(1)
});
