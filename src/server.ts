import app from './app'

app.listen(process.env.PORT || 3333, () =>{
    console.log(`${process.env.PORT || 3333}`)
})