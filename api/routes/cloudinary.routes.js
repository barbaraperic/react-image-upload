// app.get("/images", (req, res, next) => {
//   cloudinary.v2.api.resources(
//     { type: 'upload', max_results: 10 }, 
//     (error, result) => {
//       console.log(result, error); 
//       res.status(200).send({
//         result
//       })
//     });
//   })

// app.post("/image-upload", upload, (req, res) => {
//   if (req.file) {
//     const url = req.file.path;
//     return cloudinary.uploader.upload(url).then((result) => {
//       return res.status(200).json({
//         message: 'Your image has been uploaded successfully',
//         result,
//       })
//     }).catch(err => {
//       console.error(err)
//       res.send(500).json({
//         message: 'An error occurred',
//         err
//       })
//     })
// }})