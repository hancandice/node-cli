#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

const fileExtension = process.argv[2]
const fileName = process.argv[3]
const filePath = process.argv[4] || "."


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

// 템플릿 생성 함수
const makeTemplate = () => {
    // 1. 경로 생성
    mkdirp(filePath)

    // 2. 파일 확장자 생성

}




const program = () => {
    if (!fileExtension || !fileName) {
        console.error("How to use 💡: template html|express-router [fileName] [filePath]")
    } else {
        makeTemplate()
    }
}

program()
