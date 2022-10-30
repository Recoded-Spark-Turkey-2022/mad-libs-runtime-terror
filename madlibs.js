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



getRawStory().then(parseStory).then((processedStory) => {


  processedStory.map((story) => {
    const Edit = document.querySelector('.madLibsEdit') //selecting the madLibsEdit class and assigging it to Edit
    const preview = document.querySelector('.madLibsPreview')//selecting the madLibsPreview class and assigging it to preview

    function createFirstStory(x, input){ //
      x.innerHTML +=`<span> <input type='text' name='type' value='' placeholder=${input} maxlength="20"> </span>`
    }
    function createSecondStory(x){
      x.innerHTML +=`<span> <input type='text' name='type' value=''  readonly> </span>`
    }

    if(story.pos){ // if you find a pos in the story call create functions
      createFirstStory(Edit,  story.pos);
      createSecondStory(preview,  story.pos)
    }else{
      Edit.innerHTML += `${story.word} `
      preview.innerHTML += `${story.word} `
          }

      document.querySelectorAll(`.madLibsEdit input`).forEach((input,index) => {
        input.addEventListener('input', y => { document.querySelectorAll('.madLibsPreview input')[index].value = y.target.value
              })
          })
  })

  console.log(processedStory);
  addMusic();


  //  processedStory(story)


});






