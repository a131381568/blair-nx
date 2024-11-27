// TABLE HEADER
export const MOCK_BASIC_TABLE_HEADER = [
	{
		field: 'id',
		label: '編號',
	},
	{
		field: 'name',
		label: '姓名',
	},
	{
		field: 'email',
		label: '信箱',
	},
	{
		field: 'phone',
		label: '電話',
	},
	{
		field: 'country',
		label: '國家',
	},
];

export const MOCK_CUSTOM_TD_TABLE_HEADER = [
	{
		field: 'name',
		label: '姓名',
	},
	{
		field: 'phone',
		label: '電話',
	},
	{
		field: 'country',
		label: '國家',
	},
];

export const MOCK_FIXED_COL_TABLE_HEADER = [
	{
		field: 'id',
		label: '編號',
		fixed: true,
		width: '350px',
	},
	{
		field: 'name',
		label: '姓名',
		fixed: false,
		width: '200px',
	},
	{
		field: 'email',
		label: '信箱',
		fixed: false,
		width: '500px',
	},
	{
		field: 'phone',
		label: '電話',
		fixed: false,
		width: '100px',
	},
	{
		field: 'country',
		label: '國家',
		fixed: false,
		width: '100px',
	},
];

export const MOCK_SORTABLE_TABLE_HEADER = [
	{
		field: 'id',
		label: '編號',
		sortable: false,
	},
	{
		field: 'date',
		label: '日期',
		sortable: true,
	},
];

// TABLE DATA
export const MOCK_BASIC_TABLE_DATA = [
	{
		id: '4ec84f2e-ba84-434c-bd47-66919446123a',
		name: 'Kettie Drysdall',
		email: 'kdrysdall0@cdc.gov',
		phone: '852-554-0649',
		country: 'Portugal',
	},
	{
		id: 'c416f62b-99cc-4be0-83a6-2135cbf0a1f2',
		name: 'Kendall Manicomb',
		email: 'kmanicomb1@dagondesign.com',
		phone: '148-465-6417',
		country: 'Japan',
	},
	{
		id: 'b35247ca-c95d-4175-9630-c083b1b192b3',
		name: 'Talbot Rosewell',
		email: 'trosewell2@hugedomains.com',
		phone: '183-874-2456',
		country: 'Poland',
	},
	{
		id: 'bee3c482-447c-4917-9d20-8c2af3dbcc2f',
		name: 'Kirby Antoniutti',
		email: 'kantoniutti3@phoca.cz',
		phone: '375-305-5781',
		country: 'Russia',
	},
	{
		id: '188a7178-3bbd-4cd6-a955-280299f1e140',
		name: 'Pammie McGeouch',
		email: 'pmcgeouch4@g.co',
		phone: '328-653-5656',
		country: 'China',
	},
	{
		id: '3cf1b116-08d8-42d1-a6d0-7312024a6b3f',
		name: 'Tabatha Bulfoy',
		email: 'tbulfoy5@csmonitor.com',
		phone: '548-489-3061',
		country: 'Philippines',
	},
	{
		id: '8eb2af2f-2b4d-4675-a03f-c84751c13c6c',
		name: 'Roxanne Dast',
		email: 'rdast6@github.com',
		phone: '875-516-4527',
		country: 'East Timor',
	},
];

export const MOCK_CUSTOM_TD_TABLE_DATA = [
	{
		id: '4ec84f2e-ba84-434c-bd47-66919446123a',
		name: 'Kettie Drysdall',
		email: 'kdrysdall0@cdc.gov',
		phone: '852-554-0649',
		country: 'Portugal',
	},
	{
		id: 'c416f62b-99cc-4be0-83a6-2135cbf0a1f2',
		name: 'Kendall Manicomb',
		email: 'kmanicomb1@dagondesign.com',
		phone: '148-465-6417',
		country: 'Japan',
	},
];

export const MOCK_FIXED_COL_TABLE_DATA = [
	{
		id: '4ec84f2e-ba84-434c-bd47-66919446123a',
		name: 'Kettie Drysdall',
		email: 'kdrysdall0@cdc.gov',
		phone: '852-554-0649',
		country: 'Portugal',
	},
	{
		id: 'c416f62b-99cc-4be0-83a6-2135cbf0a1f2',
		name: 'Kendall Manicomb',
		email: 'kmanicomb1@dagondesign.com',
		phone: '148-465-6417',
		country: 'Japan',
	},
];

export const MOCK_SORTABLE_TABLE_DATA = [
	{ id: 'bd756ffc-8d67-4ead-95dc-b507ecbe15d5', date: '2023-01-15' },
	{ id: '1ca0435f-775a-45cf-9894-880d2c56eb2e', date: '2023-09-18' },
	{ id: '9f479657-a185-473f-8012-c5867077cba4', date: '2023-11-25' },
	{ id: '20eb9e82-de26-45c6-a31d-45e19d77666e', date: '2023-03-13' },
	{ id: 'a8611718-2e77-4a2a-8e73-78b3d9fede7e', date: '2022-11-28' },
	{ id: '5f29db74-0162-4053-870c-1f9a8e0ff10a', date: '2023-03-08' },
];
