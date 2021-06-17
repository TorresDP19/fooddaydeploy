const 
    express = require ('express'),
    app = express.Router(),
    Users_Controllers = require ('../controllers/users_controllers'),
    Products_Controllers = require ('../controllers/products_controllers'),
    Cart_Controllers = require ('../controllers/cart_controllers'),
    Course_Controllers = require ('../controllers/course_controllers'),
    Module_Controllers = require ('../controllers/module_controllers'),
    Content_Controllers = require ('../controllers/content.controllers'),
    Pdf_Controllers = require ('../controllers/pdfs_controllers'),
    Video_Controllers = require ('../controllers/videos_controllers'),
    Quiz_Controllers = require ('../controllers/quiz_controller');
    multipart = require ('connect-multiparty'),
    md_upload = multipart({uploadDir: './uploads/products'}),
    md_upload_files = multipart({uploadDir: './uploads/files'}),
    md_upload_videos = multipart({uploadDir: './uploads/videos'}),
    md_auth = require ('../middlewares/authentication')
;


app.post('/sign-up', Users_Controllers.RegisterAccount);
app.post('/login', Users_Controllers.LoginAccount);

app.post('/new-product', [md_auth.ensureAuth], Products_Controllers.addProduct);
app.post('/add-image/:id', [md_auth.ensureAuth, md_upload], Products_Controllers.uploadImage);
app.put('/update-product/:id', [md_auth.ensureAuth], Products_Controllers.updateProduct);
app.delete('/delete-product/:id', [md_auth.ensureAuth], Products_Controllers.deleteProduct);
app.get('/get-product/:id', Products_Controllers.getProduct);
app.get('/get-all-products/:page?', Products_Controllers.getAllProducts);
app.get('/get-image-product/:imageFile', Products_Controllers.getImage);


app.post('/new-product-cart', [md_auth.ensureAuth], Cart_Controllers.addProduct)


app.post('/add-new-course', [md_auth.ensureAuth], Course_Controllers.addCourse);
app.get('/get-course/:id', [md_auth.ensureAuth, md_upload], Course_Controllers.getCourse);
app.get('/get-courses/:page?', Course_Controllers.getCourses);
app.post('/add-image-course/:id', [md_auth.ensureAuth, md_upload], Course_Controllers.uploadImage);
app.put('/update-course/:id', [md_auth.ensureAuth], Course_Controllers.updateCourse);
app.delete('/delete-course/:id', [md_auth.ensureAuth], Course_Controllers.deleteCourse);
app.get('/get-image-course/:imageFile', Course_Controllers.getImage);


app.post('/add-new-module', [md_auth.ensureAuth], Module_Controllers.addModule);
app.get('/get-module/:id', [md_auth.ensureAuth], Module_Controllers.getModule);
app.get('/get-modules/:course?', Module_Controllers.getModules);
app.put('/update-module/:id', [md_auth.ensureAuth], Module_Controllers.updateModule);
app.delete('/delete-module/:id', [md_auth.ensureAuth], Module_Controllers.deleteModule);
app.post('/add-image-module/:id', [md_auth.ensureAuth, md_upload], Module_Controllers.uploadImage);


app.post('/add-new-content', [md_auth.ensureAuth], Content_Controllers.addContent);
app.get('/get-content/:id', [md_auth.ensureAuth], Content_Controllers.getContent);
app.get('/get-contents/:module?', Content_Controllers.getContents);
app.put('/update-content/:id', [md_auth.ensureAuth], Content_Controllers.updateContent);
app.delete('/delete-content/:id', [md_auth.ensureAuth], Content_Controllers.deleteContent);
app.post('/upload-file/:id', [md_auth.ensureAuth, md_upload_files], Content_Controllers.uploadFile);
app.get('/get-files/:filesFile', Content_Controllers.getFiles);

app.post('/add-new-pdf', [md_auth.ensureAuth], Pdf_Controllers.addPDF);
app.get('/get-pdf/:id', Pdf_Controllers.getPDF);
app.get('/get-pdfs/:content?', [md_auth.ensureAuth], Pdf_Controllers.getPDFs);
app.put('/update-pdf/:id', [md_auth.ensureAuth], Pdf_Controllers.updatePDF);
app.delete('/delete-pdf/:id', [md_auth.ensureAuth], Pdf_Controllers.deletePDF);
app.get('/get-view-pdf/:pdfFile', Pdf_Controllers.getPDFView);
app.post('/upload-pdf/:id', [md_auth.ensureAuth, md_upload_files], Pdf_Controllers.uploadFile);

app.post('/add-new-video', [md_auth.ensureAuth], Video_Controllers.addVideo);
app.get('/get-video/:id', [md_auth.ensureAuth], Video_Controllers.getVideo);
app.get('/get-videos/:content?', [md_auth.ensureAuth], Video_Controllers.getVideos);
app.put('/update-video/:id', [md_auth.ensureAuth], Video_Controllers.updateVideo);
app.post('/upload-video/:id', [md_auth.ensureAuth, md_upload_videos], Video_Controllers.uploadFile)
app.delete('/delete-video/:id', [md_auth.ensureAuth], Video_Controllers.deleteVideo);
app.get('/get-view-video/:videoFile', Video_Controllers.getFile);

app.post('/add-new-quiz', [md_auth.ensureAuth], Quiz_Controllers.addQuiz);
app.get('/get-quiz/:id', [md_auth.ensureAuth], Quiz_Controllers.getQuiz);
app.get('/get-quizzes/:content?', [md_auth.ensureAuth], Quiz_Controllers.getQuizs);
app.put('/update-quiz/:id', [md_auth.ensureAuth], Quiz_Controllers.updateQuiz);

module.exports = app;