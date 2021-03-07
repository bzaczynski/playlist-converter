document.addEventListener("DOMContentLoaded", event => {

    const form = document.querySelector("form")
    const fileElement = document.querySelector("#file-element")
    const inputEncodingElement = document.querySelector("#input-encoding")
    const outputNewlineElement = document.querySelector("#output-newline")

    window.addEventListener("drop", event => event.preventDefault())
    window.addEventListener("dragover", event => event.preventDefault())
    window.addEventListener("dragenter", event => event.preventDefault())
    window.addEventListener("dragleave", event => event.preventDefault())

    form.addEventListener("dragenter", event => {
        form.classList.add("highlight")
    })

    form.addEventListener("dragover", event => {
        form.classList.add("highlight")
    })

    form.addEventListener("dragleave", event => {
        form.classList.remove("highlight")
    })

    form.addEventListener("drop", event => {
        form.classList.remove("highlight")
        fileElement.files = event.dataTransfer.files
        fileElement.dispatchEvent(new Event("change"))
    })

    fileElement.addEventListener("change", update)
    inputEncodingElement.addEventListener("change", update)
    outputNewlineElement.addEventListener("change", update)

    async function update() {
        if (fileElement.files.length > 0) {
            const file = fileElement.files[0]
            const inputEncoding = inputEncodingElement.value
            const outputNewline = outputNewlineElement.value
            const text = await readText(file, inputEncoding)
            const filename = `${file.name}-converted.pls`
            writeText(filename, convert(text, outputNewline))
        }
    }
})
