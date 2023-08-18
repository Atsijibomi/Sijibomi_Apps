const longURLInput = document.getElementById('longURL');
const shortenedURLDisplay = document.getElementById('shortenedURL');

urlForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const longURL = longURLInput.value;
    try {
        const shortURL = await shortenURL(longURL);
        shortenedURLDisplay.textContent = `Shortened URL: ${shortURL}`;
        shortenedBox.style.display = 'block';
    } catch (error) {
        console.error(error, 'An error occurred while shortening the URL.');
        errorDisplay.textContent = `Shortened URL: ${error}`;
        shortenedBox.style.display = 'block';
    }
});

async function shortenURL(longURL) {
    const url = 'https://url-shortener-service.p.rapidapi.com/shorten';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': 'e9e30b436bmsh5f69dd7dc299852p1c419djsnc30802de0c56',
            'X-RapidAPI-Host': 'url-shortener-service.p.rapidapi.com'
        },
        body: new URLSearchParams({
            url: longURL
        })
    };

    try {
        const response = await fetch(url, options);
        console.log('API Response:', response);
        if (!response.ok) {
            throw new Error('API request failed');
        }
        const result = await response.json();
        if (!result.result_url) { 
            throw new Error('Shortened URL not found in response');
        }
        return result.result_url;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
