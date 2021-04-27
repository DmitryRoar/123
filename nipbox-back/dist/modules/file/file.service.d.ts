/// <reference types="node" />
export default class FileService {
    saveFile(fileName: string, type: 'shopitem' | 'video' | 'shopitem-slide' | 'blog', file: {
        buffer: Buffer;
    }): void;
}
