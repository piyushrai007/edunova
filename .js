import axios from "axios";
const response = await axios.get('https://backend-nfkn.onrender.com/api/logs/?author=ayush');
if (typeof response.data === 'string') {
    // Handle the case where the response is HTML or another format
    console.log('Received non-JSON response:', response.data);
} else {
    console.log('Fetched blogs:', response.data);
}
