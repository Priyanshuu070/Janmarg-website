import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Eye,
  EyeOff,
  Loader2,
  Shield,
  Building2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardLogin: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    employeeId: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate real-world authentication delay (3-5 seconds)
    const authDelay = Math.random() * 2000 + 3000; // 3-5 seconds
    await new Promise((resolve) => setTimeout(resolve, authDelay));

    // Verify credentials using switch case for better structure
    const { email, password } = loginData;
    let isValidCredentials = false;
    let userRole = '';
    let userDepartment = '';

    switch (email.toLowerCase()) {
      case 'admin@gov.in':
        if (password === 'admin123') {
          isValidCredentials = true;
          userRole = 'Administrator';
          userDepartment = 'System Administration';
        }
        break;
      case 'engineer@gov.in':
        if (password === 'eng123') {
          isValidCredentials = true;
          userRole = 'Municipal Engineer';
          userDepartment = 'Engineering & Infrastructure';
        }
        break;
      case 'supervisor@gov.in':
        if (password === 'sup123') {
          isValidCredentials = true;
          userRole = 'Field Supervisor';
          userDepartment = 'Field Operations';
        }
        break;
      case 'manager@gov.in':
        if (password === 'mgr123') {
          isValidCredentials = true;
          userRole = 'Department Manager';
          userDepartment = 'Public Works';
        }
        break;
      case 'clerk@gov.in':
        if (password === 'clk123') {
          isValidCredentials = true;
          userRole = 'Administrative Clerk';
          userDepartment = 'Administration';
        }
        break;
      default:
        isValidCredentials = false;
    }

    setIsLoading(false);

    if (isValidCredentials) {
      // Store user info in localStorage for session management
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userDepartment', userDepartment);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('loginTime', new Date().toISOString());
      navigate("/dashboard");
    } else {
      alert("Invalid credentials! Please check your email and password.\n\nFor trial access, use:\nEmail: admin@gov.in\nPassword: admin123");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2500));

    setIsLoading(false);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-green-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Building2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Janmarg Portal</h1>
          <p className="text-gray-600 text-lg mb-4">
            Government of Jharkhand - Civic Management System
          </p>

          {/* Trial Credentials Info */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-5 mb-6 shadow-sm">
            <div className="flex items-center justify-center mb-3">
              <Shield className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-sm font-bold text-blue-800">Demo Accounts</span>
            </div>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="bg-white rounded-lg p-3 border">
                <p className="font-semibold text-blue-800">Administrator</p>
                <p className="text-blue-700"><strong>Email:</strong> admin@gov.in</p>
                <p className="text-blue-700"><strong>Password:</strong> admin123</p>
              </div>
              <div className="bg-white rounded-lg p-3 border">
                <p className="font-semibold text-green-800">Engineer</p>
                <p className="text-green-700"><strong>Email:</strong> engineer@gov.in</p>
                <p className="text-green-700"><strong>Password:</strong> eng123</p>
              </div>
              <div className="bg-white rounded-lg p-3 border">
                <p className="font-semibold text-purple-800">Supervisor</p>
                <p className="text-purple-700"><strong>Email:</strong> supervisor@gov.in</p>
                <p className="text-purple-700"><strong>Password:</strong> sup123</p>
              </div>
            </div>
            <p className="text-xs text-blue-600 mt-3 text-center font-medium">
              Use any of these accounts to explore different system capabilities
            </p>
          </div>
        </div>

        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden">
          <CardHeader className="text-center pb-6 bg-gradient-to-r from-blue-600 to-green-600 text-white">
            <div className="flex items-center justify-center mb-3">
              <Shield className="w-7 h-7 mr-3" />
              <CardTitle className="text-2xl font-bold">Secure Government Access</CardTitle>
            </div>
            <CardDescription className="text-blue-100 text-base">
              Authorized personnel only - Login to access civic management dashboard
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 h-12 bg-gray-100 rounded-xl p-1">
                <TabsTrigger value="login" className="rounded-lg font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="rounded-lg font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Register
                </TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="login-email" className="text-sm font-semibold text-gray-700">
                      Government Email Address
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your.name@gov.in"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      required
                      className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="login-password" className="text-sm font-semibold text-gray-700">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your secure password"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          })
                        }
                        required
                        className="h-12 text-base pr-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-gray-100 rounded-lg"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-500" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-500" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600 font-medium">Keep me signed in</span>
                    </label>
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline">
                      Reset password
                    </a>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                        <span>Authenticating...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Shield className="mr-2 h-5 w-5" />
                        <span>Sign In Securely</span>
                      </div>
                    )}
                  </Button>

                  {isLoading && (
                    <div className="text-center text-sm text-gray-500 mt-4">
                      Verifying credentials with government servers...
                    </div>
                  )}
                </form>
              </TabsContent>

              {/* Signup Tab */}
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="John Doe"
                        value={signupData.name}
                        onChange={(e) =>
                          setSignupData({ ...signupData, name: e.target.value })
                        }
                        required
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employee-id">Employee ID</Label>
                      <Input
                        id="employee-id"
                        type="text"
                        placeholder="EMP001"
                        value={signupData.employeeId}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            employeeId: e.target.value,
                          })
                        }
                        required
                        className="h-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Official Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="john.doe@gov.in"
                      value={signupData.email}
                      onChange={(e) =>
                        setSignupData({ ...signupData, email: e.target.value })
                      }
                      required
                      className="h-10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      type="text"
                      placeholder="Roads & Infrastructure"
                      value={signupData.department}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          department: e.target.value,
                        })
                      }
                      required
                      className="h-10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={signupData.password}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            password: e.target.value,
                          })
                        }
                        required
                        className="h-10 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-10 px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={signupData.confirmPassword}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            confirmPassword: e.target.value,
                          })
                        }
                        required
                        className="h-10 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-10 px-3 hover:bg-transparent"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    By creating an account, you agree to our{" "}
                    <a href="#" className="text-primary hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-10 bg-primary hover:bg-primary/90 dark:hover:bg-primary/80 text-primary-foreground"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 space-y-3">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="font-medium">Secure Government Portal</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border">
            <p className="text-xs text-gray-500 mb-2">🔒 This system is protected by government security protocols</p>
            <p className="text-xs text-gray-500 mb-2">📊 All login attempts are monitored and logged</p>
            <p className="text-xs text-gray-500">🛡️ Unauthorized access attempts will be reported</p>
          </div>

          <div className="text-xs text-gray-400 space-y-1">
            <p>© 2025 Janmarg Portal - Government of Jharkhand</p>
            <p>Civic Management & Digital Governance System</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLogin;
