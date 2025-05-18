import { SignUp, SignIn } from "@clerk/clerk-react";

function Auth() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <SignUp afterSignUpUrl="/" afterSignInUrl="/" />
      <p className="text-gray-600 mt-4">Already have an account?</p>
      <SignIn afterSignInUrl="/" />
    </div>
  );
}

export default Auth;
