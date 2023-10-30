<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Task Tracker</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }

        .container {
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            padding: 20px;
            width: 300px;
            text-align: center;
        }

        h1 {
            font-size: 24px;
            margin: 0;
        }

        .progress-bar {
            background-color: #ccc;
            border-radius: 5px;
            height: 20px;
            margin: 10px 0;
            position: relative;
        }

        .progress {
            background-color: #4CAF50;
            height: 100%;
            width: 0;
            border-radius: 5px;
        }

        ul {
            list-style: none;
            padding: 0;
        }

        li {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
        }

        input[type="text"],
        input[type="number"] {
            width: 60%;
        }

        button {
            background-color: #4CAF50;
            color: white;
            border: none;
            padding: 8px 12px;
            cursor: pointer;
        }

        button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Task List</h1>
        <div class="progress-bar">
            <div class="progress" id="progress"></div>
        </div>
        <ul id="task-list">
            <!-- Task items will be added dynamically here -->
        </ul>
        <div>
            <input type="text" id="task-input" placeholder="Add a new task">
            <input type="number" id="estimated-hours" placeholder="Estimated Man Hours">
            <button id="add-task">Add Task</button>
        </div>
        <p>Days Until Launch: <span id="days-until-launch">0</span></p>
    </div>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const progress = document.getElementById('progress');
            const taskList = document.getElementById('task-list');
            const taskInput = document.getElementById('task-input');
            const estimatedHoursInput = document.getElementById('estimated-hours');
            const addTaskButton = document.getElementById('add-task');
            const daysUntilLaunch = document.getElementById('days-until-launch');

            let completedTasks = 0;
            let totalTasks = 0;
            let daysToLaunch = 0; // Initialize daysToLaunch

            addTaskButton.addEventListener('click', function() {
                const taskText = taskInput.value.trim();
                const estimatedHours = estimatedHoursInput.value.trim();

                if (taskText === '' || estimatedHours === '') return;

                // Create a new task item
                const taskItem = document.createElement('li');
                taskItem.innerHTML = `
                    <span>${taskText}</span>
                    <span>Estimated Hours: ${estimatedHours}</span>
                    <button>Mark as Completed</button>
                `;

                // Add the task to the list
                taskList.appendChild(taskItem);

                // Increment the total task count
                totalTasks++;

                // Update the progress bar
                updateProgressBar();

                // Calculate days to launch and update the text
                daysToLaunch = Math.ceil(totalTasks * estimatedHours / 8) + Math.floor(totalTasks / 5) * 2;
                daysUntilLaunch.textContent = daysToLaunch;

                // Reset the input fields
                taskInput.value = '';
                estimatedHoursInput.value = '';

                // Add click event to the "Mark as Completed" button
                const markAsCompletedButton = taskItem.querySelector('button');
                markAsCompletedButton.addEventListener('click', function() {
                    completedTasks++;
                    taskItem.style.textDecoration = 'line-through';
                    taskItem.style.color = 'gray';
                    this.disabled = true;

                    // Update the progress bar when a task is marked as completed
                    updateProgressBar();

                    // Recalculate days to launch when a task is marked as completed
                    daysToLaunch = Math.ceil((totalTasks - completedTasks) * estimatedHours / 8) + Math.floor((totalTasks - completedTasks) / 5) * 2;
                    daysUntilLaunch.textContent = daysToLaunch;
                });
            });

            function updateProgressBar() {
                const completionPercentage = (completedTasks / totalTasks) * 100;
                progress.style.width = completionPercentage + '%';
            }
        });
    </script>
</body>
</html>
