import Engineer from "./lib/Engineer.js";
import Intern from "./lib/Intern.js";
import Manager from "./lib/Manager.js";
import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import render from './lib/htmlRender.js';
import { Console } from "console";

let Team = [];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const output_dir = path.resolve(__dirname, "dist");
const outputPath = path.join(output_dir, "team.html");

var managerCounter = 0;

const teamMembers = {
  Manager: [
    {
      type: "input",
      message: "Cual es el nombre del gerente?",
      name: "managerName",
    },
    {
      type: "input",
      message: "Cual es el id del gerente?",
      name: "managerId",
    },
    {
      type: "input",
      message: "Cual es el email del gerente?",
      name: "managerEmail",
    },
    {
      type: "input",
      message: "Cual es el numero de la oficina del gerente?",
      name: "officeNumber",
    },
  ],

  Engineer: [
    {
      type: "input",
      message: "Cual es el nombre del ingeniero?",
      name: "engineerName",
    },
    {
      type: "input",
      message: "Cual es el id del ingeniero?",
      name: "engineerId",
    },
    {
      type: "input",
      message: "Cual es el email del ingeniero?",
      name: "engineerEmail",
    },
    {
      type: "input",
      message: "Cual es el gitHun del ingeniero?",
      name: "gitHub",
    },
  ],

  Intern: [
    {
      type: "input",
      message: "Cual es el nombre del interno?",
      name: "internName",
    },
    {
      type: "input",
      message: "Cual es el id del interno?",
      name: "internId",
    },
    {
      type: "input",
      message: "Cual es el email del interno?",
      name: "internEmail",
    },
    {
      type: "input",
      message: "A que escuela asiste el interno?",
      name: "school",
    },
  ],
};

function start() {
  let promptModule = inquirer.createPromptModule();

  promptModule(addNew).then((answer) => {
    if (answer.addMember == "Si" || answer.addMember == "si") {
      addRole();
    } else {
      fs.writeFileSync(outputPath, render(Team), "utf-8");
      console.log("Template generated.")
      process.exit(0);
    }
  });
}

const addNew = {
  type: "List",
  message: "Quieres agregar a un integrante mas?",
  name: "addMember",
  choices: ["Si", "No"],
};

const employeeQuestion = {
  type: "list",
  message: "Cual es el role del empleado",
  name: "employeeChoice",
  choices: ["Gerente", "Ingeniero", "Interno"],
};

function addRole() {
  let prompt = inquirer.createPromptModule();

  prompt(employeeQuestion).then((answer) => {
    if (answer.employeeChoice === "Gerente" && managerCounter < 1) {
      managerCounter++;
      inquirer.prompt(teamMembers.Manager).then((results) => {
        const manager = new Manager(
          results.managerName,
          results.managerId,
          results.managerEmail,
          results.officeNumber
        );
        Team.push(manager);
        start();
      });
    } else if (answer.employeeChoice === "Ingeniero") {
      inquirer.prompt(teamMembers.Engineer).then((results) => {
        const engineer = new Engineer(
          results.engineerName,
          results.engineerId,
          results.engineerEmail,
          results.gitHub
        );
        Team.push(engineer);
        start();
      });
    } else if (answer.employeeChoice === "Interno") {
      inquirer.prompt(teamMembers.Intern).then((results) => {
        const intern = new Intern(
          results.internName,
          results.internId,
          results.internEmail,
          results.school
        );
        Team.push(intern);
        start();
      });
    } else {
      start();
    }
  });
}

start();
