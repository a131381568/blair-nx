import type { z } from 'zod';
import type {
	adItemDetailSchema,
	adItemUpdateSchema,
	adItemWithIdSchema,
	adListParamsSchema,
	appleDeviceStateSchema,
	baseAdItemSchema,
} from '@demo-src/types/schemas/appleDeviceSchema';

// test utils
function mountComponent<T>(component: T) {
	return mount(component);
}
export type WrapperType<T> = ReturnType<typeof mountComponent<T>>;

// apple
export type BaseAdItem = z.infer<typeof baseAdItemSchema>;
export type AdItemWithId = z.infer<typeof adItemWithIdSchema>;
export type AdItemDetail = z.infer<typeof adItemDetailSchema>;
export type AdItemUpdate = z.infer<typeof adItemUpdateSchema>;
export type AppleDeviceState = z.infer<typeof appleDeviceStateSchema>;
export type AdListParams = z.infer<typeof adListParamsSchema>;
