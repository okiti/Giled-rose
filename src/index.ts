import prompt from 'prompt-sync';

const input = prompt();

const collectInput = (question: string): number => {
  let error: boolean = false;
  let userInput: string;
  do {
    error = false;
    userInput = input(`${question}: `);
    if (!parseInt(userInput, 10)) {
      console.log(`Value must be number, recieved a ${typeof userInput}`);
      error = true;
    }
  } while (error);
  return parseInt(userInput, 10);
}

const main = (): void => {
  const noOfLoops = collectInput('How many times should the shop update?');
  const noOfStartRequest = collectInput('Number of start requests to the mock API?');

  console.log(noOfLoops, noOfStartRequest);
};
main();