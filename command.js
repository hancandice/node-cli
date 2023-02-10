#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path")



const htmlTemplate = `
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <title>Template</title>
</head>

<body>
    <h1>Hello</h1>
    <p>CLI</p>
</body>

</html>
`

const routerTemplate = `
const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    try {
        res.send("OK");
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
`

const exist = (dir) => {
    try {
        fs.accessSync(dir, fs.constants.F_OK, fs.constants.R_OK, fs.constants.W_OK);
        return true
    } catch (err) {
        if (err.code === 'ENOENT') {
            return false
        } else {
            throw err;
        }
    }
}

const mkdirp = (filePath) => {
    const dirname = path
        .relative(".", path.normalize(filePath))
        .split(path.sep)
        .filter(p => !!p)

    dirname.forEach((d, idx) => {
        const pathBuilder = dirname.slice(0, idx + 1).join(path.sep)
        if (!exist(pathBuilder)) {
            fs.mkdirSync(pathBuilder)
            console.log(`Made directory for ${pathBuilder}`)
        }
    })
}

const mkfile = (filePath, fileName, fileExtension) => {
    if (fileExtension === "html") {
        const extToFile = path.join(filePath, `${fileName}.html`)
        if (exist(extToFile)) {
            console.error(`❌ ${extToFile} already exists.`)
        } else {
            fs.writeFileSync(extToFile, htmlTemplate)
            console.log(`Successfully created ${extToFile} 😃`)
        }
    } else {
        const extToFile = path.join(filePath, `${fileName}.js`)
        if (exist(extToFile)) {
            console.error(`❌ ${extToFile} already exists.`)
        } else {
            fs.writeFileSync(extToFile, routerTemplate)
            console.log(`Successfully created ${extToFile} 😃`)
        }
    }
}


const makeTemplate = (type, fileName, filePath) => {
    if (type !== "html" && type !== "express-router") {
        console.error("We only support 'html' or 'express-router'.")
    } else {
        mkdirp(filePath)
        mkfile(filePath, fileName, type)
    }
}

program
    .version("0.0.1", "-v, --version")
    .name("cli")

program
    .command("template <type>")
    .usage('<type> --filename [filename] --path [path]')
    .description("it creates template.")
    .alias("tmpl")
    .option('-f, --filename [filename]', 'type filename.', 'index')
    .option('-p, --path [path]', 'type path.', '.')
    .action((type, options) => {
        console.log(type, options.filename, options.path)
        makeTemplate(type, options.filename, options.path)
    })

program
    .action((cmd, argv) => {
        if (argv) {
            console.log("cannot find this command line.")
            program.help()
        } else {
            inquirer.prompt([{
                type: "list",
                name: "type",
                message: "Choose template type.",
                choices: ["html", "express-router"]
            }, {
                type: "input",
                name: "name",
                message: "Type file name.",
                default: "index"
            }, {
                type: "input",
                name: "path",
                message: "Type file path.",
                default: "."
            }, {
                type: "confirm",
                name: "confirm",
                message: "You wanna create the file?"
            }])
                .then((answers) => {
                    if (answers.confirm) {
                        makeTemplate(answers.type, answers.name, answers.path)
                        console.log("Finishing the terminal...")
                    }
                })
        }
    })



program
    .parse(process.argv)