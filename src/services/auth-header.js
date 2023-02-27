export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('mz_storage_user'));

  if (user && user.accessToken) {
    return `Bearer ${user.accessToken}`;
  } else {
    return null;
  }
}
