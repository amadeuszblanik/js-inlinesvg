class InlineSVG {
    constructor() {
        this.props = {
            class: "inlineSVG",
            selector: ".inlineSVG"
        }
    }

    render() {
        document.querySelectorAll(this.props.selector).forEach(tag =>
            fetch(tag.src)
                .then(result => result.text())
                .then(svg => {
                    tag.insertAdjacentElement(
                        'afterend',
                        new DOMParser().parseFromString(svg, 'text/xml').children[0]
                    )
                    if (tag.parentElement.querySelector("svg") != null && typeof tag.parentElement.querySelector("svg").classList !== "undefined") {
                        tag.parentElement.querySelector("svg").classList.add(this.props.class)
                        console.log(tag);
                        return tag.parentElement.removeChild(tag)
                    } else {
                        console.error("Error has occured!", tag.parentElement.querySelector("svg"));
                        return false;
                    }
                })
                .catch(error => console.error('Error:', error))
        );
    }
}
