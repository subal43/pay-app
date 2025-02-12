import axios from 'axios';
 export async function TokenInfo(){
    const Token = localStorage.getItem("token");

    try {
        const response = await axios.post("http://localhost:3000/api/v1/user/info", {
            Token,
        });
        return response.data.user; 
    }
    catch (error) {
        console.error("Error during token validation:", error);
       
    }

}