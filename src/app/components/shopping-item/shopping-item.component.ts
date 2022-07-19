import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Item from 'src/app/modules/item';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css']
})
export class ShoppingItemComponent implements OnInit {

  // Input from one level below, the shopping list items:
  @Input() item!: Item;

  // Output to the shopping list:
  @Output() onItemDeleteEvent = new EventEmitter<number>();
  @Output() onItemUpdateEvent = new EventEmitter<Item>();

  constructor() { }

  ngOnInit(): void {
  }

  // if the delete-process is confirmed, actions will be taken to the next level
  onDelete() {
    /* for the confirmation window: https://stackoverflow.com/questions/41684114/easy-way-to-make-a-confirmation-dialog-in-angular */
    if (window.confirm(`Are sure you want to delete ${this.item.title}?`)) {
      this.onItemDeleteEvent.emit(this.item.id);
    }
  }

  /* depending on whether the item is done or not, the text on the toggle-button will appear differently */
  getButtonText() {
    if (this.item.done) {
      return "Mark as not done";
    } else {
      return "Mark as done";
    }
  }

  /* the status of the item is changed (done <--> not done) and the information is given to the next upper level */
  toggleDone() {
    this.item.done = !this.item.done;
    this.onItemUpdateEvent.emit(this.item);
  }

  // a hyphen is only inserted, when there is a description
  getHyphen() {
    if (this.item.description) {
      return " - ";
    } else {
      return;
    }
  }
}
