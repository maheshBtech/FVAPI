import app from "./app";



//listining the port
app.listen(process.env.PORT,()=>console.log(`server is running at port ${process.env.PORT}`))