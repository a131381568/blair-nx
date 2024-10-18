declare namespace Express {
	namespace Multer {
		interface File {
			fieldname: string;
			originalname: string;
			encoding: string;
			mimetype: string;
			size: number;
			destination: string;
			filename: string;
			path: string;
			buffer: typeof import('buffer').Buffer;
		}
	}
}

declare const Buffer;
