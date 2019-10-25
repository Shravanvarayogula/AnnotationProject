    const express = require('express');
    const multer = require('multer');
    const path = require('path');
    const ejs = require('ejs');
    const fs = require('fs');
    const helpers = require('./helpers');
    const bodyParser = require('body-parser'); 
    const serveIndex = require('serve-index');
    const urlEncodedParser = bodyParser.urlencoded({ extended: false });
    const debug = require('debug')('myapp:server');
    const cors = require('cors')
    const logger = require('morgan');
    const router = express.Router();

   //init App 
    const app = express();
    
   // Accessin port 
   const PORT = process.env.PORT || 2000;
   app.listen(PORT,()=> {console.log(`Server Listening on PORT ${PORT}`)}); 
    // creating a router to handle routing request
     app.use('/',router);
     app.use(cors())
    //  Set storage using Multer
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './public/uploads/createfolders/');
        },
            // By default, multer removes file extensions so let's add them back

        filename : function(req,file,cb){
         cb(null,file.fieldname+'_'+Date.now()+path.extname(file.originalname));
        }
    })
    const imageFilter = function(req, file, cb) {
        // Accept images only
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    };
    exports.imageFilter = imageFilter;
    //Init Upload
    const upload = multer({
        storage:storage,
        limits:{fileSize:10000000000000000},
        fileFilter: function(req,file,cb){
            checkFileType(file,cb);
        } 
    }).array('myImage',10);     
 
    router.get('/',urlEncodedParser,function(req,res){
   //  const newfoldername = req.body.projectname;
   //  console.log(newfoldername)
     res.render('index')   
     //, {data : {entry}}
    })  
    // Need to set the view engine Here EJS
    app.set('view engine', 'ejs');
    //Set Public Folder where all the public files are exposed for access
    app.use(express.static('./public'));
    //
    

     
 app.get('/uploads/createfolders/', (req,res) =>{
        fs.readFile(path.join(__dirname,'public',))
    })
  
    
 router.post('/createfolders',urlEncodedParser,(req,res)=>{
       const newfoldername = req.body.projectname;
       if  (fs.existsSync(`/public/uploads/createfolders/${newfoldername}`)){
            res.render('index',{
            entry: `${newfoldername} Exists. Please consider a Different Name`
        })
    }
        else {
         fs.mkdir(path.join(__dirname, `/public/uploads/createfolders/${newfoldername}/`), {}, err=>{
        if (err) throw err;
       else {
        res.render('imageuploader', { //imageuploader
             entry: `${newfoldername}`   
            }
            ),
            console.log(path.join(__dirname, `/public/uploads/createfolders/${newfoldername}'`))      
             }
    });
}
})
router.post('/upload-multiple-images', (req, res) => {
    // 10 is the limit I've defined for number of uploaded files at once
    // 'multiple_images' is the name of our file input field
    let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).array('multiple_images', 10);

    upload(req, res, function(err) {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.render('imageuploader');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
        
        let result = "You have uploaded  these images: <hr />";
        const files = req.files;
        let index, len;
       
        // Loop through all the uploaded images and display them on frontend
        for (index = 0, len = files.length; index < len; ++index) {
            result += `<img src="${files[index].path}" width="300" style="margin-right: 20px;">`;
        }
        result += '<hr/><a href="./">Upload more images</a>';
        res.send(result);
    });
});
 
   // serving files 
  
    app.use('/ftp', express.static('public'), serveIndex('public', {'icons': true}));
  //  const userRouter =require('./routes/user.route');
    app.use(logger('tiny'));
    app.use(express.json());
    app.use('/ftp', express.static('public'), serveIndex('public', {'icons': true}));
  //  app.use('/users', userRouter);