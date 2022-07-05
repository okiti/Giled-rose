import Shop from '../../app/gilded-rose';
import Item from '../../app/item';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Gilded Rose', () => {
  it('Should return the expected result', () => {
    const storeItems = [new Item('+5 Dexterity Vest', 10, 20), new Item('Aged Brie', 2, 0), new Item('Elixir of the Mongoose', 5, 7), new Item('Sulfuras, Hand of Ragnaros', 0, 80), new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20)];
    const expectedResult = [new Item('+5 Dexterity Vest', 9, 19), new Item('Aged Brie', 1, 1), new Item('Elixir of the Mongoose', 4, 6), new Item('Sulfuras, Hand of Ragnaros', 0, 80), new Item('Backstage passes to a TAFKAL80ETC concert', 14, 21)];
    const gildedRose = new Shop(storeItems);
    const items = gildedRose.updateQuality();
    expect(items).toStrictEqual(expectedResult);
  });

  it('Once the sell by date has passed, Quality degrades twice as fast', () => {
    const storeItems = [new Item('+5 Dexterity Vest', 0, 4)];
    const expectedResult = [new Item('+5 Dexterity Vest', -1, 2)];
    const gildedRose = new Shop(storeItems);
    const items = gildedRose.updateQuality();

    expect(items).toStrictEqual(expectedResult);
  });

  it('The Quality of an item is never negative', () => {
    const storeItems = [new Item('+5 Dexterity Vest', 10, 0)];
    const expectedResult = [new Item('+5 Dexterity Vest', 9, 0)];
    const gildedRose = new Shop(storeItems);
    const items = gildedRose.updateQuality();

    expect(items).toStrictEqual(expectedResult);
  });

  it('The Quality of an item is never more than 50', () => {
    const storeItems = [new Item('Aged Brie', 1, 50)];
    const expectedResult = [new Item('Aged Brie', 0, 50)];
    const gildedRose = new Shop(storeItems);
    const items = gildedRose.updateQuality();

    expect(items).toStrictEqual(expectedResult);
  });

  it('Sulfuras, being a legendary item, never has to be sold or decreases in Quality', () => {
    const storeItems = [new Item('Sulfuras, Hand of Ragnaros', 1, 10)];
    const expectedResult = [new Item('Sulfuras, Hand of Ragnaros', 1, 10)];
    const gildedRose = new Shop(storeItems);
    const items = gildedRose.updateQuality();
    expect(items).toStrictEqual(expectedResult);
  });

  it('Aged Brie increases in Quality the older it gets', () => {
    const storeItems = [new Item('Aged Brie', 1, 0)];
    const expectedResult = [new Item('Aged Brie', 0, 1)];
    const gildedRose = new Shop(storeItems);
    const items = gildedRose.updateQuality();
    expect(items).toStrictEqual(expectedResult);
  });
});

describe('Backstage passes', () => {
  it('Increases in Quality as its SellIn value approaches', () => {
    const storeItems = [new Item('Backstage passes to a TAFKAL80ETC concert', 14, 0)];
    const expectedResult = [new Item('Backstage passes to a TAFKAL80ETC concert', 13, 1)];
    const gildedRose = new Shop(storeItems);
    const items = gildedRose.updateQuality();

    expect(items).toStrictEqual(expectedResult);
  });

  it('Quality increases by 2 when there are 10 days or less', () => {
    const storeItems = [new Item('Backstage passes to a TAFKAL80ETC concert', 10, 0)];
    const expectedResult = [new Item('Backstage passes to a TAFKAL80ETC concert', 9, 2)];
    const gildedRose = new Shop(storeItems);
    const items = gildedRose.updateQuality();

    expect(items).toStrictEqual(expectedResult);
  });

  it('Quality increases by 3 when there are 5 days or less', () => {
    const storeItems = [new Item('Backstage passes to a TAFKAL80ETC concert', 5, 0)];
    const expectedResult = [new Item('Backstage passes to a TAFKAL80ETC concert', 4, 3)];
    const gildedRose = new Shop(storeItems);
    const items = gildedRose.updateQuality();

    expect(items).toStrictEqual(expectedResult);
  });

  it('Quality drops to 0 after concert', () => {
    const storeItems = [new Item('Backstage passes to a TAFKAL80ETC concert', -1, 30)];
    const expectedResult = [new Item('Backstage passes to a TAFKAL80ETC concert', -2, 0)];
    const gildedRose = new Shop(storeItems);
    const items = gildedRose.updateQuality();

    expect(items).toStrictEqual(expectedResult);
  });
});

describe('API Call', () => {
  it("Should return a status of 200", async () => {
    mockedAxios.get.mockResolvedValue({ status: 200, data: { "answer": "no", "forced": false, "image": "https://yesno.wtf/assets/no/9-dc99c0e3c066b28d3a12262692cd5432.gif" } });

    const ans = await axios.get('https://yesno.wtf/api');
    expect(ans.status).toEqual(200);
  });
});
