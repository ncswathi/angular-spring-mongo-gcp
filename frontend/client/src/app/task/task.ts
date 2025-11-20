import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-task',
  imports: [ButtonModule, TableModule, RouterOutlet],
  templateUrl: './task.html',
  styleUrl: './task.scss',
})

export class TaskListComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe({
      next:    (data) => this.tasks = data,
      error: (err) => console.error('Error fetching tasks', err)
    });
  }
}
