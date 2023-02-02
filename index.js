#!/usr/bin/env node
console.log("You are my sunshine", process.argv)

const readline = require("readline")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question("Do you think it is fun? (y/n) ", (answer) => {
    const response = answer.toLocaleLowerCase()
    if (response === "y") {
        console.log("Thank you!")
    } else if (response === "n") {
        console.log("Sorry.")
    } else {
        console.log("Type only 'y' or 'n'")
    }
    rl.close()
})