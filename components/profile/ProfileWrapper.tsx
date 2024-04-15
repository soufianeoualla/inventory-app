import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { auth } from "@/auth";

import { Settings } from "./Settings";
import { ChangePasswordForm } from "./changePasswordForm";
import { ChangeEmailNameForm } from "./ChangeEmailNameForm";
import { getUserById } from "@/data/user";

export const ProfileWrapper = async () => {
  const session = await auth();
  const user = session?.user;
  const currentUser = await getUserById(user?.id);
  const isOwner = user?.role === "owner";
  return (
    <Tabs defaultValue="account" className="w-[400px] ">
      <TabsList
        className={`grid w-full ${isOwner ? "grid-cols-3" : "grid-cols-2"} `}
      >
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        {isOwner && <TabsTrigger value="settings">Settings</TabsTrigger>}
      </TabsList>
      <TabsContent value="account">
        <Card className="bg-gradient-to-br from-accent/40 to-card border-white/10">
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you&apos;re
              done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
           
            <ChangeEmailNameForm
              email={currentUser?.email!}
              name={currentUser?.name!}
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card className="bg-gradient-to-br from-accent/40 to-card border-white/10">
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your password here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ChangePasswordForm />
          </CardContent>
        </Card>
      </TabsContent>
      {isOwner && <Settings />}
    </Tabs>
  );
};
