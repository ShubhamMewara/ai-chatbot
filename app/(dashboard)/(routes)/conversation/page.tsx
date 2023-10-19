"use client";

import * as z from "zod";
import { MessageSquare } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Heading from '@/components/heading'
import { formSchema } from "./constant"
import { useRouter } from "next/navigation";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";


const ConversationPage = () => {
  const router = useRouter();
  const [messages,setMessages]:any = useState([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      prompt: ""
    }
  })
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async(values: z.infer<typeof formSchema>)=>{
    try{
      const response = await axios.post("/api/conversation",{
        prompt: values.prompt
      });
      setMessages(response)
      form.reset;
    }catch(error: any){
      toast.error("Something went wrong")
    }finally{
      router.refresh();
    }
  } 
  return (
    <div>
      <div>
        <Heading 
        title='Conversation'
        description='Enhance engagement and support with AI-powered conversational chat.'
        icon={MessageSquare}
        iconColor='text-violet-500'
        bgColor='bg-violet-500/10'/>
      </div>
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
              <FormField 
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10" >
                    <FormControl className="m-0 p-0" >
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Send a message"
                        {...field} />
                    </FormControl>
              </FormItem>
            )}/>
              <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading} >
                Generate
              </Button>
          </form>
        </Form>
      </div>
      <div className="space-y-4 mt-4 px-4 lg:px-8" >
      {isLoading && (
       <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
          <Loader/>
        </div>
      )}
        <div className="flex flex-col-reverse gap-y-4 ">
          {!isLoading && messages.data && <div
          className={cn(
            "p-8 w-full flex items-start gap-x-8 rounded-lg bg-muted"
          )}
          >
          <p className="text-sm">
            {messages.data}
          </p>
          </div>}
          </div>
      </div>
      </div>
  )
}

export default ConversationPage