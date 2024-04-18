#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";


let userId: string = " ";
const userPin: number = 9876;
let current_balance: number = 21000;

//Username asking. 
const userName_ans = await inquirer.prompt({
  name: "usr_name",
  type: "input",
  message: chalk.yellow("\nWhat is Your Good Name !"),
});

if (
  userName_ans.usr_name !== undefined &&
  userName_ans.usr_name !== null &&
  userName_ans.usr_name !== ""
) {
  userId = userName_ans.usr_name;
}

//functions 
async function atm_func() {
  console.log(chalk.yellow.bold("\n\t  Welcome to ATM ! \n"));

  const pin_ans = await inquirer.prompt({
    name: "pin",
    type: "number",
    message: chalk.red("Enter your 4-Digit pin code."),
  });

  if (pin_ans.pin === userPin) {
    console.log(
      chalk.green.bold(`\n\t Hello ${userId}, welcome to the ATM.\n`)
    );

    console.log(
    (` Your Current Balance is: ${current_balance}\n`)
    );

    let anotherTransaction = true;

    while (anotherTransaction) {
      const Choices = await inquirer.prompt([
        {
          type: "list",
          name: "options",
          message: chalk.red.bold("Please select an option:"),
          choices: [
            
            "Cash Withdraw",
            "Balance Check",
            "Fast Cash",
          ],
        },
      ]);

    
    //  Cash-Withdraw 
     if (Choices.options === "Cash Withdraw") {
        const Withdraw_ans = await inquirer.prompt([
          {
            type: "number",
            name: "amount",
            message: "Enter the amount to withdraw:",
          },
        ]);

        if (Withdraw_ans.amount < current_balance && Withdraw_ans.amount > 0) {
          console.log(`\nWithdrawn $${Withdraw_ans.amount} from your account.`);
          console.log(
            (
              `\n $ Your Current Balance is: $${
                current_balance - Withdraw_ans.amount
              }\n`
            )
          );
        } else {
          console.log(
            chalk.red.bold(`\n\t Insufficient balance or Invalid Amount.`)
          );
        }
      }

      //  Balance check 
      else if (Choices.options === "Balance Check") {
        console.log(
        (
            `\n $ Your Current Balance is: $${current_balance}\n`
          )
        );
      }

       //  Fast cash 
      else if (Choices.options === "Fast Cash") {
        const fast_cash = await inquirer.prompt([
          {
            type: "list",
            name: "options",
            message: chalk.red.bold("Please select an option:"),
            choices: [
              "- Withdraw: $1000",
              "- Withdraw: $2000",
              "- Withdraw: $5000",
            ],
          },
        ]);

        if (current_balance >= 1000) {
          if (fast_cash.options === "- Withdraw: $1000") {
            console.log(`\nWithdrawn $1000 from your account.`);
            console.log(
            (
                `\n Your Current Balance is: $${current_balance - 1000}\n`
              )
            );
          } else if (fast_cash.options === "- Withdraw: $2000") {
            console.log(`\nWithdrawn $2000 from your account.`);
            console.log(
              (
                `\n Your Current Balance is: $${current_balance - 2000}\n`
              )
            );
          } else if (fast_cash.options === "- Withdraw: $5000") {
            console.log(`\nWithdrawn $5000 from your account.`);
            console.log(
              (
                `\n Your Current Balance is: $${current_balance - 5000}\n`
              )
            );
          }
        } else {
          console.log(
            chalk.red.bold(`\n\t Insufficient balance or Invalid Amount.`)
          );
        }
      }

      const confirmation_ans = await inquirer.prompt({
        type: "confirm",
        name: "user_confirmation",
        message: chalk.red.bold("Do you want to do another transaction.? "),
      });

      if (confirmation_ans.user_confirmation === false) {
        anotherTransaction = false;
      }
    }

    console.log(
      chalk.yellow.bold(
        "\n\t Thank you for using the ATM. Have a great day! 😃"
      )
    );

    process.exit();// Code for program end
  }
}

atm_func();