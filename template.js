#!/usr/bin/env node
console.log(process.argv)

const fileExtension = process.argv[2]
const fileName = process.argv[3]
const directory = process.argv[4] || "."

const makeTemplate = () => {

}


const program = () => {
    if (!fileExtension || !fileName) {
        console.error("How to use 💡: template html|express-router [fileName] [filePath]")
    } else {
        makeTemplate()
    }
}

program()
