"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { pb } from "@/lib/pocketbase"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "email Invalid.",
  }),
  password: z.string().min(3, {
    message: "password must be at least 3 characters.",
  }),
  passwordConfirm: z.string().min(3, {
    message: "passwordConfirm must be at least 3 characters.",
  }),
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
})
export default function RegisterPage() {

  const { toast } = useToast()


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      name: ""
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {

    try {
      const data = {
        username: values.username,
        email: values.email,
        emailVisibilit: true,
        password: values.password,
        passwordConfirm: values.passwordConfirm,
        name: values.name
      };

      const record = await pb.collection('users').create(data);

      toast({
        title: "success",
        description: "registation succeessful",
        variant:"success"
      })

    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "something went wrong",
        variant:"destructive"
      })
    }

    console.log(values)
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PasswordConfirm</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="passwordConfirm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  )
}
