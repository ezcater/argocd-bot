module.exports = {
    handlePrClosed,
    handlePrComment,
    handlePrOpened,
};

import type { Context } from "probot";
import { ArgoBot } from "./argo-bot";
import { PrLock } from "./singleton-pr-lock";

import * as getConfig from "probot-config";

// TODO use yaml file instead of node env in the future
/*const CONFIG_FILE = "argocd-bot.yaml"
const DEFAULT_CONFIG = {
  reposDir: "repos"
}*/

async function handlePrClosed(context: Context, config) {
    const prNumber = context.payload.pull_request.number;

    context.log("handlePrClosed, pr#" + prNumber);

    const lock = new PrLock();
    const unlockStatus = lock.unlock(prNumber);
    context.log("handlePrClosed, unlockStatus=" + unlockStatus);
}

async function handlePrComment(context: Context, config) {
    // strip away new lines from the comment string if any exist
    let prComment: string = context.payload.comment.body.replace(/(\r\n|\n|\r)/gm, "");
    // replace multiple spaces with a single space
    prComment = prComment.replace(/\s\s+/g, " ");
    const prNumber = context.payload.issue.number;

    context.log("handlePrComment, pr#" + prNumber);
    if (!ArgoBot.isBotCommand(prComment)) {
        context.log("Received a non-bot command=" + prComment + "; ignoring!");
        return;
    }

    const repo = context.payload.repository;
    const bot = new ArgoBot(context);
    await bot.handleCommand(prComment);
}

async function handlePrOpened(context: Context) {
    const bot = new ArgoBot(context);
    await bot.handleOpenedPr();
}
