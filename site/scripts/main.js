const s = {
    images: [],
    loaded: 0,
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

    s.images.forEach((image) => {
        console.log('asdf')

        const localCanvas = document.createElement('canvas')
        localCanvas.width = 480
        localCanvas.height = 320

        const localContext = localCanvas.getContext('2d')

        localContext.clearRect(0, 0, 480, 320)
        localContext.drawImage(image, 0, 0)
        localContext.font = 'bold 24px Arial'
        localContext.fillStyle = `rgba(200, 200, 200, 0.8)`
        localContext.fillRect(0, 250, 480, 100)
        localContext.fillStyle = 'black'
        localContext.fillText(els['line1'].value, 20, 24)
        localContext.fillText(els['line2'].value, 20, 48)
        localContext.fillText(els['line3'].value, 20, 72)
        localContext.fillText(els['line4'].value, 20, 272)
        localContext.font = 'bold 17px Arial'
        localContext.fillText(els['line5'].value, 20, 302)

        s.gif.addFrame(localCanvas, { delay: 60 })
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
    s.context.clearRect(0, 0, 480, 320)
    s.context.drawImage(s.images[0], 0, 0)
    s.context.font = 'bold 24px Arial'
    s.context.fillStyle = `rgba(200, 200, 200, 0.8)`
    s.context.fillRect(0, 250, 480, 100)
    s.context.fillStyle = 'black'
    s.context.fillText(els['line1'].value, 20, 24)
    s.context.fillText(els['line2'].value, 20, 48)
    s.context.fillText(els['line3'].value, 20, 72)
    s.context.fillText(els['line4'].value, 20, 272)
    s.context.font = 'bold 17px Arial'
    s.context.fillText(els['line5'].value, 20, 302)
}

const init = () => {
    console.log(`Initializing: ${new Date().getTime()}`)

    elNames.forEach((el) => {
        els[el] = document.getElementById(el)
    })

    els['line1'].addEventListener('input', handleInput)
    els['line2'].addEventListener('input', handleInput)
    els['line3'].addEventListener('input', handleInput)
    els['line4'].addEventListener('input', handleInput)
    els['line5'].addEventListener('input', handleInput)
    els['createTrigger'].addEventListener('click', createIt)

    s.context = els['gifCanvas'].getContext('2d')

    for (let i = 0; i < 60; i++) {
        s.images.push(new Image())
        s.images[i].src = `frames/claiton-conto-11489108/${i + 1}.jpg`
        s.images[i].addEventListener('load', checkIt)
    }
}

document.addEventListener('DOMContentLoaded', init)
