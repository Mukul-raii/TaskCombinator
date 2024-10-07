
import multer from "multer";
import path from 'path'
import { v2 as cloudinary } from "cloudinary";

import { dirname,join } from "path";
import fs from 'fs'


const FileUpload=async (req,res,next)=>{
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, "./uploads");
        },
        filename: function (req, file, cb) {
            const ext = path.extname(file.originalname); // get the file extension
            const fileName = file.fieldname + '-' + Date.now() + ext; // custom file name with timestamp
            cb(null, fileName); // store with original extension
          },
      });

let data;
    
      const upload = multer({ storage });

     upload.single("file")(req, res, async (err) => {
        if (err instanceof multer.MulterError) {313
            // A Multer error occurred when uploading
            console.log("process1");

            return res.status(400).json({ error: err.message });
        } else if (err) {
            console.log("process2");

            // An unknown error occurred when uploading
            return res.status(400).json({ error: err.message });
        }

   
        if (!req.file) {
            console.log("process4");
            return res.status(400).json({ error: "No file uploaded" });
        }

        req.data=req.file;

       next()
    })
    
    
  
}

  
 export default FileUpload
  
