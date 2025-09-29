import Image from "next/image";
import { LoginForm } from "@/components/login-form";

export default function Page() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white p-6 md:p-10">
        {/* Background image */}
        <Image
          src="/img/m-stripe-bmw.jpg"
          alt="BMW M Stripe"
          width={800} 
          height={400} 
          className="opacity-55 absolute inset-0 left-[-100px] mx-auto my-auto top-[50px] object-contain opacity-80"
        />
  
        {/* Card */}
        <div className="relative w-full max-w-sm">
          <LoginForm /> 
        </div>
      </div>
  );
}
