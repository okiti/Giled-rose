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

  updateQuality() {
    for (let i = 0; i < this.items.length; i += 1) {
      if (this.items[i].name !== 'Aged Brie' && this.items[i].name !== 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
          if (this.items[i].name !== 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else if (this.items[i].quality < 50) {
        this.items[i].quality = this.items[i].quality + 1;
        if (this.items[i].name === 'Backstage passes to a TAFKAL80ETC concert') {
          if (this.items[i].sellIn < 11) {
            if (this.items[i].quality < 50) {
              this.items[i].quality = this.items[i].quality + 1;
            }
          }
          if (this.items[i].sellIn < 6) {
            if (this.items[i].quality < 50) {
              this.items[i].quality = this.items[i].quality + 1;
            }
          }
        }
      }
      if (this.items[i].name !== 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name !== 'Aged Brie') {
          if (this.items[i].name !== 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.items[i].name !== 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }
        } else if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
        }
      }
    }

    return this.items;
  }
}
