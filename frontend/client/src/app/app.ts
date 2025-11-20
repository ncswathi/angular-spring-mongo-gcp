import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TaskService } from './task.service';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ButtonModule,TableModule],  
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  protected readonly title = signal('client');
  service=signal('task-service');
  // tasks = [
  //   { id: 1, title: 'Task 1', description: 'First task', status: 'Pending' },
  //   { id: 2, title: 'Task 2', description: 'Second task', status: 'Completed' },
  //   { id: 3, title: 'Task 3', description: 'Third task', status: 'In Progress' }
  // ];
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
