import * as builder from "botbuilder";
import { TriggerActionDialog } from "../../../utils/TriggerActionDialog";
import { DialogIds } from "../../../utils/DialogIds";
import { DialogMatches } from "../../../utils/DialogMatches";
import { Strings } from "../../../locale/locale";
import { request } from 'http';

export class FailingGradesDialog extends TriggerActionDialog 
{

    private static async step1(session: builder.Session, args?: any | builder.IDialogResult<any>, next?: (args?: builder.IDialogResult<any>) => void): Promise<void> 
    {
        const https = require('https');
        var FailingList = "Your students that have a failing grade are:<br>"
        var data2 = [];

        //refactor this to use student token instead of global token?8[[y]
        https.get('https://canvas.instructure.com/api/v1/courses/1845971/analytics/assignments?access_token=7~6a2J9SqGLbvKIzXUa2tGjnD2kkCpYWSsxWA8cc695YgTSVKhLR0fg5khbvuXiHs3', (resp) =>
        //https.get('https://canvas.instructure.com/api/v1/courses/1845971/users?access_token=7~6a2J9SqGLbvKIzXUa2tGjnD2kkCpYWSsxWA8cc695YgTSVKhLR0fg5khbvuXiHs3', (resp) => 
        {
          let data = '';
          resp.on('data', (chunk) => {
            data += chunk;
          });

          resp.on('end', () => 
          {
            data2 = JSON.parse(data);
            data2.forEach(function(student) 
              {
              var sName = student.name;
             FailingList = FailingList + sName +"<br>"
              });
             session.send(FailingList);
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
            DialogIds.FailingGradesDialogId,
            DialogMatches.FailingGradesDialogMatch,
            FailingGradesDialog.step1,
        );
    }
}
