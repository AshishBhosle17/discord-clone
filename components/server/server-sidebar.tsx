import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

import { ScrollArea } from "../ui/scroll-area";

import { Hash, Mic, ShieldAlert, ShieldBan, ShieldCheck, Video } from "lucide-react";
import { Separator } from "../ui/separator";
import ServerHeader from "./server-header";

interface ServerSidebarProps {
    serverId: string;
  }
  
  const iconMap = {
    [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
    [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
    [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
  };
  
  const roleIconMap = {
    [MemberRole.GUEST]: <ShieldBan className="mr-2 h-4 w-4 text-gray-500" />  ,
    [MemberRole.MODERATOR]: (
      <ShieldCheck className="mr-2 h-4 w-4 text-indigo-500" />
    ),
    [MemberRole.ADMIN]: <ShieldAlert className="mr-2 h-4 w-4 text-rose-500" />,
  };

  
   const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
       const profile = await currentProfile();
       if (!profile) {
         return redirect("/");
       }

       const server = await db.server.findUnique({
        where: {
          id: serverId,
        },
        include: {
          channels: {
            orderBy: {
              createdAt: "asc",
            },
          },
          members: {
            include: {
              profile: true,
            },
            orderBy: {
              role: "asc",
            },
          },
        },
      });
    
      if(!server){
        return redirect("/")
      }

      const textChannels = server.channels.filter((channel) => channel.type === ChannelType.TEXT);
      const audioChannels = server.channels.filter((channel) => channel.type === ChannelType.AUDIO);
      const videoChannels = server.channels.filter((channel) => channel.type === ChannelType.VIDEO);
    
      const members = server.members.filter((member) => member.profileId !== profile.id);
    
      const role = server.members.find((member) => member.profileId === profile.id)?.role;

      return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F2F5]">
            <ServerHeader server={server} role={role} />
            <ScrollArea className=" flex-1 px-3">
              <div className="mt-2">
    
              
    
   
                
                   
               
                
    
                  </div>
                
            </ScrollArea>
    
        </div>
      );
    };
    
    export default ServerSidebar;