<div align="center">
  <img src="src/app/icon.svg" width="200" height="200" alt="DogBreeds icon" />
  <h1 align="center">DogBreeds</h1>
  <p align="center"><strong>Explore a diverse gallery of dog breeds and associated images</strong></p>
  <p align="center">
    <a href="https://dog-breeds-blond.vercel.app/" target="_blank">View App in Production</a>
  </p>
</div>

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Vitest
- Playwright

## Architecture

This project implements Vertical Slice Architecture (VSA), it focuses on organizing code around features or "slices" of functionality, rather than traditional layered architectures.

### Why Vertical Slice Architecture?

- **Feature-centric organization**: Easier to understand and maintain as all related code is grouped together.
- **Improved modularity**: Each slice is self-contained, reducing coupling between different parts of the application.
- **Faster development**: Enables quicker implementation and testing of new features.
- **Scalability**: Facilitates the growth of the application without increasing complexity.

For a comprehensive understanding of Vertical Slice Architecture, I recommend watching [this video on "Vertical Slice Architecture"](https://youtu.be/SUiWfhAhgQw).

## Data Source

This app uses the [Dog API](https://dog.ceo/dog-api/) to fetch dog breeds and associated images.

### API Documentation

#### Custom API Reference
I have documented the specific API endpoints used in this project in my own API reference, which you can find [here](docs/DOG_API_REFERENCE.md).

#### Postman Collection
For easy testing and exploration of the API, a Postman collection for these endpoints is available [here](postman/dog-api.postman_collection.json).

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jorgecancinof/dog-breeds.git && cd dog-breeds
   ```

2. This project uses Node.js LTS version 20.15.0. If you have a Node.js version manager
   (e.g., [NVM](https://github.com/nvm-sh/nvm), [FNM](https://github.com/Schniz/fnm), [Volta](https://volta.sh/)),
   the [`.nvmrc`](.nvmrc) file will help you switch to this version automatically.

3. Install the dependencies:
   ```bash
   npm ci
   ```

### Running the Project

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) with your browser to access the app.

## Testing

### Unit Testing

All unit tests are located close to the source code in the `__tests__` directory. This project uses Vitest for unit testing. You can run the tests with:

```bash
npm run test
```

### E2E Testing

This project uses Playwright for E2E testing. You can run the tests with:

```bash
npx playwright install # Only for the first time in a new environment
npm run test:e2e
```

## License

This project is licensed under the [MIT License](LICENSE).
