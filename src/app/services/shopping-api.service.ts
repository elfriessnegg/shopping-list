import { Injectable } from '@angular/core';
import Item from '../modules/item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingApiService {
  apiUrl = "http://localhost:3000/items"

  constructor() { }

  // async -> await, since the action can take some time
  // async returns a promise
  async getItems(): Promise<Item[]> {
    const response = await fetch(this.apiUrl); // default fetch method
    const data = await response.json(); // get the data
    return data;
  }

  // delete method
  async deleteItem(id:number): Promise<void> {
    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: "DELETE"
    });
  }

  // put method
  async updateItem(item:Item): Promise<Item | void> {
    if (!item.id) {
      throw "No id specified for Shopping List Item";
    }
    const response = await fetch(`${this.apiUrl}/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item) // converting object to JSON string
    });
    const data = await response.json();
    return data;
  }

  // post method
  async createItem(item: Item): Promise<Item> {
    const response = await fetch(`${this.apiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    });
    const data = await response.json();
    return data;
  }
}
