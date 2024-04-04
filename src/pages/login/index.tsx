import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { useUserAuth } from "@/context/userAuthContext";
import { UserLogIn } from "@/types";
import { Label } from "@radix-ui/react-label";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

interface ILoginProps {}

const initialValue: UserLogIn = {
    email: "",
    password: "",
};


const Login: React.FunctionComponent<ILoginProps> = () => {
    const { googleSignIn, logIn } = useUserAuth();
    const navigate = useNavigate();
    const [userLoginInfo, setUserLoginInfo] = React.useState<UserLogIn>(initialValue);
    const handleGoogleSignIn = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        try {
        await googleSignIn();
        navigate("/");
        } catch (error) {
        console.log("Error : ", error);
        }
    };
    const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
        console.log("The user info is : ", userLoginInfo);
        await logIn(userLoginInfo.email, userLoginInfo.password);
        navigate("/");
        } catch (error) {
        console.log("Error : ", error);
        }
    };
    return (
    <div className="bg-slate-500 h-screen flex justify-center items-center">
      <div className="container mx-auto p-6 flex h-full">
        <div className="flex justify-center items-center w-full">
          <div className="p-6 w-2/3 hidden">
            <div className="grid grid-cols-2 gap-2">
            </div>
          </div>
          <div className="mw-full max-w-md bg-card text-card-foreground border rounded-xl shadow-sm">
            <Card>
              <form onSubmit={handleSubmit}>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl text-center mb-4 text-blue-800">
                    CercleAmi
                  </CardTitle>
                  <CardDescription>
                    Choose an option to create your account!
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid">
                    <Button variant="outline" onClick={handleGoogleSignIn}>
                      <Icons.google className="mr-2 h-4 w-4" />
                      Google
                    </Button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or
                      </span>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="cercleami@example.com"
                      value={userLoginInfo.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUserLoginInfo({ ...userLoginInfo, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={userLoginInfo.password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUserLoginInfo({ ...userLoginInfo, password: e.target.value })
                      }
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button className="w-full" type="submit">
                    Login
                  </Button>
                  <p className="mt-3 text-sm text-center">
                    Do not have an accont ? <Link to="/signup">Sign Up</Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
    )
};

export default Login;