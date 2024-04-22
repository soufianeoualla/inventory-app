import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import { RegisterForm } from "./RegisterForm";
import Image from "next/image";
import logo from "@/public/logo.png";
import { LoginForm } from "./LoginForm";
interface CardWrapperProps {
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  type: string;
}

const CardWrapper = ({
  headerLabel,
  backButtonHref,
  backButtonLabel,
  type,
}: CardWrapperProps) => {
  return (
    <Card className="text-center w-[400px] sm:w-[95%] shadow-md bg-gradient-to-br from-accent/40 to-card border-white/10  ">
      <CardHeader className=" space-y-3 flex items-center gap-x-3 ">
        <div className="flex items-center gap-x-3 font-bold tracking-wide">
          <Image
            width={50}
            height={50}
            src={logo}
            alt="inventory app logo"
            className=""
          />
          Inventory App
        </div>
        <CardDescription>{headerLabel} </CardDescription>
      </CardHeader>
      <CardContent className=" grid gap-4">
        {type === "login" ? (
          <LoginForm />
        ) : type === "register" ? (
          <RegisterForm />
        ) : (
          ""
        )}
      </CardContent>

      <CardFooter className="flex justify-center items-center">
        <Link
          className=" text-muted-foreground hover:text-white hover:underline  "
          href={backButtonHref}
        >
          {backButtonLabel}
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
