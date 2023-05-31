import app from './app'

app.listen(process.env.PORT || 3336, () =>{
    console.log(`${process.env.PORT || 3333}`)
})