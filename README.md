# Testing-app

Testing-app - flexible application for creating and passing tests

![alt text](https://i.ibb.co/dtVYxHS/Screenshot-7.png)

## Start app

```bash
yarn dev
```

## Usage data

```js
  {
    id: 1, // Test id
    title: 'Математика 5+', \/\/ Test id
    timer: {
      hours: 0,
      minutes: 0,
      seconds: 50
    },
    questions: [
      {
        id: 1,
        title: '2 + 2 = ?',
        answer: [4],
        answerVariants: [1, 4, 6, 7],
        type: 'radio',
      },
      ...
    ]
    ...
  }  
```