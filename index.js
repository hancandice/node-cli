#!/usr/bin/env node
const readline = require("readline")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const answerCallback = (answer) => {
    const response = answer.toLocaleLowerCase()
    if (response === "y") {
        console.log("Thank you!")
        rl.close()
    } else if (response === "n") {
        console.log("Sorry.")
        rl.close()
    } else {
        console.clear()
        console.log("Type only 'y' or 'n'")
        rl.question("Do you think it is fun? (y/n) ", answerCallback)
    }
}
console.clear()
rl.question("Do you think it is fun? (y/n) ", answerCallback)