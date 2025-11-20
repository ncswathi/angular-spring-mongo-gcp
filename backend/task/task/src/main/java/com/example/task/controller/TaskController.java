package com.example.task.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.task.model.Task;
import com.example.task.repository.TaskRepository;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin("*")
public class TaskController {

    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Autowired
    private MongoTemplate mongoTemplate;

    @GetMapping("/test")
    public String testMongo() {
        boolean exists = mongoTemplate.collectionExists("taskcollection");
        long count = mongoTemplate.getCollection("taskcollection").countDocuments();
        return "Collection exists: " + exists + ", Documents: " + count;
    }

    // ➤ Get all tasks
    @GetMapping
    public List<Task> getAllTasks() {
        System.out.println("Getting all tasks");
        return taskRepository.findAll();
    }

    // ➤ Add a new task
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskRepository.save(task);
    }
}