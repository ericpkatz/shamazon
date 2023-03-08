

export const fetchProducts = async () => {
    try {
        const response = await fetch('/api/products', {
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
        const response = await fetch('/api/users/register', {
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
        const response = await fetch('/api/users/login', {
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

export const fetchCart = async (token, user_id) =>{
 try {
    const response = await fetch('/api/cart',{
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            user_id: user_id,
        })
    })
    const result = await response.json();
    return result;
 } catch (error) {
    console.log('Cannot find the cart')
    
 }   
}

export const fetchAllProducts = async () =>{
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

export const fetchSingleView = async (token, name, price, description) =>{
    try{
        const response = await fetch('/api/:id',{
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: name,
                price: price,
                description: description,
        })
        })
        const result = await response.json();
        return result;
    }
    catch (error){
        console.log("Cannot access the page")
    }
}

