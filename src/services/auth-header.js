export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('mz_storage_user'));

    if(user && user.accessToken){
       // return {"x-auth-token": user.accessToken};
       return {"Authorization": `Bearer ${user.accessToken}`}
    } else {
        return {}
    }
}