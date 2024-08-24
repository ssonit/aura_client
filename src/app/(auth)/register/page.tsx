import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import RegisterForm from "@/components/global/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex-col h-screen flex items-center justify-center relative">
      <Card className="w-full max-w-md mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>Create a new account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm></RegisterForm>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
