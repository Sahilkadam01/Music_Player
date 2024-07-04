let pop_left = document.getElementById("pop_left");
let pop_right = document.getElementById('pop_right');
let pop_song = document.getElementsByClassName('pop_songs')[0];

pop_right.addEventListener('click', ()=>{
    pop_song.scrollLeft +=330;    
})

pop_left.addEventListener('click', ()=>{
   pop_song.scrollLeft -=330;    
})

let artist_left = document.getElementById("artist_left");
let artist_right = document.getElementById('artist_right');
let items = document.getElementsByClassName('items')[0];

artist_right.addEventListener('click', ()=>{
    items.scrollLeft +=330;    
})

artist_left.addEventListener('click', ()=>{
   items.scrollLeft -=330;    
})





const music = new Audio('audio/01.mp3');
//  music.play();


let playss = document.getElementById("playss");
let wave = document.getElementById('wave');

playss.addEventListener('click' , ()=>
{
    if(music.paused || music.currentTime <=0)
    {
        music.play();
        // alert("play");
        wave.classList.add('active1');
        playss.classList.remove('bi-play-fill');
        playss.classList.add('bi-pause-fill');
    }
    else
    {
       music.pause();
    //    alert("pause");
       wave.classList.remove('active1');
       playss.classList.remove('bi-pause-fill');
       playss.classList.add('bi-play-fill');
    }
});




let index = 0;
let playposter = document.getElementById('playposter');
let download = document.getElementById("download");
let title = document.getElementById('title');

// const makeAllBackground=() =>
// {
//    Array.from(document.getElementsByClassName('songItem')).forEach((e)=>
//    {
//      e.Style.background='rgb(105, 105, 105, .0)';
//    })
// };

Array.from(document.getElementsByClassName('playlistss')).forEach((e)=>
{
  e.addEventListener('click', (el)=>
  {
    index =el.target.id;
    music.src= `audio/${index}.mp3`;
    playposter.src = `images/${index}.jpg`;
    music.play();
    playss.classList.remove('bi-play-fill');
    playss.classList.add('bi-pause-fill');
    download.href= `audio/${index}.mp3`;

    let songTitles = songs.filter((els) =>{
         return els.id == index;
    });

    songTitles.forEach((elss) =>
    {
      let {songName}=elss;
      title.innerHTML = songName;
      download.setAttribute('download', songName);

    });

    // makeAllBackground();
    // Array.from(document.getElementsByClassName('songItem')).style.background= "rgb(105, 105, 105 .2)";
  });
})




let start = document.getElementById('start');
let end = document.getElementById('end');
let range_bar = document.getElementById('range_bar');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot');

music.addEventListener('timeupdate', ()=>
{
  let music_start = music.currentTime;
  let music_duration = music.duration;
  // console.log(music_duration);
  //  console.log(music_start);

  let min1 = Math.floor(music_duration / 60);
  let sec1 = Math.floor(music_duration % 60);
   
  if(sec1 < 10)
  {
    sec1 = `0${sec1}`;
  }
  end.innerText = `${min1}:${sec1}`;

  let min2 = Math.floor(music_start / 60);
  let sec2 = Math.floor(music_start % 60);
  
  if(sec2 < 10)
  {
    sec2 = `0${sec2}`;
  }
  start.innerText = `${min2}:${sec2}`;

  let progress_bar = parseInt((music_start / music_duration) * 100);
  range_bar.value = progress_bar;
  let rangebar = range_bar.value;
  bar2.style.width = `${rangebar}%`;
  dot.style.left = `${rangebar}%`;
});

range_bar.addEventListener('change' , ()=>
{
  music.currentTime = range_bar.value * music.duration / 100;
}) ;

let volu_icon = document.getElementById('volu_icon');
let vol = document.getElementById('vol');
let vol_bar = document.getElementsByClassName('vol_bar')[0];
let vol_dot = document.getElementById('vol_dot');

vol.addEventListener('change', ()=>
{
  if(vol.value==0)
  {
    volu_icon.classList.remove(' bi-volume-up-fill');
    volu_icon.classList.remove('bi-volume-down-fill');
    volu_icon.classList.add('bi-volume-off-fill');  
  }
  if(vol.value > 0)
  {
    volu_icon.classList.remove(' bi-volume-up-fill');
    volu_icon.classList.add('bi-volume-down-fill');
    volu_icon.classList.remove(' bi-volume-off-fill');  
  }
  if(vol.value > 50)
  {
    volu_icon.classList.add(' bi-volume-up-fill');
    volu_icon.classList.remove('bi-volume-down-fill');
    volu_icon.classList.remove(' bi-volume-off-fill');  
  }

  let vol_1 =vol.value;
  vol_bar.style.width =`${vol_1}%`;
  vol_dot.style.left =`${vol_1}%`;
  music.volume = vol_1 / 100;
});

let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener("click" , ()=>
{
  index -= 1;
  if (index < 1 )
  {
    index =Array.from(document.getElementsByClassName('songItem'));
  }

  music.src= `audio/${index}.mp3`;
    playposter.src = `images/${index}.jpg`;
    music.play();
    playss.classList.remove('bi-play-fill');
    playss.classList.add('bi-pause-fill');

    let songTitles = songs.filter((els) =>{
         return els.id == index;
    });

    songTitles.forEach((elss) =>
    {
      let {songName}=elss;
      title.innerHTML = songName;

    });  
})

next.addEventListener("click" , ()=>
{
  index ++;
  if (index > Array.from(document.getElementsByClassName('songItem')))
  {
    index = 1;
  }

  music.src= `audio/${index}.mp3`;
    playposter.src = `images/${index}.jpg`;
    music.play();
    playss.classList.remove('bi-play-fill');
    playss.classList.add('bi-pause-fill');

    let songTitles = songs.filter((els) =>{
         return els.id == index;
    });

    songTitles.forEach((elss) =>
    {
      let {songName}=elss;
      title.innerHTML = songName;

    });  
});

let shuffle = document.getElementsByClassName("shuffle")[0];
shuffle.addEventListener("click", ()=>{
  let a = shuffle.innerHTML;

  switch(a)
  {
    case "next":
      shuffle.classList.add('bi-repeat');
      shuffle.classList.add('bi-music-note-beamed');
      shuffle.classList.add('bi-shuffle');
      shuffle.innerHTML= "repeat";
      break;

    case "repeat":
      shuffle.classList.remove('bi-repeat');
      shuffle.classList.remove('bi-music-note-beamed');
      shuffle.classList.add('bi-shuffle');
      shuffle.innerHTML= "random";
      break;

    case "random":
        shuffle.classList.remove('bi-repeat');
        shuffle.classList.add('bi-music-note-beamed');
        shuffle.classList.remove('bi-shuffle');
        shuffle.innerHTML= "next";
        break;  
  }
});



const next_music = ()=>
{
  if(index==songs.length)
  {
    index=1;
  }
  else
  {
    index++;
  }
  music.src= `audio/${index}.mp3`;
  playposter.src = `images/${index}.jpg`;
  music.play();
  playss.classList.remove('bi-play-fill');
  playss.classList.add('bi-pause-fill');
  download.href= `audio/${index}.mp3`;

  let songTitles = songs.filter((els) =>{
       return els.id == index;
  });

  songTitles.forEach((elss) =>
  {
    let {songName}=elss;
    title.innerHTML = songName;
    download.setAttribute('download', songName);

  });
}

const repeat_music= ()=>
{
  index;
  music.src= `audio/${index}.mp3`;
  playposter.src = `images/${index}.jpg`;
  music.play();
  playss.classList.remove('bi-play-fill');
  playss.classList.add('bi-pause-fill');
  download.href= `audio/${index}.mp3`;

  let songTitles = songs.filter((els) =>{
       return els.id == index;
  });

  songTitles.forEach((elss) =>
  {
    let {songName}=elss;
    title.innerHTML = songName;
    download.setAttribute('download', songName);

  });
}

const random_music= ()=>
{
  if(index==songs.length)
  {
    index=1;
  }
  else
  {
     index =Math.floor((Math.random()* songs.length) + 1);
  }

  music.src= `audio/${index}.mp3`;
  playposter.src = `images/${index}.jpg`;
  music.play();
  playss.classList.remove('bi-play-fill');
  playss.classList.add('bi-pause-fill');
  download.href= `audio/${index}.mp3`;

  let songTitles = songs.filter((els) =>{
       return els.id == index;
  });

  songTitles.forEach((elss) =>
  {
    let {songName}=elss;
    title.innerHTML = songName;
    download.setAttribute('download', songName);

  });
}

music.addEventListener("ended", ()=>
{
  let b= shuffle.innerHTML;
  switch (b) {
    case 'repeat':
       repeat_music();
      break;
    case 'next':
        next_music();
       break;
    case 'random':
       random_music();
      break;  
  }
});


const songs =
[
  {
    id: '1',
    songName:`Bhasm <br>
    <div class="subtitle">Dada sadhu</div>`,
    poster: 'images/1.jpg',
  },

  {
    id: '2',
    songName:`California Love <br>
    <div class="subtitle">Cheema </div>`,
    poster: 'images/2.jpg',
  },

  {
    id: '3',
    songName:`Deatil <br>
    <div class="subtitle">Deep Chambal</div>`,
    poster: 'images/3.jpg',
  },

  {
    id: '4',
    songName:`Elevated <br>
    <div class="subtitle">Shubh </div>`,
    poster: 'images/4.jpg',
  },

  {
    id: '5',
    songName:`Feelinga <br>
    <div class="subtitle">Akaal </div>`,
    poster: 'images/5.jpg',
  },

  {
    id: '6',
    songName:`Gunda Damad <br>
    <div class="subtitle">Raj Mawer</div>`,
    poster: 'images/6.jpg',
  },

  {
    id: '7',
    songName:`Her <br>
    <div class="subtitle">Shubh</div>`,
    poster: 'images/7.jpg',
  },

  {
    id: '8',
    songName:`ishqan De Rog  <br>
    <div class="subtitle">Deep Chambal</div>`,
    poster: 'images/8.jpg',
  },

  {
    id: '9',
    songName:`Janab Ji <br>
    <div class="subtitle">Sucha Yaar</div>`,
    poster: 'images/9.jpg',
  },

  {
    id: '10',
    songName:`Kahani Suno 2.O <br>
    <div class="subtitle">Kaifi Khalil</div>`,
    poster: 'images/10.jpg',
  },

  {
    id: '11',
    songName:`Lala Ji Ki Chori <br>
    <div class="subtitle">Masoom Sharma </div>`,
    poster: 'images/11.jpg',
  },

  {
    id: '12',
    songName:`Mainu Ishq Ho... <br>
    <div class="subtitle">Ammy Wirk</div>`,
    poster: 'images/12.jpg',
  },

  {
    id: '13',
    songName:`Offshore <br>
    <div class="subtitle">Shubh </div>`,
    poster: 'images/13.jpg',
  },

  {
    id: '14',
    songName:`Precious <br>
    <div class="subtitle">Nagii ft</div>`,
    poster: 'images/14.jpg',
  },

  {
    id: '15',
    songName:`Raja Rani <br>
    <div class="subtitle">Jatinder Brar </div>`,
    poster: 'images/15.jpg',
  },

  {
    id: '16',
    songName:`No Love <br>
    <div class="subtitle">Shubh </div>`,
    poster: 'images/16.jpg',
  },

  {
    id: '17',
    songName:`Sochi Betha Aa <br>
    <div class="subtitle">Sabba </div>`,
    poster: 'images/17.jpg',
  },

  {
    id: '18',
    songName:`Tareefan <br>
    <div class="subtitle">Jordan Sandhu</div>`,
    poster: 'images/18.jpg',
  },

  {
    id: '19',
    songName:`Untouchable  <br>
    <div class="subtitle"> Tegi Pannu</div>`,
    poster: 'images/19.jpg',
  },

  {
    id: '20',
    songName:`Vichola <br>
    <div class="subtitle">Kamal Khaiar </div>`,
    poster: 'images/20.jpg',
  },

  {
    id: '21',
    songName:`Weapon <br>
    <div class="subtitle">Romey Maan</div>`,
    poster: 'images/21.jpg',
  },

  {
    id: '22',
    songName:`Yaariyan <br>
    <div class="subtitle">Gurpreet Hehar</div>`,
    poster: 'images/22.jpg',
  },
]

  Array.from(document.getElementsByClassName("songItem")).forEach((e,i) =>
{
   e.getElementsByTagName("img")[0].src =songs[i].poster;
   e.getElementsByTagName("h5")[0].innerHTML =songs[i].songName;
});


let searchss = document.getElementsByClassName('searchss')[0];
songs.forEach(element =>{
  const {id, songName, poster} = element;
  // console.log(id);
    let themes=  document.createElement("a");
    themes.classList.add('themes');
    themes.innerHTML= `<img src="${poster}" >
    <div class="infom">
       ${songName}
    </div>`;
    searchss.appendChild(themes);
});










