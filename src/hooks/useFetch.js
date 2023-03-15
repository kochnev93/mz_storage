import { useDispatch } from 'react-redux';
import { removeUser } from '../features/users/userSlice';
import authHeader from '../services/auth-header';


const useFetch = (url, options) => {

  const dispatch = useDispatch()

  async function fetchNow(url, options, contentType=true) {
    let myHeaders = new Headers();

    if(contentType){
      myHeaders.append('content-type', 'application/json');
      myHeaders.append('Authorization', `${authHeader()}`);
      options.headers = myHeaders;
    } else{
      myHeaders.append('Authorization', `${authHeader()}`);
      options.headers = myHeaders;
    }

    try{
      let response = await fetch(url, options);
      
      if(response.status === 401) dispatch(removeUser())

      let result = await response.json();

      if(!response.ok) throw new Error(result.errorMessage, result.errors)

      if(result.data){
        return {...result, error: null}
      } else{
        return {data: null, ...result}
      }
   
    }
    catch (e){
      return {data: null, error: e.message}
    }
  }

  return { fetchNow };
}

export default useFetch