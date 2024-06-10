import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import bcryptjs from 'bcryptjs';
import generateToken from "../utils/generateToken.js";

export const signup = async (request: Request, response: Response) => {
  try {
    const {fullname, username, password, confirmPassword, gender} = request.body;

    if(!fullname || !username || !password || !confirmPassword || !gender){
      return response.status(400).json({error: "Please fill in all fields"});
    }

    if(password !== confirmPassword) {
      return response.status(400).json({error: "Passwords don't match"});
    }

    const user = await prisma.user.findUnique({
      where: {
        username
      }
    });

    if(user){
      return response.status(400).json({error: "Username already exists"});
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = await prisma.user.create({
      data: {
        fullname,
        username,
        password: hashedPassword,
        gender,
        profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
      }
    })

    if(newUser){
      generateToken(newUser.id, response)

      response.status(201).json({
        id: newUser.id,
        fullname: newUser.fullname,
        username: newUser.username,
        profilePic: newUser.profilePic
      })
    }else{
      return response.status(400).json({error: "Invalid user data"});
    }

  } catch (error: any) {
    console.log('Error in signup controller', error.message);
    return response.status(500).json({error: "Internal server error"});
  }
};

export const login = async (request: Request, response: Response) => {
  try {
    const {username, password} = request.body;
    const user = await prisma.user.findUnique({
      where: {
        username
      }
    });

    if(!user){
      return response.status(400).json({error: "Invalid credentials"});
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if(!isPasswordCorrect){
      return response.status(400).json({error: "Invalid credentials"});
    }

    generateToken(user.id, response);

    response.status(201).json({
      id: user.id,
      fullname: user.fullname,
      username: user.username,
      profilePic: user.profilePic
    })
  } catch (error: any) {
    console.log('Error in signup controller', error.message);
    return response.status(500).json({error: "Internal server error"});
  }
};

export const logout = async (request: Request, response: Response) => {

};
