const s = {
    images: [],
    loaded: 0,
}

const runIt = () => {
    console.log('runit')
    s.images.forEach((image) => {
        s.gif.addFrame(image, { delay: 60 })
    })

    s.gif.on('finished', function (blob) {
        window.open(URL.createObjectURL(blob))
    })

    s.gif.render()
}

const checkIt = () => {
    s.loaded++
    if (s.loaded === s.images.length) {
        runIt()
    }
}

const init = () => {
    console.log('Initializing')

    for (let i = 0; i < 60; i++) {
        s.images.push(new Image())
        s.images[i].src = `frames/claiton-conto-11489108/${i + 1}.jpg`
        s.images[i].addEventListener('load', checkIt)
    }

    s.gif = new GIF({
        workers: 2,
        quality: 10,
    })
}

document.addEventListener('DOMContentLoaded', init)
