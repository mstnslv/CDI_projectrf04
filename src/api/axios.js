import axios from 'axios';

//const serverUrl = window.location.protocol + '//' + window.location.hostname + ':2096';
//const serverUrl = 'https://' + 'mdmcar.com' + ':2096';
const serverUrl = 'https://' + 'cardataimport.com' + ':2096';
axios.defaults.baseURL = `${serverUrl}/api/`;




export default axios;