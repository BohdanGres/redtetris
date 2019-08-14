// import glob from 'glob'
// console.log(__dirname)
// const files = glob.sync("src/server#<{(||)}>#*.js")
// files.forEach(file => {
//   console.log(file)
//   require('../' + file)
// })

import '@babel/polyfill'
import glob from 'glob'

const files = glob.sync("src/server#<{(||)}>#*.js")
files.forEach(file => {
  require('../' + file)
})

