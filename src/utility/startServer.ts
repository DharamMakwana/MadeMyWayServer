import { Application } from "express"
import { connectToDB } from "./connectToDB"

export let db

export const startServer = async (app: Application, port: number) => {
  try {
    db = await connectToDB()

    app.listen(port, () => {
      console.log(`server started at port: ${port}\n`)
    })
  } catch (error) {
    console.log(error)
  }
}
