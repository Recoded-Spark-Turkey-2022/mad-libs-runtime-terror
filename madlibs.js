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

    // console.log(result);

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
  // return {}; // This line is currently wrong :)
}


//selects html edit class and shows the story that 
//have inputs in it
function processedStory(story) {
  const edit=document.querySelector(".madLibsEdit")
  const preview=document.querySelector(".madLibsPreview")
  const arr=[];

    //returns story as objects from parseStory() and 
    //puts pos as default inside input boxes while 
    //returns the rest of the raw story inside "span"
    for (let i = 0; i < story.length; i++) {
      const span=document.createElement("span");
      edit.appendChild(span);
      const {word, pos} = story[i];
      
      if(pos){
        const input= document.createElement("input");
        span.append(input);
        input.defaultValue=story[i].pos;
        arr.push(span.innerHTML);
        //console.log(pos)
      }else{
        span.innerText =story[i].word + " ";
        arr.push(span.innerHTML);
        //console.log(word)
      }
    }

  //console.log(arr)
            
      const reducer=(accumulator, item)=>{
        return accumulator + item
      }
      let total= arr.reduce(reducer, "")
      preview.append(total)
      //console.log(total)

}





/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */
getRawStory().then(parseStory).then((story) => {
  processedStory(story);
});
