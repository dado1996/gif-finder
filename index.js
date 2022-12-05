const API_KEY = `https://api.giphy.com/v1/gifs/search?api_key=OKdMnc4d40xkcrFDRforGdtfwrN4Wi4d`;

const searchBar = document.getElementById('search');
searchBar.addEventListener('keyup', async (e) => {
    const limit = document.getElementById('limit').value ?? 5;
    const searchWord = e.target.value;
    const imageContainer = document.querySelector('.image-container');
    imageContainer.innerHTML = '';

    if (typeof searchWord !== 'string' || searchWord.length < 3) {
        return;
    }

    const response = await fetch(`${API_KEY}&q=${searchWord}&limit=${limit}&offset=0&rating=g&lang=es`)
    const result = await response.json()
    
    const images = result.data ?? [];

    if (images.length === 0){
        imageContainer.innerHTML = '<h1>No hay imágenes que coincidan con el criterio de búsqueda</h1>';
        return;
    }

    images.forEach(image => {
        let classes = 'image-element';
        const proportion = parseFloat(image.images.original.width) / parseFloat(image.images.original.height);
        console.log(proportion);
        if (proportion <= 0.75) {
            classes += ' image-tall';
        } else if (proportion >= 1.75) {
            classes += ' image-wide';
        } else if (image.images.original.width >= '480') {
            classes += ' image-tall image-wide';
        }
        imageContainer.innerHTML += `<img class="${classes}" src="${image.images.original.url}" alt="${image.title}" />`;
    });
});