function mountComponent<T>(component: T) {
	return mount(component);
}

export type WrapperType<T> = ReturnType<typeof mountComponent<T>>;

// appleDeviceList info

// 定義基礎的數據字段
type BaseDataField = string | number | null;
// 定義所有可能的數據字段，使用聯合類型來處理大小寫差異
type DataFieldKey =
	| 'CPU model' | 'cpu model'
	| 'Hard disk size' | 'hard disk size'
	| 'Screen size' | 'screen size'
	| 'Description' | 'description'
	| 'Generation' | 'generation'
	| 'Price' | 'price'
	| 'Capacity' | 'capacity'
	| 'Color' | 'color'
	| 'Capacity GB' | 'capacity gb'
	| 'Year' | 'year'
	| 'Case Size' | 'case size'
	| 'Strap Colour' | 'strap colour';
// 使用 Record 類型來定義數據對象
type DataObject = Partial<Record<DataFieldKey, BaseDataField>>;

export interface DeleteMsg {
	message: string;
}

// 基礎 AdItem 介面
export interface BaseAdItem {
	name: string;
	data: DataObject | null;
}

export interface AdItemWithId extends BaseAdItem {
	id: string;
}

export interface AdItemDetail extends AdItemWithId {
	createdAt: string;
}

export interface AdItemUpdate extends AdItemWithId {
	updatedAt: string;
}

// 導出四種不同的 AdItem 類型, 如果需要一個通用的 AdItem 類型，可以使用聯合類型
// export type AdItem = AdItemBasic | AdItemWithId | AdItemDetail;

// store
export interface AppleDeviceState {
	list: BaseAdItem[];
	latestItem: AdItemDetail | AdItemUpdate | null;
}

export interface AdListParams {
	id?: string | string[];
	a?: string;
	b?: number;
}
