/*KEYWORDS*/
var badLanguage = ["more ", "that ", "is ", "I feel ", "quite ", "really ", " just ", " very ", "n’t ", "lots ", "cool ", "nice ", "get ", " thing ", "quote ", " us ", "you "];
var waffleLanguage = ["can be said that"];
var linkWords = ["However", "Furthermore", "Crucially", "Finally"];
var criqituingLanguage = [""];
var concTransitionWords = ["To conclude", "In conclusion", "To summarise"];


/*HIGHLIGHTS*/

function highlightBadLanguage(){
for (i=0; i < badLanguage.length; i++) {
    var w = badLanguage[i];
    var x = new RegExp(w, "g");
   var t = $("#essay").html().replace(x, 
            "<span class='highlightred'>" + w + "</span>");
    $("#essay").html(t)
}};
    
function highlightWaffleLanguage(){
for (i=0; i < waffleLanguage.length; i++) {
    var w = waffleLanguage[i];
    var x = new RegExp(w, "g");
   var t = $("#essay").html().replace(x, 
            "<span class='highlightred'>" + w + "</span>");
    $("#essay").html(t)
}};
  
function highlightLinkWords(){
for (i=0; i < linkWords.length; i++) {
    var w = linkWords[i];
    var x = new RegExp(w, "g");
   var t = $("#essay").html().replace(x, 
            "<span class='highlightgreen'>" + w + "</span>");
    $("#essay").html(t)
}
for (i=0; i < linkWords.length; i++) {
    var w = linkWords[i].toLowerCase();
    var x = new RegExp(w, "g");
   var t = $("#essay").html().replace(x, 
            "<span class='highlightgreen'>" + w + "</span>");
    $("#essay").html(t)
}};

function highlightSubHeadings(){
var smallParaSplit = ("<br>");
var para = $("#essay").html().split(smallParaSplit);
for (i=0; i<para.length; i++) {
    if(para[i].length < 100) 
    {
        var str = $("#essay").html(); 
        var res = str.replace(para[i], "<strong>" + para[i] + "</strong>");
        $("#essay").html(res);
    }
}}

/*0THER STUFF*/
function insertBreaks() {
    var str = $("#essay").html(); 
    var res = str.replace(/\n/g, "<br>");
    $("#essay").html(res);
};
    
function numberOfParagraphs(){
var smallParaSplit = ("<br>");
var para = $("#essay").html().split(smallParaSplit);
var runloop = 0;
for (i=0; i<para.length; i++) {
    if(para[i].length > 200) {
    runloop += 1;
    var numberOfParagraphsUsed = runloop;
    $("#demo6").html(numberOfParagraphsUsed + " paragraphs used");
}
}}

/*USUALLY OFF BY A FEW WORDS*/
function wordCount(){
    var wom = $("#essay").html().replace( /[^a-z0-9\s]/g, "" ).split( /\s+/ ).length;
    $("#demo11").html(wom + " word count")
}


function numberOfTitleKeywords() {
    var titleKeywords = $("#titleKeywords").text().split(" ");
    var text = $("#essay").html();
    var counter = 0;
    for (i = 0; i < titleKeywords.length; i++){
            if (text.includes(titleKeywords[i])) {
            counter++;
    };
    $("#misc").html(counter + " title keywords used" + titleKeywords);
}
}


/* FEEDBACK */
function checkForSubHeadings(){
var smallParaSplit = ("<br>");
var para = $("#essay").html().split(smallParaSplit);
runloop = 0;
for (i=0; i<para.length; i++) {
    if(5 < para[i].length && para[i].length < 50) {
        runloop+= 1;
        $("#demo13").html("You have used some subheadings").css('color', 'green');
}
}
if (runloop===0){
    $("#demo13").html("You have not used any subheadings").css('color', 'red');
}}
    
/*WARNING: MAKE SURE THE INPUT HAS NO LINE BREAKS AT END*/

/*THE PARAGRAPH NUMBERS ARE NOT LISTED IN THE BELOW ONE
function checkParagraphLength(){
    var numberOfWords = $("#essay").html().split(" ").length;
    var paraSplit = ("." + "<br>");
    var paraArray = $("#essay").html().split(paraSplit);
    for (i=0; i<paraArray.length; i++) {        
        if (paraArray[i].split(" ").length > (numberOfWords/50)) {
            var a = paraArray.indexOf(i);
            $("#demo7").html("The following paragraphs are over 20% of the word count: ").css('color', 'red');
    }
        else {
        $("#demo7").html("Good, your paragraphs are all a suitable length.").css('color', 'green');
    }
    }
};
*/
    
function checkIntroLength(){
    var numberOfWords = $("#essay").html().split(" ").length;
    var paraArray = $("#essay").html().split("." + "<br>");
    var paraCount = paraArray.length;
    var paraNumber = Number(paraCount);
    var intro = paraArray[0];
    var numberOfWordsInIntro = intro.split(" ").length;

    if (numberOfWordsInIntro/numberOfWords > 0.2)
    {
        $("#demo8").html("Introduction is over 20% of word count").css('color', 'red');
    }
    else {
        $("#demo8").html("Introduction is not over 20% of word count").css('color', 'green');
    }
}

function checkConcLength(){
    var numberOfWords = $("#essay").html().split(" ").length;
    var paraArray = $("#essay").html().split("." + "<br>");
    var paraCount = paraArray.length;
    var paraNumber = Number(paraCount);
    var conc = paraArray[paraNumber - 1];
    var numberOfWordsInConc = conc.split(" ").length;
    if (numberOfWordsInConc/numberOfWords > 0.20)
    {
        $("#demo9").html("Conclusion is over 20% of word count").css('color', 'red');
    }
    else {
        $("#demo9").html("Conclusion is not over 20% of word count").css('color', 'green');
    }
}

function checkConcTransitionWords(){
    var paraArray = $("#essay").html().split("." + "<br>");
    var paraCount = paraArray.length;
    var paraNumber = Number(paraCount);
    var conc = paraArray[paraNumber - 1];

    var runloop = "";
    for (i = 0; i < concTransitionWords.length; i++){
            if (conc.includes(concTransitionWords[i])) {
            runloop += conc.match(concTransitionWords[i]);
    };
    $("#demo15").html("Conclusion transition word used").css('color', 'green');
        
    };
    if (runloop==="") {
        $("#demo15").html("Conclusion transition word not used").css('color', 'red');
    }   
}

function checkForBadLanguage(){
    var text = $("#essay").html();
    var runloop = [];
    for (i = 0; i < badLanguage.length; i++){
            if (text.includes(badLanguage[i])) 
            {
                runloop.push(badLanguage[i]);
            };
        $("#demo1").html("Bad language that you've used: " + runloop).css('color', 'red');
    };
    if (runloop==="")
    {
        $("#demo1").html("Good, you have not used bad language.").css('color', 'green');
    }
};
     
function checkForArgue(){
    var paraArray = $("#essay").html().split("." + "<br>");
    var paraCount = paraArray.length;
    var paraNumber = Number(paraCount);
    var intro = paraArray[0];
    var check = intro.includes('I will argue');
    if(check == true){
        $("#demo2").html("You have said 'I will argue' in your introduction.").css('color', 'green');
    }
    else {
        $("#demo2").html("You have not said 'I will argue' in the introduction.").css('color', 'red');
    };
};  

function checkForRhetoricalQuestions() {
    var check = $("#essay").html().includes('?');
    if(check === true) {
        $("#demo4").html("You have used a rhetorical question.").css('color', 'green');
    }
    else {
    $("#demo4").html("You have not used a rhetorical question.").css('color', 'red');
    };
    };

function checkForTitleKeywords(){
    var titleKeywords = $("#TitleKeywords").html().split(" ");
    var text = $("#essay").text();
    var runloop = "";
    for (i = 0; i < titleKeywords.length; i++){
            if (text.includes(titleKeywords[i])) {
            runloop += (text.match(titleKeywords[i]) + ", ");
    };
    $("#demo14").html("Title keywords that you've used: " + runloop).css('color', 'green');
        
    };
    if (runloop==="") {
        $("#demo14").html("No title keywords used.").css('color', 'red');
    }
}


/*INPUT MODIFICATION*/
$(function(){
    insertBreaks();
    highlightBadLanguage();
    highlightWaffleLanguage();
    highlightLinkWords();
    highlightSubHeadings();
})

/*FEEDBACK*/
$(function(){
    checkForBadLanguage();
    checkForArgue();
    checkForRhetoricalQuestions();
    /*checkParagraphLength()*/
    checkIntroLength();
    checkConcLength();
    /*checkForSubHeadings();*/
    checkForTitleKeywords();
    checkConcTransitionWords();
})

/*OTHER INFO*/
$(function(){
    numberOfTitleKeywords();
    numberOfParagraphs();
    wordCount();
})



















