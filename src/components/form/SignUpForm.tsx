'use client';


import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import Link from "next/link";
import GoogleSignInButton from "../GoogleSignInButton";

const FormSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(30, 'must not contain more than 30 characters'),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
    .string()
    .min(1, 'Password is required') 
    .min(8, 'Password must have more than 8 characters'),

    Confirmpassword: z.string().min(1, 'Password confirmation is required'),  
  })
  .refine((data) => data.password === data.Confirmpassword, {
    path: ['Confirmpassword'],
    message: 'Password do not match',

  })

const SignUpForm = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          username: '',
          email: '',
          password: '',
          Confirmpassword: '',
        }

        
      });

      const onSubmit = (values: z.infer<typeof FormSchema>) => {
        console.log(values);
      
        const url = 'http://localhost:8000/api/signup'; // Remove the space before http
      
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })
          .then(response => response.json())
          .then(data => {
            // Handle the response from the server
            console.log('Response:', data);
          })
          .catch(error => {
            // Handle errors during the request
            console.error('Error:', error);
          });
      };
      

      


    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="space-y-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
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
                    <Input placeholder="Enter your Email" {...field} />
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
                    <Input placeholder="Enter your password" type="password" {...field} />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Confirmpassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Re-enter your password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your password again" type="password" {...field} />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />

            </div>
            <Button className="w-full mt-6" type="submit">
              Sign up
            </Button>
          </form>
          <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 afer:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
          or
          </div>
          <GoogleSignInButton>Sign up with Google</GoogleSignInButton>
          <p className='text-center text-sm text-gray-600 mt-2'>
            If you do have an account, please&nbsp; 
            <Link className="text-blue-500 hover:underline " href='/sign-in'>Sign in</Link>
          </p>


        </Form>
      );
};
export default SignUpForm;