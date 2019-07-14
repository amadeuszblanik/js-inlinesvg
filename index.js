export default class InlineSVG {
    constructor(className = "inlineSVG") {
        this.props = {
            selector: `.${className}`,
            objects: document.querySelectorAll(`.${className}`)
        };

        if (typeof window !== "object") {
            console.warn("Window is not an object. SSR is not supported.");
        } else {
            if ("fetch" in window) {
                for (let object of this.props.objects) {
                    this.render(object);
                }
            } else {
                console.error("Your browser doesn't supports Fetch API");
            }
        }
    }

    async requestSVG(url) {
        let data = await (await (fetch(url)
                .then(response => {
                    if (response.status !== 200) {
                        return response.status;
                    } else {
                        if (response.headers.get("content-type") !== "image/svg+xml") {
                            console.error("Provided image is not an SVG", response.headers.get("content-type"));
                            return false;
                        } else {
                            return response.text();
                            return response;
                        }
                    }
                })
                .catch(err => {
                    console.error("Error: requestSVG has not been completed.\n", { err });
                    return false;
                })
        ));
        return data;
    }

    tdd_isDOMElement(element) {
        if (typeof element === "object") {
            if (!element instanceof Element) {
                console.warn("element is not an instanceof Element");
                return false;
            } else if (typeof element.classList !== "object") {
                console.warn("classList of element is not an object");
                return false;
            } else {
                return true;
            }
        } else {
            console.warn("Element is not an object");
            return false;
        }
    }

    async render(object) {
        if (this.tdd_isDOMElement(object)) {
            if (object.hasAttribute("src")) {
                let requestedSVG = await this.requestSVG(object.getAttribute("src"));
                if (!(isNaN(requestedSVG))) {
                    console.warn(`Requested SVG has returned "${requestedSVG}" code.`);
                } else {
                    object.outerHTML = requestedSVG;
                }
            } else {
                console.warn("object doesn't have an attribute src");
            }

        }
    }
}
