import authHeader from '../services/auth-header';


const useFetch = (url, options) => {

  async function fetchNow(url, options) {
    // Заголовки запроса
    //if(options.body){
      let myHeaders = new Headers();
      myHeaders.append('content-type', 'application/json');
      myHeaders.append('Authorization', `${authHeader()}`);
      
      options.headers = myHeaders;
    //}

    try{
      let response = await fetch(url, options);
      let result = await response.json();

      console.log('RESPONSE', response)
      console.log('RESULT', result)

      if(!response.ok) throw new Error(result.errorMessage, result.errors)

      if(result.data){
        console.log('data done')
        return {data: result.data, error: null}
      } else{
        console.log('error done')
        return {data: null, error: result.error}
      }
   
    }
    catch (e){
      console.log(e)
      console.error(e.message)
      console.error(e.message)
      return {data: null, error: e.message}
    }
 

    // let response = await fetch(url, options);

    // console.log('RESPONSE', response)
    // let result = await response.json();
    // console.log('RESPONSE-JSON', result)

    // if(response.ok){
      
    //  // let result = await response.json();
    //   if(result.data){
    //     return {data: result.data, error: null}
    //   } else{
    //     return {data: null, error: result.error}
    //   }

    // } else{
    //   console.warn(`Ошибка при запросе ${url}`)
    // }
  }

  return { fetchNow };
}

export default useFetch