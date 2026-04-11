import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signinInput, signupInput } from "../constant";
import bcrypt from "bcryptjs";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
      }
}>();

userRouter.post('/signup', async (c) => { 
    try {
        const prisma = new PrismaClient({ 
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        const body = await c.req.json();
        const {success} = signupInput.safeParse(body);
        if(!success){
            c.status(411);
            return c.json({
                message: "Inputs are not correct"
            })
        }
        const existingUser = await prisma.user.findUnique({
            where: {
                email: body.email,
            }
        });

        if(existingUser){
            c.status(403);
            return c.json({error: "user already exists"});
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const user = await prisma.user.create({
            data:{
                email: body.email,
                password: hashedPassword,
                name: body.name,
            },
        })
        const token = await sign({id: user.id}, c.env.JWT_SECRET);

        return c.json({
            jwt: token,
        })
    } catch(e){
        c.status(403);
        return c.json({
            error: "error while signing up"
        });
    }
})



userRouter.post('/signin', async(c) => {
    try {
        const prisma = new PrismaClient({ 
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        const body = await c.req.json();
        const {success} = signinInput.safeParse(body);
        if(!success){
            c.status(411);
            return c.json({
                message: "Inputs are not correct"
            })
        }
       
        const existingUser = await prisma.user.findUnique({
            where: {
                email: body.email,
            }
        });

        if(!existingUser){
            c.status(403);
            return c.json({error: "user not found"});
        }

        const isMatch = await bcrypt.compare(body.password, existingUser.password);
        if(!isMatch){
            c.status(403);
            return c.json({error: "invalid password"});
        }
  
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password
            }
        });

        if(!user){
            c.status(403);
            return c.json({error: "user not found"});
        }

        const jwt = await sign({id: user.id}, c.env.JWT_SECRET);
        return c.json({jwt});
    } catch(e) {
        c.status(403);
        return c.json({
            error: "error while signing in"
        });
    }
})