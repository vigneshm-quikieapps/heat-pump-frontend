export const header = () => {
    const userData = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null
    if (userData) {
        return userData
    }
    else{
        return null
    }
}