let allTasks = [
    {
      "id": 1,
      "category": "user-story",
      "description": "Build start page with recipe recommendation",
      "dueDate": "2024-03-03",
      "priority": {
        "low": false,
        "medium": true,
        "urgent": false
      },
      "subtask": [
        { "name": "works", "status": false },
        { "name": "other stuff", "status": false }
      ],
      "titel": "Kochwelt Page & Recipe Recommender",
      "userList": [{
        "fname": "Klaus",
        "lname": "Kruse",
        "backgroundcolor": "#FF5733"
      }, {
        "fname": "Berthold",
        "lname": "Wiebe",
        "backgroundcolor": "#33FF4F"
      }],
      "progressfield": "inprogress_container"
    },
    {
      "id": 2,
      "category": "technical-task",
      "description": "Create reusable HTML base templates",
      "dueDate": "2024-03-15",
      "priority": {
        "low": true,
        "medium": false,
        "urgent": false
      },
      "subtask": [
        { "name": "a lot to do", "status": false },
        { "name": "go ahead", "status": true }
      ],
      "titel": "HTML Base Template Creation",
      "userList": [{
        "fname": "Frank",
        "lname": "Bülling",
        "backgroundcolor": "#FFDA33"
      }, {
        "fname": "Johanna",
        "lname": "Held",
        "backgroundcolor": "#3633FF"
      }, {
        "fname": "Viktor",
        "lname": "Schmidt",
        "backgroundcolor": "#33FF74"
      }],
      "progressfield": "await_feedback_container"
    },
    {
      "id": 3,
      "category": "technical-task",
      "description": "Create contact form and imprint page...",
      "dueDate": "2024-03-01",
      "priority": {
        "low": false,
        "medium": true,
        "urgent": false
      },
      "subtask": [
        { "name": "meetings", "status": true },
        { "name": "work together", "status": true },
        { "name": "have fun", "status": false }
      ],
      "titel": "Contact Form & Imprint",
      "userList": [{
        "fname": "Stefan",
        "lname": "Dietz",
        "backgroundcolor": "#33FF7A"
      }, {
        "fname": "Horst",
        "lname": "Schleifenbaum",
        "backgroundcolor": "#FFF033"
      }, {
        "fname": "Detlef",
        "lname": "Sierts",
        "backgroundcolor": "#AFFF33"
      }],
      "progressfield": "await_feedback_container"
    },
    {
      "id": 4,
      "category": "user-story",
      "description": "Define CSS naming conventions and structure",
      "dueDate": "2024-03-10",
      "priority": {
        "low": false,
        "medium": false,
        "urgent": true
      },
      "subtask": [
        { "name": "meetings", "status": true },
        { "name": "work together", "status": true },
        { "name": "have fun", "status": true }
      ],
      "titel": "Define Architecture Planning",
      "userList": [{
        "fname": "Waldemar",
        "lname": "Günther",
        "backgroundcolor": "#B833FF"
      }, {
        "fname": "Fabian",
        "lname": "Zacharias",
        "backgroundcolor": "#FF9F33"
      }, {
        "fname": "Jessica",
        "lname": "Engels",
        "backgroundcolor": "#33A5FF"
      }],
      "progressfield": "done_container"
    }
  ];