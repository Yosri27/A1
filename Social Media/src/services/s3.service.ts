
import { ObjectCannedACL, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import {env} from './../config/index.js';
import { MulterEnum } from '../enums/multer.enums.js';
import { createReadStream } from 'fs';

export class s3Service {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
         region: env.aws_region,
            credentials: {
              accessKeyId: env.AWS_ACCESS_KEY_ID,
              secretAccessKey: env.AWS_SECRET_ACCESS_KEY
            }
        });
  }

  async uploadAsset({
    storagekey = MulterEnum.diskStorage,
    bucket = env.aws_bucket_name,
    path= 'general',
    file,
    ACL = ObjectCannedACL.private,
    contentType
  }: {
    storagekey? : MulterEnum
    bucket?: string;
    path?: string;
    file?: Express.Multer.File;
    ACL ?: ObjectCannedACL;
    contentType?: string;
  }){
    if (!file) throw new Error('File is required');
    const key = `socialmedia/${path}/${Math.round(Math.random() * 1e9)}-${file.originalname}`;
    const result = await this.s3Client.send(new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ACL: ACL,
      Body: storagekey === MulterEnum.diskStorage ? file.buffer : createReadStream(file.path), 
      ContentType: contentType || file.mimetype,
      }));
    return result;
  }


    async uploadBigAsset({
    storagekey = MulterEnum.diskStorage,
    bucket = env.aws_bucket_name,
    path= 'general',
    file,
    ACL = ObjectCannedACL.private,
    contentType
  }: {
    storagekey? : MulterEnum
    bucket?: string;
    path?: string;
    file?: Express.Multer.File | undefined;
    ACL ?: ObjectCannedACL;
    contentType?: string;
  }){
    if (!file) throw new Error('File is required');
    const key = `socialmedia/${path}/${Math.round(Math.random() * 1e9)}-${file.originalname}`;
  
  }
}

export const s3service = new s3Service()