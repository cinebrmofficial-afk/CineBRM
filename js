const KEY = '5799262499f305123f69c419c2a131e6';
const IMG_BASE = 'https://image.tmdb.org';

// Função principal para carregar dados do TMDB
async function loadMovies(url = `https://api.themoviedb.org{KEY}&language=pt-BR`) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const container = document.getElementById('movies');
        
        container.innerHTML = ''; // Limpa a lista

        data.results.forEach(movie => {
            const card = document.createElement('div');
            card.className = 'movie-card';
            // Monta a imagem: Base + Caminho da API
            card.style.backgroundImage = `url(${IMG_BASE + movie.poster_path})`;
            
            card.onclick = () => {
                openPlayer(movie.title);
            };
            
            container.appendChild(card);
        });
    } catch(error) {
        document.getElementById('movies').innerText = "Erro de conexão com a API.";
    }
}

function openPlayer(title) {
    const player = document.getElementById('player');
    const video = document.getElementById('v');
    player.style.display = 'flex';
    // Vídeo de teste funcional
    video.src = 'https://commondatastorage.googleapis.com';
    video.play();
}

function closePlayer() {
    const player = document.getElementById('player');
    const video = document.getElementById('v');
    video.pause();
    player.style.display = 'none';
}

// Lógica da barra de pesquisa
document.getElementById('search').addEventListener('input', (e) => {
    const termo = e.target.value;
    if(termo.length > 2) {
        loadMovies(`https://api.themoviedb.org{KEY}&query=${termo}&language=pt-BR`);
    } else if(termo === "") {
        loadMovies();
    }
});

// Executa ao carregar a página
window.onload = () => loadMovies();
