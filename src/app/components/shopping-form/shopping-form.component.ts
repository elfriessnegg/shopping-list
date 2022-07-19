import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Item from 'src/app/modules/item';

@Component({
  selector: 'app-shopping-form',
  templateUrl: './shopping-form.component.html',
  styleUrls: ['./shopping-form.component.css']
})
export class ShoppingFormComponent implements OnInit {

  /* Output is needed to bring actions to the next highest level (i.e. the shopping list): */
  @Output() onItemAddEvent = new EventEmitter<Item>();
  @Output() onItemFilterEvent = new EventEmitter<string>();
  @Output() onItemSortEvent = new EventEmitter<string>();

  // initialization of variables:
  model = new Item(0, "", 0);
  selectedOption: string = "";
  selectedSortOption: string = "";

  /* the following link helped to create the selection: https://material.angular.io/components/list/overview */
  whichUnit: string[] = ['Kilogramm', 'Dekagramm', 'Gramm', 'Liter', 'Milliliter', 'Stück', 'Tafel', 'Kiste', 'Packung'];
  filterOptions: string[] = ["all", "done", "not done"];
  sortOptions: string[] = ["by Id", "by Title", "by Unit"];

  constructor() { }

  ngOnInit(): void {
  }

  /* if the form is filled out, a new item is added to the list. Title and amount are required. */
  btnAddItem() {
    if (this.model.title === "") {
      alert("Please provide a title for the new item.");
      return;
    }
    if (this.model.amount === 0) {
      alert(`Please provide an amount for ${this.model.title}.`);
      return;
    }
    this.onItemAddEvent.emit(this.model);
    this.model = new Item(0, "", 0);
  }

  // if a filter option is chosen, actions will be taken to the next level
  filterItems() {
    const filterOption = this.selectedOption;
    if (filterOption === "") {
      alert("Please chose an option to filter for.");
      return;
    }
    this.onItemFilterEvent.emit(filterOption);
  }

  // same: if a sort option is chosen, actions will be taken to the next level
  sortFunction() {
    const sortOption = this.selectedSortOption;
    if (sortOption === "") {
      alert("Please chose an option to sort by.");
      return;
    }
    this.onItemSortEvent.emit(sortOption);
  }
}
