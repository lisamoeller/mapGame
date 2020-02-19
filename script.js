const paths = document.querySelectorAll("path:not(#path67)");
const showBox = document.querySelector(".toFind");
let stateList = {
     "HI": {"name": "Hawaii", "capital":"Honolulu"},
     "AK": {"name": "Alaska", "capital":"Juneau"},
     "FL": {"name": "Florida", "capital":"Tallahassee"},
     "SC": {"name": "South Carolina", "capital":"Columbia"},
     "GA": {"name": "Georgia", "capital":"Atlanta"},
     "AL": {"name": "Alabama", "capital":"Montgomery"},
     "NC": {"name": "North Carolina", "capital":"Raleigh"},
     "TN": {"name": "Tennessee", "capital":"Nashville"},
     "RI": {"name": "Rhode Island", "capital":"Providence"},
     "CT": {"name": "Connecticut", "capital":"Hartford"},
     "MA": {"name": "Massachusetts", "capital":"Boston"},
     "ME": {"name": "Maine", "capital":"Augusta"},
     "NH": {"name": "New Hampshire", "capital":"Concord"},
     "VT": {"name": "Vermont", "capital":"Montpelier"},
     "NY": {"name": "New York", "capital":"Albany"},
     "NJ": {"name": "New Jersey", "capital":"Trenton"},
     "PA": {"name": "Pennsylvania", "capital":"Harrisburg"},
     "DE": {"name": "Delaware", "capital":"Dover"},
     "MD": {"name": "Maryland", "capital":"Annapolis"},
     "WV": {"name": "West Virginia", "capital":"Charleston"},
     "KY": {"name": "Kentucky", "capital":"Frankfort"},
     "OH": {"name": "Ohio", "capital":"Columbus"},
     "MI": {"name": "Michigan", "capital":"Lansing"},
     "WY": {"name": "Wyoming", "capital":"Cheyenne"},
     "MT": {"name": "Montana", "capital":"Helena"},
     "ID": {"name": "Idaho", "capital":"Boise"},
     "WA": {"name": "Washington", "capital":"Olympia"},
     "TX": {"name": "Texas", "capital":"Austin"},
     "CA": {"name": "California", "capital":"Sacramento"},
     "AZ": {"name": "Arizona", "capital":"Phoenix"},
     "NV": {"name": "Nevada", "capital":"Carson City"},
     "UT": {"name": "Utah", "capital":"Salt Lake City"},
     "CO": {"name": "Colorado", "capital":"Denver"},
     "NM": {"name": "New Mexico", "capital":"Santa Fe"},
     "OR": {"name": "Oregon", "capital":"Salem"},
     "ND": {"name": "North Dakota", "capital":"Bismarck"},
     "SD": {"name": "South Dakota", "capital":"Pierre"},
     "NE": {"name": "Nebraska", "capital":"Lincoln"},
     "IA": {"name": "Iowa", "capital":"Des Moines"},
     "MS": {"name": "Mississippi", "capital":"Jackson"},
     "IN": {"name": "Indiana", "capital":"Indianapolis"},
     "IL": {"name": "Illinois", "capital":"Springfield"},
     "MN": {"name": "Minnesota", "capital":"Saint Paul"},
     "WI": {"name": "Wisconsin", "capital":"Madison"},
     "MO": {"name": "Missouri", "capital":"Jefferson City"},
     "AR": {"name": "Arkansas", "capital":"Little Rock"},
     "OK": {"name": "Oklahoma", "capital":"Oklahoma City"},
     "KS": {"name": "Kansas", "capital":"Topeka"},
     "LA": {"name": "Louisiana", "capital":"Baton Rouge"},
     "VA": {"name": "Virginia", "capital":"Richmond"},
};
let score = 0;
let countStates = 0;

let wrongGuess = 0;

function reset(){
  score = 0;
  document.querySelector("#score span").innerHTML = score;
  countStates = 0;
  
  
  paths.forEach(path => path.classList = []);
  
  Object.keys(stateList).forEach(key => {
    stateList[key].selected = false;
  });
  
  document.querySelector(".winner").style.display = "none";
  
  newGame();
}

function endGame(){
  document.querySelector(".winner").style.display = "flex";
}

function getState(){
  const keys = Object.keys(stateList);
  const random = keys[Math.floor(Math.random() * keys.length)];
  if(stateList[random].selected){
    return getState();
  }else{
    stateList[random].selected = true;
    countStates++;
    return random;
  }
}
  

function newGame(){
  
  const state = getState();  
  showBox.innerHTML = stateList[state].name;
  showBox.dataset.key = state;
}

function changeScore(val){
  score = score + val;
  document.querySelector("#score span").innerHTML = score;
}

function checkSolution(){
  if(showBox.dataset.key == this.dataset.code){
    if(this.classList.contains("blink")){
      this.classList.remove("blink");
    }
    this.classList.remove("red");
    this.classList.add("teal");
    wrongGuess = 0;
    
    changeScore(10);
 
    if(countStates < 50){
      newGame();
    }else{
      endGame();
    }
    
  }else{
      this.classList.add("red");
      changeScore(-5);
    
    if(wrongGuess < 2){
      wrongGuess += 1;
    }else{
      document.querySelector("[data-code='" + showBox.dataset.key + "']").classList.add("blink");
    }
  }
}

paths.forEach(path => path.addEventListener('click', checkSolution));

newGame();