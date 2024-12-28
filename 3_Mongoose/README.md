We will be learning and practicing about how to make schemas and models using mongoose

# Ecommerce

## user.model.js

### Defining the Schema
The `userSchema` is the blueprint for documents in the users collection. It specifies the structure, validations, and constraints for the user data. The Schema function takes two objects:

1. First Object:

    - Defines the structure of the documents by specifying the fields and their properties (e.g., type, constraints, and transformations).

2. Second Object (optional):

    - Used to specify additional schema options, such as enabling timestamp

```js
const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
    }

}, { timestamps: true });
```

#### Schema Fields

1. **`username`**
    - **Type**: `String`
    - **Attributes**:
        - `required: true`: This field is mandatory.
        - `unique: true`: Ensures no two users can have the same username.
        - `lowercase: true`: Converts the value to lowercase before storing it in the database.

2. **`email`**
    - **Type**: `String`
    - **Attributes**:
        - `required: true`: This field is mandatory.
        - `unique: true`: Ensures no two users can have the same email address.
        - `lowercase: true`: Converts the value to lowercase before storing it in the database.

3. **`password`**
    - **Type**: `String`
    - **Attributes**:
        - `required: true`: This field is mandatory.

#### Timestamps

```javascript
{ timestamps: true }
```
- Automatically adds the following fields to each document:
    - **`createdAt`**: Records when the document was created.
    - **`updatedAt`**: Records when the document was last modified.


### Exporting the Model
The `User` model is created based on the defined schema. This model provides an interface for interacting with the `users` collection in the MongoDB database.

```javascript
export const User = mongoose.model("User", userSchema);
```

- **Model Name**: `User`
    - Represents the `users` collection in the database.
    - The model name is User.
    - The corresponding collection name in MongoDB will be ```users```
    - Mongoose automatically pluralizes it to ```users``` (lowercase and pluralized) when interacting with the MongoDB database.
- **`mongoose.model("User", userSchema)`**
    - Converts the `userSchema` into a Mongoose model.
    - Provides methods to perform CRUD (Create, Read, Update, Delete) operations on the `users` collection.

## product.model.js

The `owner` field in the `productSchema` is defined to store a reference to another document, specifically from the users collection. Here's an explanation of its parts:

Breakdown of the owner Field
```js
owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
}
```
1. `type: mongoose.Schema.Types.ObjectId`
- Purpose: Indicates that this field will store an ObjectId, which is the unique identifier for a document in MongoDB.
- ObjectId: A 12-byte identifier that MongoDB uses for uniquely identifying documents. It's commonly used to reference other documents.
2. `ref: "User"`
- Purpose: Specifies the name of the model (User) that this ObjectId references.
- Effect: This creates a relationship between the Product model and the User model. When querying the Product model, you can populate the owner field with the corresponding User document.

**Example Use Case**
- **Storing Data** : The `owner` field might store an ObjectId like `60f71b2e8d10a64b4c2b9f3a`, which corresponds to a user in the `users` collection.
- **Populating Data** : When querying, you can use Mongoose's `populate` method to replace the ObjectId with the actual user document.
```js
Product.find()
  .populate("owner") // Replaces the ObjectId in `owner` with the corresponding User document
  .then(products => console.log(products));
```
**Why Use This?**

- **Relational Data** : Enables a relational structure between collections (e.g., which user owns which products).
- **Efficiency** : Keeps the Product document lightweight while still allowing access to detailed user information when needed.

**Example Product Document**

A product document might look like this in MongoDB:

```json
{
  "_id": "60f71b2e8d10a64b4c2b9f3b",
  "description": "A high-quality coffee mug",
  "name": "Coffee Mug",
  "price": 15.99,
  "stock": 100,
  "category": "60f71b2e8d10a64b4c2b9f3c",
  "owner": "60f71b2e8d10a64b4c2b9f3a", // ObjectId of a User
  "createdAt": "2023-12-27T00:00:00.000Z",
  "updatedAt": "2023-12-27T00:00:00.000Z"
}
```
**Populated Example**
After using `.populate("owner")`, the `owner` field might look like this:

```json
{
  "_id": "60f71b2e8d10a64b4c2b9f3b",
  "description": "A high-quality coffee mug",
  "name": "Coffee Mug",
  "price": 15.99,
  "stock": 100,
  "category": "60f71b2e8d10a64b4c2b9f3c",
  "owner": {
    "_id": "60f71b2e8d10a64b4c2b9f3a",
    "username": "john_doe",
    "email": "john@example.com"
  },
  "createdAt": "2023-12-27T00:00:00.000Z",
  "updatedAt": "2023-12-27T00:00:00.000Z"
}
```
This allows the Product model to have a direct link to its owning User, making data retrieval and relational management straightforward and efficient.

## Explanation for Using `String` Type for `product_image` in Product Schema

### Schema Definition
```javascript
product_image: {
    type: String
}
```

### Storing URLs or Paths
The `product_image` field is typically used to store the location of an image file, such as:

- **A URL** pointing to an image hosted on a remote server or CDN (e.g., AWS S3, Google Cloud Storage, or any image hosting service).
- **A relative or absolute file path** if the image is stored on the server's filesystem.

Both URLs and file paths are best represented as strings in MongoDB.

#### Example Values for `product_image`
- Hosted URL: `"https://example.com/images/product123.jpg"`
- Local path: `"/uploads/images/product123.jpg"`

### Lightweight and Efficient
- **Database Optimization**:
  - Storing only the path or URL as a string keeps the database lightweight compared to storing binary data (e.g., the actual image file).
- **Image Storage**:
  - Actual image data should be stored in a file storage system, not directly in the database, to improve performance and scalability.

### Flexibility
Using a string for `product_image` allows for easy updates if the image is:
- Replaced
- Renamed
- Moved

## Why Not Store Images Directly in MongoDB?

### Database Bloat
- Storing binary image data (e.g., using `Buffer` or Base64-encoded strings) directly in the database can quickly increase its size.
- Larger databases lead to slower backups and queries.

### Separation of Concerns
- Using a dedicated storage service (e.g., AWS S3, Google Cloud Storage) for images and referencing them in the database ensures better organization and maintainability.

## When Might You Use a Different Type?
If raw binary data for an image is required (not recommended for most use cases), you could use `Buffer`. However, this approach is usually avoided for the reasons mentioned above.

## Summary
Using `type: String` for the `product_image` field is a practical and efficient choice because:

1. It allows you to store references (URLs or paths) to the actual image files.
2. It keeps the database lightweight and efficient.
3. It adheres to best practices of separating image storage and database operations.

