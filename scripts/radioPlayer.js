export const radioPlayerInit = () => {

    const radio = document.querySelector('.radio');
    const radioPlayer = document.querySelector('radio-player');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioStop = document.querySelector('.radio-stop');
    const radioVolume = document.querySelector('.radio-volume');
    const radioMute = document.querySelector('.radio-mute');
    const audio = new Audio();

    let prevVolume = 1;

    audio.type = 'audio/aac';
    radioStop.disabled = true;

    const changeIconPlay = () => {
        if(audio.paused){
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-pause');
        }
        else{
            radio.classList.add('play');
            radioStop.classList.add('fa-pause');
            radioStop.classList.remove('fa-play');
        }  
    };

    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'))
        elem.classList.add('select');
    }
    
    radioNavigation.addEventListener('change', event => {
        const target = event.target;
        const parrent = target.closest('.radio-item');
        const title = parrent.querySelector('.radio-name').textContent;
        const urlImg = parrent.querySelector('.radio-img').src;

        radioCoverImg.src = urlImg;
        radioHeaderBig.textContent = title;
        audio.src = target.dataset.radioStantion;
        radioStop.disabled = false;

        selectItem(parrent);
        audio.play();
        changeIconPlay();
    });

    radioStop.addEventListener('click', () => {
        if(audio.paused)
            audio.play();
        else
            audio.pause();

        changeIconPlay();
    });

    radioVolume.addEventListener('input', () => {
       audio.volume = radioVolume.value / 100;
      // prevVolume = audio.volume;
    });

    radioMute.addEventListener('click', () => {
        if(audio.volume){
            prevVolume = audio.volume;
            audio.volume = 0;
        }else
            audio.volume = prevVolume;
    });

    radioPlayerInit.stop = () => {
        audio.pause();
        changeIconPlay();
    }
};
    