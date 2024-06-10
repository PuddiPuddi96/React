import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import prisma from '../db/prisma.js';

declare global {
    namespace Express {
        export interface Request {
            user: {
                id: string;
            }
        }
    }
}

interface DecodedToken extends JwtPayload {
    userId: string
}

const protectRoute = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const token = request.cookies.jwt;

        if(!token){
            return response.status(401).json({error: 'Unauthorized - No token provided'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

        if(!decoded){
            return response.status(401).json({error: 'Unauthorized - Invalid token'});   
        }

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.userId
            },
            select: {
                id: true,
                username: true,
                fullname: true,
                profilePic: true
            }
        })

        if(!user){
            return response.status(404).json({error: 'User not found'});   
        }

        request.user = user;

        next();
    } catch (error: any) {
        console.log('Error in protectRoute middleware', error.message);
        return response.status(500).json({error: "Internal server error"});
    }
}

export default protectRoute;