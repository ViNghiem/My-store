import axios from 'axios';
import { CookieJar } from 'tough-cookie';
import axiosCookieJarSupport from 'axios-cookiejar-support';
const cookieJar = new CookieJar();
axiosCookieJarSupport(axios);
axios.defaults.jar = cookieJar;
axios.defaults.baseURL = 'https://example.com/api';

export default axios;
