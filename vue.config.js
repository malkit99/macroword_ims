const path = require('path')
const PORT = 8080
const DEV_HOST = 'http://localhost:8080/'
module.exports = {

  "pages": {
    "index": {
      "entry": "src/index/main.js",
      "template": "public/index.html",
      "filename": "index.html",
      "title": "Index Page",
      "chunks": [
        "chunk-vendors",
        "chunk-common",
        "index"
      ]
    },
    "admin": {
      "entry": "src/admin/main.js",
      "template": "public/index.html",
      "filename": "admin/index.html",
      "title": "admin Page",
      "chunks": [
        "chunk-vendors",
        "chunk-common",
        "admin"
      ]
    },
    "student": {
      "entry": "src/student/main.js",
      "template": "public/index.html",
      "filename": "student/index.html",
      "title": "student Page",
      "chunks": [
        "chunk-vendors",
        "chunk-common",
        "student"
      ]
    }
  },

  devServer: {
    port: PORT,
    allowedHosts: [DEV_HOST]
  },
  
  "transpileDependencies": [
    "vuetify"
  ], 
}