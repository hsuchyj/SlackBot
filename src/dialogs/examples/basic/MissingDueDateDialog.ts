import * as builder from "botbuilder";
import { TriggerActionDialog } from "../../../utils/TriggerActionDialog";
import { DialogIds } from "../../../utils/DialogIds";
import { DialogMatches } from "../../../utils/DialogMatches";
import { Strings } from "../../../locale/locale";
import { request } from 'http';

export class MissingDueDateDialog extends TriggerActionDialog 
{

    private static async step1(session: builder.Session, args?: any | builder.IDialogResult<any>, next?: (args?: builder.IDialogResult<any>) => void): Promise<void> 
    {
        const https = require('https');
        var assignmentList = "Your assignments are:<br>"
        var data2 = [];
        let assignments_noDueDates = new Array();

        //refactor this to use student token instead of global token?8[[y]
        https.get('https://canvas.instructure.com/api/v1/courses/1845971/assignments?access_token=7~6a2J9SqGLbvKIzXUa2tGjnD2kkCpYWSsxWA8cc695YgTSVKhLR0fg5khbvuXiHs3', (resp) => 
        {
          let data = '';
          resp.on('data', (chunk) => {
            data += chunk;
          });

          resp.on('end', () => 
          {
            data2 = JSON.parse(data);
            data2.forEach(function(assignment) 
              {
              if(assignment.due_at == null){
                 var aName = assignment.name;
                 assignmentList = assignmentList + aName +"<br>";
                //signments_noDueDates.push(aName);
              }
              });
            /*(assignments_noDueDates.length <= 1)
              assignmentList += "Yes, there are assignments missing due dates."*/
             session.send(assignmentList);
          });
          
            }).on("error", (err) => {
          console.log("Error: " + err.message);
        });
        session.endDialog();
    }
    
    constructor(
        bot: builder.UniversalBot,
    ) {
        super(bot,
            DialogIds.MissingDueDateDialogId,
            DialogMatches.MissingDueDateDialogMatch,
            MissingDueDateDialog.step1,
        );
    }
}
