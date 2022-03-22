export const header = () => {
    const userData = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null
    if (userData === null || userData === undefined || userData === "") {
        return true
    } else {
        return {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${userData}`
            }
        }
    }
}



export const formDataHeader = () => {
    const userData = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null
    if (userData === null || userData === undefined || userData === "") {
        return true
    } else {
        return {
            headers: {
                "Token": userData
            }
        }
    }
}