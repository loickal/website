console.log("Start fetching modules...")

fetch("data/json/modules.json")
    .then(r => r.text())
    .then(t => {
        var jsonObject = JSON.parse(t)

        console.log(jsonObject["modules"].length + " Modules to load.")

        for (var changelog in jsonObject["modules"]) {

            //Getting the current changelog entry
            var moduleObject = jsonObject["modules"][changelog]

            var mainDiv = document.getElementsByClassName("blog-posts-container")[0]
            var postDiv = createDiv("blog-post", mainDiv)

            var linkToPreview = "./detail.html?module=" + moduleObject["name"];

            if (moduleObject["preview-image"] != null) {
                var pictureName = "./data/img/" + moduleObject["preview-image"];
                fileExists(pictureName, new function() {
                    var pictureContent = `<a href="` + linkToPreview + `" class="blog-post-image">
                    <img src="` + pictureName + `" alt="Blog Header Image">
                    </div>
                    </a>`
                    setElementsContent(postDiv, pictureContent);
                });
            }

            var bodyElement = createDiv("blog-post-body", postDiv);

            var bodyContent = `<div class="tags">
                <div class="tag secondary">` + moduleObject["author"] + `</div>
                    <a class="tag devblog">` + moduleObject["type"] + `</a>
                </div>
                <a href="` + linkToPreview + `">
                    <h1>` + moduleObject["name"] + `</h1>
                </a>
                <p>` + moduleObject["short-description"] + `</p>`;
            setElementsContent(bodyElement, bodyContent)

            console.log("Fetched module '" + moduleObject["name"] + "'. ")
        }
    });


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

function setElementsContent(element, content) {
    if (element != null) {
        element.innerHTML = content;
        return element;
    }
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