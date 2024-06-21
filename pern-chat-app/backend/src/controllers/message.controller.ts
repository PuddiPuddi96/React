import { Request, Response } from "express"
import prisma from "../db/prisma.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (request: Request, response: Response) => {
  try {
    const {message} = request.body;
    const {id:receiverId} = request.params;
    const senderId = request.user.id;

    let conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, receiverId]
        }
      }
    })

    if(!conversation){
      conversation = await prisma.conversation.create({
        data: {
          participantIds: {
            set: [senderId, receiverId]
          }
        }
      })
    }

    const newMessage = await prisma.message.create({
      data: {
        senderId,
        body: message,
        conversationId: conversation.id
      }
    })

    //add message to conversation
    if(newMessage){
      await prisma.conversation.update({
        where: {
          id: conversation.id
        },
        data: {
          messages: {
            connect: {
              id: message.id
            }
          }
        }
      })
    }

    const receiverSocketId = getReceiverSocketId(receiverId);
    if(receiverId){
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    response.status(201).json(newMessage);
  } catch (error: any) {
    console.log('Error in sendMessage controller', error.message);
    return response.status(500).json({ error: "Internal server error" });
  }
}

export const getMessages = async (request: Request, response: Response) => {
  try {
    const {id: userToChatId} = request.params;
    const senderId = request.user.id;

    const conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, userToChatId]
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc"
          }
        }
      }
    }
  )

    if(!conversation){
      return response.status(200).json([])
    }

    response.status(200).json(conversation.messages);
  } catch (error: any) {
    console.log('Error in getMessages controller', error.message);
    return response.status(500).json({error: "Internal server error"});
  }
}

export const getUsersForSidebar = async (request: Request, response: Response) =>  {
  try {
    const authUserId = request.user.id;

    const users = await prisma.user.findMany({
      where: {
        id: {
          not: authUserId,
        }
      },
      select: {
        id: true,
        fullname: true,
        profilePic: true
      }
    });

    response.status(200).json(users);
  } catch (error: any) {
    console.log('Error in getUsersForSidebar controller', error.message);
    return response.status(500).json({error: "Internal server error"});
  }
}
