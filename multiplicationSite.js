var individualOptions = document.getElementsByClassName("individualOptions");
var individualAmounts = document.getElementsByClassName("individualAmounts");
var checkMarks = document.getElementsByClassName("fa-check");
//Initial Display elements for fading out
var initialDisplay = document.getElementsByClassName("initialDisplay");
//Beginning Input Button
var beginButton = document.querySelector("input");
//Access Two Numbers Being Multiplied
var randomNumber = document.getElementsByClassName("randomNumber");
var mainNumber = document.getElementsByClassName("mainNumber");
//The Level Title
var levelTitle = document.getElementsByClassName("levelTitle");
//Dynamic Parts of Level TItle
var levelTitleParts = document.getElementsByClassName("chosenOptions");
//The Problems themselves
var individualProblems = document.getElementsByClassName("individualProblems");
var horizontalBars = document.getElementsByTagName("hr");
//Restart Button, Quit Button, and Finish Button
var restartButton = document.getElementById("restartButton");
var quitButton = document.getElementById("quitButton");
var finishButton = document.getElementById("finishButton");
var resultsButton = document.getElementById("viewResults");
var viewProblemsButton = document.getElementById("viewProblemSet");
//Input Values
var inputValues = document.getElementsByClassName("inputValues");
//Table Results
var tableResults = document.getElementById("tableResults");
var tableContents = document.getElementsByClassName("tableContents");
var unselectOptions = document.getElementsByClassName("unselectOptions");
//Variables for functions
var mainNumberChosen;
var amountNumberChosen;
var levelTitlePart1;
var levelTitlePart2;
var correctAmount;
//When Clicking On Left Most Side Make Sure You Unselect Options
unselectOptions[0].addEventListener("click", function(){
	resetHover(individualOptions);
	checkMarks[0].style.opacity = "0";
	enableButton(beginButton);
});
unselectOptions[1].addEventListener("click", function(){
	resetHover(individualAmounts);
	checkMarks[1].style.opacity = "0";
	enableButton(beginButton);
});
//When Clicking On Options
for(var i = 0; i< individualOptions.length; i++){
	individualOptions[i].addEventListener("click", function(){
		resetHover(individualOptions);
		this.classList.add("hoverEffect");
		//Check Box off
		checkMarks[0].style.opacity = "100";
		//Change Button If Ready
		enableButton(beginButton);
		//Get First Part of Level Title
		levelTitlePart1 = this.textContent;
		//Get Main Number First
		if(this.textContent[1] === "'"){
			mainNumberChosen = Number(this.textContent[0]);
		}else{
			mainNumberChosen = Number(this.textContent[0] + this.textContent[1]);
		}
	});
}
//When Clicking On Amounts
for(var i = 0; i< individualAmounts.length; i++){
	individualAmounts[i].addEventListener("click", function(){
		resetHover(individualAmounts);
		//Store Amount Chosen In Variable
		amountNumberChosen = Number(this.textContent[0] + this.textContent[1]);
		//Get Second Part of Level Title
		levelTitlePart2 = this.textContent;
		//Makes Hover Effect Permanent
		this.classList.add("hoverEffect");
		//Check Box Off
		checkMarks[1].style.opacity = "100";
		//Change Button If Ready
		enableButton(beginButton);
	});
}
beginButton.addEventListener("click", function(){
	//Load Main Number
	generateMainNumber(mainNumberChosen);
	//Generate Random Number
	generateRandomNumber();
	//Fade out initial Display
	for(var i = 0; i < initialDisplay.length; i++){
		initialDisplay[i].style.display="none";
	}
	//Create Level Title
	generateLevelTitle(levelTitlePart1, levelTitlePart2);
	levelTitle[0].style.display="block";
	levelTitle[1].style.display="block";
	//Generate And Format The Problems
	formatGeneratedAmount(amountNumberChosen);
});
restartButton.addEventListener("click", function(){
	//Generate Brand New Numbers
	generateRandomNumber();
	//Reset Input Values
	resetInputValues();
	//Reset Inputs And Backgrounds As Well
	for(var i = 0;i<amountNumberChosen;i++)
		inputValues[i].style.background="green";
	//Reset In-Game Button Menu
	resetGameButtonMenu();
});
quitButton.addEventListener("click", function(){
	//Remove Title and Buttons
	levelTitle[0].style.display="none";
	levelTitle[1].style.display="none";
	//Reset Input Values
	resetInputValues();
	//Remove Displayed Problems and Return Input Background to Normal
	for(var i = 0;i<amountNumberChosen;i++){
		inputValues[i].style.background="green";
		individualProblems[i].style.display="none";
	}
	//Remove Table If Displayed
	tableResults.classList.add("displayNone");
	//Make Sure Restart Displays If Quitting
	restartButton.classList.remove("displayNone");
	//Reset In-Game Button Format For Next Round
	resetGameButtonMenu();
	//Reset Hover Effect on Both NavBars
	resetHover(individualOptions);
	resetHover(individualAmounts);
	//Display Initial Display
	for(var i = 0; i < initialDisplay.length; i++){
		initialDisplay[i].style.display="block";
	}
	//Remove Check Marks
	checkMarks[0].style.opacity = "0";
	checkMarks[1].style.opacity = "0";
	enableButton(beginButton);
});
finishButton.addEventListener("click", function(){
	gradeTest();
	//Generate Table Properties
	tableContents[0].textContent = correctAmount;
	tableContents[1].textContent = amountNumberChosen;
	tableContents[2].textContent = ((correctAmount/amountNumberChosen) * 100).toFixed(2);
	tableContents[3].textContent = generateLetterGrade();
	tableContents[4].textContent = generateComment();
	//Remove Finish Button Since We Can Finish Once Per Round
	finishButton.classList.add("displayNone");
	//Allow new Buttons to Be Displayed
	resultsButton.classList.toggle("displayNone");
});
resultsButton.addEventListener("click", function(){
	//Adjust Buttons
	resultsButton.classList.toggle("displayNone");
	viewProblemsButton.classList.toggle("displayNone");
	restartButton.classList.add("displayNone");
	//Display Correct Contents
	//Take Off Problems
	for(var i = 0; i<amountNumberChosen; i++){
		individualProblems[i].style.display="none";
	}
	//Display Results
	tableResults.classList.toggle("displayNone");
});
viewProblemsButton.addEventListener("click", function(){
	//Adjust Buttons
	resultsButton.classList.toggle("displayNone");
	viewProblemsButton.classList.toggle("displayNone");
	restartButton.classList.remove("displayNone");
	//Display Correct Contents
	//Display Problems
	for(var i = 0; i<amountNumberChosen; i++){
		individualProblems[i].style.display="block";
	}
	//Remove Table
	tableResults.classList.toggle("displayNone");
});
//=============================Functions=============================
function resetHover(navBar){
	for(var i = 0; i<navBar.length;i++){
		navBar[i].classList.remove("hoverEffect");
	}
}
function enableButton(beginButton){
	if((checkMarks[0].style.opacity === "100") && (checkMarks[1].style.opacity === "100")){
		beginButton.disabled=false;
		beginButton.value="Begin!";
	}else{
		beginButton.disabled=true;
		beginButton.value="Can't Proceed!"
	}
}
function generateMainNumber(number){
	for(var i = 0; i<mainNumber.length;i++){
		mainNumber[i].textContent = number;
	}
}
function generateRandomNumber(){
	for(var i = 0; i<randomNumber.length;i++){
		var generatedNumber = Math.floor(Math.random() *12) + 1;
		randomNumber[i].textContent = generatedNumber;
	}
}
function generateLevelTitle(levelTitlePart1, levelTitlePart2){
	levelTitleParts[0].textContent = levelTitlePart1;
	levelTitleParts[1].textContent = levelTitlePart2;
}
function formatGeneratedAmount(amountNumberChosen){
	if(amountNumberChosen === 10){
		for(var i = 0; i< 4;i++){
			individualProblems[i].style.width="25%";
			individualProblems[i].style.display="block";
			inputValues[i].style.width="20%";
			horizontalBars[i].style.width="20%";
		}
		for(var i = 4; i< amountNumberChosen;i++){
			individualProblems[i].style.width="33%";
			individualProblems[i].style.display="block";
			inputValues[i].style.width="14.8%";
			horizontalBars[i].style.width="14.8%";
		}
		
	}else if(amountNumberChosen === 15){
		for(var i = 0; i<amountNumberChosen;i++){
			individualProblems[i].style.width="20%";
			individualProblems[i].style.display="block";
			inputValues[i].style.width="25%";
			horizontalBars[i].style.width="25%";
		}
	}else if(amountNumberChosen === 20){
		for(var i = 0;i<14;i++){
			individualProblems[i].style.width="14.28%";
			individualProblems[i].style.display="block";
			inputValues[i].style.width="37%";
			horizontalBars[i].style.width="37%";
		}
		for(var i=14;i<20;i++){
			individualProblems[i].style.width="16.66%";
			individualProblems[i].style.display="block";
			inputValues[i].style.width="32%";
			horizontalBars[i].style.width="32%";
		}
	}else if(amountNumberChosen === 25){
		for(var i =0; i<9;i++){
			individualProblems[i].style.width="11.1%";
			individualProblems[i].style.display="block";
			inputValues[i].style.width="45%";
			horizontalBars[i].style.width="45%";
		}
		for(var i=9; i<amountNumberChosen;i++){
			individualProblems[i].style.width="12.5%";
			individualProblems[i].style.display="block";
			inputValues[i].style.width="43%";
			horizontalBars[i].style.width="43%";
		}
	}else{
		for(var i=0; i<amountNumberChosen;i++){
			individualProblems[i].style.width="10%";
			individualProblems[i].style.display="block";
			inputValues[i].style.width="50%";
			horizontalBars[i].style.width="50%";
		}
	}
}
function resetInputValues(){
	for(var i =0; i<inputValues.length;i++){
		inputValues[i].value="";
	}
}
function gradeTest(){
	correctAmount = 0;
	for(var i=0; i<amountNumberChosen; i++){
		if(Number(randomNumber[i].textContent) * Number(mainNumber[i].textContent) === Number(inputValues[i].value)){
			correctAmount++;
			inputValues[i].style.background="#5cf442";
		}
		else
			inputValues[i].style.background="red";
	}
}
function resetGameButtonMenu(){
	finishButton.classList.remove("displayNone");
	resultsButton.classList.add("displayNone");
	viewProblemsButton.classList.add("displayNone");
}
function generateLetterGrade(){
	var letterGrade;
	if(Number(tableContents[2].textContent) >= 97)
		letterGrade="A+";
	else if(Number(tableContents[2].textContent) >= 93)
		letterGrade="A";
	else if(Number(tableContents[2].textContent) >= 90)
		letterGrade="A-";
	else if(Number(tableContents[2].textContent) >= 87)
		letterGrade="B+";
	else if(Number(tableContents[2].textContent) >= 83)
		letterGrade="B";
	else if(Number(tableContents[2].textContent) >= 80)
		letterGrade="B-";
	else if(Number(tableContents[2].textContent) >= 77)
		letterGrade="C+";
	else if(Number(tableContents[2].textContent) >= 73)
		letterGrade="C";
	else if(Number(tableContents[2].textContent) >= 70)
		letterGrade="C-";
	else if(Number(tableContents[2].textContent) >= 67)
		letterGrade="D+";
	else if(Number(tableContents[2].textContent) >= 63)
		letterGrade="D";
	else if(Number(tableContents[2].textContent) >= 60)
		letterGrade="D-";
	else
		letterGrade="F";
	return letterGrade;
}
function generateComment(){
	var commentsAndConcerns;
	if(Number(tableContents[2].textContent) === 100)
		commentsAndConcerns="Perfect Score! You Are A Very Smart Individual";
	else if(Number(tableContents[2].textContent) >= 90)
		commentsAndConcerns="Amazing! Your Hard Work Is Definitely Paying Off";
	else if(Number(tableContents[2].textContent) >= 80)
		commentsAndConcerns="Great Job! You Have A Good Understanding Of The Material";
	else if(Number(tableContents[2].textContent) >= 70)
		commentsAndConcerns="Good Job. You Have Basic Understanding.";
	else if(Number(tableContents[2].textContent) >= 60)
		commentsAndConcerns="Poor Job. You Definitely Need To Practice Your Times Tables";
	else
		commentsAndConcerns="Bad Job! You Need Way More Practice!!";
	return commentsAndConcerns;
}
