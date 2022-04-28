import path = require('path')
import formidable = require('formidable')

export = function (req): Promise<formidable.File> {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm({
      encoding: 'utf-8',
      uploadDir: path.join(__dirname, '../files/'),
      keepExtensions: true
    })
    form.parse(req, (err, fields, files: any) => {
      const { file } = files
      if (!err) resolve(file)
      else reject(err)
    })
  })
}
