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
/*
import image1 from "@/assets/images/image1.jpg";
import image2 from "@/assets/images/image2.jpg";
import image3 from "@/assets/images/image3.jpg";
import image4 from "@/assets/images/image4.jpg";
*/
import { UserSignIn } from "@/types";
import { Label } from "@radix-ui/react-label";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";


const initialValue: UserSignIn = {
  email: "",
  password: "",
  confirmPassword: "",
};

interface ISignupProps {}

const Signup: React.FunctionComponent<ISignupProps> = () => {

    const validatePasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length > 0) strength += 1; // Length > 0
        if (password.length >= 8) strength += 1; // Length >= 8
        if (/[A-Z]/.test(password)) strength += 1; // Uppercase letters
        if (/[a-z]/.test(password)) strength += 1; // Lowercase letters
        if (/[0-9]/.test(password)) strength += 1; // Digits
        if (/[\W_]/.test(password)) strength += 1; // Non-word characters

        return strength; // strength is a value between 0 and 6
      };

    const [passwordStrength, setPasswordStrength] = React.useState(0);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setUserInfo({ ...userInfo, password: newPassword });

        // Set password strength based on validation function
        const strength = validatePasswordStrength(newPassword);
        setPasswordStrength(strength);
    };
    // Function to determine color based on password strength
    const getPasswordStrengthColor = () => {
        if (passwordStrength >= 5) return "bg-green-500"; // Strong
        if (passwordStrength >= 3) return "bg-yellow-500"; // Moderate
        if (passwordStrength > 0) return "bg-red-500"; // Weak
        return "bg-gray-300"; // Empty 
    };
    const { googleSignIn, signUp } = useUserAuth();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = React.useState<UserSignIn>(initialValue);
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
        console.log("The user info is : ", userInfo);
        await signUp(userInfo.email, userInfo.password);
        navigate("/");
        } catch (error) {
        console.log("Error : ", error);
        }
    };
  return (
    <div className="bg-slate-500 h-screen flex justify-center items-center">
      <div className="container mx-auto p-6 flex h-full">
        <div className="flex justify-center items-center w-full">
          <div className="p-6 w-2/3 hidden lg:block">
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
                      value={userInfo.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUserInfo({ ...userInfo, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={userInfo.password}
                      onChange={handlePasswordChange}
                    />
                    <div className="w-full bg-gray-300 h-2 rounded-lg overflow-hidden">
                    <div
                        className={`h-2 rounded-lg transition-width duration-300 ${getPasswordStrengthColor()}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmpassword">Confirm password</Label>
                    <Input
                      id="confirmpassword"
                      type="password"
                      placeholder="Confirm password"
                      value={userInfo.confirmPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUserInfo({
                          ...userInfo,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button className="w-full" type="submit">
                    Sign Up
                  </Button>
                  <p className="mt-3 text-sm text-center">
                    Already have an account ? <Link to="/login">Login</Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;