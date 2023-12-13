'use client';


import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import Link from "next/link";
import GoogleSignInButton from "../GoogleSignInButton";

const FormSchema = z.object({
    // email: z.string().min(1, 'Email is required').email('Invalid email'),
    username: z.string().min(1, 'Username is required'),
    password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have more than 8 characters'),
  });

const SignInForm = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        
      });

      const onSubmit = (values: z.infer<typeof FormSchema>) => {
        console.log(values);
      
        const url = 'http://localhost:8000/api/login/';
      
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: values.username, // Change "email" to "username"
            password: values.password,
          }),
        })
          .then(response => response.json())
          .then(data => {
            // Handle the response from the server
            console.log('Response:', data);
            // Assume you have received the tokens from your authentication process
            const accessToken = data.accesstoken;
            const refreshToken = data.refreshtoken;
            const role = data.role; // Replace with the actual user role
            const isAuthenticated_localstorage = "true";

            // Store tokens and role in local storage after successful authentication
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('role', role);
            localStorage.setItem('isAuthenticated_localstorage', isAuthenticated_localstorage );


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
              name="username" // Change the name to "username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Username" {...field} />
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

            </div>

            <Button className="w-full mt-6" type="submit">
              Sign in
              </Button>
          </form>
          <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 afer:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
            or
          </div>
          <GoogleSignInButton>Sign in with Google</GoogleSignInButton>
          <p className='text-center text-sm text-gray-600 mt-2'>
            If you don&apos;t have an account, please&nbsp; 
            <Link className="text-blue-500 hover:underline " href='/sign-up'>Sign up</Link>
          </p>


        </Form>
      );
};
export default SignInForm;