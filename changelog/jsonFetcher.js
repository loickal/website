console.log("Start fetching changelogs...")

fetch("changelog.json")
    .then(r => r.text())
    .then(t => {
        var jsonObject = JSON.parse(t)

        console.log(jsonObject["changelogs"].length + " Changelog entries")
            //Going through all changelog entries
        for (var changelog in jsonObject["changelogs"]) {

            //Getting the current changelog entry
            var changelogObject = jsonObject["changelogs"][changelog]

            //Getting the main-container for displaying the changelog entries
            var mydiv = document.getElementsByClassName("container")[0]

            //Creating a changelog-container for the current changelog entry
            var wrapperDiv = createDiv("changes-container", mydiv)


            //Creating the sidebar of the changelog entry
            var sideBarEntryContent = `<div class="sidebar-section">
            <span class="subtitle">Build</span>
            <p class="title"> <span class="icon">
            <i>published_with_changes</i>
            </span>` + changelogObject["build"] + `</p>
            </div>
            <div class="sidebar-section">
            <span class="subtitle">Type</span>
            <p class="title"><span class="icon">
            <i>auto_awesome</i>
            </span>` + changelogObject["type"] + `</p>
            </div>`

            if (changelogObject["date"] != null) {
                sideBarEntryContent = sideBarEntryContent + `<div class="sidebar-section">
                <span class="subtitle">Date</span>
                <p class="title">            
                <span class="icon">
                <i>date_range</i>
                </span>` + changelogObject["date"] + `</p>
                </div>`
            }

            if (changelogObject["comment"] != null) {
                sideBarEntryContent = sideBarEntryContent + `<div class="sidebar-section">
                <span class="subtitle">Comment</span>
                <p class="title">            
                <span class="icon">
                <i>announcement</i>
                </span>` + changelogObject["date"] + `</p>
                </div>`
            }

            sideBarEntryContent = sideBarEntryContent +
                `</div> 
                <div class = "sidebar-section"></div>`

            createDivWithContent("changes-sidebar", wrapperDiv, sideBarEntryContent)


            //Main body for the changes
            var changesbodydiv = createDiv("changes-body", wrapperDiv)

            if (changelogObject["feature"] != null) {
                //Features row
                var changesWrapperDiv = createDiv("changes-row features", changesbodydiv)

                var headerContent = `<span class="icon">
            <i>add_circle</i>
            </span>
            <h3>Features</h3>`

                createDivWithContent("changes-row-header", changesWrapperDiv, headerContent)

                var featuresDiv = createDiv("changes-row-body", changesWrapperDiv)

                var ulElement = createElement("", featuresDiv, "ul")

                for (var featureElement in changelogObject["feature"]) {
                    var changelogText = changelogObject["feature"][featureElement]
                    var content = `<span>•</span>
                <div class="entry">` + changelogText + `
                    </div>
                    `
                    createElementWithContent("", ulElement, "li", content)
                }
            }


            //Fixed row
            if (changelogObject["fixed"] != null) {
                var changesWrapperDiv = createDiv("changes-row fixed", changesbodydiv)
                var headerContent = `<span class="icon">
            <i>handyman</i>
            </span>
            <h3>Fixed</h3>`
                createDivWithContent("changes-row-header", changesWrapperDiv, headerContent)

                var featuresDiv = createDiv("changes-row-body", changesWrapperDiv)

                var ulElement = createElement("", featuresDiv, "ul")

                for (var featureElement in changelogObject["fixed"]) {
                    var changelogText = changelogObject["fixed"][featureElement]
                    var content = `<span>•</span>
                <div class="entry">` + changelogText + `
                    </div>
                    `
                    createElementWithContent("", ulElement, "li", content)
                }
            }

            if (changelogObject["removed"] != null) {
                var changesWrapperDiv = createDiv("changes-row removed", changesbodydiv)


                var headerContent = `<span class="icon">
                <i>remove_circle</i>
                </span>
                <h3>Removed</h3>`
                createDivWithContent("changes-row-header", changesWrapperDiv, headerContent)

                var featuresDiv = createDiv("changes-row-body", changesWrapperDiv)

                var ulElement = createElement("", featuresDiv, "ul")

                for (var featureElement in changelogObject["removed"]) {
                    var changelogText = changelogObject["removed"][featureElement]
                    var content = `<span>•</span>
                    <div class="entry">` + changelogText + `
                        </div>
                        `
                    createElementWithContent("", ulElement, "li", content)
                }
            }


            if (changelogObject["improved"] != null) {
                //Improved row
                var changesWrapperDiv = createDiv("changes-row improvements", changesbodydiv)


                var headerContent = `<span class="icon">
                        <i>arrow_circle_up</i>
                        </span>
                        <h3>Improvements</h3>`
                createDivWithContent("changes-row-header", changesWrapperDiv, headerContent)

                var featuresDiv = createDiv("changes-row-body", changesWrapperDiv)

                var ulElement = createElement("", featuresDiv, "ul")

                for (var featureElement in changelogObject["improved"]) {
                    var changelogText = changelogObject["improved"][featureElement]
                    var content = `<span>•</span>
                            <div class="entry">` + changelogText + `
                                </div>`
                    createElementWithContent("", ulElement, "li", content)
                }

            }
        }


        console.log("Successfully fetched all changelogs")
    })


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