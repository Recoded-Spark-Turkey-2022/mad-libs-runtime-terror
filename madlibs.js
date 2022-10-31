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
    const txt=rawStory.split(" "); //it creates an array and puts all the words in the text as an element in this array. tüm kelimelri arrayin içine atmak için yapıyoruz, kelimeleri bulmak için boşlukları bulmak lazım bu yüzden split ediyoruz.
    //console.log(txt)
    const regex1 = /\Wn\W/; //it finds n from the [n]
    const regex2 = /\Wv\W/; //it finds v from the [v]
    const regex3 = /\Wa\W/; //it finds a from the [a]


    for(let i=0; i<txt.length; i++){ 
      if(txt[i].match(regex1)){ //arrayin içine ayrı ayrı kelimeleri obje olarak atmak için yazdık. 
        arr.push({
          word: txt[i].replace(regex1,""), // [n]yi boşlukla değiştir diyo, ( "" = sil demek), bu objenin 2 elementi var biri word biri de pos. word=nour mesela. pos=noun.
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
        arr.push({ //yukarıdaki regexlerin hiçbiri yoksa değişmeye gerek yok, pos u olmadığı için pos a da gerek yok.
          word: txt[i],
        })
      }


    }

     return arr;
   // This line is currently wrong :)
}



/*getRawStory().then(parseStory).then((processedStory) => {


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


}).then(()=>{
allInputs.forEach((element,index)=>{
  element.addEventListener('keyup', (e)=>{
    if(e.keycode ===13){
      if(index+1 ===allInputs.length){
        allInputs[0].focus();
      }else{
        allInputs[index+1].focus();
      }
    }
  })
});
}) */

const inputGroup = document.querySelector(".madLibsEdit "); 
const lastPrview = document.querySelector('.madLibsPreview');


let allInputs = document.querySelectorAll('input');
const myInput = document.querySelector('.noun');

//neden htmlde yazmadık diye soracaksan olursan, her story için farklı html yazmak yerine tek functionda zaten yapabilirsin neden işini zorlaştırasın değil mi bize bu kodu yazdırmalarının sebebi bu solid kod kullanılabilirz temizzzzz misssss
getRawStory().then(parseStory).then((processedStory) => {
  var elementCount = 0;
  processedStory.forEach(element => {
    if(element.pos){ //eğer elementin posu varsa ki bizde sadece inputların posu var input grubun inner htmline bunu ekle diyor += ekle demek. çünkü htmlde bişey yok.
      elementCount++; //eğer element pos olunca artır ki hepsinin unique bir classı olsun
      inputGroup.innerHTML += `<input type="text" class="${element.pos}" placeholder="${element.pos}">`;
      lastPrview.innerHTML += `<span class="input${elementCount}">[] </span>`;
    }else{
      inputGroup.innerHTML += `<span class="period">${element.word} </span>`; //pos değilse kelimeyi koy input minput uğraşma diyo işte dümdüz devamke
      lastPrview.innerHTML += `<span class="period"> ${element.word} </span>`;
    }
   allInputs = document.querySelectorAll('input'); //artık all inputs= htmlde olan tüm inputlar 
  
})}).then(()=>{

  allInputs.forEach((element,index)=> { //for eachin içine iki tane addeventlistener koyduk bu performansı etkiler mi?
    element.addEventListener('input',()=>{
      let span = document.querySelector(`.input${index+1}`); //inputlara event listener ekliyoruz bu da diyoki spani input class olan şeyleri tanımla
      span.innerHTML = element.value+""; //span'e her input girildiğinde bunun değeri inputun değerine eşit olsun
    })

    element.addEventListener('keyup', (e) => { //keyup tuşa basınca demek
      if(e.keyCode === 13){ //enter ı temsil ediyo
        if(index+1 === allInputs.length){ //eğer son inputtaysak input arayimin  içindeki ilk inputa focusla
          allInputs[0].focus();
        }else{
          allInputs[index+1].focus(); //eğer sonda değilsek bir sonraki değere focusla
        }
      }
    })
  });
} )





