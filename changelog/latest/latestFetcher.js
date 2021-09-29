fetch("/changelog/data/json/changelog.json")
    .then(r => r.text())
    .then(t => {
        var jsonObject = JSON.parse(t)

        var latestObject;
        for (var changelog in jsonObject["changelogs"]) {
            var changelogObject = jsonObject["changelogs"][changelog];
            if (changelogObject["download"] != null) {
                latestObject = changelogObject;
                break;
            }
        }


        document.getElementsByClassName("hero")[0].remove();
        var mainobject = document.getElementsByClassName("infocontent")[0];

        if (mainobject != null) {
            if (latestObject == null) {
                createElementWithContent("hero", mainobject, "div", `
                <br>
                <br>
                <br>
                <br>
                <br>
                <h1 class="hero__title" style="font-size: 350%; color: var(--accent-color);">Error</h1>
                <p class="hero__description">Couldn't fetch the latest build!</p>
                <p class="hero__description">Please contact us on <a href="https://discord.gg/2yDWH3VxKC">Discord</a> or try again later...</p>`)
                return;
            }

            createElementWithContent("hero", mainobject, "div", `
            <br>
            <br>
            <br>
            <br>
            <br>
            <h1 class="hero__title" style="font-size: 350%;">Downloading latest...</h1>
            <p class="hero__description">Your download should be started in 5 seconds!</p>
            <p class="hero__description">Or <a href="'/changelog/data/downloads/` + latestObject["download"] + `">click here!</a></p>
            <p class="hero__description">Experience issues? Javascript enabled? Try to refresh this site or contact us on <a href="https://discord.gg/2yDWH3VxKC">Discord</a></p>`)
            setTimeout(function() {
                location.href = '/changelog/data/downloads/' + latestObject["download"];
            }, 5000);
        }
    })

function createElementWithContent(name, wrapperDiv, elementType, content) {
    var createdElement = document.createElement(elementType)
    if (name != "") {
        createdElement.className = name
    }
    createdElement.innerHTML = content
    wrapperDiv.appendChild(createdElement)
    return createdElement
}