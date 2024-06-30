"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { useState } from "react";
import qs from 'query-string';

export const DeleteChannelModal = () => {
  const router = useRouter();
 
  const { isOpen, onClose, type,data,onOpen } = useModal();
  
  const {server,channel}=data;

  const [isLoading,setLoading]=useState(false);

  const isModalOpen = isOpen && type == "deleteChannel";

  const onClick =async () => {
    try {
      setLoading(true);
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id
        }
      })
      await axios.delete(url);
      onClose();
      router.push(`/servers/${server?.id}`);
      router.refresh();
    } catch (error) {
      console.log(error);
      
    }finally{
      setLoading(false)
    }
  }

   

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className=" bg-white text-black p-0 overflow-hidden">
          <DialogHeader className=" pt-8 px-6">
            <DialogTitle className=" text-2xl text-center font-bold">
              Delete Channel
            </DialogTitle>
            <DialogDescription className=" text-center text-zinc-500">
              Are you sure you want to do this?
              <br/>
              <span className=" font-semibold text-indigo-500">
                #{channel?.name} 
              </span>&nbsp;will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className=" bg-gray-100 px-6 py-4">
            <div className=" flex items-center justify-between w-full">
              <Button disabled={isLoading} onClick={onClose} variant="ghost">
                Cancel
              </Button>
              <Button disabled={isLoading} onClick={onClick} variant="destructive">
                Delete
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  );
};