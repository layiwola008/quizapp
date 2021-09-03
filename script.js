
//traversing all necessary DOM elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = document.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const answerFeedback = document.querySelector('.answer_feedback p');
const timeCount = quiz_box.querySelector(".timer .timer_sec");
// const timeLine = quiz_box.querySelector(".time_line");


const option_list = document.querySelector('.option_list');

//start Psychometrics Examination when start button is clicked
start_btn.onclick = ()=>{
    info_box.classList.add('activeInfo');// show exam instructions box
}


//Exit button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove('activeInfo');//hide exam instructions
}

//When continue button is clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove('activeInfo');//hide exam info box
    quiz_box.classList.add('activeQuiz');//show exam questions
    renderQuestions(0);
    queCounter(1);
    startTimer(15);
    // startTimerLine(0);
}



let que_count = 0;
let que_numb = 1;
let counter;
let timeValue = 15;
let userScore = 0;
// let widthValue = 0;

const next_btn = quiz_box.querySelector('.next_btn');
const result_box = document.querySelector('.result_box');
const restart_quiz = result_box.querySelector('.buttons .restart');
const quit_quiz = result_box.querySelector('.buttons .quit');


quit_quiz.onclick = () => {
    window.location.reload();
}

//Next Button clicked, Increment question count, question number and set feedbackbox to empty 
next_btn.onclick = ()=> {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        answerFeedback.innerHTML = '';
        renderQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
        next_btn.style.display = 'none';
        console.log(que_count);
        // clearInterval(counterLine);
        // startTimer(widthValue);
    }else{
        console.log('Questions completed');
        showResultBox();
    }
}


//Show questions
function renderQuestions(i) {
    const que_text = document.querySelector('.que_text');
    let que_tag = '<span>'+ questions[i].numb + ". " + questions[i].question +'</span>';
    let option_tag = '<div class="option">'+ questions[i].options[0] +'<span></span></div>'
                    + '<div class="option">'+ questions[i].options[1] +'<span></span></div>'
                    + '<div class="option">'+ questions[i].options[2] +'<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let corssIcon = ' <div class="icon cross"><i class="fas fa-times"></i></div>';

//Visual feedback when correct or wrong answer is selected
//Come back to add textual feedback

function optionSelected(answer) {

    clearInterval(counter);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    
    if (userAns == correctAns) {
        
        userScore += 1;
        console.log(userScore);
        answer.classList.add('correct');
         // console.log("Answer is correct");
        answerFeedback.innerHTML = 'Answer is correct';
        //insert the tick icon to correct answer
        answer.insertAdjacentHTML('beforeend', tickIcon);
       
    }else{

        answer.classList.add('wrong');
         // console.log("Answer is wrong");
        answerFeedback.innerHTML = 'Answer is wrong';
        answer.insertAdjacentHTML('beforeend', corssIcon);

    }


    var allOptions = document.querySelector('.option_list').children;
    //Disable all options once user clicks an option
    for (let i = 0; i < allOptions.length; i++) {
        allOptions[i].classList.add('disabled');
    }
    next_btn.style.display = 'block';

}


const scoreText = result_box.querySelector(".score_text");
function showResultBox() {
    info_box.classList.remove('activeInfo');//hide exam info box
    quiz_box.classList.remove('activeQuiz');//hide exam questions
    result_box.classList.add('activeResult');//show result   
    if (userScore > 3) {
        let scoreTag = '<img src="images/good-icon.jpg"><span><p>Congrats! You scored ' + userScore +' out of '+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    } 
    else if (userScore > 1) {
        let scoreTag = '<img src="images/fair-icon.jpg"><span><p>Nice! You got ' + userScore +' out of '+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else {
        let scoreTag = '<img src="images/bad-icon.jpg"><span><p>Sorry! You got only ' + userScore +' out of '+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time) {
    counter = setInterval(timer, 1000)
    function timer(){
        timeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
            
        }
        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = '00';
        }
    }
}

// function startTimerLine(time) {
//     counterLine = setInterval(timer, 29)
//     function timer(){
//         time += 1;
//         timeLine.style.width = time + "px";       
//         if (time > 804) {
//             clearInterval(counter);            
//         }
//     }
// }

function queCounter(i) {
    const bottom_ques_counter = document.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>'+ i +'</p><p>of</p><p>'+ questions.length +'</p><p>Questions</p></span>';
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}

restart_quiz.onclick = () => {    
    info_box.classList.add('activeInfo');// show exam instructions box
}

