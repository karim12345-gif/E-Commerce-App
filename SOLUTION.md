# Solution

Explain your thought process, architecture decisions, and any libraries or tools you used.

# E-Commerce App

## 1- Clone the repository

### `git clone https://github.com/karim12345-gif/E-Commerce-App.git`

## 2- Install dependencies

### `npm install`

### 3- Keep Your Code Updated
As I may be updating, improving, or refactoring the code regularly, make sure to pull the latest changes:

git pull origin main

## 4- To Run Tests

You have to choice, since am using vitest for testing, you can use the Vitest UI or test from the terminal.

In the terminal (Ctrl + J), run the following:

### `npm test` or  ` npm run test `

****

# Architecture and Library Choices

### 1- shadcn

The project is built Shadcn/UI, it is a unique component library that differs from traditional UI libraries like, helps you build apps faster

### 2- Tailwind-CSS

Tailwind css was used for styling the components. 

### 3- React Query

React Query is used for managing and caching server state. It provides hooks for fetching, caching, and updating data from server APIs in React applications.

### 4- Vitest

I have decided to use vitest because it provides better support and integration for React testing compared to Jest, offering features like React Hooks testing utilities.

### 5- Toast

To show success/error popup messages 

### 6- Performance Analysis

I have installed analyze to check the application's performance. You can run the following command to analyze the bundle size and optimize performance:

npm run analyze
****



# Testing 
## Overview

 The testing suite for this project includes unit tests to ensure the functionality and reliability of the codebase. 

## Unit Tests

I unit tested a couple of components to demonstrate how it works. I tested the button to ensure it triggers the intended actions, such as navigation or specific functionality. I also tested the NavigationBar and product UI components.

The __MOCK__ directory serves a crucial role in unit testing by providing simulated versions of various components, contexts, and data. In this E-Commerce App, mocks are used to simulate data during unit testing.

****



# architecture decisions

Folder structuring and interfaces 

1- I prioritize separating concerns to avoid prop drilling, which can lead to scalability issues. Introducing state management is essential in React/Next.js applications.

2- Also breaking down the code into small and reusable chunks is key to maintaining clean and maintainable code.

3- The services folder contains the APIs for fetching and posting data using React Query. There’s also a helpers folder, which includes the ResponseModelHelper to handle error handling and response models. Additionally, there are two more folders: one for React Query hooks and another for server-side fetching of the product list for Static Site Generation (SSG).

4- The Types folder is used to define types and interfaces, which can be called in your components. This creates a better structure and improves readability. When debugging, it also makes it easier to identify where the issue is and track the data.

5- In the App folder, you'll find a folder called Errors, where the application handles various error codes with corresponding TSX pages.

6- The ReactQueryProvider and Providers components set up global state management and data fetching for the app. ReactQueryProvider initializes React Query's configuration and error handling, ensuring consistent data fetching and caching across the app. 

7- And then you have providers wraps the app with necessary context providers like CartProvider and ReactQueryProvider, enabling data synchronization and reducing prop drilling.

****
### Thought process

## 1- Library Choice for API Fetching

I chose React Query for fetching data from the API, React Query is used for API fetching due to its simplified data fetching logic, reduced boilerplate code, and built-in caching and error handling mechanisms.

you can track the state with ReactQueryDevtools in Provider.tsx, once you sit it true, it should show you the extention and then you can track data. as you can see here after clicking on view in product page you will see GetProductById.


This helps track data 

![alt text](/public/images/pages/ReactQuery.png)


If you can track the git commits, you would notice that i first used react query to fetch  `getProducts: () => /api/products`, just to make things work, then afterwards i have decided to use `Static Generation (SSG)`:

### Why use Static Generation (SSG) for the product page:

1- Better Performance & Faster Load Times 🚀

2- Pages are pre-built at build time, making them load instantly for users.
Improved SEO 📈

3- Since pages are pre-rendered, search engines can easily crawl and index product data.
Reduced Server Load 💰

4- No need to fetch data on every request, reducing API calls and backend load.
Revalidation for Fresh Data 🔄

5- I also sat the revalidate: 3600 (1 hour) to fetch new product data periodically, ensuring the page stays up-to-date.

## 2- Local storage and React Context:

1- I used LocalStorage to store the data that was in the cart in, it allows the cart to persist between page refreshes and browser sessions. When a user adds items to the cart, they won't lose their selections if they accidentally close the browser or navigate away.
 
 Example off the data stored in local storage: 

 ![alt text](/public/images/pages/LocalDataList.png)


 2- React Context is a powerful state management feature for managing state in React applications. It helps you share data across your application, similar to Redux and Zustand, but it is much easier to use and is built-in, so you don’t have to install additional libraries. In general, most state management solutions help in avoiding prop drilling.


## 2- Error boundaries:

Error boundaries prevent the entire app from crashing by catching errors in components and displaying a fallback UI. They help maintain a smooth user experience, even when parts of the app fail. Additionally, error boundaries centralize error tracking and reporting, making it easier to manage and debug issues without interrupting the user flow.
