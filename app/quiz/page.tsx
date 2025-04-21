"use client"

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
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function QuizInitialization() {
  const [quizState, setQuizState] = useState<string>("init");
  const [invalidValueVisible, setInvalidValueVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [timerEnabled, setTimerEnabled] = useState<boolean>(false);
  const [topics, setTopics] = useState<Array<string>>(["Computer Science", "History"]);
  const [subtopics, setSubtopics] = useState<Array<string>>([]);
  const [quizzes, setQuizzes] = useState<Array<Object>>([
    { topic: "Computer Science", subtopic: "Data Structures", questions: [
      {
        question: "Which data structure is best for implementing a First-In-First-Out (FIFO) system?",
        answer1: "Stack",
        answer2: "Queue",
        answer3: "Linked List",
        answer4: "Hash Table",
        correct: 2
      },
      {
        question: "What is the time complexity of accessing an element by index in an array?",
        answer1: "O(n)",
        answer2: "O(log n)",
        answer3: "O(1)",
        answer4: "O(n²)",
        correct: 3
      },
      {
        question: "Which data structure uses a 'Last-In-First-Out' (LIFO) principle?",
        answer1: "Queue",
        answer2: "Binary Search Tree",
        answer3: "Stack",
        answer4: "Heap",
        correct: 3
      },
      {
        question: "What is the main advantage of using a hash table over an array for storing key-value pairs?",
        answer1: "Guaranteed constant-time operations",
        answer2: "Better memory efficiency",
        answer3: "Fast average-case lookup operations",
        answer4: "Maintains sorted order of elements",
        correct: 3
      },
      {
        question: "Which of the following is NOT a type of tree data structure?",
        answer1: "Binary Search Tree",
        answer2: "B-Tree",
        answer3: "AVL Tree",
        answer4: "Circular Tree",
        correct: 4
      }
    ]},
    { topic: "Computer Science", subtopic: "Javascript", questions: [
      {
        question: "Which method is used to create a shallow copy of an array in JavaScript?",
        answer1: "array.copy()",
        answer2: "array.clone()",
        answer3: "array.slice()",
        answer4: "array.duplicate()",
        correct: 3
      },
      {
        question: "What does 'this' refer to when used inside an arrow function?",
        answer1: "The global object",
        answer2: "The function itself",
        answer3: "The lexical scope where the arrow function was defined",
        answer4: "Undefined",
        correct: 3
      },
      {
        question: "What is the difference between '==' and '===' operators in JavaScript?",
        answer1: "'==' checks value and type, '===' checks only value",
        answer2: "'==' performs type coercion, '===' checks both value and type",
        answer3: "'==' is for objects, '===' is for primitives",
        answer4: "There is no difference",
        correct: 2
      },
      {
        question: "What is the purpose of the 'async' keyword in JavaScript?",
        answer1: "To make a function run in the background",
        answer2: "To create synchronous code",
        answer3: "To define a function that returns a Promise",
        answer4: "To improve performance of loops",
        correct: 3
      },
      {
        question: "Which of the following is NOT a valid way to declare a variable in JavaScript?",
        answer1: "var myVariable;",
        answer2: "let myVariable;",
        answer3: "const myVariable;",
        answer4: "def myVariable;",
        correct: 4
      }
    ]},
    {
      topic: "History",
      subtopic: "Ancient Egypt",
      questions: [
        {
          question: "What structure was built as tombs for pharaohs in ancient Egypt?",
          answer1: "Ziggurats",
          answer2: "Pyramids",
          answer3: "Temples",
          answer4: "Coliseums",
          correct: 2
        },
        {
          question: "Which river was essential to ancient Egyptian civilization?",
          answer1: "Euphrates",
          answer2: "Tigris",
          answer3: "Nile",
          answer4: "Jordan",
          correct: 3
        },
        {
          question: "What writing system did ancient Egyptians use?",
          answer1: "Cuneiform",
          answer2: "Hieroglyphics",
          answer3: "Latin alphabet",
          answer4: "Phoenician script",
          correct: 2
        },
        {
          question: "Who was the female pharaoh famous for wearing a false beard?",
          answer1: "Cleopatra",
          answer2: "Nefertiti",
          answer3: "Hatshepsut",
          answer4: "Ankhesenamun",
          correct: 3
        },
        {
          question: "What ancient Egyptian god has the head of a jackal?",
          answer1: "Ra",
          answer2: "Osiris",
          answer3: "Horus",
          answer4: "Anubis",
          correct: 4
        }
      ]
    },
    {
      topic: "History",
      subtopic: "American Revolution",
      questions: [
        {
          question: "In what year did the American Revolution begin?",
          answer1: "1775",
          answer2: "1776",
          answer3: "1777",
          answer4: "1778",
          correct: 1
        },
        {
          question: "Who was the commander-in-chief of the Continental Army?",
          answer1: "Benjamin Franklin",
          answer2: "Thomas Jefferson",
          answer3: "George Washington",
          answer4: "John Adams",
          correct: 3
        },
        {
          question: "What document was signed on July 4, 1776?",
          answer1: "The Constitution",
          answer2: "The Bill of Rights",
          answer3: "The Declaration of Independence",
          answer4: "The Articles of Confederation",
          correct: 3
        },
        {
          question: "Which event involved colonists throwing tea into the harbor to protest British taxes?",
          answer1: "Boston Massacre",
          answer2: "Boston Tea Party",
          answer3: "Battle of Lexington",
          answer4: "Stamp Act Congress",
          correct: 2
        },
        {
          question: "In what year did the American Revolution officially end with the Treaty of Paris?",
          answer1: "1781",
          answer2: "1782",
          answer3: "1783",
          answer4: "1784",
          correct: 3
        }
      ]
    }
  ]);

  const handleTopicSelect = (value: string) => {
    let subtopicArr: string[] = [];
    quizzes.forEach(quiz => {
      const curTopic = (quiz as {topic: string}).topic;
      const curSubtopic = (quiz as {subtopic: string}).subtopic;
      if (curTopic === value && !subtopicArr.includes(curSubtopic)) {
        subtopicArr.push(curSubtopic);
      }
    });
    setSubtopics(subtopicArr);
  };

  const handleStartQuiz = () => {

  };

  useEffect(() => {
    const getQuizzes = async () => {
      const quizResp = await fetch("http://localhost:8000/api/get_quizzes");
      const quizRespObj = await quizResp.json();
      if (quizRespObj && Object.keys(quizRespObj).length > 0) {
        setQuizzes(quizRespObj);
      }
    };
    // getQuizzes();
  }, []);

  useEffect(() => {
    let topicArr: string[] = [];
    quizzes.forEach(quiz => {
      const curTopic = (quiz as {topic: string}).topic;
      if (!topicArr.includes(curTopic)) {
        topicArr.push(curTopic);
      }
    });
    setTopics(topicArr);
  }, [quizzes]);

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Quiz</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[auto_1fr] auto-rows-auto gap-4">
          <span className="flex items-center">Topic</span>
          <Select onValueChange={(value) => handleTopicSelect(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a topic..."/>
            </SelectTrigger>
            <SelectContent>
              {topics.map((topic) => (
                <SelectItem key={topic} value={topic}>{topic}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="flex items-center">Subtopic</span>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a subtopic..."/>
            </SelectTrigger>
            <SelectContent>
              {subtopics.map((subtopic) => (
                <SelectItem key={subtopic} value={subtopic}>{subtopic}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="flex items-center">Timed</span>
          <div className="flex items-center">
            <Checkbox 
              id="timed"
              checked={timerEnabled}
              onCheckedChange={() => setTimerEnabled(!timerEnabled)}
            />
          </div>
          <span className="flex items-center">Time Limit</span>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <Input className="w-16" type="number" defaultValue="5" disabled={!timerEnabled}/>
              <span className="pr-6 pl-2">m</span>
              <Input className="w-16" type="number" defaultValue="0" disabled={!timerEnabled}/>
              <span className="pr-6 pl-2">s</span>
            </div>
            <span className={invalidValueVisible ? "text-destructive" : "invisible"}>Invalid time limit</span>
          </div>
          <></>
          <span className="text-destructive"></span>

        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-stretch gap-2 mt-4">
          <Button className="flex-1 cursor-pointer" variant="outline">Cancel</Button>
          <Button className="flex-1 cursor-pointer">Start Quiz</Button>
        </div>
      </CardFooter>
    </Card>
  );
};