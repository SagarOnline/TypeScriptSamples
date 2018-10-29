var MicrofrontendRenderer = /** @class */ (function () {
    function MicrofrontendRenderer() {
    }
    MicrofrontendRenderer.prototype.render = function () {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                processResponse_sync(this.responseText);
            }
        };
        xhttp.open("GET", '${page}', true);
        //xhttp.open("GET", 'http://localhost:8220/marketdata/index.html', true);
        xhttp.send();
        function processResponse(html) {
            var hrefExtractorRegEx = /\/[^\/]+$/;
            var baseUrl = "${baseUrl}";
            var div = document.createElement('div');
            div.innerHTML = html;
            var scriptElements = [];
            var scriptNodes = div.querySelectorAll('script');
            for (var i = 0; i < scriptNodes.length; i++) {
                var scriptNode = scriptNodes[i];
                //const scriptName = hrefExtractorRegEx.exec(scriptNode.src)[1];
                var scriptName = hrefExtractorRegEx.exec(scriptNode.src)[0];
                scriptNode.src = baseUrl + scriptName;
                ;
                // Create a new script element so HTML5 will execute it upon adding to DOM
                var scriptElement = document.createElement('script');
                // Copy all the attributes from the original script element
                for (var aI = 0; aI < scriptNode.attributes.length; aI++) {
                    scriptElement.attributes.setNamedItem(scriptNode.attributes[aI].cloneNode());
                }
                // Add any content the original script element has
                var scriptContent = document.createTextNode(scriptNode.textContent);
                scriptElement.appendChild(scriptContent);
                // Remove the original script element
                scriptNode.remove();
                // add the new element to the list
                scriptElements.push(scriptElement);
            }
            document.body.appendChild(div);
            // Add the new script elements to the DOM
            for (var i = 0; i < scriptElements.length; i++) {
                document.body.appendChild(scriptElements[i]);
            }
        }
        function processResponse_sync(html) {
            var div = document.createElement('div');
            div.setAttribute("id", "container");
            div.innerHTML = html;
            document.body.appendChild(div);
            updateScriptElementsWithAbsoutePaths();
        }
        function updateScriptElementsWithAbsoutePaths() {
            var scriptNodes = document.getElementById("container").querySelectorAll('script');
            var firstscriptElement = getScriptElement(scriptNodes[0]);
            scriptNodes[0].remove();
            if (scriptNodes.length > 1) {
                firstscriptElement.onload = updateScriptElementsWithAbsoutePaths;
            }
            document.body.appendChild(firstscriptElement);
        }
        /*
        Script node returned by microfrontend has relative path. This method uses this script node to create new Script element with absolute path of the script.
        Returned element must be added on document body in order to load this script.
        */
        function getScriptElement(scriptNode) {
            updateMicroFrontEndScriptUrl(scriptNode);
            var scriptElement = document.createElement('script');
            // Copy all the attributes from the original script element
            for (var aI = 0; aI < scriptNode.attributes.length; aI++) {
                scriptElement.attributes.setNamedItem(scriptNode.attributes[aI].cloneNode());
            }
            // Add any content the original script element has
            var scriptContent = document.createTextNode(scriptNode.textContent);
            scriptElement.appendChild(scriptContent);
            return scriptElement;
        }
        /*
        This function updates the script node scr by prefixing it with baseUrl set on container tag.
        */
        function updateMicroFrontEndScriptUrl(scriptNode) {
            var localScriptUrl = scriptNode.src;
            var hrefExtractorRegEx = /\/[^\/]+$/;
            var baseUrl = "${baseUrl}";
            //const baseUrl = "http://localhost:8220/marketdata";
            var scriptName = hrefExtractorRegEx.exec(localScriptUrl)[0];
            scriptNode.src = baseUrl + scriptName;
        }
    };
    return MicrofrontendRenderer;
}());
var renderer = new MicrofrontendRenderer();
renderer.render();
