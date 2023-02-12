

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
          restart_quiz.innerHTML='<a id="1" href="certi_p.php">get certificate</a>';
          
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

    window.location.href = "book_p.html";  
}

function home(){

  window.location.href = "quiz.php";  
}



/*python easy*/
let questions= [[
  {
  numb: 1,
  question: "Who developed Python Programming Language?",
  answer: "Guido van Rossum",
  options: [
      "Wick van Rossum",
      "Rasmus Lerdorf",
      "Guido van Rossum",
      "Niene Stom"
  ]
},
{
  numb: 2,
  question: "Which type of Programming does Python support?",
  answer: "all of the mentioned",
  options: [
      "object-oriented programming",
      "structured programming",
      "functional programming",
      "all of the mentioned"
  ]
},
{
  numb: 3,
  question: "Is Python case sensitive when dealing with identifiers?",
  answer: "no",
  options: [
      "no",
      "yes",
      "machine dependent",
      "none of the mentioned"
  ]
},
{
  numb: 4,
  question: "Which of the following is the correct extension of the Python file?",
  answer: ".py",
  options: [
      ".python",
      ".pl",
      ".py",
      ".p"
  ]
},
{
  numb: 5,
  question: "Is Python code compiled or interpreted?",
  answer: "Python code is neither compiled nor interpreted",
  options: [
      "Python code is both compiled and interpreted",
      "Python code is neither compiled nor interpreted",
      "Python code is only compiled",
      "Python code is only interpreted"
  ]
},
{
  numb: 6,
  question: "All keywords in Python are in _________",
  answer: "None of the mentioned",
  options: [
      "Capitalized",
      "lower case",
      "UPPER CASE",
      "None of the mentioned"
  ]
},
{
  numb: 7,
  question: "Which of the following is used to define a block of code in Python language?",
  answer: "Indentation",
  options: [
      "Indentation",
      "Key",
      "Brackets",
      "All of the mentioned"
  ]
},
{
  numb: 8,
  question: "Which keyword is used for function in Python language?",
  answer: "Def",
  options: [
      "Function",
      "Def",
      "Fun",
      "Define"
  ]
},
{
  numb: 9,
  question: "Which of the following character is used to give single-line comments in Python?",
  answer: "#",
  options: [
      "//",
      "#",
      "!",
      "/*"
  ]
},
{
  numb: 10,
  question: "Which of the following functions can help us to find the version of python that we are currently working on?",
  answer: "sys.version(1)",
  options: [
      "sys.version(1)",
      "sys.version(0)",
      "sys.version()",
      "sys.version"
  ]
},
{
  numb: 11,
  question: "Python supports the creation of anonymous functions at runtime, using a construct called __________",
  answer: "lambda",
  options: [
      "pi",
      "anonymous",
      "lambda",
      "none of the mentioned"
  ]
},
{
  numb: 12,
  question: "What does pip stand for python?",
  answer: "Preferred Installer Program",
  options: [
      "unlimited length",
      "all private members must have leading and trailing underscores",
      "Preferred Installer Program",
      "none of the mentioned"
  ]
},
{
  numb: 13,
  question: "Which of the following is true for variable names in Python?",
  answer: "unlimited length",
  options: [
      "underscore and ampersand are the only two special characters allowed",
      "unlimited length",
      "all private members must have leading and trailing underscores",
      "none of the mentioned"
  ]
},
{
  numb: 14,
  question: "Which of the following is the truncation division operator in Python?",
  answer: "//",
  options: [
      "|",
      "//",
      "/",
      "%"
  ]
},
{
  numb: 15,
  question: "Which of the following is the use of id() function in python?",
  answer: "Id returns the identity of the object",
  options: [
      "Every object doesn’t have a unique id",
      "Id returns the identity of the object",
      "All of the mentioned",
      "None of the mentioned"
  ]
}
],
[
  {
  numb: 1,
  question: "What will be the output of the following Python function?"+"<br>"+"min(max(False,-3,-4), 2,7)",
  answer: "False",
  options: [
      "-4",
      "-3",
      "2",
      "False"
  ]
},
{
  numb: 2,
  question: "What will be the output of the following Python expression if x=56.236?"+"<br>"+"print(\"%.2f\"%x)",
  answer: "56.24",
  options: [
      "56.236",
      "56.23",
      "56.0000",
      "56.24"
  ]
},
{
  numb: 3,
  question: "What will be the output of the following Python function?"+"<br>"+"len([\"hello\",2, 4, 6])",
  answer: "4",
  options: [
      "Error",
      "6",
      "4",
      "3"
  ]
},
{
  numb: 4,
  question: "What is the order of namespaces in which Python looks for an identifier?",
  answer: "Python first searches the local namespace, then the global namespace and finally the built-in namespace",
  options: [
      "Python first searches the built-in namespace, then the global namespace and finally the local namespace",
      "Python first searches the built-in namespace, then the local namespace and finally the global namespace",
      "Python first searches the local namespace, then the global namespace and finally the built-in namespace",
      "Python first searches the global namespace, then the local namespace and finally the built-in namespace"
  ]
},
{
  numb: 5,
  question: "Which function is called when the following Python program is executed?"+"<br>"+"f = foo()"+"<br>"+"format(f)",
  answer: "__str__()",
  options: [
      "str()",
      "format()",
      "__str__()",
      "__fromat__()"
  ]
},
{
  numb: 6,
  question: "What will be the output of the following Python statement?"+"<br>"+">>>\"a\"+\"bc\"",
  answer: "abc",
  options: [
      "bc",
      "abc",
      "a",
      "bca"
  ]
},
{
  numb: 7,
  question: "What will be the output of the following Python code snippet?"+"<br>"+"for i in [1, 2, 3, 4][::-1]:"+"<br>"+"print (i)",
  answer: "4 3 2 1",
  options: [
      "4 3 2 1",
      "error",
      "1 2 3 4",
      "none of the mentioned"
  ]
},
{
  numb: 8,
  question: "What will be the output of the following Python code?"+"<br>"+"print(\"abc. DEF\".capitalize())",
  answer: "Abc. def",
  options: [
      "Abc. def",
      "abc. def",
      "Abc. Def",
      "ABC. DEF"
  ]
},
{
  numb: 9,
  question: "What will be the output of the following Python code?"+"<br>"+"print('*', \"abcde\".center(6), '*', sep='')",
  answer: "*abcde *",
  options: [
      "* abcde *",
      "*abcde *",
      "* abcde*",
      "* abcde *"
  ]
},
{
  numb: 10,
  question: "What will be the output of the following Python code?"+"<br>"+"x = 'abcd'"+"<br>"+"for i in range(len(x)):"+"<br>"+"      print(i)",
  answer: "0 1 2 3",
  options: [
      "error",
      "1 2 3 4",
      "a b c d",
      "0 1 2 3"
  ]
},
{
  numb: 11,
  question: "What will be the output of the following Python code snippet?"+"<br>"+"z=set('abc$de')"+"<br>"+"'a' in z",
  answer: "True",
  options: [
      "Error",
      "True",
      "False",
      "No output"
  ]
},
{
  numb: 12,
  question: "What will be the output of the following Python expression?"+"<br>"+"round(4.576)",
  answer: "5",
  options: [
      "4",
      "4.6",
      "5",
      "4.5"
  ]
},
{
  numb: 13,
  question: "What will be the output of the following Python code?"+"<br>"+"print(\"Hello {0[0]} and {0[1]}\".format(('foo', 'bin')))",
  answer: "Hello foo and bin",
  options: [
      "Hello (‘foo’, ‘bin’) and (‘foo’, ‘bin’)",
      "Error",
      "Hello foo and bin",
      "None of the mentioned"
  ]
},
{
  numb: 14,
  question: "What will be the output of the following Python code?"+"<br>"+"x = [[0], [1]]"+"<br>"+"print((' '.join(list(map(str, x))),))",
  answer: "('[0][1]',)",
  options: [
      "01",
      "[0][1]",
      "('01')",
      "('[0][1]',)"
  ]
},
{
  numb: 15,
  question: "What will be the value of the following Python expression?"+"<br>"+"4 + 3 % 5",
  answer: "7",
  options: [
      "7",
      "2",
      "4",
      "1"
  ]
}
],
[
  {
  numb: 1,
  question: "What will be the output of the following Python code?"+"<br>"+"i=1"+"<br>"+"while True:"+"<br>"+"  if i%3 == 0:"+"<br>"+"    break"+"<br>"+" print(i)"+" i + = 1",
  answer: "error",
  options: [
      "1 2 3",
      "error",
      "1 2",
      "none of the mentioned"
  ]
},
{
  numb: 2,
  question: "What are the values of the following Python expressions?"+"<br>"+"2**(3**2)"+"<br>"+"(2**3)**2"+"<br>"+"2**3**2",
  answer: "512, 64, 512 ",
  options: [
      "512, 64, 512 ",
      "512, 512, 512",
      "64, 512, 64",
      "64, 64, 64"
  ]
},
{
  numb: 3,
  question: "The following python program can work with ____ parameters"+"<br>"+"def f(x):"+"<br>"+"  def f1(*args, **kwargs):"+"<br>"+"    print(\"Sanfoundry\")"+"<br>"+"   return x(*args, **kwargs)"+"<br>"+" return f1",
  answer: "any number of",
  options: [
      "any number of",
      "0",
      "1",
      "2"
  ]
},
{
  numb: 4,
  question: " What will be the output of the following Python code?"+"<br>"+"class tester:"+"<br>"+"  def __init__(self, id):"+"<br>"+"   self.id = str(id)"+"<br>"+"   id=\"224\""+"<br>"+"  temp = tester(12)"+"<br>"+" print(temp.id)",
  answer: "12",
  options: [
      "12",
      "224",
      "None",
      "Error"
  ]
},
{
  numb: 5,
  question: "What will be the output of the following Python program?"+"<br>"+"def foo(x):"+"<br>"+"  x[0] = ['def']"+"<br>"+"  x[1] = ['abc']"+"<br>"+"  return id(x)"+"<br>"+"q = ['abc', 'def']"+"<br>"+"print(id(q) == foo(q))",
  answer: "True",
  options: [
      "Error",
      "None",
      "False",
      "True"
  ]
},
{
  numb: 6,
  question: "What will be the output of the following Python program?"+"<br>"+"z=set('abc')"+"<br>"+"z=set('abc')"+"<br>"+"z.update(set(['p', 'q']))",
  answer: "{‘a’, ‘b’, ‘c’, ‘p’, ‘q’, ‘san’}",
  options: [
      "{‘a’, ‘c’, ‘c’, ‘p’, ‘q’, ‘s’, ‘a’, ‘n’}",
      "{‘abc’, ‘p’, ‘q’, ‘san’}",
      "{‘a’, ‘b’, ‘c’, ‘p’, ‘q’, ‘san’}",
      "{‘a’, ‘b’, ‘c’, [‘p’, ‘q’], ‘san}"
  ]
},
{
  numb: 7,
  question: "What will be the value of ‘result’ in following Python program?"+"<br>"+"list1 = [1,2,3,4]"+"<br>"+"list2 = [2,4,5,6]"+"<br>"+"list3 = [2,6,7,8]"+"<br>"+"result = list()"+"<br>"+"result.extend(i for i in list1 if i not in (list2+list3) and i not in result)"+"<br>"+"result.extend(i for i in list2 if i not in (list1+list3) and i not in result)"+"<br>"+"result.extend(i for i in list3 if i not in (list1+list2) and i not in result)",
  answer: "[1, 3, 5, 7, 8] ",
  options: [
      "[1, 3, 5, 7, 8] ",
      "[1,7,8]",
      "[1,2,4,7,8]",
      "error"
  ]
},
{
  numb: 8,
  question: "What will be the output of the following Python program?"+"<br>"+"i=0"+"<br>"+"while i<5:"+"<br>"+"  print(i)"+"<br>"+"  i += 1"+"<br>"+"  if i==3:"+"<br>"+"    break"+"<br>"+"else:"+"<br>"+"  print(0)",
  answer: "0 1 2",
  options: [
      "error",
      "0 1 2 0",
      "0 1 2",
      "none of the mentioned"
  ]
},
{
  numb: 9,
  question: "What will be the output of the following Python program?"+"<br>"+"def addItem(listParam):"+"<br>"+"  listParam += [1]"+"<br>"+"mylist=[1,2,3,4]"+"<br>"+"addItem(mylist)"+"<br>"+"print(len(mylist))",
  answer: "5",
  options: [
      "5",
      "8",
      "2",
      "1"
  ]
},
{
  numb: 10,
  question: "What will be the output of the following Python code?"+"<br>"+"def foo():"+"<br>"+"  try:"+"<br>"+"    return 1"+"<br>"+"  finally:"+"<br>"+"    return 2"+"<br>"+"k=foo()"+"<br>"+"print(k)",
  answer: "2",
  options: [
      "error, there is more than one return statement in a single try-finally block",
      "3",
      "2",
      "1"
  ]
},
{
  numb: 11,
  question: "What will be the output of the following Python code?"+"<br>"+"i=1"+"<br>"+"while True:"+"<br>"+"  if i%3 == 0:"+"<br>"+"    break"+"<br>"+" print(i)"+"<br>"+"  i += 1",
  answer: "1 2 3",
  options: [
      "1 2",
      "1 2 3",
      "error",
      "none of the mentioned"
  ]
},
{
  numb: 12,
  question: "What will be the output of the following Python code?"+"i=1"+"<br>"+"while True:"+"<br>"+" if i%007 == 0:"+"<br>"+"    break"+"<br>"+" print(i)"+"<br>"+"  i += 1",
  answer: "1 2 3 4 5 6",
  options: [
      "1 2 3 4 5 6",
      "1 2 3 4 5 6 7",
      "error",
      "none of the mentioned"
  ]
}
]];



