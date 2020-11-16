import Handlebars from "handlebars";

import * as argoCommands from "./argoCommands";

const prOpenedSource: string = `Hi, I'm a bot that helps with Kubernetes deployments. Invoke me via \`{{ BotCommand }}\` on PRs.

* :mag: To show a diff for a specific app, comment:
    * \`{{ BotCommand }} {{ BotActions.Diff }} {{ BotDiffActions.App }} <app_name>\`
* :ledger: To show a diff for all apps, comment:
    * \`{{ BotCommand }} {{ BotActions.Diff }}\`
* :question: To show full help for argo, comment:
    * \`{{ BotCommand }} {{ BotActions.Help }}\`

`;

const template = Handlebars.compile(prOpenedSource);

export let prOpenedComment: string = template(argoCommands);
