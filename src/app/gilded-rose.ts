import Item from './item';

type ShopItem = {
  name: string;
  quality: number;
  sellIn: number;
};
export default class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  calculateQualityDifferenceForNormalItem(item: ShopItem): number {
    const { quality, sellIn } = item;

    const noMoreDaysToSell = sellIn <= 0;
    const qualityIsGreaterThanZero = quality > 0;

    if (qualityIsGreaterThanZero && noMoreDaysToSell) return -2;
    if (qualityIsGreaterThanZero) return -1;

    return 0;
  }

  calculateQualityDifferenceForBackstagePasses(item: ShopItem): number {
    const { sellIn, quality } = item;

    if (sellIn < 0) return -quality;
    if (sellIn <= 5) return +3;
    if (sellIn <= 10) return +2;

    return +1;
  }

  calculateSellinDifference(item: ShopItem): number {
    const { name } = item;
    const isSulfuras = name === 'Sulfuras, Hand of Ragnaros';
    return !isSulfuras ? -1 : 0;
  }

  calculateQualityDifference(item: ShopItem): number {
    const { name, quality } = item;

    const isAgedBrie = name === 'Aged Brie';
    const isSulfuras = name === 'Sulfuras, Hand of Ragnaros';
    const isBackstagePasses = name === 'Backstage passes to a TAFKAL80ETC concert';
    const isQualityLessThan50 = quality < 50;
    const isNormalItem = !isAgedBrie && !isBackstagePasses && !isSulfuras;

    if (isNormalItem) return this.calculateQualityDifferenceForNormalItem(item);
    if (isBackstagePasses) return this.calculateQualityDifferenceForBackstagePasses(item);
    if (isAgedBrie && isQualityLessThan50) return +1;

    return 0;
  }

  updateQuality(): Array<Item> {
    return this.items.map((item): ShopItem => {
      item.quality += this.calculateQualityDifference(item);
      item.sellIn += this.calculateSellinDifference(item);

      return item;
    });
  }
}
