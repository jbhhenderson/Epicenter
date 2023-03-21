export const getNews = () => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      return fetch("https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=8fbbc3003f464b26854df0236dace90d", requestOptions)
        .then(response => response.json())
}