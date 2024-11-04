import { BadRequestException, Controller, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { FILE_CONFIG, fileContract } from '@cts-shared';
import { NestResponseShapes, TsRestHandler, nestControllerContract, tsRestHandler } from '@ts-rest/nest';
import { FileService } from './file.service';

const UPLOAD = 'uploadFile';
const c = nestControllerContract(fileContract);
type ResponseShapes = NestResponseShapes<typeof c>;

@Controller()
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@UseGuards(AuthGuard('jwt'))
	@UseInterceptors(
		FileInterceptor('file', {
			limits: { fileSize: FILE_CONFIG.SIZE_LIMIT },
			fileFilter: (req, file, callback) => {
				if (!file.mimetype.match(`\/(${FILE_CONFIG.ACCEPT_TYPE.join('|')})$`)) {
					return callback(new BadRequestException('Unsupported file type'), false);
				}
				callback(null, true);
			},
		}),
	)
	@TsRestHandler(c[UPLOAD])
	async uploadFile(@UploadedFile() file: Express.Multer.File) {
		return tsRestHandler(c[UPLOAD], async (_reqInfo): Promise<ResponseShapes[typeof UPLOAD]> => {
			if (!file) {
				throw new BadRequestException('File is required');
			}
			const uploadResult = await this.fileService[UPLOAD](file);
			return { status: 200, body: uploadResult || '' };
		});
	}
}
