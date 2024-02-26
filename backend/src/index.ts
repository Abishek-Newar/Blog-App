import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {decode, sign, verify} from "hono/jwt"


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
  Variables: {
    userId: string
  }
}>()

app.use("/api/v1/blog/*", async(c, next)=>{
  const headers =  c.req.header("authorization") || "";
  const token = headers.split(" ")[1];
  const decoded =await  verify(token,c.env.JWT_SECRET)
  if(decoded){
    c.set("userId",decoded.id)
    await next()
  } else{
    c.status(403);
    return c.json({error: "Unauthorised users"})
  }
  
})

app.post("/api/v1/signup",async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    
  try{
    const body = await c.req.json();
    const res = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password,
      }
    })
    const token = await sign({id: res.id}, c.env.JWT_SECRET);
    
    return c.json({
      jwt: token
    })
  }
  catch(e){
    console.log(e);
    return c.text("Credential invalid")
  }
})

app.post("/api/v1/signin", async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json()
    try{
      const res = await prisma.user.findUnique({
        where: {
          email: body.email,
          password: body.password,
        },
      })

      if(!res){
        c.status(403);
        return c.json({ error: "User Not Found"})
      }
      const token = await sign({id: res.id },c.env.JWT_SECRET);

      return c.json({token: token})
    }
    catch(e){
      return c.json({error: "Invalid credentials"})
    }
})

app.post("/api/v1/blog", async (c)=>{
  const userId = c.get('userId');
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
  const datas = await c.req.json();
  try{
    const res = await prisma.post.create({
      data: {
        title: datas.title,
        content: datas.content,
        authorId: userId,
      },
      
    })

    return c.json({id: res.id})
  }
  catch(e){
    console.log(e);
    return c.json({error: "Unknown"})

  }
})

app.put("/api/v1/blog", async(c)=>{
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())

  const body = await c.req.json();
  try{
    const res = await prisma.post.update({
      where:{
        id: body.id,
        authorId: userId,
      },
      data: {
        title: body.title,
        content: body.content,
      }
    })
    return c.json({msg: "contents Updated"})
  }
  catch(e){
    return c.json({error: "error whle updating"})
  }
})

app.get("/api/v1/blog/:id", async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
  const id = await c.req.param("id");
  console.log(id);
  try{
    const res = await prisma.post.findUnique({
      where: {
        id: id,
      }
    })
    console.log(res);
    return c.json({data: res})
  }
  catch(e){
    return c.json({error: "invalid id"})
  }
})

export default app
