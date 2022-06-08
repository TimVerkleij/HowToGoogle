const urlParams = new URLSearchParams(window.location.search)
const query = urlParams.get('q')
let input = document.getElementById('query')
let generatedLink = document.getElementById('generatedLink')
let generatedLinkDiv = document.getElementById('generatedLinkDiv')
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

function generate() {
    const link = `http://blastbucket.nl/?q=${input.value}`
    generatedLink.value = link
    generatedLinkDiv.style.display = "block"
}

function copy() {
    generatedLink.select()
    generatedLink.setSelectionRange(0, 99999)
    document.execCommand("copy")
    showNotification('Link Copied')
}

async function showNotification(message) {
    const notification = document.getElementById('notification')
    const notificationText = document.getElementById('notificationText')
    notificationText.innerHTML = message
    notification.style.opacity = "100%"
    notification.style.transform = "translate(-50%, 20px)"
    await sleep(2000)
    notification.style.opacity = "0%"
    notification.style.transform = "translate(-50%, -20px)"
}
