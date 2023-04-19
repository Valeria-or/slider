const slides = [
    {
        img: 'https://www.w3schools.com/howto/img_nature_wide.jpg',
        text: 'Caption Text 1'
    },
    {
        img: 'https://www.w3schools.com/howto/img_snow_wide.jpg',
        text: 'Caption Text 2'
    },
    {
        img: 'https://www.w3schools.com/howto/img_mountains_wide.jpg',
        text: 'Caption Text 3'
    },
];


class Slider {
    constructor(slider , id, object) {
        this.slider = slider
        this.id = id
        this.object = object
    }
    addSlider(){
        let slideIndex = 0
        let picture = document.createElement('img')
        picture.src = this.slider[slideIndex].img
        picture.className = 'slider'
        document.getElementById(this.id).append(picture)
        let numberSlide = document.getElementById('numberSlide')
        numberSlide.textContent = `${slideIndex + 1}/3`
        let text = document.getElementById('text')
        text.textContent = this.slider[slideIndex].text
        let buttonNext = document.getElementById('next')

        if (this.object.auto === true){
            if( this.object.delay !== undefined){
                makeTimer(slideIndex, this.object.delay, this.object.loop)
            } else {
                makeTimer(slideIndex,5000, this.object.loop)
            }
        }

        buttonNext.addEventListener('click', ()=>{
            if (slideIndex < 2){
                slideIndex++
                addSlider(slideIndex)
            } else {
                if (this.object.loop === true){
                    slideIndex = 0
                    addSlider(slideIndex)
                }
            }
        })
        let buttonPrevious = document.getElementById('previous')
        buttonPrevious.addEventListener('click', () => {
            if (slideIndex === 0){
                if (this.object.loop === true){
                    slideIndex = 2
                    addSlider(slideIndex)
                }
            } else {
                slideIndex = slideIndex - 1
                addSlider(slideIndex)
            }
        })
        let points = document.getElementsByClassName('dot')
        if (this.object.pags === true){

            for (let i = 0; i < points.length; i++){
                points[i].addEventListener('click', (e)=>{
                    let slide = Number(e.currentTarget.getAttribute('dot'))
                    slideIndex = slide
                    addSlider(slideIndex)

                })
            }
        } else {
            let pags = document.getElementById('points')
            pags.remove()
        }

        if (this.object.navs === false){
            buttonPrevious.remove()
            buttonNext.remove()
            let navsImg = document.getElementById('slider')
            navsImg.addEventListener('click', ()=>{
                if (slideIndex < 2){
                    slideIndex++
                    addSlider(slideIndex)
                } else {
                    if (this.object.loop === true){
                        slideIndex = 0
                        addSlider(slideIndex)
                    }
                }
            })
        }
    }
}

const slider = new Slider(
    slides, // слайды
    'slider', // id для вставки в html
    {
        loop: true,
        navs: true,
        pags: true,
        auto: true,
        // delay: 1000,
    }
)



let timer = 0;
function makeTimer(slideNumber, second, loop){
    clearInterval(timer)

    timer = setInterval(function(){
        if(slideNumber < 2){
            slideNumber++;
        } else {
            if (loop === true){
                slideNumber = 0
            }
        }

        addSlider(slideNumber);
    },second);
}


function addSlider (slideNumber){
    let picture = document.querySelector('.slider')
    let numberSlide = document.getElementById('numberSlide')
    let text = document.getElementById('text')
    picture.src = slides[slideNumber].img
    numberSlide.textContent = `${slideNumber + 1}/3`
    text.textContent = slides[slideNumber].text
}

slider.addSlider()