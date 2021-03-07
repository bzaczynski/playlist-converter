function readText(file, encoding) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsText(file, encoding)
        reader.onloadend = function() {
            resolve(reader.result)
        }
    })
}

function writeText(filename, text) {
    const uri = encodeURIComponent(text)
    const anchor = document.createElement("a")
    anchor.setAttribute("href", `data:text/plain;charset=utf-8,${uri}`)
    anchor.setAttribute("download", filename)
    anchor.style.display = "none"
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
}

function convert(text, newline) {
    const mapping = {
        "\\r\\n": "\r\n",
        "\\r": "\r",
        "\\n": "\n"
    }
    return text.split(/\r\n|\r|\n/g).map(parse).join(mapping[newline])
}

function parse(line) {
    const matched = line.match(/(File\d+=)(.*)/i)
    if (matched) {
        const [_, prefix, path] = matched
        return prefix + path.split(/\\|\//).pop()
    } else {
        return line
    }
}
