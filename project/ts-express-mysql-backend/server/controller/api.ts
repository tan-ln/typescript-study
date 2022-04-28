import file_upload = require('../utils/file_upload')
import apiModelServer = require('../model/server/api')

export = {
  upload: async (req: Express.Request) => {
    const { newFilename } = await file_upload(req)
    const key = newFilename.split('.')[0]
    return apiModelServer.upload(key, newFilename)
  },
  getList: async (req: Express.Request) => {
    return apiModelServer.getList()
  }
}
