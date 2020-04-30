import * as builder from "botbuilder";
import { TriggerActionDialog } from "../../../utils/TriggerActionDialog";
import { DialogIds } from "../../../utils/DialogIds";
import { DialogMatches } from "../../../utils/DialogMatches";
import { Strings } from "../../../locale/locale";
//import { request } from 'http';

export class ExtendDueDateDialog extends TriggerActionDialog 
{
    //Asks for asssignment name in teams
    private static async step1(session: builder.Session, args?: any | builder.IDialogResult<any>, next?: (args?: builder.IDialogResult<any>) => void): Promise<void> 
    {
        builder.Prompts.text(session, "What is the assignment name?");
    }

    //stores assignment name, makes get request to determine id for PUT request, and asks for days extension
    private static async step2(session: builder.Session, args?: any | builder.IDialogResult<any>, next?: (args?: builder.IDialogResult<any>) => void): Promise<void> 
    {
        var aName = args.response;
        var rp = require('request-promise');
        var options = {
            uri: 'https://canvas.instructure.com/api/v1/courses/1845971/assignments',
            headers: {
                'User-Agent': 'Request-Promise',
                "Authorization": "Bearer 7~6a2J9SqGLbvKIzXUa2tGjnD2kkCpYWSsxWA8cc695YgTSVKhLR0fg5khbvuXiHs3"
            },
            json: true
        };

        await rp(options).then(function (repos) {
          //console.log(repos);
            repos.forEach(function(assn) 
            {
              if(assn.name == aName)
              {
                session.userData.assnID = assn.id;
                session.userData.oldDate = assn.due_at
              }
            });
      }).catch(function (err) {
          console.log(err);
      });
      builder.Prompts.number(session, "How many days would you like to extend the assignment?");
    }

    private static async step3(session: builder.Session, args?: any | builder.IDialogResult<any>, next?: (args?: builder.IDialogResult<any>) => void): Promise<void> 
    {
        session.userData.assnDays = args.response;
        builder.Prompts.text(session, "Type \'All\' or Name the student.");
    }
    
    //Send PUT request that updates old date by days entered
    private static async step4(session: builder.Session, args?: any | builder.IDialogResult<any>, next?: (args?: builder.IDialogResult<any>) => void): Promise<void> {
      
        session.userData.assnGroup = args.response;
        var aDays = session.userData.assnDays;
        var aGroup = session.userData.assnGroup;
        var aID = session.userData.assnID;
        var aOD = new Date(session.userData.oldDate);
        aOD.setDate(aOD.getDate() + parseInt(aDays,10));
        var sDate = aOD.toISOString();
        
        var rp = require('request-promise');
        var options;
        if(aGroup == "All")
        {
            options = {
                method: 'PUT',
                uri: 'https://canvas.instructure.com/api/v1/courses/1845971/assignments/'+aID,
                body:
                {
                    "assignment": 
                    {
                      "due_at": sDate
                    }
                },
                headers: {
                    'User-Agent': 'Request-Promise',
                    "Authorization": "Bearer 7~6a2J9SqGLbvKIzXUa2tGjnD2kkCpYWSsxWA8cc695YgTSVKhLR0fg5khbvuXiHs3"
                },
                json: true
            };
        }
        else
        {  
            //Make GET request to find student ID based on name entered
            var stuID;
            var stu = {
            uri: 'https://canvas.instructure.com/api/v1/courses/1845971/users',
            headers: {
                'User-Agent': 'Request-Promise',
                "Authorization": "Bearer 7~6a2J9SqGLbvKIzXUa2tGjnD2kkCpYWSsxWA8cc695YgTSVKhLR0fg5khbvuXiHs3"
            },
            json: true
            };

              await rp(stu).then(function (repos) {
                //console.log(repos);
                  repos.forEach(function(data) 
                  {
                    if(data.name == aGroup)
                    {
                        stuID = data.id;
                    }
                  });
            }).catch(function (err) {
                console.log(err);
            });
          
            options = {
                method: 'POST',
                uri: 'https://canvas.instructure.com/api/v1/courses/1845971/assignments/'+aID+'/overrides',
                body:
                {
                    "assignment_override": 
                    {
                      "due_at": sDate,
                      "student_ids":[
                        stuID
                      ]
                    }
                },
                headers: {
                    'User-Agent': 'Request-Promise',
                    "Authorization": "Bearer 7~6a2J9SqGLbvKIzXUa2tGjnD2kkCpYWSsxWA8cc695YgTSVKhLR0fg5khbvuXiHs3"
                },
                json: true
            };
        }
        
        await rp(options).then(function (repos) {
          console.log(repos);
      }).catch(function (err) {
          console.log(err);
      });

        builder.Prompts.text(session, "Due date has been updated.");
    }
    
    constructor(
        bot: builder.UniversalBot,
    ) {
        super(bot,
            DialogIds.ExtendDueDateDialogId,
            DialogMatches.ExtendDueDateDialogMatch,
            [
              ExtendDueDateDialog.step1,
              ExtendDueDateDialog.step2,
              ExtendDueDateDialog.step3,
              ExtendDueDateDialog.step4,
            ],
        );
    }
}
