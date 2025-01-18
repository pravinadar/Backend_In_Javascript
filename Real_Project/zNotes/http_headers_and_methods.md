
# HTTP Headers and Methods

## HTTP Headers

HTTP headers are key-value pairs sent between the client and server in an HTTP request or response. They provide additional information about the request or response, helping to control how data is sent and processed.

### Common HTTP Headers

1. **General Headers**
   - **`Date`**: The date and time the message was sent.
     - Example: `Date: Tue, 13 Jan 2025 10:00:00 GMT`
   - **`Connection`**: Controls whether the network connection stays open after the current transaction.
     - Example: `Connection: keep-alive`

2. **Request Headers**
   - **`Accept`**: Informs the server about the types of content that the client can process.
     - Example: `Accept: text/html, application/json`
   - **`User-Agent`**: Contains information about the client software making the request.
     - Example: `User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36`

3. **Response Headers**
   - **`Content-Type`**: Indicates the media type of the resource sent to the client.
     - Example: `Content-Type: application/json; charset=UTF-8`
   - **`Set-Cookie`**: Sends cookies from the server to the client for session management.
     - Example: `Set-Cookie: sessionId=abc123; HttpOnly`

4. **Entity Headers**
   - **`Content-Length`**: Indicates the size of the response body in bytes.
     - Example: `Content-Length: 348`
   - **`Last-Modified`**: Indicates the last time the resource was modified.
     - Example: `Last-Modified: Wed, 22 Oct 2025 07:28:00 GMT`

## HTTP Methods

HTTP methods (or verbs) define the action to be performed on a resource. The most commonly used methods are:

1. **GET**
   - **Description**: Retrieves data from the server. It is safe and idempotent, meaning it doesn't change server state and can be called multiple times without different outcomes.
   - **Example**: `GET /api/users HTTP/1.1`

2. **POST**
   - **Description**: Sends data to the server, often resulting in a change in state or side effects on the server (e.g., creating a new resource).
   - **Example**: 
     ```
     POST /api/users HTTP/1.1
     Content-Type: application/json
     
     {
         "name": "John Doe",
         "email": "john@example.com"
     }
     ```

3. **PUT**
   - **Description**: Updates an existing resource or creates a new resource if it does not exist. It is idempotent.
   - **Example**: 
     ```
     PUT /api/users/1 HTTP/1.1
     Content-Type: application/json
     
     {
         "name": "John Doe",
         "email": "john.doe@example.com"
     }
     ```

4. **DELETE**
   - **Description**: Removes a resource from the server. It is idempotent.
   - **Example**: `DELETE /api/users/1 HTTP/1.1`

5. **PATCH**
   - **Description**: Partially updates a resource. It is not necessarily idempotent.
   - **Example**: 
     ```
     PATCH /api/users/1 HTTP/1.1
     Content-Type: application/json
     
     {
         "email": "john.updated@example.com"
     }
     ```

6. **HEAD**
   - **Description**: Similar to GET, but it retrieves only the headers without the body. Useful for checking what a GET request will return.
   - **Example**: `HEAD /api/users/1 HTTP/1.1`

## Summary

- **HTTP headers** convey information about requests and responses, influencing how clients and servers communicate.
- **HTTP methods** define the actions to be taken on resources, with each method serving a specific purpose in the interaction between clients and servers.
