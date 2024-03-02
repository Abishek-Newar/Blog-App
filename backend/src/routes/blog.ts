import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {decode, sign, verify} from "hono/jwt"
import { blogPost, blogUpdate } from '@abisheknewar/medium-common'
export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string
      JWT_SECRET: string
    }
    Variables: {
      userId: string
    }
  }>()

  blogRouter.use("/*", async(c, next)=>{
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

  blogRouter.post("/", async (c)=>{
    const userId = c.get('userId');
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate())
    const datas = await c.req.json();
    const success = blogPost.safeParse(datas);
    if(!success){
      c.status(403);
      return c.json({msg: "invalid inputs"})
    }
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
      return c.json({error: "Unknown"})
  
    }
  })
  
  blogRouter.put("/", async(c)=>{
    const userId = c.get("userId");
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate())
  
    const body = await c.req.json();
    const success = blogUpdate.safeParse(body);
    if(!success){
      c.status(403);
      return c.json({msg: "invalid inputs"})
    }
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
  
  blogRouter.get("/:id", async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate())
    const id = await c.req.param("id");
    try{
      const res = await prisma.post.findUnique({
        where: {
          id: id,
        }
      })
      return c.json({data: res})
    }
    catch(e){
      return c.json({error: "invalid id"})
    }
  })
  

