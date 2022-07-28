let query = document.querySelector('.query');
let searchBtn = document.querySelector('.searchBtn');
//let nextButton = document.getElementById('nextButton');
//let previousButton = document.getElementById('previousButton');
document.getElementById('previousButton').style.visibility="hidden";
document.getElementById('nextButton').style.visibility="hidden";
var fileData = "";
var result = [];
var limit = 0;
var indexLimit = 0;

let isAnd = false;
let isOr = false;
let isNot = false;


  fetch("https://moinali.github.io/Cyberminer/index.json")
  .then(res => res.json())
  .then(data => {
    fileData=data;
  })

  searchBtn.onclick = function (){
  result = [];
  queryDecypher();
  console.log("result lenght: "+result.length);
  if(result.length < limit + 20){
    limit = result.length;
  }else {
    limit = limit + 20;
    document.getElementById('nextButton').style.visibility="visible";
  }
  document.getElementById("content").innerHTML = printString(result);
  }

  
  nextButton.onclick = function (){
    if(result.length < limit + 20){
      limit = result.length;
      document.getElementById('nextButton').style.visibility="hidden";
    }else {
      limit = limit + 20;
      document.getElementById('previousButton').style.visibility="visible";
    }
    indexLimit = indexLimit + 20;
    document.getElementById("content").innerHTML = printString(result);
    document.body.scrollIntoView({
      behavior: "smooth",
    });
  }
  

  previousButton.onclick = function (){
    limit = limit - 20;
    indexLimit = indexLimit - 20;
    if(limit <= 20){
      document.getElementById('previousButton').style.visibility="hidden";
    }else{
      document.getElementById('nextButton').style.visibility="visible";
    }
    document.getElementById("content").innerHTML = printString(result);
    document.body.scrollIntoView({
      behavior: "smooth",
    });
  }

  function getResults(key){
    console.log(key);
    //queryDecypher();
    var r = 0;
    for (let i = 0; i < fileData.length; i++) {
      if(fileData[i].title.includes(key) 
        || fileData[i].description.includes(key)) {
          result[r] ="<p style=\"color:#838383\">"+ fileData[i].link +"</p>"; 
          result[r] = result[r] +"<a href=\""+ fileData[i].link +"\">"+  boldQuery(fileData[i].title, key) +"</a>";
          result[r] = result[r] +"<p>"+ fileData[i].pubDate.slice(0,-12) +" — " +boldQuery(fileData[i].description, key) +"...</p><br><br>";
          r++;
        }
    }
    if(result.length==0){
      let noRes = "No results found for " + query.value;
      result[0] = noRes;
    }
    //document.getElementById("content").innerHTML = printString(result);
  }
  function getOrResults(key, key2){
    console.log(key);
    //queryDecypher();
    var r = 0;
    for (let i = 0; i < fileData.length; i++) {
      if(fileData[i].title.includes(key) 
        || fileData[i].description.includes(key)) {
          result[r] ="<p style=\"color:#838383\">"+ fileData[i].link +"</p>"; 
          result[r] = result[r] +"<a href=\""+ fileData[i].link +"\">"+  boldQuery(fileData[i].title, key) +"</a>";
          result[r] = result[r] +"<p>"+ fileData[i].pubDate.slice(0,-12) +" — " +boldQuery(fileData[i].description, key) +"...</p><br><br>";
          r++;
        }
    }
    for (let i = 0; i < fileData.length; i++) {
      if(fileData[i].title.includes(key2) 
        || fileData[i].description.includes(key2)) {
          result[r] ="<p style=\"color:#838383\">"+ fileData[i].link +"</p>"; 
          result[r] = result[r] +"<a href=\""+ fileData[i].link +"\">"+  boldQuery(fileData[i].title, key2) +"</a>";
          result[r] = result[r] +"<p>"+ fileData[i].pubDate.slice(0,-12) +" — " +boldQuery(fileData[i].description, key2) +"...</p><br><br>";
          r++;
        }
    }
    if(result.length==0){
      let noRes = "No results found for " + query.value;
      result[0] = noRes;
    }
    //document.getElementById("content").innerHTML = printString(result);
  }

  function printString(str){
    var returnValue = " ";

    for (let index = indexLimit; index < limit; index++) {
      console.log('limit: '+ limit+ " index: "+index);
      returnValue = returnValue + " "+ str[index];
    }
    return returnValue;
  }

  function getAndResults(key, key2){
    console.log(key + " AND " + key2);
    var r = 0;
    for (let i = 0; i < fileData.length; i++) {
      if( (fileData[i].title.includes(key) || fileData[i].description.includes(key)) 
        && (fileData[i].title.includes(key2) || fileData[i].description.includes(key2))  )
         {
          result[r] = "<p style=\"color:#838383\">"+ fileData[i].link +"</p>";
          var boldTitleKey2 = boldQuery(fileData[i].title, key2);
          var boldDescKey2 = boldQuery(fileData[i].description, key2);
          result[r] = result[r] +"<a href=\""+ fileData[i].link +"\">"+  boldQuery(boldTitleKey2, key) +"</a>";
          result[r] = result[r] +"<p>"+ fileData[i].pubDate.slice(0,-12) +" — " +boldQuery(boldDescKey2, key) +"...</p><br><br>";
          r++;
        }
    }
    if(result.length==0){
      let noRes = "No results found for " + query.value;
      result[0] = noRes;
    }
    document.getElementById("content").innerHTML = result;
  }

  function getNotResults(key, key2){
    console.log(key + " AND " + key2);
    var r = 0;
    for (let i = 0; i < fileData.length; i++) {
      if( (fileData[i].title.includes(key) || fileData[i].description.includes(key)) ){
        if ( !(fileData[i].title.includes(key2) || fileData[i].description.includes(key2)) ) {
          result[r] = "<p style=\"color:#838383\">"+ fileData[i].link +"</p>";
          var boldTitleKey2 = boldQuery(fileData[i].title, key2);
          var boldDescKey2 = boldQuery(fileData[i].description, key2);
          result[r] = result[r] +"<a href=\""+ fileData[i].link +"\">"+  boldQuery(boldTitleKey2, key) +"</a>";
          result[r] = result[r] +"<p>"+ fileData[i].pubDate.slice(0,-12) +" — " +boldQuery(boldDescKey2, key) +"...</p><br><br>";
          r++;
        }
      }
    }
    if(result.length==0){
      let noRes = "No results found for " + query.value;
      result[0] = noRes;
    }
    document.getElementById("content").innerHTML = result;
  }

  function queryDecypher(){
    var q = query.value;
    var qArr = [];
 
    if (q.includes("AND") ) {
      qArr = q.split(' AND ');
      console.log("found the AND");
      getAndResults(qArr[0],qArr[1]);

    } else if (q.includes("OR")){ //parse string with OR and list result
      qArr = q.split(' OR ');
      console.log("found the OR");
      getOrResults(qArr[0],qArr[1]);

    } else if(q.includes("NOT")){ 
      qArr = q.split(' NOT ');
      console.log("found the NOT");
      getNotResults(qArr[0],qArr[1]);

    } else {//single word query
      qArr[0] = q;
      getResults(qArr[0]);
    }

  }
  
  function boldQuery(line, key){
    var lineToWords = line.split(" ");
    var formed = "";
    //var str = "\\b"+ query.value +"\\b";
    //console.log(str);
    for(var j = 0; j<lineToWords.length; j++){
      if(new RegExp("\\b"+key+"\\b").test(lineToWords[j])){
      //if(query.value.includes(lineToWords[j])){       
        formed += "<b>"+lineToWords[j]+"</b>"+" ";
      }else{
        formed += lineToWords[j]+" ";
     }
    }
    return formed;
  }

  function isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  };




