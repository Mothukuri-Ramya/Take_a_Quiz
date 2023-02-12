//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// if startQuiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
}

// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    
}

let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
let level=0;
let score1=0;
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");




// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;

    
    showQuetions(que_count); //calling showQestions function

  
if(level==1)
{
  b.innerHTML="MEDIUM";
}
else
{
  b.innerHTML="HARD";
}


    
    queCounter(que_numb); //passing que_numb value to queCounter
     
    
    
    next_btn.classList.remove("show"); //hide the next button
}

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = ()=>{
    if(que_count < questions[level].length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        next_btn.classList.remove("show"); //hide the next button
    }else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
}

// getting questions and options from array
function showQuetions(index){
   
    const que_text = document.querySelector(".que_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[level][index].numb + ". " + questions[level][index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[level][index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[level][index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[level][index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[level][index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}








// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer){
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[level][que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}

function showResult(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore >= questions[level].length-5){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>and congrats! , You got <p>'+ userScore +'</p> out of <p>'+ questions[level].length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
        level=level+1;
        score1=userScore;
        if(level<=2){
        restart_quiz.innerHTML="next level";}
        else{
          restart_quiz.innerHTML='<a id="1" href="cert_j.php">get certificate</a>';
        }
       
    }
    else if(userScore > 1){ // if user scored more than 1
        let scoreTag = '<span>You got <p>'+ userScore +'</p> out of <p>'+ questions[level].length +'</p></span>';
        scoreText.innerHTML = scoreTag;
        restart_quiz.innerHTML="prev level";
       


    }
    else{ // if user scored less than 1
        let scoreTag = '<span>and sorry , You got only <p>'+ userScore +'</p> out of <p>'+ questions[level].length+'</p></span>';
        scoreText.innerHTML = scoreTag;
        restart_quiz.innerHTML="prev level";
       
        
    }
}




function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions[level].length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}



function books(){

    window.location.href = "book_j.html";  
}





/*java easy level*/

let questions=[ [
    {
    numb: 1,
    question: "What is a correct syntax to output \"Hello World\" in Java?",
    answer: "System.out.println(\"Hello World\"); ",
    options: [
        "System.out.println(\"Hello World\"); ",
        "print (\"Hello World\");",
        "Console.WriteLine(\"Hello World\");",
        "echo(\"Hello World\")"
    ]
  },
  {
    numb: 2,
    question: "Java is short for \"JavaScript\".",
    answer: "False",
    options: [
        "True",
        "False",
        "may be right",
        "may be false"
  
       
    ]
  },
  {
    numb: 3,
    question: ".How do you insert COMMENTS in Java code?",
    answer: "// This is a comment",
    options: [
        "# This is a comment",
        "// This is a comment",
        "/* This is a comment",
        "/// This is a comment"
      
    ]
  },
  {
    numb: 4,
    question: "Which data type is used to create a variable that should store text?",
    answer: "String",
    options: [
        "Txt",
        "myString",
        "String",
        "string"
    ]
  },
  {
    numb: 5,
    question: " How do you create a variable with the numeric value 5?",
    answer: "int x = 5;",
    options: [
        "num x = 5",
        "int x = 5;",
        "x = 5;",
        "float x = 5;"
    ]
  },
  {
    numb: 6,
    question: " How do you create a variable with the floating number 2.8?",
    answer: " float x = 2.8f;",
    options: [
        " float x = 2.8f;",
        "int x = 2.8f;",
        "x = 2.8f;",
        "byte x = 2.8f"
    ]
  },
  {
    numb: 7,
    question: "Which method can be used to find the length of a string?",
    answer: "length()",
    options: [
        "len()",
        "length()",
        "getLength()",
        "getSize()"
    ]
  },
  {
    numb: 8,
    question: "Which operator is used to add together two values?",
    answer: "The + sign",
    options: [
        "The + sign",
        "The * sign",
        "The & sign",
        "The / sign"
        
    ]
  },
  {
    numb: 9,
    question: "The value of a string variable can be surrounded by single quotes.",
    answer: "False",
    options: [
        "True",
        "False",
        "may be true",
        "may be false"
    ]
  },
  {
    numb: 10,
    question: "Which method can be used to return a string in upper case letters?",
    answer: "toUpperCase()",
    options: [
        "upperCase()",
        "tuc()",
        "touppercase()",
        "toUpperCase()"
    ]
  }
  
  ],
  /*java medium level*/
  [
    {
    numb: 1,
    question: "Which operator can be used to compare two values?",
    answer: "==",
    options: [
        "==",
        "><",
        "=",
        "<>"
    ]
  },
  {
    numb: 2,
    question: "To declare an array in Java, define the variable type with:",
    answer: "[]",
    options: [
        "{}",
        "[]",
        "()",
        "<>"
    ]
  },
  {
    numb: 3,
    question: "Array indexes start with:",
    answer: "0",
    options: [
        "0",
        "1",
        "-1",
        "10"
    ]
  },
  {
    numb: 4,
    question: "How do you create a method in Java?",
    answer: "methodName()",
    options: [
        "methodName()",
        "(methodName)",
        "methodName",
        "methodName[]"
    ]
  },
  {
    numb: 5,
    question: "Which keyword is used to create a class in Java?",
    answer: "class",
    options: [
        "MyClass",
        "class",
        "className",
        "class()"
    ]
  },
  {
    numb: 6,
    question: "What is the correct way to create an object called myObj of MyClass?",
    answer: "MyClass myObj = new MyClass();",
    options: [
        "new myObj = MyClass();",
        "MyClass myObj = new MyClass();",
        "class MyClass = new myObj();",
        "class myObj = new MyClass();"
    ]
  },
  {
    numb: 7,
    question: "In Java, it is possible to inherit attributes and methods from one class to another.",
    answer: "True",
    options: [
        "True",
        "False",
        "may be true",
        "may be false"
    ]
  },
  {
    numb: 8,
    question: "Which method can be used to find the highest value of x and y?",
    answer: "Math.max(x,y)",
    options: [
        "Math.largest(x,y)",
        "Math.maxNum(x,y)",
        "Math.max(x,y)",
        "Math.maximum(x,y)"
    ]
  },
  {
    numb: 9,
    question: "Which keyword is used to import a package from the Java API library?",
    answer: "import",
    options: [
        "import",
        "lib",
        "package",
        "getlib"
    ]
  },
  {
    numb: 10,
    question: "How do you start writing a while loop in Java?",
    answer: "while (x > y)",
    options: [
        "while (x > y)",
        "while x > y:",
        "x > y while {",
        "while x > y {"
    ]
  }
  ],
  /*java hard level*/
   [
    {
    numb: 1,
    question: " Which of the following would the below Java coding snippet return as its output?"+"<br>"+"class Super{"+"<br>"+"   public int index=1;"+"<br>"+"}"+"<br>"+"class App extends Super{"+"<br>"+"   public App(int index){"+"<br>"+"    index=index;"+"<br>"+" }"+"<br>"+"public static void main(String args[]){"+"<br>"+"   App myApp=new App(10);"+"<br>"+"   System.out.println(myApp.index);"+"<br>"+"   }"+"<br>"+"}",
    answer: "1",
    options: [
        "0",
        "10",
        "1",
        "Compile time error"
    ]
  },
  {
    numb: 2,
    question: "Which of the following combinations would the below Java coding snippet print?"+"<br>"+"class TestApp {"+"<br>"+"  protected int x, y;"+"<br>"+" }"+"<br>"+"class Main(){"+"<br>"+"public static void main(String args[]) {"+"<br>"+"    TestApp app = new TestApp();"+"<br>"+"    System.out.println(app.x + \" \" + app.y);"+"<br>"+" }"+"<br>"+"}",
     
    answer: "0 0",
    options: [
        "0 1",
        "1 0",
        "0 0",
        "null null"
    ]
  },
  {
    numb: 3,
    question: "What would be the outcome of following Java coding snippet?"+"<br>"+"class TestApp{"+"<br>"+"   public static void main(String[] args){"+"<br>"+"  for(int index=0;1;index++){"+"<br>"+"   System.out.println(\"Welcome\");"+"<br>"+"   break;"+"<br>"+"   }"+"<br>"+"  }"+"<br>"+"}",
    answer: "Welcome Welcome",
    options: [
        "Welcome",
        "Welcome Welcome",
        "Type mismatch error",
        "Run infinite times"
    ]
  },
  {
    numb: 4,
    question: "What would the below Java coding snippet print?"+"<br>"+"class TestApp{"+"<br>"+"  public static void main(String[] args){"+"<br>"+"  for (int index = 0; true; index++) {"+"  for (int index = 0; true; index++) {"+"<br>"+"   System.out.println(\"Welcome\");"+"<br>"+"   break;"+"<br>"+"     }"+"<br>"+"  }"+"<br>"+"}",
    answer: "Welcome",
    options: [
        "Welcome",
        "None",
        "Type mismatch error",
        "Run infinite times"
    ]
  },
  {
    numb: 5,
    question: "Which of the following values would the below Java coding snippet print in results?"+"<br>"+"class TestApp {"+"<br>"+"   int i[] = { 0 };"+"<br>"+"public static void main(String args[]) {"+"<br>+"+"  int i[] = { 1 };"+"<br>"+"   alter(i);"+"<br>"+"     System.out.println(i[0]);"+"<br>"+" }"+"<br>"+"  public static void alter(int i[]) {"+"<br>"+"   int j[]={2};"+"<br>"+"   i=j;"+"<br>"+"   }"+"<br>"+"}",
    answer: "1",
    options: [
        "0",
        "1",
        "2",
        "Compilation error"
    ]
  },
  {
    numb: 6,
    question: "Which of the following is the result of the following Java code?"+"<br>"+"class TestApp {"+"<br>"+"String args[] = { \"1\", \"2\" };"+"<br>"+" public static void main(String args[]) {"+"<br>"+"if (args.length > 0)"+"<br>"+"System.out.println(args.length);"+"<br>"+"}"+"<br>"+"}",
    answer: "The program compiles but prints nothing.",
    options: [
        "The program compiles but prints nothing.",
        "The program fails to compile.",
        "The program compiles and prints 2.",
        "The program compiles and prints 0."
    ]
  },
  {
    numb: 7,
    question: "What is the result of the following Java coding snippet?"+"<br>"+"class TestApp {"+"<br>"+"  public static void main() {"+"<br>"+"  int odd = 1;"+"<br>"+"if (odd) {"+"<br>"+"System.out.println(\"odd\");"+"<br>"+"} else {"+"<br>"+"System.out.println(\"even\");"+"<br>"+"   }"+"<br>"+"  }"+"<br>"+"}",
    answer: "Type mismatch error",
    options: [
        "odd",
        "even",
        "Run-time exception",
        "Type mismatch error"
    ]
  },
  {
    numb: 8,
    question: "What is the outcome of the below Java code?"+"<br>"+"class TestApp {"+"<br>"+"   public static void main(String args[]) {"+"<br>"+"   System.out.println(test());"+"<br>"+"}"+"<br>"+"static float test() {"+"<br>"+"    static float x = 0.0;"+"<br>"+"  return ++x;"+"<br>"+"  }"+"<br>"+"}",
    answer: "Compile time error",
    options: [
        "0.0",
        "1",
        "1.0",
        "Compile time error"
    ]
  },
  {
    numb: 9,
    question: "What would the following Java coding snippet display on execution?"+"<br>"+"Command-line: java TestApp 1 2 3 4 5"+"<br>"+"class TestApp {"+"<br>"+" public static void main(String[] args) {"+"<br>"+"System.out.println(args[1] + args[2] + args[3]);"+"<br>"+"  }"+"<br>"+"}",
    
    answer: "234",
    options: [
        "1 2 3",
        "123",
        "234",
        "Compilation error"
    ]
  },
  {
    numb: 10,
    question: "Which of the following is the result of the below Java coding snippet?"+"<br>"+"class TestApp {"+"<br>"+"   public static void main(String args[]) {"+"<br>"+"int bits;"+"<br>"+" bits = -3 >> 1;"+"<br>"+"bits = bits >>> 2;"+"<br>"+"bits = bits << 1;"+"<br>"+"System.out.println(bits);"+"<br>"+"   }"+"<br>"+"}",
    answer: "2147483646",
    options: [
        "1",
        "7",
        "-2147483646",
        "2147483646"
    ]
  }
  ]];
  