import fs from "node:fs"
import multer from "multer"


export const multer_local = ({custiomPath}= {custiomPath : "general"}) => {

    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            const path = `./uploads/${custiomPath}`;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, {recursive: true});
            }
            cb(null, path);
        },
        filename: function (req, file, cb) {
         let prefix = Date.now()
         console.log(file);
         let name = prefix + "-" + file.originalname
         cb(null, name);
         
        }
        
    })
 }
 return multer ({storage})
