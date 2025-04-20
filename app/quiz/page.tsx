import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export default function QuizInitialization() {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiz</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[auto_1fr] auto-rows-auto gap-4">
          <span className="flex items-center">Topic</span>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a topic..."/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">{/* Get these from backend */}</SelectItem>
            </SelectContent>
          </Select>
          <span className="flex items-center">Subtopic</span>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a subtopic..."/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">{/* Get these from backend */}</SelectItem>
            </SelectContent>
          </Select>
          <span className="flex items-center">Difficulty</span>
          <RadioGroup defaultValue="medium" className="flex items-center justify-start gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="easy" id="r1"/>
              <Label htmlFor="r1">Easy</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="r2"/>
              <Label htmlFor="r2">Medium</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hard" id="r3"/>
              <Label htmlFor="r3">Hard</Label>
            </div>
          </RadioGroup>
          <span className="flex items-center">Timed</span>
          <div className="flex items-center">
            <Checkbox id="timed"/>
          </div>
          <span className="flex items-center">Time Limit</span>
          <div className="flex items-center justify-start">
            <Input className="w-16"/>
            <span className="pr-6 pl-2">m</span>
            <Input className="w-16"/>
            <span className="pr-6 pl-2">s</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-stretch gap-2 mt-4">
          <Button className="flex-1" variant="outline">Cancel</Button>
          <Button className="flex-1">Start Quiz</Button>
        </div>
      </CardFooter>
    </Card>
  );
};