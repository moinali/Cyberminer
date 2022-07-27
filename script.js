let query = document.querySelector('.query');
let searchBtn = document.querySelector('.searchBtn');
var fileData = "";
var result = "";

let isAnd = false;
let isOr = false;
let isNot = false;


  fetch("https://moinali.github.io/Cyberminer/index.json")
  .then(res => res.json())
  .then(data => {
    fileData=data;
  })

  searchBtn.onclick = function (){
  result = "";
  queryDecypher();
  }

  function getResults(key){
    console.log(key);
    //queryDecypher();
    for (let i = 0; i < fileData.length; i++) {
      if(fileData[i].title.includes(key) 
        || fileData[i].description.includes(key)) {
          result = result + "<p style=\"color:#838383\">"+ fileData[i].link +"</p>"; 
          result = result +"<a href=\""+ fileData[i].link +"\">"+  boldQuery(fileData[i].title, key) +"</a>";
          result = result +"<p>"+ fileData[i].pubDate.slice(0,-12) +" — " +boldQuery(fileData[i].description, key) +"...</p><br><br>";
        }
    }
    console.log(result.length);
    if(result.length==0){
      console.log("here");
      result = "No results found for " + key;
    }
    document.getElementById("content").innerHTML = result;
  }

  function getAndResults(key, key2){
    console.log(key + " AND " + key2);
    //queryDecypher();
    for (let i = 0; i < fileData.length; i++) {
      if( (fileData[i].title.includes(key) || fileData[i].description.includes(key)) 
        && (fileData[i].title.includes(key2) || fileData[i].description.includes(key2))  )
         {
          result = result + "<p style=\"color:#838383\">"+ fileData[i].link +"</p>";
          var boldTitleKey2 = boldQuery(fileData[i].title, key2);
          var boldDescKey2 = boldQuery(fileData[i].description, key2);
          result = result +"<a href=\""+ fileData[i].link +"\">"+  boldQuery(boldTitleKey2, key) +"</a>";
          result = result +"<p>"+ fileData[i].pubDate.slice(0,-12) +" — " +boldQuery(boldDescKey2, key) +"...</p><br><br>";
        }
    }
    console.log(result.length);
    if(result.length==0){
      console.log("here");
      result = "No results found for " + key;
    }
    document.getElementById("content").innerHTML = result;
  }

  function getNotResults(key, key2){
    console.log(key + " AND " + key2);
    //queryDecypher();
    for (let i = 0; i < fileData.length; i++) {
      if( (fileData[i].title.includes(key) || fileData[i].description.includes(key)) ){
        if ( !(fileData[i].title.includes(key2) || fileData[i].description.includes(key2)) ) {
          result = result + "<p style=\"color:#838383\">"+ fileData[i].link +"</p>";
          var boldTitleKey2 = boldQuery(fileData[i].title, key2);
          var boldDescKey2 = boldQuery(fileData[i].description, key2);
          result = result +"<a href=\""+ fileData[i].link +"\">"+  boldQuery(boldTitleKey2, key) +"</a>";
          result = result +"<p>"+ fileData[i].pubDate.slice(0,-12) +" — " +boldQuery(boldDescKey2, key) +"...</p><br><br>";
        
        }
      }
    }
    console.log(result.length);
    if(result.length==0){
      console.log("here");
      result = "No results found for " + key;
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

      console.log(qArr);
      var arrayLength = qArr.length;
      console.log("array length:" + arrayLength);
      for (var i = 0; i < arrayLength; i++) {
        console.log(qArr[i]);
        getResults(qArr[i]);
      }

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




