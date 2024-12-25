## 1. Imported **Axios** library
Axios is a popular HTTP client library for making asynchronous requests in JavaScript applications. It simplifies the process of fetching data from APIs, sending data to servers, and handling responses.

#### Key Features of Axios:
- Supports `GET`, `POST`, `PUT`, `DELETE`, and other HTTP methods.
- Provides a straightforward promise-based syntax.
- Automatically transforms JSON data.
- Allows configuration of default headers, timeouts, and interceptors.
- Works in both browsers and Node.js environments.

#### Use in `App.jsx`:
In this project, Axios is used in the `useEffect` hook to fetch data from the `/api/heroes` endpoint.

```jsx
useEffect(() => {
    axios
      .get('/api/heroes')
      .then((response) => {
        setHeroes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
});
```
- The `get` method is called to fetch hero data from the server.
- The data is stored in the `heroes` state using `setHeroes`.
- Errors during the request are logged to the console.

## 2. Why Proxy is Added in the ``` vite.config.js ``` file:
In the `vite.config.js` file, a proxy configuration is added to forward API requests from the frontend to the backend server.

```javascript
server: {
    proxy: {
        '/api': 'http://localhost:3000/',
    },
}
```

The proxy serves two key purposes:

1. **Avoiding CORS Issues:**
   - Browsers enforce the same-origin policy, which restricts requests between different origins. For example, a request from `http://localhost:5173` (frontend) to `http://localhost:3000` (backend) would be blocked.
   - The proxy allows the frontend to make requests to `/api`, which are seamlessly forwarded to `http://localhost:3000/api`. This prevents CORS errors by keeping the origin consistent from the browser’s perspective.

2. **Simplifying API Calls in Development:**
   - Instead of hardcoding the backend URL (`http://localhost:3000`) in API calls, developers can use relative paths like `/api/heroes`. This ensures that code remains clean and can be easily deployed to different environments without changing URLs.


The proxy ensures that the Axios request in `App.jsx`:
```jsx
axios.get('/api/heroes')
```
gets correctly routed to:
```
http://localhost:3000/api/heroes
```

## Project Flow
1. The frontend (`App.jsx`) sends a `GET` request to `/api/heroes`.
2. The Vite proxy forwards this request to the backend at `http://localhost:3000/api/heroes`.
3. The backend processes the request and responds with a list of heroes.
4. Axios receives the response and updates the `heroes` state with the data.
5. The UI dynamically displays the list of heroes and their descriptions.


