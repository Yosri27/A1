
import { GetObjectCommand, ObjectCannedACL, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import {env} from './../config/index.js';
import { MulterEnum } from '../enums/multer.enums.js';
import { createReadStream } from 'fs';
import { Upload } from '@aws-sdk/lib-storage';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export class s3Service {
  private Client: S3Client;

  constructor() {
    this.Client = new S3Client({
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
    contentType: string;
  }){
    if (!file) throw new Error('File is required');
    const key = `socialmedia/${path}/${Math.round(Math.random() * 1e9)}-${file.originalname}`;
    const result = await this.Client.send(new PutObjectCommand({
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
    contentType,
    partSize = 5
  }: {
    storagekey? : MulterEnum
    bucket?: string;
    path?: string;
    file?: Express.Multer.File | undefined;
    ACL ?: ObjectCannedACL;
    contentType?: string;
    partSize? : number;
  }){
    if (!file) throw new Error('File is required');
    const key = `socialmedia/${path}/${Math.round(Math.random() * 1e9)}-${file.originalname}`;
    const result = await new Upload({
      client : this.Client,
      params:
      {
        Bucket : bucket,
        Key : key,
        ACL,
        Body : storagekey === MulterEnum.diskStorage ? file.buffer : createReadStream(file.path),
        ContentType : contentType || file.mimetype 
      },
      partSize : partSize * 1024 *1024
    })

      return await result.done()
  }

  async uploadAssets({
    storagekey = MulterEnum.diskStorage,
    bucket = env.aws_bucket_name,
    path= 'general',
    files,
    ACL = ObjectCannedACL.private,
    contentType,
    originalname
  }: {
    storagekey? : MulterEnum
    bucket?: string;
    path?: string;
    files?: Express.Multer.File[];
    ACL ?: ObjectCannedACL;
    contentType: string;
    originalname? : string;
  }): Promise<{key: string, result: any[]}>{
    if (!files) throw new Error('Files is required');
    const key = `socialmedia/${path}/${Math.round(Math.random() * 1e9)}-${originalname}`;
    
    const result = await Promise.all(files.map (item =>{
      {
       return this.uploadAsset({
        storagekey,
        bucket,
        path,
        file : item,
        ACL,
        contentType
       })  
  }
    }) );
  return {key, result}
    }

 async createPresignedUrl({
    bucket = env.aws_bucket_name,
    path= 'general',
    contentType,
    originalname
  }: {
    bucket?: string;
    path?: string;
    contentType?: string;
    originalname? : string;
  }): Promise<{url :string , key: string}>{
    const key = `socialmedia/${path}/${Math.round(Math.random() * 1e9)}-${originalname}`;
    const result = new PutObjectCommand({
      Bucket: bucket,
      Key: key, 
      ContentType: contentType,
      });
    
      const url = await getSignedUrl(this.Client , result ,{expiresIn: 60*2})
      return {url,key}
  }

    async getAsset({
    
    bucket = env.aws_bucket_name,
    key
  }: { 
    bucket?: string;
    key: string;
      }) {
    const result = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
      });
    return this.Client.send(result);
  }


  }






export const s3service = new s3Service()