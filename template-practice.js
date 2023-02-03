#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

const fileExtension = process.argv[2]
const fileName = process.argv[3]
const filePath = process.argv[4] || "."

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

// 폴더 존재 여부 확인 함수
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

// 경로 생성 함수 
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

// 파일 확장자 생성 함수
const mkfext = (fileExtension) => {
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

// 템플릿 생성 함수
const makeTemplate = () => {
    // 1. 경로 생성
    mkdirp(filePath)

    // 2. 파일 확장자 생성
    mkfext(fileExtension)
}




const program = () => {
    if (!fileExtension || !fileName) {
        console.error("How to use 💡: template html|express-router [fileName] [filePath]")
    } else if (fileExtension === "html" || fileExtension === "express-router") {
        makeTemplate()
    } else {
        console.error("❌ Type only 'html' or 'express-router'")
    }
}

program()
