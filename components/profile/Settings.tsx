"use client";
import { TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useEffect, useState, useTransition } from "react";
import { Input } from "../ui/input";
import { addUser } from "@/actions/addUser";
import { FormError } from "../auth/FormError";
import { FormSuccess } from "../auth/FormSuccess";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdduserSchema } from "@/schemas";
import { z } from "zod";
import { getComapnyUsers } from "@/data/getCompanyUsers";
import { changeUserRole } from "@/actions/changeUserRole";

interface User {
  name: string;
  email: string;
  role: string;
  id: string;
}

export const Settings = () => {
  const [role, setrole] = useState<string>("");
  const [newRole, setnewRole] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [error, seterror] = useState<string | undefined>();
  const [success, setsuccess] = useState<string | undefined>();
  const [users, setusers] = useState<User[] | undefined>();
  const [user, setuser] = useState<string | undefined>();

  useEffect(() => {
    const getData = async () => {
      const response = await getComapnyUsers();
      setusers(response?.filter((item) => item.role !== "owner"));
    };
    getData();
  }, []);

  const form = useForm<z.infer<typeof AdduserSchema>>({
    resolver: zodResolver(AdduserSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onAddUser = (values: z.infer<typeof AdduserSchema>) => {
    seterror("");
    setsuccess("");
    if (!role) return seterror("Please select a role");
    startTransition(() => {
      addUser(values, role).then((data) => {
        seterror(data?.error);
        setsuccess(data?.success);
      });
    });
  };

  const onChangeRole = () => {
    seterror("");
    setsuccess("");
    if (!newRole) return seterror("Please select a role");
    if (!user) return seterror("Please select a user");
    startTransition(() => {
      changeUserRole(user, newRole).then((data) => {
        seterror(data?.error);
        setsuccess(data?.success);
      });
    });
  };

  return (
    <TabsContent value="settings">
      <Card className="bg-gradient-to-br from-accent/40 to-card border-white/10">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Control your Users</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onAddUser)} className="space-y-4">
              <Label htmlFor="">Add new User</Label>
              <div className="flex items-center gap-x-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          className="h-10"
                          id="email"
                          type="email"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          className="h-10"
                          id="name"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div></div>
              <div className="flex items-end gap-x-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Role</Label>
                  <Select
                    value={role}
                    onValueChange={(value) => setrole(value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue
                        placeholder={`${role ? role : "Select Role"}`}
                      />
                    </SelectTrigger>
                    <SelectContent className="border-none">
                      <SelectGroup>
                        <SelectLabel>Roles</SelectLabel>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full" disabled={isPending}>
                  Add user
                </Button>
              </div>

    
            </form>
          </Form>

          <div className=" space-y-4">
            <Label htmlFor="">Change Current User Roles </Label>
            <div className="flex items-center gap-x-2">
              <Select value={user} onValueChange={(value) => setuser(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={"Select a User"} />
                </SelectTrigger>
                <SelectContent className="border-none">
                  <SelectGroup>
                    <SelectLabel>Users</SelectLabel>
                    {users &&
                      users.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          <div className="grid ">
                            {item.email}
                            <small className="text-white/50">
                              {item.name}{" "}
                            </small>
                          </div>
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select
                value={newRole}
                onValueChange={(value) => setnewRole(value)}
              >
                <SelectTrigger className="w-[180px] ">
                  <SelectValue placeholder="Change role" />
                </SelectTrigger>
                <SelectContent className="border-none">
                  <SelectGroup>
                    <SelectLabel>roles</SelectLabel>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="grid gap-y-4">
          <Button  type="button" onClick={onChangeRole}>
            Save changes
          </Button>
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
        </CardFooter>
      </Card>
    </TabsContent>
  );
};
