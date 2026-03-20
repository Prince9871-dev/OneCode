"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Chrome, Github } from "lucide-react";

const SignInFormClient = () => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center">Sign In</CardTitle>
        <CardDescription className="text-center">
          Choose your preferred sign-in method
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        <Button onClick={() => signIn("google")} variant="outline">
          <Chrome className="mr-2 h-4 w-4" />
          Sign in with Google
        </Button>

        <Button onClick={() => signIn("github")} variant="outline">
          <Github className="mr-2 h-4 w-4" />
          Sign in with Github
        </Button>
      </CardContent>

      <CardFooter>
        <p className="text-sm text-center w-full">
          By signing in, you agree to our terms.
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignInFormClient;