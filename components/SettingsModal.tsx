"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SettingsModal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [field1, setField1] = useState("");
  const [field2, setField2] = useState("");
  const [field3, setField3] = useState("");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Settings</DialogTitle>
        <DialogDescription>Update your settings below.</DialogDescription>
        <form>
          <div className="mt-4">
            <label htmlFor="field1" className="block text-sm font-medium text-gray-700">
              Field 1
            </label>
            <Input
              type="text"
              name="field1"
              id="field1"
              value={field1}
              onChange={(e) => setField1(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="field2" className="block text-sm font-medium text-gray-700">
              Field 2
            </label>
            <Input
              type="text"
              name="field2"
              id="field2"
              value={field2}
              onChange={(e) => setField2(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="field3" className="block text-sm font-medium text-gray-700">
              Field 3
            </label>
            <Input
              type="text"
              name="field3"
              id="field3"
              value={field3}
              onChange={(e) => setField3(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mt-6 flex justify-end">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

