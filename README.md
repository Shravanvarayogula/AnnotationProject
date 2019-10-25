# AnnotationProject
Image Upload and Annotations Portal

// The Entry Point Files to the application are located in the Views Folders. 
//Folders Destination to create new folders : /public/uploads/createFolders
//Folders Destination to upload new images: /public/uploads/createFolders/ {UsercreatedFolder}

//Application Entry Point File : index.ejs
//Application Image Uploader File: Imageuploader.ejs


Application Entry Point File : index.ejs
Step 1: User use this as entry page to create a Project as per user input into the text area. 

Step 2: User can Creates a New Folder upon use clicking the create folder button on entry page 

Application Image uploading Page : imageuploader.ejs
Step 3: Users will land in the Image uploader page 

User can select Multiple Images of size upto 10 Images and Clicks on Upload Images button on the same page

Step 4: Retrieves Images to Annotate using Retreive Images button on ImageUploader page itself. 

Step 5: User Annotates the Images using selector drop down and the Images will be saved with Name Appended with dropdowns ("Car","Bus","Truck ") and the Coordinates of the anntotator box. 

// Managers retrieval of the uploaded annotated Images
Step 1: The Annotated images are presented directly to the manager using Ftp Module using the link (http://localhost:2000/ftp/uploads/ ) but can be displayed into HTML Page along with the CSV format to download the image information. 


