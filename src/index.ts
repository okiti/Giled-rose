import prompt from 'prompt-sync';
import axios from 'axios';
import Shop from './modules/gilded-rose';
import Item from './modules/item';

const input = prompt();

type ApiResponse = {
  answer: string;
  forced: boolean;
  image: string;
}

const storeItems = [new Item('+5 Dexterity Vest', 10, 11)];
const gildedRose = new Shop(storeItems);

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

const serverCall = async(noOfApiCalls: number): Promise<void> => {
  const request = axios.get('https://yesno.wtf/api');
  const a = Array(noOfApiCalls).fill(request);
  const result = await Promise.all([...a]);
  const response = result.filter((res) => res.data.answer === 'yes');
  if (response.length) {
    console.log(`${response.length}: Retrying`);
    await serverCall(response.length);
  } else {
    console.log('updating store');
    const items = gildedRose.updateQuality();
    console.log(items);  
  }
};

const main = (): void => {
  const noOfLoops = collectInput('How many times should the shop update?');
  const noOfStartRequest = collectInput('Number of start requests to the mock API?');
  for (let i = 0; i < noOfLoops; i += 1) {
    console.log(`Running loop: ${i}`);
    serverCall(noOfStartRequest);
  }
  console.log(noOfLoops, noOfStartRequest);
};
main();