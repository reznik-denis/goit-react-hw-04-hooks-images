function fetchImages(search, pageFetch) {
    const KEY = '19046001-7d44b7f00f708df4674bb235b';
    const URL = 'https://pixabay.com/api/';
    return fetch(`${URL}?q=${search}&page=${pageFetch}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error('Картинки с таким именем отсутсвуют'))
        });
}

const api = {
    fetchImages
};

export default api;
    