let query = document.querySelector('.query');
let searchBtn = document.querySelector('.searchBtn');
var fileData = "";
var result = "";


fetch("https://moinali.github.io/Cyberminer/index.json")
  .then(res => res.json())
  .then(data => {
    fileData=data;
  })


searchBtn.onclick = function (){
  result = "";
  console.log(query.value);
  for (let i = 0; i < fileData.length; i++) {
    if(fileData[i].title.includes(query.value) 
      || fileData[i].description.includes(query.value)) {
        //create link like so
        //<p>This text is normal.</p>
        //<a href="https://www.w3schools.com/html/">Visit our HTML Tutorial</a>

        //result = result + "<p>"+ boldQuery() +"</p>"; 
        //result = result + "<p class="+"\"text-muted\">"+ fileData[i].link +"</p>"; 
        result = result + "<p style=\"color:#838383\">"+ fileData[i].link +"</p>"; 
        result = result +"<a href=\""+ fileData[i].link +"\">"+  boldQuery(fileData[i].title) +"</a>";
        result = result +"<p>"+ fileData[i].pubDate.slice(0,-12) +" — " +boldQuery(fileData[i].description) +"...</p><br><br>";
      }
  }
  console.log(result.length);
  if(result.length==0){
    console.log("here");
    result = "No results found for " + query.value;
  }
  document.getElementById("content").innerHTML = result;
  }

  function boldQuery(line){
    var lineToWords = line.split(" ");
    var formed = "";
    //var str = "\\b"+ query.value +"\\b";
    //console.log(str);
    for(var j = 0; j<lineToWords.length; j++){
      if(new RegExp("\\b"+query.value+"\\b").test(lineToWords[j])){
      //if(query.value.includes(lineToWords[j])){       
        formed += "<b>"+lineToWords[j]+"</b>"+" ";
      }else{
        formed += lineToWords[j]+" ";
     }
    }
    return formed;
  }



