import { Buffer } from 'node:buffer';
import { Injectable, Logger } from '@nestjs/common';
import { PutObjectCommand, PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { generateShortUUID } from '../../utils/tool.util';

@Injectable()
export class FileService {
	private readonly logger = new Logger(FileService.name);
	private readonly s3Client: S3Client;

	constructor(private configService: ConfigService) {
		const AWS_REGION = this.configService.get('AWS_REGION');
		const AWS_ACCESS_KEY_ID = this.configService.get('AWS_ACCESS_KEY_ID');
		const AWS_SECRET_ACCESS_KEY = this.configService.get('AWS_SECRET_ACCESS_KEY');
		this.s3Client = new S3Client({
			region: AWS_REGION,
			credentials: {
				accessKeyId: AWS_ACCESS_KEY_ID,
				secretAccessKey: AWS_SECRET_ACCESS_KEY,
			},
		});
	}

	async uploadFile(file: Express.Multer.File): Promise<string> {
		const AWS_S3_BUCKET_NAME = this.configService.get('AWS_S3_BUCKET_NAME');
		const AWS_REGION = this.configService.get('AWS_REGION');
		const FILE_NAME = `${generateShortUUID()}-${file.originalname}`;
		const uploadParams: PutObjectCommandInput = {
			Bucket: AWS_S3_BUCKET_NAME,
			Key: FILE_NAME,
			Body: file.buffer instanceof Buffer ? file.buffer : Buffer.from(file.buffer),
			ContentType: file.mimetype,
		};

		try {
			const command = new PutObjectCommand(uploadParams);
			const response = await this.s3Client.send(command);
			// Construct the S3 URL manually since the PutObjectCommand doesn't return it directly
			const OBJECT_KEY = encodeURIComponent(FILE_NAME);
			const s3Url = `https://${AWS_S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${OBJECT_KEY}`;

			if (response.$metadata.httpStatusCode === 200)
				return s3Url;
			return '';
		}
		catch (err) {
			this.logger.error('Error uploading file to S3', err);
			throw new Error('File upload failed');
		}
	}
}
