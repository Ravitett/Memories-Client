const loginLocalStorage = (_obj) => {
    localStorage.setItem("memories-token", _obj.token);
    localStorage.setItem("memories-userID", _obj.id);
    localStorage.setItem("memories-fullName", _obj.fullName);
    localStorage.setItem("memories-type", _obj.type);
}
const logOut = () => {
    localStorage.clear();
}

export { loginLocalStorage, logOut }