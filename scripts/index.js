const urlParams = new URLSearchParams(window.location.search)
const query = urlParams.get('q')
let input = document.getElementById('query')
let cursor = document.getElementById('cursor')
let button = document.getElementById('button')
startTyping(query)

async function startTyping(query) {
    if (!query) {
        return
    }

    await sleep(1500)
    for (let i = 0; i < query.length; i++) {
        const letter = query[i]
        await sleep(Math.random() * 100)
        input.value += letter
    }
    await sleep(1000)
    spawnCursor()
    await sleep(1000)

    window.location.href = `https://www.google.com/search?q=${query}`
}

async function sleep(timer) {
    return await new Promise((res, rej) => {
        setTimeout(() => res(1), timer)
    }).then((res) => {
        return res
    })
}

function spawnCursor() {
    // console.log(getOffset(cursor))
    // console.log(getOffset(button))
    cursorOffset = getOffset(cursor)
    buttonOffset = getOffset(button)
    let moveX = buttonOffset.left - cursorOffset.left + 30
    let moveY = buttonOffset.top - cursorOffset.top + 10
    cursor.animate([{
        transform: `translate(${moveX}px, ${moveY}px)`,
    }], {
        duration: 1000,
        fill: "both",
        easing: "ease-out"
    })
}

function getOffset(element) {
    var rect = element.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft
    }
}