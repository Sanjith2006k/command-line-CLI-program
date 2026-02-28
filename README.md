**📌 Priority List – CLI Task Manager**

A command-line task management tool built with Node.js, developed to meet the requirements of the Global Digital Corps Software Engineering Test Problem.

This CLI app allows you to:

✔ Add prioritized tasks
✔ View pending tasks sorted by priority
✔ Delete tasks
✔ Mark tasks as completed
✔ Generate a summary report

**🚀 Getting Started**

This project follows the official Global Digital Corps internship task specification from the OHC docs.
https://docs.ohc.network/docs/gdc-internship-admission-task/

**🧰 Prerequisites**

Before you begin, ensure you have Node.js installed:

📌 Download from: https://nodejs.org/en/

**📦 Installation**

1️⃣ Clone the repository:

    git clone https://github.com/Sanjith2006k/priority-list-cli.git
    cd javascript

2️⃣ Install dependencies:

    npm install
    
🔗 Create Executable Link

To run this CLI from the terminal, you need a symbolic link.

🪟 On Windows (run Command Prompt or PowerShell as Administrator)

Command Prompt:

    mklink task task.bat

PowerShell:

    cmd /c mklink task task.bat
    
🐧 On macOS / Linux

    ln -s task.sh task

🧪 Running Tests

Run the automated tests to verify functionality:

    npm test

Initially tests will fail until the functionality is fully implemented.

📋 Usage

After linking, run:

    ./task <command>

    
**📌 CLI Commands**


**🆘 Help
**
Displays usage help:

    ./task help
    
**➕ Add a Task**

    ./task add 2 "the thing i need to do"

    Output:
    Added task: "the thing i need to do" with priority 2

Tasks must be in quotes if they contain spaces.

**📄 List Pending Tasks**

    ./task ls

    Output example:
    1. change light bulb [2]
    2. water the plants [5]

**🗑️ Delete a Task**
Delete a pending task using its index:

    ./task del 3

If the index doesn’t exist:

    Error: item with index 5 does not exist. Nothing deleted.

✔ Mark Task Done

    ./task done 1

    Output:
    Marked item as done.
    If index is invalid:
    Error: no incomplete item with index 5 exists.

**📊 Generate Report**

    ./task report

    Output Example:
    Pending : 2
    1. task A [1]
    2. task B [4]
    
    Completed : 3
    1. done A
    2. done B
    3. done C

    
**📁 File Format & Storage**
📌 task.txt

Each pending task is stored as:

    priority task

Example:


    1 Buy milk
    2 Complete project

    
✔ completed.txt

Each completed task stores only the task description:

     Buy milk
    Complete project

    
**📌 Sorting & Priority Rules**

✔ Tasks are listed in ascending priority (lower number = higher priority)
✔ If two tasks share a priority, the earlier added task appears first
✔ App always reads from the current directory’s files (task.txt, completed.txt) without modifying source directories.

**🧠 Notes**

Designed as per GDC official specification

No external packages used beyond built-in Node.js modules

Error handling included for invalid operations

**🧑‍💻 Author**

S Sanjith Kumar
