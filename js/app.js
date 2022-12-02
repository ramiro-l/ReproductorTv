import { init } from "./Player.js";
import { V, on, useLS } from "./helpers.js";
const main = V('#app');
const btnNext = V('#next-channel');
const btnPrev = V('#prev-channel');
const btntvpulica = V('#tvPublica');
const btnAzteca7 = V('#azteca7');
const btnDSport = V('#dSports');
const btnTycSport = V('#tycSports');
const btntvpulica0 = V('#tvPublica0');
const btnAzteca70 = V('#azteca70');
const btnDSport0 = V('#dSports0');
const btnTycSport0 = V('#tycSports0');
const btnDarkMode = V('#darkmode');
const channelName = V('#channel');
const messageContainer = V('#message-channel');
const light_mode = "light_mode",
      dark_mode = "dark_mode";
const channels = [
    {
        name: 'dSports',
        url: 'https://dtvott-abc.akamaized.net/dash_live_1061/manifest.mpd?&ck=eyI3MTE5MDY5Yjk5MDE1YjRlYjllZTQzMDA1NzczOTllMiI6ImI4OTgyN2NjOTcwY2Q3OGRhODgyZmZjYTM1MDRjNzc0In0='
    },
    {
        name: 'tycSports',
        url: 'https://1240-vos.dtvott.com/DASH/manifest.mpd?&ck=eyI0ZDQ1Yjc5ZDQ0ODczNDM1ODkwNThhYjQ5ZGRmOGNmMCI6ImFhN2Y5NWY3MWEzY2ZlNDBhYTU5OTA0ZjkyODVhZjcyIn0='
    },
    {
        name: 'tvPublica',
        url: 'https://edge-live17-sl.cvattv.com.ar/live/c6eds/Canal7/SA_Live_dash_enc_2A/Canal7.mpd?&ck=eyJjYzhjODJhYzJlYzdlOTc5OTUyN2MyOWRiNzM1NGU4MSIgOiAiY2M0YWFlMTczZGQyZWYxN2FlMjZiZTNmN2FlODc2NjIifQ=='
    },
    {
        name: 'azteca7',
        url: 'https://live4-ott.izzigo.tv/out/u/dash/AZTECA-7-HD/default.mpd?&ck=eyJjZThmODZkMmYwZDE2Mzg1NzQyMzdhZGE4YWMyZTgyYSIgOiAiNjQyNzcyZWJmMTgzMmYxZjJmYTU4Y2I3ZThmY2ZkMDUifQ=='
    },
]
let count = 0;

// functions =============================================
const detectIndex = (hash) => {
    let nameChannel = hash.slice(1);
    return channels.findIndex(el => el.name === nameChannel);
}

const setLoading = () => {
    messageContainer.innerHTML = 'Cargando...';
    messageContainer.style.display = 'block';
    messageContainer.style.color = '#ffffff';
    messageContainer.style.backgroundColor = 'rgba(171, 219, 147)';
}

const addName = (name) => channelName.innerHTML = `${name}`;

const changeChannel = (arr, i = 0) => {
    const channel = arr[i].name;
    location.hash = channel;
    addName(channel.toUpperCase());
    setLoading();
}

const validHash = (hash) => {
    // Se valida el hash directamente con la lista de canales
    const isValidHash = ({name}) => `#${name}` === hash;
    const ifValidHash = channels.some(isValidHash);
    if (ifValidHash){
        count = detectIndex(hash);
        let {url} = channels[count];
        return url;
    }
    if(hash === '') return {error: 'No pasaste ningun hash'}
    return {error: 'error esté hash NO ES VALIDO'}
}

// add shaka-player ===========================================
on(document,'shaka-ui-loaded', async e => {
    const channel = channels[count].name
    location.hash = channel
    addName(channel.toUpperCase())
    setLoading();
    let {hash} = location;

    let val = validHash(hash);
    typeof val === 'string'
        ?  init(val)
        : main.insertAdjacentHTML('afterbegin', `<h1>${val.error}</h1>`);
});

// detect hash in load DOM =========================================
on(document,'DOMContentLoaded', () => {
    let {hash} = location;

    let val = validHash(hash);
    typeof val === 'string'
        ? init(val)
        : console.error(val.error);
    const appConfig = useLS.get('app:config');
    typeof appConfig != 'undefined' && appConfig.theme == dark_mode && darkMode(); 
    
});

// detect change hash ===============================================
on(window,'hashchange', () => {
    let {hash} = location;
    let index = detectIndex(hash);
    let {url} = channels[index];
    init(url)
});

const nextChannel = () => {
    count++;
    if(count >= channels.length) count = 0;
    changeChannel(channels, count);
}

const prevChannel = () => {
    count--;
    if(count < 0) count = channels.length - 1;
    changeChannel(channels, count);
}

const darkMode = () => {
	const span = btnDarkMode.getElementsByTagName('span')[0];
	document.body.classList.toggle('dark');
	btnDarkMode.classList.toggle('on');

	if (document.body.classList.contains("dark")) {
    useLS.set("app:config", { theme: dark_mode });
    span.innerText = light_mode;
  } else {
    span.innerText = dark_mode;
    useLS.set("app:config", { theme: light_mode });
  }
}

// change channel =================================================
on(document,'keydown', e => {
    if(e.key === 'ArrowRight'){
        nextChannel();
    }
    if(e.key === 'ArrowLeft'){
        prevChannel();
    }
})

on(btnNext,'click', () => {
    nextChannel();
});

on(btnPrev,'click', () => {
    prevChannel();
});

on(btnDarkMode,'click', () => {
    darkMode();
});

on(btnDSport,'click', () => {
    changeChannel(channels, 0);
    
});
on(btnTycSport,'click', () => {
    changeChannel(channels, 1);
});
on(btntvpulica,'click', () => {
    changeChannel(channels, 2);
});
on(btnAzteca7,'click', () => {
    changeChannel(channels, 3);
});

on(btnDSport0,'click', () => {
    changeChannel(channels, 0);
    
});
on(btnTycSport0,'click', () => {
    changeChannel(channels, 1);
});
on(btntvpulica0,'click', () => {
    changeChannel(channels, 2);
});
on(btnAzteca70,'click', () => {
    changeChannel(channels, 3);
});


