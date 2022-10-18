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
      if(result.data){
        return {data: result.data, error: null}
      } else{
        return {data: null, error: result.error}
      }

    } else{
      console.warn('Ошибка при запросе')
    }
  }

  return { fetchNow };
}

export default useFetch