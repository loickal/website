 //URL SearchParams instance
 const queryString = window.location.search;
 const urlParams = new URLSearchParams(queryString);

 fetch("data/json/modules.json")
     .then(r => r.text())
     .then(t => {
         var urlFetchedModuleName = fetchURLObject("module");
         if (urlFetchedModuleName == null) {
             trigger404();
             return;
         }

         var moduleJsonObject = JSON.parse(t);


         var selectedModule;

         //Searching for this module in the JSON File
         for (var tempObject in moduleJsonObject["modules"]) {
             var object = moduleJsonObject["modules"][tempObject];
             if (object["name"].toString().toLowerCase() == urlFetchedModuleName.toString().toLowerCase()) {
                 selectedModule = object;
                 break;
             }
         }

         if (selectedModule == null) {
             trigger404();
             return;
         }

         //Generate the complete description of the module
         var generatedDescription = `<br>What does this module?<br>`;
         for (var tempObject in selectedModule["description"]) {
             generatedDescription = generatedDescription + "- " + selectedModule["description"][tempObject] + "<br>";
         }

         //Generate the pictures
         var generatedPictures = `<p>Linked pictures:<br></p>`;
         for (var tempObject in selectedModule["pics"]) {
             var pictureName = "./data/img/" + selectedModule["pics"][tempObject];

             fileExists(pictureName, new function() {
                 generatedPictures = generatedPictures + `<img src="` + pictureName + `" class="lightbox-thumbnail">`
             });
         }

         //Generate the download link
         var generatedDownloadLink = ``;
         fileExists("./data/jar/" + selectedModule["download-file"], new function() {
             generatedDownloadLink = "./data/jar/" + selectedModule["download-file"];
         });


         //Setting the contents
         var bodyDiv = document.getElementsByClassName("blog-hero-body")[0];
         var mainPictureDiv = document.getElementsByClassName("edit-block")[0]

         var completeGeneratedContent = `<h1 editname="Title" type="text">` + selectedModule["name"] + `</h1>
                                        <div class="tags">
                                            <div class="tag secondary">` + selectedModule["author"] + `</div>
                                            <a href="?category=devblog" class="tag devblog">` + selectedModule["type"] + `</a>
                                        </div>
                                        <a href="` + generatedDownloadLink + `" class="button is-primary is-large center" style="margin-top: 8px;">
                                        <span>Download ` + selectedModule["name"] + `</span>
                                        </a>
                                        <p editname="Summary" type="text">` + generatedDescription + `</p>`;


         createDivWithContent("body-info", bodyDiv, completeGeneratedContent)
         createElementWithContent("", mainPictureDiv, "gallery", generatedPictures)
     })


 function trigger404() {
     var bodyDiv = document.getElementsByClassName("blog-hero-body")[0];
     var content = `<h1 editname="Title" type="text">This module wasn't found!</h1>`;

     createDivWithContent("body-info", bodyDiv, content)
     document.getElementsByClassName("blog")[0].remove();
 }

 function fetchURLObject(parameter) {
     return urlParams.get(parameter)
 }

 function createDiv(name, wrapperDiv) {
     var createdDiv = document.createElement("div")
     createdDiv.className = name
     wrapperDiv.appendChild(createdDiv)
     return createdDiv
 }

 function createDivWithContent(name, wrapperDiv, content) {
     var createdDiv = document.createElement("div")
     createdDiv.className = name
     createdDiv.innerHTML = content
     wrapperDiv.appendChild(createdDiv)
     return createdDiv
 }

 function createElement(name, wrapperDiv, elementType) {
     var createdElement = document.createElement(elementType)
     if (name != "") {
         createdElement.className = name
     }
     wrapperDiv.appendChild(createdElement)
     return createdElement
 }

 function createElementWithContent(name, wrapperDiv, elementType, content) {
     var createdElement = document.createElement(elementType)
     if (name != "") {
         createdElement.className = name
     }
     createdElement.innerHTML = content
     wrapperDiv.appendChild(createdElement)
     return createdElement
 }

 function fileExists(src, callback) {
     var xhr = new XMLHttpRequest()
     xhr.onreadystatechange = function() {
         if (this.readyState === this.DONE) {
             callback()
         }
     }
     xhr.open('HEAD', src)
 }