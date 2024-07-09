# Dog API Documentation

## Introduction

The Dog API provides access to a comprehensive database of dog breeds and associated images. This API allows developers to obtain information about dog breeds, sub-breeds, and images for use in applications, websites, or research projects.

## Base URL

All requests should be made to: `https://dog.ceo/api/`

## Endpoints

### 1. List all breeds

Retrieves a list of all dog breeds available in the database.

- **URL**: `/breeds/list/all`
- **Method**: GET
- **Parameters**: None

#### Successful Response

- **Code**: 200 OK
- **Content**:

```json
{
    "message": {
        "affenpinscher": [],
        "akita": [],
        "australian": ["kelpie", "shepherd"]
    },
    "status": "success"
}
```

### 2. List images of a breed

Retrieves a list of image URLs for a specific breed.

- **URL**: `/breed/{breed}/images`
- **Method**: GET
- **Parameters**:
    - `{breed}`: Name of the breed (required)

#### Usage Example

```
GET https://dog.ceo/api/breed/hound/images
```

#### Successful Response

- **Code**: 200 OK
- **Content**:

```json
{
    "message": [
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_10263.jpg"
    ],
    "status": "success"
}
```

### 3. List sub-breeds

Retrieves a list of all sub-breeds for a specific breed.

- **URL**: `/breed/{breed}/list`
- **Method**: GET
- **Parameters**:
    - `{breed}`: Name of the breed (required)

#### Usage Example

```
GET https://dog.ceo/api/breed/hound/list
```

#### Successful Response

- **Code**: 200 OK
- **Content**:

```json
{
    "message": [
        "afghan",
        "basset",
        "blood",
        "english",
        "ibizan",
        "plott",
        "walker"
    ],
    "status": "success"
}
```

### 4. List images of a sub-breed

Retrieves a list of image URLs for a specific sub-breed.

- **URL**: `/breed/{breed}/{subbreed}/images`
- **Method**: GET
- **Parameters**:
    - `{breed}`: Name of the breed (required)
    - `{subbreed}`: Name of the sub-breed (required)

#### Usage Example

```
GET https://dog.ceo/api/breed/hound/afghan/images
```

#### Successful Response

- **Code**: 200 OK
- **Content**:

```json
{
    "message": [
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
        "https://images.dog.ceo/breeds/hound-afghan/n02088094_10263.jpg"
    ],
    "status": "success"
}
```

## Error Handling

In case of an error, the API will return a JSON object with an error message and an appropriate HTTP status code.

Example error response:

```json
{
    "status": "error",
    "message": "Breed not found (master breed does not exist)",
    "code": 404
}
```
