import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

const BASE_UPLOAD_DIR = join(process.cwd(), 'uploads');

function ensureDirectory(path: string) {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
}

function resolveUploadPath(subDirectory?: string) {
  return subDirectory ? join(BASE_UPLOAD_DIR, subDirectory) : BASE_UPLOAD_DIR;
}

function createImageUploadConfig(subDirectory?: string) {
  return {
    storage: diskStorage({
      destination: (_req, _file, callback) => {
        const destinationPath = resolveUploadPath(subDirectory);
        ensureDirectory(destinationPath);
        callback(null, destinationPath);
      },
      filename: (_req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),
    fileFilter: (
      _req: unknown,
      file: { mimetype: string },
      callback: (error: Error | null, acceptFile: boolean) => void,
    ) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
      }
      callback(null, true);
    },
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
    },
  };
}

export const imageUploadConfig = createImageUploadConfig();

export function buildPublicFilePath(
  filename: string,
  subDirectory?: string,
): string {
  const segments = ['uploads'];
  if (subDirectory) {
    segments.push(subDirectory);
  }
  segments.push(filename);
  return `/${segments.join('/').replace(/\\/g, '/')}`;
}
