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
        //<a href="https://www.w3schools.com/html/">Visit our HTML Tutorial</a>
        result = result +"<a href=\""+ fileData[i].link +"\">"+ fileData[i].title +"</a><br>";
      }
  }
  console.log(result.length);
  if(result.length==0){
    console.log("here");
    result = "No results found for " + query.value;
  }
  document.getElementById("content").innerHTML = result;
  }

