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
import {
  Pagination,
  PaginationItem,
  PaginationContent,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { auth, db } from "@/lib/firebase"; // Import from firebase config
import { collection, addDoc, query, where, getDocs, orderBy } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";

export default function QuizInitialization() {
  const minInputRef = useRef<HTMLInputElement>(null);
  const secInputRef = useRef<HTMLInputElement>(null);
  const selectedTopic = useRef<string | null>(null);
  const selectedQuizIndex = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const selectedAnswersCopy = useRef<number[]>([]);
  const startTimeRef = useRef<number>(-1);
  const duration = useRef<number | null>(null);
  const result = useRef<number[]>([0,0]);

  const [quizState, setQuizState] = useState<string>("init");
  const [quizPageNum, setQuizPageNum] = useState<number>(1);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timerDisplay, setTimerDisplay] = useState<string>("");
  const [offset, setOffset] = useState<number>(Math.PI * 9);

  const [invalidValueVisible, setInvalidValueVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [timerEnabled, setTimerEnabled] = useState<boolean>(false);
  const [topics, setTopics] = useState<string[]>(["Computer Science", "History"]);
  const [subtopics, setSubtopics] = useState<string[]>([]);
  const [userQuizScores, setUserQuizScores] = useState<any[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [quizzes, setQuizzes] = useState<Object[]>([
    { topic: "Computer Science", subtopic: "Data Structures", questions: [
      {
        question: "Which data structure is best for implementing a First-In-First-Out (FIFO) system?",
        answers: ["Stack", "Queue","Linked List", "Hash Table"],
        correct: 1
      },
      {
        question: "What is the time complexity of accessing an element by index in an array?",
        answers: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
        correct: 2
      },
      {
        question: "Which data structure uses a 'Last-In-First-Out' (LIFO) principle?",
        answers: ["Queue", "Binary Search Tree", "Stack", "Heap"],
        correct: 2
      },
      {
        question: "What is the main advantage of using a hash table over an array for storing key-value pairs?",
        answers: ["Guaranteed constant-time operations", "Better memory efficiency", "Fast average-case lookup operations", "Maintains sorted order of elements"],
        correct: 2
      },
      {
        question: "Which of the following is NOT a type of tree data structure?",
        answers: ["Binary Search Tree", "B-Tree", "AVL Tree", "Circular Tree"],
        correct: 3
      }
    ]},
    { topic: "Computer Science", subtopic: "Javascript", questions: [
      {
        question: "Which method is used to create a shallow copy of an array in JavaScript?",
        answers: ["array.copy()", "array.clone()", "array.slice()", "array.duplicate()"],
        correct: 2
      },
      {
        question: "What does 'this' refer to when used inside an arrow function?",
        answers: ["The global object", "The function itself", "The lexical scope where the arrow function was defined", "Undefined"],
        correct: 2
      },
      {
        question: "What is the difference between '==' and '===' operators in JavaScript?",
        answers: ["'==' checks value and type, '===' checks only value", "'==' performs type coercion, '===' checks both value and type", "'==' is for objects, '===' is for primitives", "There is no difference"],
        correct: 1
      },
      {
        question: "What is the purpose of the 'async' keyword in JavaScript?",
        answers: ["To make a function run in the background", "To create synchronous code", "To define a function that returns a Promise", "To improve performance of loops"],
        correct: 2
      },
      {
        question: "Which of the following is NOT a valid way to declare a variable in JavaScript?",
        answers: ["var myVariable;", "let myVariable;", "const myVariable;", "def myVariable;"],
        correct: 3
      }
    ]},
    {
      topic: "History",
      subtopic: "Ancient Egypt",
      questions: [
        {
          question: "What structure was built as tombs for pharaohs in ancient Egypt?",
          answers: ["Ziggurats", "Pyramids", "Temples", "Coliseums"],
          correct: 1
        },
        {
          question: "Which river was essential to ancient Egyptian civilization?",
          answers: ["Euphrates", "Tigris", "Nile", "Jordan"],
          correct: 2
        },
        {
          question: "What writing system did ancient Egyptians use?",
          answers: ["Cuneiform", "Hieroglyphics", "Latin alphabet", "Phoenician script"],
          correct: 1
        },
        {
          question: "Who was the female pharaoh famous for wearing a false beard?",
          answers: ["Cleopatra", "Nefertiti", "Hatshepsut", "Ankhesenamun"],
          correct: 2
        },
        {
          question: "What ancient Egyptian god has the head of a jackal?",
          answers: ["Ra", "Osiris", "Horus", "Anubis"],
          correct: 3
        }
      ]
    },
    {
      topic: "History",
      subtopic: "American Revolution",
      questions: [
        {
          question: "In what year did the American Revolution begin?",
          answers: ["1775", "1776", "1777", "1778"],
          correct: 0
        },
        {
          question: "Who was the commander-in-chief of the Continental Army?",
          answers: ["Benjamin Franklin", "Thomas Jefferson", "George Washington", "John Adams"],
          correct: 2
        },
        {
          question: "What document was signed on July 4, 1776?",
          answers: ["The Constitution", "The Bill of Rights", "The Declaration of Independence", "The Articles of Confederation"],
          correct: 2
        },
        {
          question: "Which event involved colonists throwing tea into the harbor to protest British taxes?",
          answers: ["Boston Massacre", "Boston Tea Party", "Battle of Lexington", "Stamp Act Congress"],
          correct: 1
        },
        {
          question: "In what year did the American Revolution officially end with the Treaty of Paris?",
          answers: ["1781", "1782", "1783", "1784"],
          correct: 2
        }
      ]
    }
  ]);

  // Check authenticated user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchUserQuizScores(currentUser.uid);
      }
    });
    
    return () => unsubscribe();
  }, []);

  // Fetch user's quiz scores from Firebase
  const fetchUserQuizScores = async (userId: string) => {
    try {
      // Access scores as a subcollection of users
      const scoresRef = collection(db, "users", userId, "quizScores");
      const q = query(
        scoresRef,
        orderBy("timestamp", "desc")
      );
      
      const querySnapshot = await getDocs(q);
      const scores: any[] = [];
      
      querySnapshot.forEach((doc) => {
        scores.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      setUserQuizScores(scores);
    } catch (error) {
      console.error("Error fetching quiz scores:", error);
    }
  };

  // Save quiz result to Firebase
  const saveQuizResultToFirebase = async () => {
    if (!user) {
      console.error("No authenticated user");
      return;
    }
  
    try {
      const percentage = Math.round(result.current[0] * 100 / result.current[1]);
      const currentQuiz = quizzes[selectedQuizIndex.current as number] as any;
      
      const quizData = {
        // Remove userId field since it's now implicit in the path
        topic: selectedTopic.current,
        subtopic: currentQuiz.subtopic,
        score: percentage,
        correctAnswers: result.current[0],
        totalQuestions: result.current[1],
        timestamp: new Date(),
        timeTaken: timerEnabled ? ((duration.current || 0) - ((startTimeRef.current > 0) ? ((Date.now() - startTimeRef.current) / 1000) : 0)) : null
      };
      
      // Add to user's subcollection instead of top-level collection
      await addDoc(collection(db, "users", user.uid, "quizScores"), quizData);
      await fetchUserQuizScores(user.uid); // Refresh scores
    } catch (error) {
      console.error("Error saving quiz result:", error);
    }
  };

  const getMessage = () => {
    const percentage = Math.round(result.current[0] * 100 / result.current[1]);
    if (percentage === 100) return "Perfect!"
    if (percentage >= 90) return "Great job!"
    if (percentage >= 70) return "Good effort! Keep learning!"
    return "Keep practicing! You'll improve next time!"
  };

  const handleTopicSelect = (value: string) => {
    console.log(`handleTopicSelect() value=${value}`);
    selectedTopic.current = value;
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

  const handleSubtopicSelect = (value: string) => {
    console.log(`handleSubtopicSelect() value=${value}`);
    quizzes.forEach((quiz, index) => {
      const curQuiz = quiz as {topic: string, subtopic: string};
      if (selectedTopic.current === curQuiz.topic && value === curQuiz.subtopic) {
        selectedQuizIndex.current = index;
      }
    });
  };

  const handleStartQuiz = () => {
    if (!user) {
      setErrorMessage("Please sign in to take a quiz");
      return;
    }
    
    if (minInputRef.current && secInputRef.current) {
      const minString = minInputRef.current.value || "";
      const secString = secInputRef.current.value || "";
      let hasError = false;
      
      if (timerEnabled && (/\D/.test(minString) || /\D/.test(secString))) {
        setInvalidValueVisible(true);
        hasError = true;
      } 
      
      if (selectedQuizIndex.current === null) {
        setErrorMessage("Select a topic and subtopic");
        hasError = true;
      }
      
      if (hasError) return;

      const quizLength = (quizzes[selectedQuizIndex.current as number] as {questions: any[]}).questions.length;
      if (timerEnabled) {
        duration.current = parseInt(minString) * 60 + parseInt(secString);
      }

      setSelectedAnswers(new Array(quizLength).fill(-1));
      setQuizState("start");
    }
  };

  const handleSubmitQuiz = () => {
    let numCorrect = 0;
    let numTotal = 0;
    (quizzes[selectedQuizIndex.current as number] as {questions: {correct: number}[]}).questions.map((question, index) => {
      numTotal++;
      if (question.correct === selectedAnswersCopy.current[index]) {
        numCorrect++;
      }
    });
    result.current = [numCorrect, numTotal];
    saveQuizResultToFirebase(); // Save quiz result to Firebase
    setQuizState("end");
  };

  const handleResetQuiz = () => {
    setSelectedAnswers([]);
    setQuizPageNum(1);
    selectedQuizIndex.current = null;
    setQuizState("init");
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
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

  useEffect(() => {
    if (quizState === "start" && timerEnabled) {
      const animate = () => {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        const remaining = (duration.current ?? 0) - elapsed;
        
        const newOffset = (1 - remaining / (duration.current ?? 0)) * Math.PI * 9;
        const timerStr = "" + Math.floor(remaining / 60) + ":" + ("" + Math.floor(remaining % 60)).padStart(2, "0");

        setOffset(newOffset);
        setTimerDisplay(timerStr);

        if (remaining > 0) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          // end quiz
          animationFrameRef.current = null;
          handleSubmitQuiz();
        }
      };

      startTimeRef.current = Date.now();
      animationFrameRef.current = requestAnimationFrame(animate);
    }
  }, [quizState]);

  useEffect(() => {
    selectedAnswersCopy.current = selectedAnswers;
  }, [selectedAnswers]);

  return (
    <Card className="max-w-4xl mx-auto">
      {!user && quizState === "init" && (
        <CardContent className="flex flex-col items-center justify-center py-8">
          <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
          <p className="text-muted-foreground mb-6">You need to be signed in to take quizzes</p>
          <Link href="/login">
            <Button>Sign In</Button>
          </Link>
        </CardContent>
      )}
      
      {user && quizState === "init" &&
      <>
        <CardContent>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Quiz</h1>
            <div className="text-sm text-muted-foreground">
              Signed in as: {user.email}
            </div>
          </div>
          
          {userQuizScores.length > 0 && (
            <div className="mb-6 mt-4 p-4 bg-slate-50 rounded-lg border">
              <h3 className="font-semibold mb-2">Recent Quiz Scores</h3>
              <div className="space-y-2">
                {userQuizScores.slice(0, 3).map((score, idx) => (
                  <div key={score.id} className="flex justify-between text-sm">
                    <span>{score.subtopic}</span>
                    <span className="font-medium">{score.score}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-[auto_1fr] auto-rows-auto gap-4 mt-8">
            <span className="flex items-center">Topic</span>
            <Select onValueChange={(value) => handleTopicSelect(value)}>
              <SelectTrigger className="w-full cursor-pointer">
                <SelectValue placeholder="Select a topic..."/>
              </SelectTrigger>
              <SelectContent>
                {topics.map((topic) => (
                  <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="flex items-center">Subtopic</span>
            <Select onValueChange={(value) => handleSubtopicSelect(value)}>
              <SelectTrigger className="w-full cursor-pointer">
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
                className="cursor-pointer"
              />
            </div>
            <span className="flex items-center">Time Limit</span>
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start">
                <Input
                  ref={minInputRef} 
                  className="w-16" 
                  type="number" 
                  defaultValue="5" 
                  disabled={!timerEnabled}
                />
                <span className="pr-6 pl-2">m</span>
                <Input
                  ref={secInputRef}
                  className="w-16" 
                  type="number" 
                  defaultValue="0" 
                  disabled={!timerEnabled}
                />
                <span className="pr-6 pl-2">s</span>
              </div>
              <span className={invalidValueVisible ? "text-destructive" : "invisible"}>Invalid time limit</span>
            </div>
            <></>
            <span className="text-destructive">{errorMessage}</span>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-center justify-stretch gap-2 mt-4">
            <Button className="flex-1 cursor-pointer" variant="outline">Cancel</Button>
            <Button className="flex-1 cursor-pointer" onClick={() => handleStartQuiz()}>Start Quiz</Button>
          </div>
        </CardFooter>
      </>}
      
      {quizState === "start" &&
      <>
        <CardContent className="flex flex-col justify-baseline items-start gap-2">
          <div className="flex justify-between items-start w-full">
            <div>
              <h1 className="text-3xl font-bold">Quiz</h1>
              <span className="font-light">Question {quizPageNum} of {(quizzes[selectedQuizIndex.current as number] as {questions: any[]}).questions.length}</span>
            </div>
            {timerEnabled && 
            <div className="relative">
              <svg viewBox="0 0 10 10" className="size-16">
                <circle 
                  cx="5" 
                  cy="5" 
                  r="4.5" 
                  fill="transparent" 
                  stroke="#000" 
                  strokeWidth="0.2"
                />
                <circle 
                  cx="5" 
                  cy="5" 
                  r="4.5" 
                  fill="transparent" 
                  stroke="#000" 
                  strokeWidth="0.8" 
                  strokeDasharray={"" + Math.PI * 9}
                  strokeDashoffset={"" + offset}
                  transform="rotate(-90 5 5)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">{timerDisplay}</div>
            </div>}
          </div>
          <h1 className="max-w-full text-lg font-semibold mb-4">{(quizzes[selectedQuizIndex.current as number] as {questions: any[]}).questions[quizPageNum-1].question}</h1>
          {(quizzes[selectedQuizIndex.current as number] as {questions: {answers: string[]}[]}).questions[quizPageNum-1].answers.map((val, index) => (
              <Button 
                className={
                  selectedAnswers[quizPageNum-1] === index ? 
                  "border-none justify-start w-full p-4 h-16 pointer-events-none ring-4 ring-[#24adb9] bg-cyan-100" : 
                  "justify-start w-full p-4 h-16 cursor-pointer"
                }
                variant="outline"
                key={index}
                onClick={() => {
                  const answerArr = [...selectedAnswers];
                  answerArr[quizPageNum-1] = index;
                  setSelectedAnswers(answerArr);
                }}
              >
                {val}
              </Button>
          ))}
        </CardContent>
        <CardFooter>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={(e) => {
                    e.preventDefault();
                    setQuizPageNum(Math.max(quizPageNum - 1, 1));
                  }}
                  className={quizPageNum === 1 ? "pointer-events-none opacity-50 mr-4 select-none" : "mr-4 cursor-pointer select-none"}
                />
              </PaginationItem>
              {((quizzes[selectedQuizIndex.current as number] as {questions: any[]}).questions).map((_, index) => (
                <PaginationItem 
                  key={`page${index+1}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setQuizPageNum(index + 1);
                  }}
                  className={quizPageNum === index + 1 ? "pointer-events-none ring-1 ring-(--border) px-4 py-3 rounded-md select-none" : "px-4 py-3 cursor-pointer select-none"}
                >{index + 1}</PaginationItem>
              ))}
              <PaginationItem>
                {(quizzes[selectedQuizIndex.current as number] as {questions: any[]}).questions.length === quizPageNum && 
                <Button
                  className="cursor-pointer ml-4 w-19 select-none"
                  onClick={() => handleSubmitQuiz()}
                >
                  Submit
                </Button>}
                {(quizzes[selectedQuizIndex.current as number] as {questions: any[]}).questions.length !== quizPageNum &&
                  <PaginationNext
                    className="cursor-pointer ml-4 w-19 select-none"
                    onClick={(e) => {
                      e.preventDefault();
                      setQuizPageNum(Math.min(quizPageNum + 1, (quizzes[selectedQuizIndex.current as number] as {questions: any[]}).questions.length));
                    }}
                  />
                }
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </>}
      
      {quizState === "end" &&
      <>
        <CardContent>
          <h1 className="text-3xl font-bold">Quiz</h1>
          <span className="font-light">Results</span>
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="bg-primary/10 p-4 rounded-full">
                <Trophy className="h-12 w-12 text-primary" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-3xl font-bold">
                {result.current[0]} / {result.current[1]}
              </h3>
              <p className="text-muted-foreground">{getMessage()}</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Score</span>
                <span>{Math.round(result.current[0] * 100 / result.current[1])}%</span>
              </div>
              <Progress value={Math.round(result.current[0] * 100 / result.current[1])} className="h-2" />
            </div>
            
            {userQuizScores.length > 0 && (
              <div className="mt-8 border-t pt-4">
                <h3 className="font-semibold mb-2">Your Quiz History</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {userQuizScores.map((score, idx) => (
                    <div key={score.id} className="flex justify-between text-sm border-b pb-2">
                      <div>
                        <span className="font-medium">{score.subtopic}</span>
                        <span className="text-xs text-gray-500 ml-2">
                          {new Date(score.timestamp.seconds * 1000).toLocaleDateString()}
                        </span>
                      </div>
                      <span className={
                        score.score >= 90 ? "text-green-600 font-bold" :
                        score.score >= 70 ? "text-blue-600 font-medium" :
                        "text-gray-600"
                      }>
                        {score.score}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-center justify-stretch gap-2 mt-4">
            <Button className="flex-1 cursor-pointer" variant="outline">
              <Link href="/dashboard">
                Back to Dashboard
              </Link>
            </Button>
            <Button className="flex-1 cursor-pointer" onClick={() => handleResetQuiz()}>Take Another Quiz</Button>
          </div>
        </CardFooter>
      </>}
    </Card>
  );
}
