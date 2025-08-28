"use client";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "fb-ui-library";

export default function Page() {
  return (
    <div className="container mx-auto md:max-w-5xl p-8">
      <div className="border-2 border-solid border-gray-300 rounded-lg shadow-lg bg-white">
        <div className="flex flex-col gap-8 items-center justify-center p-8">
          <h1 className="text-3xl font-bold text-gray-900">
            UI Component Library
          </h1>
          <p className="text-gray-600">
            This an example of a Next.js app consuming UI library components
            within the same `pnpm` workspace.
          </p>

          <div className="w-full space-y-8">
            {/* Button Examples */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Buttons</h2>
              <div className="flex gap-4 flex-wrap">
                <Button variant="default">Default</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </section>

            {/* Badge Examples */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Badges</h2>
              <div className="flex gap-4 flex-wrap items-center">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </section>

            {/* Form Components */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Form Components</h2>
              <div className="space-y-4 max-w-md">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Type your message here..."
                  />
                </div>

                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            {/* Card Example */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Card</h2>
              <Card className="max-w-md">
                <CardHeader>
                  <CardTitle>Task Card</CardTitle>
                  <CardDescription>
                    A sample task management card
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This is an example of a card component with content.</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save</Button>
                </CardFooter>
              </Card>
            </section>

            {/* Dialog Example */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Dialog</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                    <DialogDescription>
                      Fill out the form below to create a new task.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="task-name">Task Name</Label>
                      <Input id="task-name" placeholder="Enter task name" />
                    </div>
                    <div>
                      <Label htmlFor="task-desc">Description</Label>
                      <Textarea
                        id="task-desc"
                        placeholder="Enter task description"
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </section>

            {/* Dropdown Menu Example */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Dropdown Menu</h2>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Actions</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Edit Task</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem>Archive</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
