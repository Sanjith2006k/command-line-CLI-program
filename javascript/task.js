/*
#Task Management CLI Application
1.the app should read and write to a task.txt file (we can use appendFile using fs)
2.and another text file name completed.txt file,where all the completed tasks are writted
3.Now to make this add we need 6 functions
   -to make a help(prints the CLI usage)
   -to make a list of pending work(ls)
   -to make a command for adding a new task
   -to amke a delete command to make and task deleted by its index
   -to make a done command for marking a task that are completed
   -to make a report command for show casing which are done and which are yet to be done...



   used splice to delete a task
   
   */
const fs = require("fs");
const tfile = "task.txt";
const cfile = "completed.txt";

function sorting(l) {
  l.sort((a, b) => {
    const prioA = parseInt(a.split(" ")[0]);
    const prioB = parseInt(b.split(" ")[0]);
    return prioA - prioB;
  });
}

function printtasks(l) {
  l.forEach((task, index) => {
    const x = task.split(" ");
    const prio = x[0];
    const t = x.slice(1).join(" ");

    console.log(`${index + 1}. ${t} [${prio}]`);
  });
}

function help() {
  console.log(`
Usage :-
$ ./task add 2 hello world    # Add a new item with priority 2 and text "hello world" to the list
$ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order
$ ./task del INDEX            # Delete the incomplete item with the given index
$ ./task done INDEX           # Mark the incomplete item with the given index as complete
$ ./task help                 # Show usage
$ ./task report               # Statistics
`);
}

function addTask(prio, task) {
  const tl = `${prio} ${task}\n`;

  fs.appendFile(tfile, tl, (err) => {
    if (err) throw err;
    console.log(`Added task: "${task}" with priority ${prio}`);
  });
}

function listTask() {
  fs.readFile(tfile, (err, data) => {
    if (err) {
      console.log("There are no pending tasks!");
      return;
    }
    const tasks = data.toString().trim().split("\n");
    if (data.length === 0) {
      console.log("There are no pending tasks!");
      return;
    }
    sorting(tasks);
    printtasks(tasks);
  });
}

function deleteTask(index) {
  fs.readFile(tfile, (err, data) => {
    if (err) {
      console.log("Error: Missing NUMBER for deleting tasks.");
      return;
    }
    const tasks = data.toString().trim().split("\n");
    if (index < 1 || index > tasks.length) {
      ind = index.toString();
      console.log(
        "Error: task with index #".trim() +
          ind +
          " does not exist. Nothing deleted."
      );
      return;
    }
    sorting(tasks);
    const deletedTask = tasks.splice(index - 1, 1);
    fs.writeFile(tfile, tasks.join("\n"), (err) => {
      if (err) throw err;
      ind = index.toString();
      console.log("Deleted task #" + ind);
    });
  });
}

function doneTask(index) {
  fs.readFile(tfile, (err, data) => {
    if (err) throw err;
    const tasks = data.toString().trim().split("\n");
    if (index < 1 || index > tasks.length) {
      ind = index.toString();

      console.log("Error: no incomplete item with index #" + ind + " exists.");
      return;
    }
    sorting(tasks);
    const completedTask = tasks
      .splice(index - 1, 1)[0]
      .split(" ")
      .slice(1)
      .join(" ");
    fs.appendFile(cfile, completedTask + "\n", (err) => {
      if (err) throw err;
      console.log("Marked item as done.");
    });
    fs.writeFile(tfile, tasks.join("\n") + "\n", (err) => {
      if (err) throw err;
    });
  });
}
function report() {
  fs.readFile(tfile, (err, data) => {
    if (err) throw err;
    const pendingTasks = data
      .toString()
      .trim()
      .split("\n")
      .filter((line) => line.trim() !== "").length;
    const task1 = data
      .toString()
      .trim()
      .split("\n")
      .filter((line) => line.trim() !== "");
    sorting(task1);
    console.log(`Pending : ${pendingTasks}`);
    task1.forEach((task, index) => {
      const x = task.split(" ");
      const prio = x[0];
      const t = x.slice(1).join(" ");

      console.log(`${index + 1}. ${t} [${prio}]\n`);
    });

    fs.readFile(cfile, (err, data) => {
      if (err) throw err;
      const completedTasks = data
        .toString()
        .trim()
        .split("\n")
        .filter((line) => line.trim() !== "").length;
      const task2 = data
        .toString()
        .trim()
        .split("\n")
        .filter((line) => line.trim() !== "");
      sorting(task2);

      console.log(`Completed : ${completedTasks}`);
      task2.forEach((task, index) => {
        const x = task.split(",");

        console.log(`${index + 1}. ${x}`);
      });
    });
  });
}

const args = process.argv.slice(2);
if (args[0] === "help") {
  help();
} else if (args[0] === "add") {
  const prio = args[1];
  const task = args.slice(2).join(" ");
  addTask(prio, task);
  if (args.length < 2 || isNaN(args[1])) {
    console.log("Error: Missing tasks string. Nothing added!");
    return;
  }
} else if (args[0] === "ls") {
  listTask();
} else if (args[0] === "del") {
  deleteTask(parseInt(args[1]));
} else if (args[0] === "done") {
  if (args.length < 2 || isNaN(args[1])) {
    console.log("Error: Missing NUMBER for marking tasks as done.");
    return;
  }
  doneTask(parseInt(args[1]));
} else if (args[0] === "report") {
  report();
} else {
  help();
}
