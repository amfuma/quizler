import fs from "fs";

export const chooseRandom = (array = [], numItems) => {
  if (array.length <= 1) {
    return array;
  }
  if (numItems < 1 || numItems > array.length) {
    numItems = Math.floor(Math.random() * array.length + 1);
  }
  let newArray = new Array(numItems);
  return newArray;
};

export const createPrompt = ({ numQuestions = 1, numChoices = 2 } = {}) => {
  const questions = [];
  for (let i = 1; i <= numQuestions; i++) {
    questions.push({
      type: "input",
      name: `question-${i}`,
      message: `Enter question ${i}`,
    });

    for (let j = 1; j <= numChoices; j++) {
      questions.push({
        type: "input",
        name: `question-${i}-choice-${j}`,
        message: `Enter answer choice ${j} for question ${i}`,
      });
    }
  }
  return questions;
};
export const createQuestions = (obj = {}) => {
  const questions = {};
  const choices = {};

  for (const [key, value] of Object.entries(obj)) {
    if (key.length === 10) {
      questions[key] = value;
    } else {
      choices[key] = value;
    }
  }

  const formattedQuestions = [];

  for (const [questionKey, questionValue] of Object.entries(questions)) {
    const questionChoices = Object.entries(choices)
      .filter(([choiceKey]) => choiceKey.startsWith(questionKey))
      .map(([_, choiceValue]) => choiceValue);

    const question = {
      type: "list",
      name: questionKey,
      message: questionValue,
      choices: questionChoices,
    };
    formattedQuestions.push(question);
  }
  return formattedQuestions;
};

export const readFile = (path) =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => (err ? reject(err) : resolve(data)));
  });

export const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) =>
      err ? reject(err) : resolve("File saved successfully")
    );
  });
