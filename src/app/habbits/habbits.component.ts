import { Component, OnInit } from '@angular/core';
import { Habbit } from '../habbit-interface';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-habbits',
  templateUrl: './habbits.component.html',
  styleUrls: ['./habbits.component.scss']
})

export class HabbitsComponent implements OnInit {

  habbits: Habbit[] = [
    { habbit: 'Почистити зуби', done: false },
    { habbit: 'Ходити пішки 1 годину', done: false },
    { habbit: 'Віджимання 5 раз', done: false },
    { habbit: 'Біг 15 хвилин', done: false },
    { habbit: 'Випити 2л води', done: false }
  ];

  results = [
    { name: 'В процесі', value: 0 },
    { name: 'Виконано', value: 0 }
  ]
  
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.habbits, event.previousIndex, event.currentIndex);
  }

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem('choosed') !== null) {
      this.habbits = JSON.parse(localStorage.getItem('choosed') || '');
    }
    this.changePieChart();
  }

  changePieChart() {
    this.results[0].value = 0;
    this.results[1].value = 0;
    for (let i = 0; i < this.habbits.length; i++) {
      if (this.habbits[i].done == false) {
        this.results[0].value += 1;
      }
      else {
        this.results[1].value += 1;
      }
    }
    this.results = [...this.results]
    console.log(this.results)
  }

  add(habbit: any) {
    this.habbits.push({ habbit: habbit, done: false });
    this.changePieChart();
  }

  delete(habbit: any) {
    this.habbits = this.habbits.filter(h => h !== habbit);
    this.changePieChart();
  }

  trackByFn(index: any) {
    return index;
  }

  show(i: any) {
    let shown = document.getElementById(i)
    if (shown?.className.includes('hidden')) {
      return shown?.classList.remove('hidden')
    }
    else {
      shown?.classList.add('hidden')
    }

  }

  changeCondition() {
    let checked = document.getElementsByTagName('input');
    for (let i = 0; i < checked.length; i++) {
      if (checked[i].type == 'checkbox' && checked[i].checked == false) {
        this.habbits[i / 2 - 1].done = false;
      }
      if (checked[i].type == 'checkbox' && checked[i].checked == true) {
        this.habbits[i / 2 - 1].done = true;
      }
    }
    this.changePieChart()
  }

  reset() {
    let checkboxes = document.getElementsByTagName('input');
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].type == 'checkbox') {
        checkboxes[i].checked = false;
        this.habbits[i / 2 - 1].done = false;

      }
    }
    this.changePieChart()
  }

  saveChoosed() {
    localStorage.setItem('choosed', JSON.stringify(this.habbits))
  }

}

