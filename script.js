'use strict';
const wrd_str =`In today's rapidly changing world, it can be difficult to keep up with all the advances and developments happening around us. From new technologies to shifting social and political landscapes, it seems like every day brings new challenges and opportunities. As individuals, we must constantly adapt and learn in order to stay relevant and competitive in our personal and professional lives. But beyond our individual experiences, we must also grapple with the larger forces shaping our world. Climate change, economic inequality, and geopolitical instability are just a few of the issues that demand our attention and action. At the same time, we are faced with a constant barrage of information, much of it conflicting or misleading. How do we make sense of it all? How do we navigate the complexities of our world and find our place within it? These are difficult questions with no easy answers. But perhaps the key lies in our ability to embrace complexity, to seek out diverse perspectives and engage with different ideas, and to approach the world with humility and openness. By doing so, we can not only survive but thrive in the face of uncertainty and change, and help shape a better future for ourselves and those around us.Expanding further on the idea of embracing complexity, it's important to acknowledge that the world is not black and white, and there are often multiple perspectives and interpretations of any given situation. It can be tempting to seek out simple solutions or quick fixes, but these often overlook the nuances and complexities of the issues at hand. Instead, we must be willing to engage in deep and critical thinking, to explore multiple viewpoints, and to challenge our own assumptions and biases. This requires a level of intellectual curiosity and a willingness to learn that is increasingly valuable in today's knowledge-based economy.Furthermore, in order to truly engage with complexity, we must also cultivate empathy and understanding towards others. This means listening actively, seeking out diverse voices, and striving to understand the perspectives and experiences of those who may be different from us. By doing so, we can not only broaden our own horizons but also build bridges across social, cultural, and political divides. This is especially important in a world where issues of race, gender, and identity continue to be major sources of tension and conflict.`;
const wrd_arr=wrd_str.split(' ');
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const createString = function(wrd_arr,arr_new){
    arr_new=[];
    while(+(arr_new.length)<36){
        arr_new.push(wrd_arr[randomInteger(0,390)]);
    }
    arr_new.join(' ');
    return arr_new;
}
const start_btn = document.querySelector('.btn-help');
const defl_txt = document.querySelector('.default-text');
const aboveText = document.querySelector('.above-text');
const btnHelp = document.querySelector('.btn-help');
const showWPM = document.querySelector('.align-wpn');
const btnClr = document.querySelector('.btn-clr');
const showError = document.querySelector('.errors');
const inp_arr = [];
const arr_new=[];
let i=0;
let err=0;
let clk=0;

const startf = function(){
    let arr_w=createString(wrd_arr,arr_new);
    defl_txt.placeholder=arr_w.join(" ");
}
startf();

const defaultText = defl_txt.getAttribute('placeholder');
const arr = defaultText.split('');
const arr_len = defaultText.split('').length;
const total_words =defaultText.split(' ').length;
const updateUI = function(inp_arr,st=false){
    const inp_arr_str=inp_arr.join('');
    const inp_arr_str_us = inp_arr_str+"_";
    aboveText.textContent=inp_arr_str_us;
};
const updateWPM = function (sec){
    if(sec===0){
        showWPM.textContent=`WPM : 00.00`
    }else{
        const wpm = (60*total_words/(sec/1000)).toFixed(2);
        showWPM.textContent=`WPM : ${wpm}`
    }
}
const updateError =function(err){
    if(err>20){
        showError.textContent=`ERROR : ♾️`;
    }else{
        showError.textContent=`ERROR : ${err}`;
    }
}
const startTimer = function(){
    setInterval(()=>{
        clk+=1000;
    },1000);
}
updateUI(inp_arr);
let bol=false;
let bol_clk=true;
document.addEventListener('keypress', function(e){
    if(e.key===String(arr[i])){
        if(bol_clk){
            startTimer();
            bol_clk=false;
        }
        console.log(e.key);
        inp_arr.push(e.key);
        updateUI(inp_arr);
        i++; //231
        if(i==arr_len){
            updateWPM(clk);
        }
        bol=true;
    }else{
        updateUI(inp_arr);
        if(bol){
            err++;
            updateError(err);
            bol=false;
        }
    }
});

btnClr.addEventListener('click',()=>{
    // console.log("Hi");
    inp_arr.splice(0,inp_arr.length);
    i=0;
    err=0;
    bol=false;
    clk=0;
    updateWPM(clk);
    updateError(err);
    updateUI(inp_arr);
})
document.querySelector('.btn-nxt').addEventListener('click',function(){
    window.location.reload();
});
