import { Injectable, NotFoundException, UnsupportedMediaTypeException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService {
    private readonly allowedExtensions = new Set(['.jpg', '.jpeg', '.png']);

    validateFile(file: Express.Multer.File): void {    
        const fileExtension = path.extname(file.originalname).toLowerCase();
        if (!this.allowedExtensions.has(fileExtension)) {
            throw new UnsupportedMediaTypeException(
                `Invalid file type. Allowed types are: ${Array.from(this.allowedExtensions).join(', ')}`,
            );
        }
    }

    saveFile(file: Express.Multer.File, uploadDir: string): string {
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const uniqueFileName = `${uuidv4()}${path.extname(file.originalname)}`;
        const filePath = path.join(uploadDir, uniqueFileName);
        
        fs.writeFileSync(filePath, file.buffer);
    
        return uniqueFileName;
    }

    removeFile(imageUrl: string): void {
        const fileName = path.basename(imageUrl);
        const filePath = path.join(__dirname, '../../uploads/', fileName);

        if (fs.existsSync(filePath)) {
            try {
                fs.unlinkSync(filePath);
            } catch (error) {
                throw new Error(`Error deleting file: ${error.message}`);
            }
        } else {
            throw new NotFoundException(`File not found: ${filePath}`);
        }
    }
}