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
            restart_quiz.innerHTML='<a id="1" href="certi_cp.php">get certificate</a>';
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

    window.location.href = "book_cp.html";  
}






/*c++ easy level*/

let questions = [[
    {
    numb: 1,
    question: "Who invented C++",
    answer: "Bjarne Stroustrup",
    options: [
        "Dennis Ritchie",
        "Ken Thompson",
        "Brian Kernighan",
        "Bjarne Stroustrup"
    ]
  },
  {
    numb: 2,
    question: "What is C++?",
    answer: "C++ supports both procedural and object oriented programming language",
    options: [
        " C++ is an object oriented programming language",
        "C++ is a procedural programming language",
        "C++ supports both procedural and object oriented programming language",
        "C++ is a functional programming languageb)"
  
       
    ]
  },
   {
    numb: 3,
    question: "Which of the following is the correct syntax of including a user defined header files in C++?",
    answer: "#include “userdefined”",
    options: [
        "#include [userdefined]",
        " #include “userdefined”",
        "#include <userdefined.h>",
        "#include <userdefined>"
    ]
  },
   {
    numb: 4,
    question: "Which of the following is used for comments in C++?",
    answer: "both // comment or /* comment */",
    options: [
        "/* comment */",
        "// comment */",
        "// comment",
        "both // comment or /* comment */"
    ]
  },
   {
    numb: 5,
    question: "Which of the following user-defined header file extension used in c++?",
    answer: "h",
    options: [
        "hg",
        "cpp",
        "h",
        "hf"
    ]
  },
   {
    numb: 6,
    question: "Which of the following is a correct identifier in C++?",
    answer: "VAR_1234",
    options: [
        "VAR_1234",
        "$var_name",
        "7VARNAME",
        "7var_name"
    ]
  },
   {
    numb: 7,
    question: " Which of the following is not a type of Constructor in C++?",
    answer: "Friend constructor",
    options: [
        "Default constructor",
        "Parameterized constructor",
        "Copy constructor",
        "Friend constructor"
    ]
  },
   {
    numb: 8,
    question: "Which of the following approach is used by C++?",
    answer: "Bottom-up",
    options: [
        "Left-right",
        "Right-left",
        "Bottom-up",
        "Top-down"
    ]
  },
   {
    numb: 9,
    question: "What is virtual inheritance in C++?",
    answer: "C++ technique to avoid multiple copies of the base class into children/derived class",
    options: [
        "C++ technique to enhance multiple inheritance",
        " C++ technique to ensure that a private member of the base class can be accessed somehow",
        "C++ technique to avoid multiple inheritances of classes",
        "C++ technique to avoid multiple copies of the base class into children/derived class"
    ]
  },
  {
    numb: 10,
    question: "What happens if the following C++ statement is compiled and executed?"+"<br>"+"int *ptr = NULL;"+"<br>"+"delete ptr;",
    answer: "The program is compiled and executed successfully",
    options: [
        "The program is not semantically correct",
        "The program is compiled and executed successfully",
        "The program gives a compile-time error",
        "The program compiled successfully but throws an error during run-time"
    ]
  },
  {
    numb: 11,
    question: "What will be the output of the following C++ code?"+"<br>"+"#include <iostream>"+"<br>"+"#include <string>"+"<br>"+"using namespace std; "+"<br>"+"int main(int argc, char const *argv[])"+"<br>"+"{"+"<br>"+"       char s1[6] = \"Hello\";"+"<br>"+"        char s2[6] = \"World\";"+"<br>"+"     char s3[12] = s1 + \" \" + s2;"+"<br>"+"      cout<<s3"+"<br>"+"         return 0;"+"<br>"+"}",
    answer: "Error",
    options: [
        "Hello",
        "World",
        "Error",
        "Hello World"
    ]
  },
  {
    numb: 12,
    question: "What is the difference between delete and delete[] in C++?",
    answer: "delete is a keyword whereas delete[] is an identifier",
    options: [
        " delete is syntactically correct but delete[] is wrong and hence will give an error if used in any case",
        " delete is used to delete normal objects whereas delete[] is used to pointer objects",
        "delete is a keyword whereas delete[] is an identifier",
        "delete is used to delete single object whereas delete[] is used to multiple(array/pointer of) objects"
    ]
  },
  {
    numb: 13,
    question: " What happens if the following program is executed in C and C++?"+"<br>"+"#include <stdio.h>"+"<br>"+"int main(void)"+"<br>"+"{"+"<br>"+ "        int new = 5;"+"<br>"+"         printf(\"%d\", new);"+"<br>"+"}",
    answer: " Error in C++ and successful execution in C",
    options: [
        "Error in C and successful execution in C++",
        "Error in both C and C++",
        " Error in C++ and successful execution in C",
        "A successful run in both C and C++"
    ]
  },
  {
    numb: 14,
    question: "What happens if the following program is executed in C and C++?"+"<br>"+"#include <stdio.h>"+"<br>"+"void func(void)"+"<br>"+"{"+"<br>"+"       printf(\"Hello\");"+"<br>"+"}"+"<br>"+"void main()"+"<br>"+"{"+"<br>"+"         func();"+"<br>"+"         func(2);"+"<br>"+"}",
    answer: "Error in both C and C++",
    options: [
        "Outputs Hello twice in both C and C++",
        "Error in C and successful execution in C++",
        "Error in C++ and successful execution in C",
        "Error in both C and C++"
    ]
  },
  {
    numb: 15,
    question: "Which of the following is correct about this pointer in C++?",
    answer: "this pointer is passed as a hidden argument in all non-static functions of a class",
    options: [
        "this pointer is passed as a hidden argument in all static variables of a class",
        "this pointer is passed as a hidden argument in all the functions of a class",
        "this pointer is passed as a hidden argument in all non-static functions of a class",
        " this pointer is passed as a hidden argument in all static functions of a class"
    ]
  }
  ],


  /*c++ medium level*/
  [
    {
    numb: 1,
    question: "What will be the output of the following C++ code?"+"<br>"+"#include <iostream>"+"<br>"+"#include <string>"+"<br>"+"#include <algorithm>"+"<br>"+"using namespace std;"+"<br>"+"int main() "+"<br>"+"{"+"<br>"+"       string s = \"spaces in text\";"+"<br>"+"        s.erase(remove(s.begin(),s.end(), ' ' ), s.end() );"+"<br>"+"       cout << s << end1;"+"<br>"+" }",
    answer: "spacesintext",
    options: [
        "spacesintext",
        "spaces in text",
        "spaces",
        "spaces in"
    ]
  },
   {
    numb: 2,
    question: "Which of the following C++ code will give error on compilation?"+"<br>"+"====code 1==="+"<br>"+"#include <iostream>"+"<br>"+"using namespace std;"+"<br>"+"int main(int argc, char const *argv[])"+"<br>"+"{"+"<br>"+"          cout<<\"Hello World\";"+"<br>"+"        return 0;"+"<br>"+"}"+"<br>"+"======"+"<br>"+"===code 2==="+"<br>"+"#include <iostream>"+"<br>"+"int main(int argc, char const *argv[])"+"<br>"+"{"+"<br>"+"          std::cout<<\"Hello World\";"+"<br>"+"         return 0;"+"<br>"+"}",
    answer: "Neither code 1 nor code 2",
    options: [
        "Code 1 only",
        "Neither code 1 nor code 2",
        "Both code 1 and code 2",
        "Code 2 only"
    ]
  },
   {
    numb: 3,
    question: "Which of the following type is provided by C++ but not C?",
    answer: "bool",
    options: [
        "double",
        "float",
        "int",
        "bool"
    ]
  },
   {
    numb: 4,
    question: "What is the value of p in the following C++ code snippet?"+"<br>"+" #include<iostream>"+"<br>"+"using namespace std;"+"<br>"+"int main()"+"<br>"+"{"+"<br>"+"      int p;"+"<br>"+"        bool a = true;"+"<br>"+"      bool b=false;"+"<br>"+"         int x = 10;"+"<br>"+"       int y = 5;"+"<br>"+"        p = ((x | y) + (a+b));"+"<br>"+"         cout << p;"+"<br>"+"          return 0;"+"<br>"+"}",
    answer: "16",
    options: [
        "12",
        "0",
        "2",
        "16"
    ]
  },
   {
    numb: 5,
    question: "By default, all the files in C++ are opened in _________ mode.",
    answer: "Text",
    options: [
        "Binary",
        "VTC",
        "Text",
        "ISCII"
    ]
  },
   {
    numb: 6,
    question: "What will be the output of the following C++ function?"+"<br>"+"          int main()"+"<br>"+"{"+"<br>"+"            register int i = 1;"+"<br>"+"        int *ptr = &i;"+"<br>"+"      Cout << *ptr;"+"<br>"+"        return 0;"+"<br>"+"}",
    answer: "Compiler error may be possible",
    options: [
        "Runtime error may be possible",
        "Compiler error may be possible",
        "1",
        "0"
    ]
  },
   {
    numb: 7,
    question: "Which of the following correctly declares an array in C++?",
    answer: "int array[10];",
    options: [
        "array{10};",
        "array array[10];",
        "int array;",
        "int array[10];"
    ]
  },
   {
    numb: 8,
    question: "What is the size of wchar_t in C++?",
    answer: "Based on the number of bits in the system",
    options: [
        "Based on the number of bits in the system",
        "2 or 4",
        "4",
        "2"
    ]
  },
   {
    numb: 9,
    question: "What will be the output of the following C++ code?"+"<br>"+"#include<iostream>"+"<br>"+"using namespace std;"+"<br>"+"int main ()"+"<br>"+"{"+"<br>"+"     int cin;"+"<br>"+"     cin >> cin;"+"<br>"+"        cout << \"cin: \" << cin;"+"<br>"+"      return 0;"+"<br>"+" }",
    answer: "cin: garbage value",
    options: [
        "Segmentation fault",
        "Nothing is printed",
        "Error",
        "cin: garbage value"
    ]
  },
   {
    numb: 10,
    question: "What is the use of the indentation in c++?",
    answer: "distinguishes between comments and code",
    options: [
        "What is the use of the indentation in c++?",
        "distinguishes between comments and inner data",
        "distinguishes between comments and code",
        "distinguishes between comments and outer data"
    ]
  },
   {
    numb: 11,
    question: "Which is more effective while calling the C++ functions?",
    answer: "call by reference",
    options: [
        "call by object",
        "call by pointer",
        "call by value",
        "call by reference"
    ]
  },
   {
    numb: 12,
    question: "What will be the output of the following C++ program?"+"<br>"+"#include <iostream>"+"<br>"+"#include<string>"+"<br>"+"#include <cstring>"+"<br>"+"using namespace std;"+"<br>"+"int main(int argc,char const *argv[])"+"<br>"+"{"+"<br>"+"          const char *a=\"Hello\0World\";"+"<br>"+"          cout<<a;"+"<br>"+"           return 0;"+"}",
    answer: "Hello",
    options: [
        "Hello",
        "World",
        "Error",
        "Hello World"
    ]
  },
   {
    numb: 13,
    question: "Which of the following is used to terminate the function declaration in C++?",
    answer: ";",
    options: [
        ";",
        "]",
        ")",
        ":"
    ]
  },
   {
    numb: 14,
    question: "What will be the output of the following C++ code?"+"<br>"+"#include<iomanip>"+"<br>"+"#include<iostream>"+"<br>"+"using namespace std;"+"<br>"+"int main()"+"<br>"+" {"+"<br>"+"      cout << setprecision(17);"+"<br>"+"       double d = 0.1;"+"<br>"+"      cout << d << endl;"+"<br>"+"           return 0;"+"<br>"+"}",
    answer: "J",
    options: [
        "I",
        "J",
        "A",
        "N"
    ]
  },
   {
    numb: 15,
    question: "What will be the output of the following C++ program?"+"<br>"+"#include <iomanip>"+"<br>"+" #include <iostream>"+"<br>"+"using namespace std;"+"<br>"+"int main()"+"<br>"+" {"+"<br>"+"          cout << setprecision(17);"+"<br>"+"        double d = 0.1;"+"<br>"+"         cout << d << endl;"+"<br>"+"       return 0;"+"<br>"+" }",
    answer: " 0.10000000000000001",
    options: [
        "compile time error",
        "0.100001",
        "0.11",
        " 0.10000000000000001"
    ]
  }
   
  
  ],
  /*c++ hard level*/
  [
    {
    numb: 1,
    question: "Which keyword is used to define the macros in c++?",
    answer: "#define",
    options: [
        "#macro",
        "#define",
        "macro",
        "define"
    ]
  },
   {
    numb: 2,
    question: "What is the correct syntax of accessing a static member of a class in C++?"+"<br>"+"Example class:"+"<br>"+"class A"+"<br>"+"{"+"<br>"+"            public:"+"<br>"+"                    static int value;"+"<br>"+"}",
    answer: "A::value",
    options: [
        "A->value",
        "A^value",
        "A.value",
        "A::value"
    ]
  },
   {
    numb: 3,
    question: "The C++ code which causes abnormal termination/behaviour of a program should be written under _________ block.",
    answer: "try",
    options: [
        "catch",
        "throw",
        "try",
        "finally"
    ]
  },
   {
    numb: 4,
    question: "What is Inheritance in C++?",
    answer: "Deriving new classes from existing classes",
    options: [
        "Deriving new classes from existing classes",
        "Overloading of classes",
        "Classes with same names",
        "Wrapping of data into a single class"
    ]
  },
   {
    numb: 5,
    question: "What will be the output of the following C++ code?"+"<br>"+"#include <iostream>"+"<br>"+"using namespace std;"+"<br>"+"int main()"+"<br>"+" {"+"<br>"+"       int a = 5;"+"<br>"+"        float b;"+"<br>"+"      cout << sizeof(++a + b);"+"<br>"+"      cout << a;"+"<br>"+"           return 0;"+"<br>"+"    }",
    answer: "4 5",
    options: [
        "2 5",
        "4 5",
        "4 6",
        "2 6"
    ]
  },
   {
    numb: 6,
    question: "Which of the following symbol is used to declare the preprocessor directives in C++?",
    answer: "#",
    options: [
        "$",
        "^",
        "#",
        "*"
    ]
  },
   {
    numb: 7,
    question: "What will be the output of the following C++ program?"+"<br>"+"#include<iostream>"+"<br>"+"using namespace std;"+"<br>"+"int main()"+"<br>"+"{"+"<br>"+"        int a = 5;"+"<br>"+"        auto check = [=]()"+"<br>"+"{"+"<br>"+"           a = 10;"+"<br>"+"};"+"<br>"+"check();"+"<br>"+"  cout<<\"Value of a: \"<<a<<endl;"+"<br>"+"        return 0;"+"<br>"+"}",
    answer: "Error",
    options: [
        "Segmentation fault",
        "Value of a: 5",
        "Value of a: 10",
        "Error"
    ]
  },
   {
    numb: 8,
    question: "What will be the output of the following C++ code?"+"<br>"+"#include <iostream>"+"<br>"+"using namespace std;"+"<br>"+"void square (int *x, int *y)"+"<br>"+"{"+"<br>"+"           *x = (*x) * --(*y);"+"<br>"+"}"+"<br>"+"int main ( )"+"<br>"+"{"+"<br>"+"         int number = 30;"+"<br>"+"     square(&number, &number);"+"<br>"+"         cout << number;"+"<br>"+"            return 0;"+"<br>"+"}",
    answer: "870",
    options: [
        "30",
        "Error",
        "Segmentation fault",
        "870"
    ]
  },
   {
    numb: 9,
    question: "What is meant by a polymorphism in C++?",
    answer: "class having many forms",
    options: [
        "class having only single form",
        "class having four forms",
        "class having many forms",
        "class having two forms"
    ]
  },
   {
    numb: 10,
    question: "What will be the output of the following C++ program?"+"<br>"+"#include <iostream>"+"<br>"+"#include <string>"+"<br>"+"using namespace std;"+"<br>"+"int main ()"+"<br>"+"{"+"<br>"+"   std::string str (\"Sanfoundry.\");"+"<br>"+"  str.back() = '!';"+"<br>"+"  std::cout << str << endl;"+"<br>"+"  return 0;"+"<br>"+"  }",
    answer: "Sanfoundry!",
    options: [
        "Sanfoundry!",
        "Sanfoundry!.",
        "Sanfoundry.",
        "Sanfoundry.!"
    ]
  },
   {
    numb: 11,
    question: "Pick the incorrect statement about inline functions in C++?",
    answer: "They are generally very large and complicated function",
    options: [
        "Saves overhead of a return call from a function",
        "They are generally very large and complicated function",
        "These functions are inserted/substituted at the point of call",
        "They reduce function call overheads"
    ]
  },
   {
    numb: 12,
    question: "What will be the output of the following C++ program?"+"<br>"+"#include <iostream>"+"<br>"+"using namespace std;"+"<br>"+"int main()"+"<br>"+" {"+"<br>"+"     int n = 5;"+"<br>"+"      void *p = &n;"+"<br>"+"int *pi = static_cast<int*>(p);"+"<br>"+"      cout << *pi << endl;"+"<br>"+"        return 0;"+"<br>"+"}",
    answer: "5",
    options: [
        "5",
        "6",
        "compile time error",
        "runtime error"
    ]
  },
   {
    numb: 13,
    question: "What is abstract class in C++?",
    answer: "Class specifically used as a base class with atleast one pure virtual functions",
    options: [
        "Any Class in C++ is an abstract class",
        "Class from which any class is derived",
        "Class specifically used as a base class with atleast one virtual functions",
        "Class specifically used as a base class with atleast one pure virtual functions"
    ]
  },
   {
    numb: 14,
    question: "Which of the following constructors are provided by the C++ compiler if not defined in a class?",
    answer: "All of the mentioned",
    options: [
        "Copy constructor",
        "Default constructor",
        "Assignment constructor",
        "All of the mentioned"
    ]
  },
   {
    numb: 15,
    question: "What will be the output of the following C++ program?"+"<br>"+"#include <iostream>"+"<br>"+"using namespace std;"+"<br>"+"int main(){"+"<br>"+"try{"+"<br>"+"         try{"+"<br>"+"          throw 20;          }"+"<br>"+"     catch (int n){"+"<br>"+"          cout << \"Inner Catch\n\";"+"<br>"+"         throw;}"+"<br>"+"  }"+"<br>"+" catch (int x){"+"<br>"+"      cout << \"Outer Catch\n\";"+"<br>"+"}"+"<br>"+"  return 0;"+"<br>"+"}",
    answer: "Inner Catch"+"<br>"+"Outer Catch",
    options: [
        "Outer Catch",
        "Inner Catch"+"<br>"+"Outer Catch",
        "Error",
        "Inner Catch"
    ]
  },
  ]];
  