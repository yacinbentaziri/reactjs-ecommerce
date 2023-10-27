import axios from "axios";

const jwtInterceptor = axios.create({})
jwtInterceptor.interceptors.response.use(
    (response) => {
        return response
    }, async (error) => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (error.response.data.msg == "jwt expired") {
            try {
                await axios.get("https://nodejs-ecommerce-agdc.onrender.com/api/auth/refreshtoken/" + user.data._id,{ withCredentials: true })
                const retryResponse = await retryOriginalRequest(error.config);
                return retryResponse;
            } catch (error) {
                return Promise.reject()
            }
        }
    }
)
const retryOriginalRequest = async (config) => {
    try {
        const response = await axios(config);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
};

export default jwtInterceptor