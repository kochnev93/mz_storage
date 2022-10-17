import authHeader from '../services/auth-header';

const useFetch = (url, options) => {

  async function fetchNow(url, options) {
    // Заголовки запроса
    if(options.body){
      let myHeaders = new Headers();
      myHeaders.append('content-type', 'application/json');
      myHeaders.append('Authorization', `${authHeader()}`);
      options.headers = myHeaders;
    }

    let response = await fetch(url, options);

    if(response.ok){
      let result = await response.json();
      return {data: result}
    } else{
      return {error: result}
    }
  }

  return { fetchNow };
}

export default useFetch