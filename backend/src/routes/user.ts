import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {decode, sign, verify} from "hono/jwt"
import { SigninInput, SignupInput } from '@abisheknewar/medium-common'
export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string
      JWT_SECRET: string
    }
    Variables: {
      userId: string
    }
  }>()

  userRouter.post("/signup",async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate())
      const body = await c.req.json();
      const success = SignupInput.safeParse(body);
      if(!success){
        c.status(403)
        return c.json({msg: "invalid inputs"})
      }
    try{
      
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
  
  userRouter.post("/signin", async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate())
      const body = await c.req.json()
      const success = SigninInput.safeParse(body);
      if(!success){
        c.status(403)
        return c.json({msg: "invalid inputs"})
      }
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