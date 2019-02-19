const imagesContainer = document.getElementById('images')
let timestamp = Date.now()
let errCount = 0

// check the network tab to see fetch requests every 5 seconds
//have 2 different tabs open to local host to see changes

let intervalID = setInterval(
    myCallback, 5000
)

const fetchLatestImages = () => {
    intervalID
}

function myCallback() {
    console.log('A request was made')
    console.log(errCount)
    if (errCount >= 2) {
        clearInterval(intervalID)
        return
    }
    fetch('/latest', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'after': timestamp })
    }).then(res => res.json())
        .then(res => {
            timestamp = res.timestamp
            for (let image of res.images) {
                let curImage = document.createElement('img')
                curImage.src = '/uploads/' + image
                document.body.prepend(curImage)
            }
        })
        .catch(err => {
            console.log('Found Error')
            errCount++
        })
}

fetchLatestImages();
