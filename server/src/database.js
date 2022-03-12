const mongoose=require('mongoose')

URI=('mongodb://localhost/ensayo')

mongoose.connect(URI,{
    useNewUrlParle:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false

})
  .then(db=>console.log('base de datos conectada'))
  .catch(error=>console.log(error))

  module.exports=mongoose