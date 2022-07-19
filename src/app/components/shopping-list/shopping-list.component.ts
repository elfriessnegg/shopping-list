import { Component, OnInit } from '@angular/core';
import Item from 'src/app/modules/item';
import { ShoppingApiService } from 'src/app/services/shopping-api.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  // initialisation of array of shopping list items
  items: Item[] = [];

  // dependency injection to use services in components
  constructor(private shoppingApiService: ShoppingApiService) { }

  // whenever the page is loaded, all shopping list items are displayed
  async ngOnInit(): Promise<void> {
    this.items = await this.shoppingApiService.getItems();
  }

  // in order to remove an item, only the id has to be known
  async removeItem(id: number) {
    await this.shoppingApiService.deleteItem(id); // api
    /* filter method: a new array is created with all items whose id is not the given one. */
    this.items = this.items.filter(i => i.id !== id); // ui
  }

  async updateEvent(updatedItem: Item) {
    await this.shoppingApiService.updateItem(updatedItem); // api
    /* map method: a new array is created. All items are copied except for the one that has been changed. This one is updated. */
    this.items = this.items.map((i) => i.id === updatedItem.id ? updatedItem : i); // ui
  }

  // whenever a new item is created, it is added to the array of items
  async addItem(newItem: Item) {
    const item = await this.shoppingApiService.createItem(newItem); // api
    this.items.push(item); // ui
  }

  // depending on the chosen filter option, only specific items are shown
  async filterList(filterOption: string) {
    this.items = await this.shoppingApiService.getItems(); // api
    if (filterOption === "all") {
      return; // ui
    }
    else if (filterOption === "done") {
      this.items = this.items.filter((i) => i.done === true); // ui
    }
    else if (filterOption === "not done") {
      this.items = this.items.filter((i) => i.done === false); // ui
    }
  }

  // all items are called and then sorted accordingly
  async sortList(sortOption: string) {
    await this.shoppingApiService.getItems(); // api

    // by ID
    /* how to sort arrays with objects: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/sort */
    if (sortOption === "by Id") {
      const newArray = this.items.sort(function (a, b) {
        return a.id - b.id;
      });
    }

    // by Title
    else if (sortOption === "by Title") {
      const newArray = this.items.sort(function (a, b) {
        // toUpperCase necessary, or else lower case items are at the end
        let titleA = a.title.toUpperCase();
        let titleB = b.title.toUpperCase();
        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }
        return 0;
      });
    }

    // by Unit
    else if (sortOption = "by Unit") {
      /* two arrays are created, one for the items with a unit, and one array for items with no unit. The elements of the array with units are sorted and then the array with no units is added. */
      const undefinedArray = this.items.filter((i) => i.unit === undefined);
      const definedArray = this.items.filter((i) => i.unit !== undefined);
      definedArray.sort(function (a, b) {
        // ! is necessary, since it can be ruled out that a unit is undefined.
        let unitA = a.unit!.toUpperCase();
        let unitB = b.unit!.toUpperCase();
        if (unitA < unitB) {
          return -1;
        }
        if (unitA > unitB) {
          return 1;
        }
        return 0;        
      });
      this.items = definedArray.concat(undefinedArray);
    }
  }
}
