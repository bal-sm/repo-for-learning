# A Contact Form

[From here](https://v0.dev/t/0AwQeZp)

As html:

```html
<!--
// v0 by Vercel Labs.
// https://v0.dev/t/0AwQeZp
-->
<div class="flex items-center justify-center h-screen bg-green-500">
  <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
    <div class="p-6">
      <div class="space-y-8">
        <div class="space-y-2">
          <h2 class="text-3xl font-semibold">Contact Us</h2>
          <p class="text-zinc-500 dark:text-zinc-400">
            Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="first-name">First name</label>
              <input class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="first-name" placeholder="Enter your first name">
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="last-name">Last name</label>
              <input class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="last-name" placeholder="Enter your last name">
            </div>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="email">Email</label>
            <input class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="email" placeholder="Enter your email" type="email">
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Pronoun</label>
            
              <button type="button" role="combobox" aria-controls="radix-:r51:" aria-expanded="false" aria-autocomplete="none" dir="ltr" data-state="closed" data-placeholder="" class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" aria-label="Pronoun">
                <span style="pointer-events: none;">Select your pronoun</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 opacity-50" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg></button>
              
            
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="message">Message</label>
            <textarea class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]" id="message" placeholder="Enter your message"></textarea>
          </div>
          <button class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-gray-800 text-white" type="submit">Send message</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

As React:

```jsx
/**
 * v0 by Vercel Labs.
 * @see https://v0.dev/t/0AwQeZp
 */
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="flex items-center justify-center h-screen bg-green-500">
      <Card>
        <CardContent>
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold">Contact Us</h2>
              <p className="text-zinc-500 dark:text-zinc-400">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" placeholder="Enter your first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" placeholder="Enter your last name" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Enter your email" type="email" />
              </div>
              <div className="space-y-2">
                <Label>Pronoun</Label>
                <Select>
                  <SelectTrigger aria-label="Pronoun">
                    <SelectValue placeholder="Select your pronoun" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Pronouns</SelectLabel>
                      <SelectItem value="he/him">He/Him</SelectItem>
                      <SelectItem value="she/her">She/Her</SelectItem>
                      <SelectItem value="they/them">They/Them</SelectItem>
                      <SelectItem value="prefer not to say">Prefer not to say</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea className="min-h-[100px]" id="message" placeholder="Enter your message" />
              </div>
              <Button className="bg-gray-800 text-white" type="submit">
                Send message
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
  )
}
```
