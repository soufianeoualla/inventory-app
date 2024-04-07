"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
import { IoCopy } from "react-icons/io5";
import { v4 as uuid } from "uuid";
import { useState } from "react";

export const Settings = () => {
  const [code, setcode] = useState<string | undefined>();
  const [copy, setcopy] = useState<string | undefined>();

  const generate = () => {
    const referral_code = uuid().slice(0, 6);
    setcode(referral_code);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(code!);
    setcopy("copied");
    setTimeout(() => {
      setcopy(undefined);
    }, 2000);
  };

  return (
    <TabsContent value="settings">
      <Card className="bg-gradient-to-br from-accent/40 to-card border-white/10">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Control your Users</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <Label htmlFor="">Gnerate referral code</Label>
            <div className="flex items-center gap-x-3">
              <Button onClick={generate}>Generate</Button>
              {code}

              {code && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button onClick={handleCopy} variant="secondary">
                        <IoCopy />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="border-none">
                      <p>Copy</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              {copy && <p className="text-emerald-500 capitalize">{copy} </p>}
            </div>
          </div>
          <div className=" space-y-4">
            <Label htmlFor="">Change Role</Label>
            <div className="flex items-center gap-x-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a User" />
                </SelectTrigger>
                <SelectContent className="border-none">
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[180px] ">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent className="border-none">
                  <SelectGroup>
                    <SelectLabel>roles</SelectLabel>
                    <SelectItem value="apple">Admin</SelectItem>
                    <SelectItem value="banana">Watcher</SelectItem>
                    <SelectItem value="blueberry">User</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save changes</Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};
