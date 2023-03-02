

export const fetchProducts = async () => {
    try {
        const response = await fetch('localhost:3000/api/products', {
            method: 'GET'
        })
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const fetchRegister = async (username, password) => {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'applications/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('COULD NOT REGISTER USER');
    }
}

export const fetchLogin = async (username, password) => {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'applications/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        const result = await response.json();
        let token = result.token;
        window.localStorage.setItem('token', token);
        return token;
    } catch (error) {
        console.error('COULD NOT LOGIN USER');
    }
}

const login = fetchLogin('eric','torres')
console.log(login)