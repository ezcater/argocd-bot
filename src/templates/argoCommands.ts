export let BotCommand: string = "argo";

export let BotActions: object = Object.freeze({
    Diff: "diff",
    Help: "help",
    History: "history",
    Info: "info",
    Preview: "preview",
    Rollback: "rollback",
    Sync: "sync",
    Unlock: "unlock",
});

export let BotDiffActions: object = Object.freeze({
    All: "--all",
    App: "--app",
    AppShort: "-a",
    AutoSync: "--auto-sync",
    Dir: "--dir",
    DirShort: "-d",
});
