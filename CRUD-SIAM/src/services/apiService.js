/**
 * Realiza una solicitud GET a un endpoint específico de la API.
 * @param {string} endpoint - La ruta específica de la API (ejemplo: 'projects').
 * @returns {Promise<any>} - Devuelve una promesa con los datos JSON.
 */
export const fetchDataFromApi = async (endpoint) => {
    const baseUrl = 'http://127.0.0.1:8000/SIAM/'; // URL base de la API
    const url = `${baseUrl}${endpoint}/`; // Construye la URL completa

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const json = await response.json(); // Extrae el JSON de la respuesta
        return json; // Devuelve el JSON directamente
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error; // Lanza el error para que lo maneje el componente
    }
};


