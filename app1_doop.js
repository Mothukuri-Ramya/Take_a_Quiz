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
        userScore=0;
        
        if(level<=2){
        restart_quiz.innerHTML="next level";
          
      }
        else{
          restart_quiz.innerHTML='<a id="1" href="ind.php">get certificate</a>';
          
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

    window.location.href = "book.html";  
}

function home(){

  window.location.href = "quiz.php";  
}







let questions = [[
  
    {
    numb: 1,
    question: "Who is the father of C language?",
    answer: "Dennis Ritchie",
    options: [
        "Steve Jobs",
        "James Gosling",
        "Dennis Ritchie",
        "Rasmus Lerdorf"
    ]
  },
    {
    numb: 2,
    question: "Which of the following is not a valid C variable name?",
    answer: "int $main;",
    options: [
      "int number;",
      "float rate;",
      "int variable_count;",
      "int $main;"
    ]
  },
    {
    numb: 3,
    question: "Which of the following is true for variable names in C?",
    answer: "Variable names cannot start with a digit",
    options: [
      "They can contain alphanumeric characters as well as special characters",
      "It is not an error to declare a variable to be one of the keywords(like goto, static)",
      "Variable names cannot start with a digit",
      "Variable can be of any length"
    ]
  },
  {
    numb: 4,
    question: "Which of the following cannot be a variable name in C?",
    answer: "volatile",
    options: [
        "volatile",
        "true",
        "friend",
        "export"
    ]
  },
  {
    numb: 5,
    question: "What is short int in C programming?",
    answer: "Short is the qualifier and int is the basic data type",
    options: [
        "The basic data type of C",
        "Qualifier",
        "Short is the qualifier and int is the basic data type",
        "All of the mentioned"
    ]
  },
  {
    numb: 6,
    question: "What is the result of logical or relational expression in C?",
    answer: "0 or 1",
    options: [
        "True or False",
        "0 or 1",
        " 0 if an expression is false and any positive number if an expression is true",
        "None of the mentioned"
    ]
  },
  {
    numb: 7,
    question: "Which of the following typecasting is accepted by C language?",
    answer: "Widening & Narrowing conversions",
    options: [
        "Widening conversions",
        "Narrowing conversions",
        "Widening & Narrowing conversions",
        "None of the mentioned"
    ]
  },
  {
    numb: 8,
    question: "Where in C the order of precedence of operators do not exist?",
    answer: "None of the mentioned",
    options: [
        "Within conditional statements, if, else",
        "Within while, do-while",
        "Within a macro definition",
        "None of the mentioned"
    ]
  },
  
  {
    numb: 9,
    question: "What is an example of iteration in C?",
    answer: "all of the mentioned",
    options: [
        "for",
        "while",
        "do-while",
        "all of the mentioned"
    ]
  },
  {
    numb: 10,
    question: "Functions can return enumeration constants in C?",
    answer: "true",
    options: [
        "true",
        "false",
        "depends on the compiler",
        "depends on the standard"
    ]
  },
  {
    numb: 11,
    question: "What is #include <stdio.h>?",
    answer: "Preprocessor directive",
    options: [
        "Preprocessor directive",
        "Inclusion directive",
        "File inclusion directive",
        "None of the mentioned"
    ]
  },
  {
    numb: 12,
    question: "Which of the following are C preprocessors?",
    answer: "all of the mentioned",
    options: [
        "#ifdef",
        "#define",
        "#endif",
        "all of the mentioned"
    ]
  },
  {
    numb: 13,
    question: "The C-preprocessors are specified with _________ symbol.",
    answer: "#",
    options: [
        "#",
        "$",
        "' '",
        "&"
    ]
  },
  {
    numb: 14,
    question: "When a C program is started, O.S environment is responsible for opening file and providing pointer for that file?",
    answer: "All of the mentioned",
    options: [
        "Standard input",
        "Standard output",
        "Standard error",
        "All of the mentioned"
    ]
  },
  {
    numb: 15,
    question: "In C language, FILE is of which data type?",
    answer: "struct",
    options: [
        "int",
        "char*",
        "struct",
        "None of the mentioned"
    ]
  }
  
  ],
  /*medium questions*/
  [
    
  {
  numb: 1,
  question: "What is meant by ‘a’ in the following C operation?"+"<br>"+"     fp = fopen('Random.txt', 'a'); ",
  answer: "Append",
  options: [
      "Attach",
      "Append",
      "Apprehend",
      "Add"
  ]
  },
  {
  numb: 2,
  question: "Property which allows to produce different executable for different platforms in C is called?",
  answer: "Conditional compilation",
  options: [
    "File inclusion",
    "Selective inclusion",
    "Conditional compilation",
    "Recursive macros"
  ]
  },
  {
  numb: 3,
  question: "How is search done in #include and #include “somelibrary.h” according to C standard?",
  answer: "For both, search for ‘somelibrary’ is done in implementation-defined places",
  options: [
    "When former is used, current directory is searched and when latter is used, standard directory is searched",
    "When former is used, standard directory is searched and when latter is used, current directory is searched",
    "When former is used, search is done in implementation defined manner and when latter is used, current directory is searched",
    "For both, search for ‘somelibrary’ is done in implementation-defined places"
  ]
  },
  {
  numb: 4,
  question: "Which of the following is not possible statically in C language?",
  answer: "Jagged Array",
  options: [
    "Jagged Array",
    "Rectangular Array",
    "Cuboidal Array",
    "Multidimensional Array"
  ]
  },
  {
  numb: 5,
  question: "What will be the output of the following C code?"+"<br>"+"     #include <stdio.h>"+"<br>"+"          int main()"+"<br>"+"     {"+"<br>"+"        int y = 10000;"+"<br>"+"      int y = 34;"+"<br>"+"        printf(\"Hello World! %d<br>\", y);"+"<br>"+"      return 0;"+"<br>"+"}" ,
  answer: "Compile time error",
  options: [
    "Compile time error",
    "Hello World! 34",
    "Hello World! 1000",
    "Hello World! followed by a junk value"
  ]
  },
  {
  numb: 6,
  question: "What will be the value of the following assignment expression?"+"<br>"+"(x = foo())!= 1 considering foo() returns 2",
  answer: "2",
  options: [
    "2",
    "True",
    "1",
    "0"
  ]
  },
  
  {
  numb: 7,
  question: "Comment on the following C statement."+"<br>"+"  n = 1;"+"<br>"+"printf(\"%d, %dn\", 3*n, n++);",
  answer: "Output is compiler dependent",
  options: [
    "Output will be 3, 2",
    "Output will be 3, 1",
    "Output will be 6, 1",
    "Output is compiler dependent"
  ]
  },
  {
  numb: 8,
  question: "What is the problem in the following C declarations?"+"<br>"+ "  int func(int);"+"<br>"+"  double func(int);"+"<br>"+"  int func(float);",
  answer: "All of the mentioned",
  options: [
    "A function with same name cannot have different signatures",
    "A function with same name cannot have different return types",
    "A function with same name cannot have different number of parameters",
    "All of the mentioned"
  ]
  },
  {
  numb: 9,
  question: "Which option should be selected to work the following C expression?"+"<br>"+"string p = \"HELLO\";",
  answer: "typedef char *string;",
  options: [
    "typedef char [] string;",
    "typedef char *string;",
    "typedef char [] string; and typedef char *string;",
    "Such expression cannot be generated in C"
  ]
  },
  {
  numb: 10,
  question: "What is the meaning of the following C statement?"+"<br>"+"printf(“%10s”, state); ",
  answer: "Print empty spaces if the string state is less than 10 characters",
  options: [
    "10 spaces before the string state is printed",
    "Print empty spaces if the string state is less than 10 characters",
    "Print the last 10 characters of the string",
    "None of the mentioned"
  ]
  },
  {
  numb: 11,
  question: "What are the elements present in the array of the following C code?"+"<br>"+"int array[5] = {5};",
  answer: " 5, 0, 0, 0, 0",
  options: [
    "5, 5, 5, 5, 5",
    " 5, 0, 0, 0, 0",
    "5, (garbage), (garbage), (garbage), (garbage)",
    "(garbage), (garbage), (garbage), (garbage), 5"
  ]
  },
  {
  numb: 12,
  question: "What will be the output of the following C function when EOF returns?"+"<br>"+"   int fputs(char *line, FILE *fp)",
  answer: "When an error occurs",
  options: [
    " ‘�’ character of array line is encountered",
    "‘n’ character in array line is encountered",
    "‘t’ character in array line is encountered",
    "When an error occurs"
  ]
  },
  {
  numb: 13,
  question: "What is the meaning of the following C statement?"+"<br>"+" printf(“%10s”, state); ",
  answer: " Print empty spaces if the string state is less than 10 characters",
  options: [
    "10 spaces before the string state is printed",
    " Print empty spaces if the string state is less than 10 characters",
    "Print the last 10 characters of the string",
    "None of the mentioned"
  ]
  },
 /* {
  numb: 14,
  question: " The standard header _______ is used for variable list arguments (…) in C.",
  answer: "<stdarg.h>",
  options: [
    "<stdio.h >",
    "<stdlib.h>",
    "<math.h>",
    "<stdarg.h>"
  ]
  },*/
  {
  numb: 14,
  question: "Which keyword is used to prevent any changes in the variable within a C program?",
  answer: "const",
  options: [
    "immutable",
    "mutable",
    "const",
    "volatile"
  ]
  }
  ],
  
/* hard */
[
  
{
numb: 1,
question: "What will be the output of the following C code"+"<br>"+"   #include <stdio.h>"+"<br>"+"    int main()"+"<br>"+"   {"+"<br>"+"    signed char chr;"+"<br>"+"   chr=128;"+"<br>"+"     printf(\"%d<br>\",chr);"+"<br>"+"    return 0;",
answer: " -128",
options: [
    "128",
    " -128",
    "Depends on the compiler",
    "None of the mentioned"
]
},
{
numb: 2,
question: "What will be the output of the following C function?"+"<br>"+"   #include<stdio.h>"+"<br>"+"     enum birds {SPARROW, PEACOCK, PARROT};"+"<br>"+"     enum animals {TIGER = 8, LION, RABBIT, ZEBRA};"+"<br>"+"     int main()"+"<br>"+"      {"+"<br>"+"      enum birds m = TIGER;"+"<br>"+"   int k;"+"<br>"+"    k=m;"+"<br>"+"printf(\"%d\n\",k);"+"<br>"+"     return 0;"+"<br>"+"       }",
answer: "8",
options: [
    "0",
    "Compile time error",
    "1",
    "8"
]
},
{
numb: 3,
question: " What will be the output of the following C code?"+"<br>"+"#include <stdio.h>"+"<br>"+"     int const print()"+"<br>"+"     {"+"<br>"+"      printf(\"Sanfoundry.com\");"+"<br>"+"      return 0;"+"<br>"+"   }"+"void main()"+"<br>"+"{"+"<br>"+"      print();"+"<br>"+"    }",
answer: "Sanfoundry.com",
options: [
    "Error because function name cannot be preceded by const",
    "Sanfoundry.com",
    "Sanfoundry.com is printed infinite times",
    "Blank screen, no output"
]
},
{
numb: 4,
question: "Will the following C code compile without any error?"+"<br>"+"#include<stdio.h>"+"<br>"+"     int main(){"+"<br>"+"     for(int k=0;k<10;k++);"+"<br>"+"      return 0;"+"<br>"+" }",
answer: "Depends on the C standard implemented by compilers",
options: [
    "Yes",
    "No",
    "Depends on the C standard implemented by compilers",
    "Error"
]
},
{
numb: 5,
question: "What will be the final value of x in the following C code?"+"<br>"+"#include<stdio.h>"+"<br>"+"    void main(){"+"<br"+"       int x=5*9/3+9;"+"<br>"+"}",
answer: "24",
options: [
    "3.75",
    "Depends on compiler",
    "24",
    "3"
]
},
{
numb: 6,
question: "What will be the output of the following C code? (Initial values: x= 7, y = 8)"+"<br>"+"#include<stdio.h"+"<br"+"     void main(){"+"<br>"+"      float x;"+"<br"+"      int y;"+"<br>"+"      printf(\"enter two numbers \n\" ,x);"+"<br>"+"      scanf(\"%f %f\",&x,&y);"+"<br>"+"      printf(\"%f,%d\",x,y);",
answer: "7.000000, junk",
options: [
    "7.000000, 7",
    "Run time error",
    "7.000000, junk",
]},

{
  numb: 7,
  question: "What will be the output of the following C code considering the size of a short int is 2, char is 1 and int is 4 bytes?"+"<br>"+"#include<stdio.h>"+"<br>"+"      int main(){"+"<br>"+"       short int i=20;"+"<br>"+"      char c=97;"+"<br>"+"         printf(\"%d, %d, %d\n\", sizeof(i), sizeof(c), sizeof(c+i));"+"<br>"+"       return 0;"+"<br>"+"      return 0;",
  answer: "2, 1, 4",
  options: [
      "2,1,2",
      "2,1,1",
      "2, 1, 4",
      "2,2,8"
  ]
},
{
  numb: 8,
  question: "What is the difference between the following 2 C codes?"+"<br>"+"#include <stdio.h> //Program 1"+"<br>"+"   int main(){"+"<br>"+"         int d,a=1,b=2;"+"<br>"+"         d=a++ + ++b;"+"<br>"+"        printf(\"%d %d %d\", d,a,b);"+"<br>"+"  }"+"<br>"+"  #include<stdio.h>"+"<br>"+"     int main(){"+"<br>"+"     int d,a=1,b=2;"+"<br>"+"       d=a++ + ++b;"+"<br>"+"       printf(\"%d %d %d\",d,a,b);"+"<br"+"  }",
  answer: "Program 2 has syntax error, program 1 is not",
  options: [
      "No difference as space doesn’t make any difference, values of a, b, d are same in both the case",
      "Space does make a difference, values of a, b, d are different",
      "Program 1 has syntax error, program 2 is not",
      "Program 2 has syntax error, program 1 is not"
  ]
},
{
  numb: 9,
  question: "What will be the output of the following C code snippet?"+"<br>"+"#include<stdio.h>"+"<br>"+"      void main()"+"<br>"+" {"+"<br>"+"     1<2 ? return 1:return 2;"+"<br>"+" }",
  answer: "Compile time error",
  options: [
      "returns 1",
      "returns 2",
      "Varies",
      "Compile time error"
  ]
},
{
  numb: 10,
  question: "What will be the output of following C function?"+"<br>"+"#include<stdio.h>"+"<br>"+"    void reverse(int i);"+"<br>"+"    int main(){"+"<br>"+"     reverse(1);"+"<br>"+"}"+"<br>"+"void reverse(int i)"+"<br>"+"{"+"      if(i>5)"+"<br>"+"           return;"+"<br>"+"          printf(\"%d\",i);"+"<br>"+"         return reverse((i++,i));"+"<br>"+"     }",
  answer: "1 2 3 4 5",
  options: [
      "1 2 3 4 5",
      "Segmentation fault",
      "Compilation error",
      "Undefined behavior"
  ]
},
{
  numb: 11,
  question: "What will be the final values of i and j in the following C code?"+"<br>"+"#include <stdio.h>"+"<br>"+"int x = 0;"+"<br>"+"int main()"+"<br"+"{"+"<br>"+"int i = (f() + g()) | g(); //bitwise or"+"<br>"+"int j = g() | (f() + g()); //bitwise or"+"<br>"+"}"+"<br>"+"int f()"+"<br>"+"{"+"<br>"+ "       if (x == 0)"+"<br>"+"       return x + 1;"+"<br>"+"else"+"<br>"+"           return x - 1;"+"<br>"+"}"+"<br>"+"  int g()"+"<br>"+"{"+"<br>"+"      return x++;"+"<br>"+"}",
  answer: "i value is 1 and j value is undefined",
  options: [
      "i value is 1 and j value is 1",
      "i value is 0 and j value is 0",
      "i value is 1 and j value is undefined",
      "i and j value are undefined"
  ]
},
{
  numb: 12,
  question: "Which part of the program address space is p stored in the following C code?"+"<br>"+"#include<stdio.h>"+"<br>"+"      int *p;"+"<br>"+"        int main()"+"<br>"+"{"+"<br>"+"     int i=0;"+"<br>"+"       p=&i;"+"<br>"+"      return 0;"+"<br>"+"  }",
  answer: "Bss segment",
  options: [
      "Code/text segment",
      "Data segment",
      "Bss segment",
      "Stack"
      
  ]
},
{
  numb: 13,
  question: "What will be the output of the following C code?"+"<br>"+"#include <stdio.h>"+"<br>"+"<br>"+"    int main()"+"<br>"+"     {"+"<br>"+"         int i = 0;"+"<br>"+"      do"+"<br>"+"     {"+"<br>"+"        i++;"+"<br>"+"        if (i == 2)"+"<br>"+"       continue;"+"<br>"+"         printf(\"In while loop \");"+"<br>"+"      } while (i < 2); "+"<br>"+"        printf(\"%d\n\", i);"+"<br>"+"   }",
  answer: "Infinite loop",
  options: [
      "In while loop 2",
      "In while loop in while loop 3",
      "In while loop 3",
      "Infinite loop"
  ]
},
{
  numb: 14,
  question: "How many times i value is checked in the following C program?"+"<br>"+"#include <stdio.h>"+"<br>"+"int main()"+"<br>"+"{"+"<br>"+"      int i = 0;"+"<br>"+"     while (i < 3)"+"      i++;"+"<br>"+"       printf(\"In while loop\n\");"+"<br>"+" }",
  answer: "2",
  options: [
      "2",
      "3",
      "4",
      "1"
  ]
},
{
  numb: 15,
  question: "What is actually passed if you pass a structure variable to a function",
  answer: "copy of structure variable",
  options: [
      "copy of structure variable",
      "reference of structure variable",
      "starting address of structure variable",
      "ending address of structure variable"
  ]
}
 ]];

  