import { z } from 'zod';

/** --------- apple --------- */

// 定義基礎的數據字段
const baseDataFieldSchema = z.union([z.string(), z.number(), z.null()]);

// 定義所有可能的數據字段，使用聯合類型來處理大小寫差異
const dataObjectSchema = z.object({
	'CPU model': baseDataFieldSchema.optional(),
	'cpu model': baseDataFieldSchema.optional(),
	'Hard disk size': baseDataFieldSchema.optional(),
	'hard disk size': baseDataFieldSchema.optional(),
	'Screen size': baseDataFieldSchema.optional(),
	'screen size': baseDataFieldSchema.optional(),
	'Description': baseDataFieldSchema.optional(),
	'description': baseDataFieldSchema.optional(),
	'Generation': baseDataFieldSchema.optional(),
	'generation': baseDataFieldSchema.optional(),
	'Price': baseDataFieldSchema.optional(),
	'price': baseDataFieldSchema.optional(),
	'Capacity': baseDataFieldSchema.optional(),
	'capacity': baseDataFieldSchema.optional(),
	'Color': baseDataFieldSchema.optional(),
	'color': baseDataFieldSchema.optional(),
	'Capacity GB': baseDataFieldSchema.optional(),
	'capacity gb': baseDataFieldSchema.optional(),
	'Year': baseDataFieldSchema.optional(),
	'year': baseDataFieldSchema.optional(),
	'Case Size': baseDataFieldSchema.optional(),
	'case size': baseDataFieldSchema.optional(),
	'Strap Colour': baseDataFieldSchema.optional(),
	'strap colour': baseDataFieldSchema.optional(),
}).partial();

// 基礎 AdItem 介面
const baseAdItemSchema = z.object({
	name: z.string(),
	data: dataObjectSchema.nullable(),
});

const adItemWithIdSchema = baseAdItemSchema.extend({
	id: z.string(),
});

const adItemDetailSchema = adItemWithIdSchema.extend({
	createdAt: z.string(),
});

const adItemUpdateSchema = adItemWithIdSchema.extend({
	updatedAt: z.string(),
});

const listResSchema = z.array(adItemWithIdSchema);

const delResErrorSchema = z.object({
	error: z.string(),
});

const delResSuccessSchema = z.object({
	message: z.number(),
});

/** --------- store --------- */
const appleDeviceStateSchema = z.object({
	list: z.array(baseAdItemSchema),
	latestItem: z.union([adItemDetailSchema, adItemUpdateSchema, z.null()]),
});

const adListParamsSchema = z.object({
	id: z.union([z.string(), z.array(z.string())]).optional(),
	a: z.string().optional(),
	b: z.number().optional(),
});

export {
	baseDataFieldSchema,
	dataObjectSchema,
	baseAdItemSchema,
	adItemWithIdSchema,
	adItemDetailSchema,
	adItemUpdateSchema,
	appleDeviceStateSchema,
	adListParamsSchema,
	delResErrorSchema,
	delResSuccessSchema,
	listResSchema,
};
