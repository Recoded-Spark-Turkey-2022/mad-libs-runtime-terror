/**
 * Complete the implementation of parseStory.
 *
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 *
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 *
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 *
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 *
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */



//takes txt from getRawStory() and puts it inside an array of objects
//with a for loop
function parseStory(rawStory) {
  // Your code here.
  const arr=[];
  const txt=rawStory.split(" ");
    //console.log(txt)
  const regex1 = /\Wn\W/;
  const regex2 = /\Wv\W/;
  const regex3 = /\Wa\W/;


  for(let i=0; i<txt.length; i++){
    if(txt[i].match(regex1)){
      arr.push({
        word: txt[i].replace(regex1,""),
        pos: "noun"
      })
    } else  if(txt[i].match(regex2) ){
      arr.push({
        word: txt[i].replace(regex2, ""),
        pos: "verb"
      })
    } else if(txt[i].match(regex3)){
      arr.push({
        word: txt[i].replace(regex3, ""),
        pos: "adjective"
    })
    }else{
      arr.push({
        word: txt[i],
      })
    }


  }

   return arr;
   // This line is currently wrong :)
}







const inputGroup = document.querySelector(".madLibsEdit"); 
const lastPreview = document.querySelector(".madLibsPreview");
let allInputs = document.querySelectorAll("input");  //selects all input boxes implemented inside .madLibsEdit

getRawStory().then(parseStory).then((processedStory)=>{
  let elementCount = 0;   //starts counting for blank spaces inside madLibsPreview not exactly same but you can see it and line 87 as (let i = 0; i < array.length; i++) inside for loop 
  processedStory.forEach(element => {  //forEach here takes our objects inside our array from parseStory(), looks all objects one by one and we will make changes on them via processedStory() for both <div>s we have in HTML
    if(element.pos){   //here says if you have pos in your object return it as following; 
      elementCount++;   
      inputGroup.innerHTML += `<input type="text" class="${element.pos}" placeholder="${element.pos}" maxlength="20">`+" ";  //if you see pos, first put an input for that object inside madLibsEdit and implement its pos:value inside of it as default value. max usable letter:20. the last +" " adds blank space after input box 
      lastPreview.innerHTML += `<span class="input${elementCount}">[] &nbsp</span>` ;  //if you see pos put a blank array and a blank space after it($nbsp works for this) inside madLibsPreview      **line88 and 89 works together here as u can see so for have same index while forEach counts its ${element.pos} and ${elementCount} works together in eventListeners part this will make much more sense
    }else{      //if you can't find pos then;
      inputGroup.innerHTML += `<span class="period">${element.word} </span>`;   //add word:value inside our object to .madLibsEdit
      lastPreview.innerHTML += `<span class="period">${element.word} </span>`;  //add word:value inside our object to .madLibsPreview
    }
    allInputs = document.querySelectorAll("input");  
  });
}).then(()=>{    //this .then used because when tried to use eventListeners inside processedStory, js said that it can not reach to fetch (to texts accordingly, I guess)
  allInputs.forEach((element, index) => {    //forEach here takes indexes of processedStory in this sense; 
    element.addEventListener("input",()=>{    //for every index, it looks for input movements from client(user),
      let span = document.querySelector(`.input${index+1}`);    //picks input classes with indexes we had in line 88/89 looks them one by one starting from i=0  
      span.innerHTML = element.value+" ";        //and gives the value has been added from user with a blank space so words can be seperated when user writes
    })
    element.addEventListener("keyup", (e)=>{    //Hotkeys: When the user presses Enter in an input, it should move the cursor to the next input in the story.
      if(e.key === "Enter"){
        if(index+1 === allInputs.length){
          allInputs[0].focus();
        }else{
          allInputs[index+1].focus();
        }
      }
    })
  });
})


