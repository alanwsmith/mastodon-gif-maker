/*
 * Hi! this code is a mess. The point was to get it out
 * fast. Refactoring hasn't happend yet
 */

const s = {
    images: [],
    loaded: 0,
    image: 'claiton-conto-11489108',
}

const els = {}
const elNames = [
    'createTrigger',
    'gifCanvas',
    'line1',
    'line2',
    'line3',
    'line4',
    'line5',

    // 'an-african-elephant-covered-in-mud-11760745',
    // 'claiton-conto-11489108',
    // 'river-elephant-elephant-bathing-elephant-in-river-3958529',
    // 'roman-odintsov-11760754',
    // 'roman-odintsov-11760788',
]

const imgNames = [
    'a-n-astronaut-taking-off-his-helmet-8474624',
    'an-astronaut-sitting-and-looking-around-in-a-desert-8474595',
    'astronauts-looking-around-in-a-desolate-area-8474604',
]

const createIt = () => {
    console.log('Creating GIF')

    s.gif = new GIF({
        workers: 2,
        quality: 10,
        workerScript: 'scripts/gif.worker.js',
        width: 480,
        height: 320,
    })

    // Set the texture pattern once

    // // Texture // Skipping because I don't like the way this version looks
    // const texture = []
    // for (let nx = 0; nx < 480; nx += 3) {
    //     const row = []
    //     for (let ny = 0; ny < 320; ny += 3) {
    //         const theCheck = Math.random()
    //         if (theCheck > 0.4) {
    //             row.push(true)
    //         } else {
    //             row.push(false)
    //         }
    //     }
    //     texture.push(row)
    // }

    s.images.forEach((image) => {
        const localCanvas = document.createElement('canvas')
        localCanvas.width = 480
        localCanvas.height = 320

        // Perp
        const localContext = localCanvas.getContext('2d')
        localContext.clearRect(0, 0, 480, 320)
        localContext.drawImage(image, 0, 0)

        // Highlights
        localContext.fillStyle = `rgba(200, 200, 200, 0.6)`
        localContext.fillRect(0, 0, 480, 80)
        localContext.fillStyle = `rgba(200, 200, 200, 0.8)`
        localContext.fillRect(0, 250, 480, 100)

        // Text
        localContext.font = 'bold 24px Arial'
        localContext.fillStyle = 'black'
        localContext.fillText(els['line1'].value, 20, 24)
        localContext.fillText(els['line2'].value, 20, 48)
        localContext.fillText(els['line3'].value, 20, 72)
        localContext.fillText(els['line4'].value, 20, 272)
        localContext.font = 'bold 17px Arial'
        localContext.fillText(els['line5'].value, 80, 302)

        // // Texture // Skipping because I'm not happy with how this version looks
        // localContext.fillStyle = `rgba(255,255, 255, 0.010)`
        // for (let nx = 0; nx < texture.length; nx++) {
        //     for (let ny = 0; ny < texture[nx].length; ny++) {
        //         if (texture[nx][ny] === true) {
        //             localContext.fillRect(nx * 3, ny * 3, 5, 5)
        //         }
        //     }
        // }

        s.gif.addFrame(localCanvas, { delay: 28 })
    })

    s.gif.on('finished', function (blob) {
        window.open(URL.createObjectURL(blob))
    })

    s.gif.render()
}

const checkIt = () => {
    s.loaded++
    if (s.loaded === s.images.length) {
        handleInput()
    }
}

const handleInput = () => {
    // Clear Prep
    s.context.clearRect(0, 0, 480, 320)
    // Background
    s.context.drawImage(s.images[0], 0, 0)

    // Highlights
    s.context.fillStyle = `rgba(200, 200, 200, 0.6)`
    s.context.fillRect(0, 0, 480, 80)
    s.context.fillStyle = `rgba(200, 200, 200, 0.8)`
    s.context.fillRect(0, 250, 480, 100)

    // Text
    s.context.font = 'bold 24px Arial'
    s.context.fillStyle = 'black'
    s.context.fillText(els['line1'].value, 20, 24)
    s.context.fillText(els['line2'].value, 20, 48)
    s.context.fillText(els['line3'].value, 20, 72)
    s.context.fillText(els['line4'].value, 20, 272)
    s.context.font = 'bold 17px Arial'
    s.context.fillText(els['line5'].value, 80, 302)

    // // Texture // Skipping for preview
    // s.context.fillStyle = `rgba(255,255, 255, 0.02)`
    // for (let nx = 0; nx < 480; nx += 3) {
    //     for (let ny = 0; ny < 320; ny += 3) {
    //         const theCheck = Math.random()
    //         if (theCheck > 0.4) {
    //             s.context.fillRect(nx, ny, 6, 6)
    //         }
    //     }
    // }

    //
}

const handleImageClick = (event) => {
    console.log(event.target.id)
    s.image = event.target.id
    s.images = []
    s.loaded = 0
    for (let i = 0; i < 120; i++) {
        s.images.push(new Image())
        s.images[i].src = `frames/${s.image}/${i + 1}.jpg`
        s.images[i].addEventListener('load', checkIt)
    }
}

const init = () => {
    console.log(`Initializing: ${new Date().getTime()}`)

    elNames.forEach((el) => {
        els[el] = document.getElementById(el)
    })

    for (let file in data.files) {
        els[file] = document.getElementById(file)
        // console.log(file)
    }

    els['line1'].addEventListener('input', handleInput)
    els['line2'].addEventListener('input', handleInput)
    els['line3'].addEventListener('input', handleInput)
    els['line4'].addEventListener('input', handleInput)
    els['line5'].addEventListener('input', handleInput)
    els['createTrigger'].addEventListener('click', createIt)
    els['claiton-conto-11489108'].addEventListener('click', handleImageClick)
    els[
        'river-elephant-elephant-bathing-elephant-in-river-3958529'
    ].addEventListener('click', handleImageClick)
    els['roman-odintsov-11760754'].addEventListener('click', handleImageClick)
    els['roman-odintsov-11760788'].addEventListener('click', handleImageClick)
    els['an-african-elephant-covered-in-mud-11760745'].addEventListener(
        'click',
        handleImageClick
    )

    imgNames.forEach((imgName) => {
        console.log(imgName)
        els[imgName] = document.getElementById(imgName)
        els[imgName].addEventListener('click', handleImageClick)
    })

    s.context = els['gifCanvas'].getContext('2d')

    for (let i = 0; i < 120; i++) {
        s.images.push(new Image())
        s.images[i].src = `frames/${s.image}/${i + 1}.jpg`
        s.images[i].addEventListener('load', checkIt)
    }
}

document.addEventListener('DOMContentLoaded', init)
