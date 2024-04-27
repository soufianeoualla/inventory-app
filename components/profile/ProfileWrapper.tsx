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
    <Tabs defaultValue="account" className="w-[400px] sm:w-full my-20">
  <TabsList
    className={`grid w-full ${isOwner ? "grid-cols-3" : "grid-cols-2"} `}
  >
    <TabsTrigger value="account">Compte</TabsTrigger>
    <TabsTrigger value="password">Mot de passe</TabsTrigger>
    {isOwner && <TabsTrigger value="settings">Paramètres</TabsTrigger>}
  </TabsList>
  <TabsContent value="account">
    <Card className="bg-gradient-to-br from-accent/40 to-card border-white/10">
      <CardHeader>
        <CardTitle>Compte</CardTitle>
        <CardDescription>
          Apportez des modifications à votre compte ici. Cliquez sur Enregistrer lorsque vous avez terminé.
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
        <CardTitle>Mot de passe</CardTitle>
        <CardDescription>Changez votre mot de passe ici.</CardDescription>
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
