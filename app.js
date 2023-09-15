const dayjs = require("dayjs")
const fs = require("fs")

const TOTAL_ITEMS = 500000
const CONTENT_MIN_LENGTH = 12
const CONTENT_MAX_LENGTH = 30

const characters = ' ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

function getRandomText(length) {
    let result = ""
    for(let i = 0; i < length; i++) result += characters.charAt(Math.floor(Math.random() * characters.length))
    return result
}

function newItem() {
    const length = Math.floor(Math.random() * (CONTENT_MAX_LENGTH - CONTENT_MIN_LENGTH)) + CONTENT_MIN_LENGTH
    const now = dayjs().startOf('day')
    const randNum = Math.floor(Math.random() * 4)
    
    const item = {
        id: crypto.randomUUID(),
        content: getRandomText(length),
        priority: Math.floor(Math.random() * 3),
        done: (Math.floor(Math.random() * 2) === 0)
    }
    
    if(randNum > 0) item.due_date = now.add(randNum * 4, 'day').format("YYYY-MM-DD")

    return item
}

items = []

for(let i = 0; i < TOTAL_ITEMS; i++) {
    const item = newItem()
    items.push(item)
}

fs.writeFileSync("todo.json", JSON.stringify(items))
