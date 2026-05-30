import multer from "multer";
import {tmpdir} from "os"
import { MulterEnum } from "../../../enums/multer.enums.js";
export const uploadFile = ({
storagekey = MulterEnum.diskStorage
}:{
storagekey? : MulterEnum
}) =>
{
        const storage= storagekey === MulterEnum.memoryStorage ? multer.memoryStorage() : multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, tmpdir())
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)+ "."+file.originalname
            cb(null, file.fieldname + '-' + uniqueSuffix)
        }
      })

    return multer({storage})
}