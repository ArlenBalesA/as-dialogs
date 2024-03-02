# Asgard Scripts
- discord : https://discord.gg/wDCeJqp6ea
- tebex : https://asgardrp.tebex.io/
- github: https://github.com/ArlenBalesA

# Asgard Dialogs by ArlenBales
An all in one dialog and interaction menu that works flawlessly with built in text UI's, drawtext, prompts and target systems. Adds an intuitive way for players
to interact with NPC's, players, locations such as banks, stores etc.

Can be implemented to target systems and prompts very easily, below will be some examples for you to follow and to copy/paste.

# Dependancies
- None
- This is completely standalone, the examples are just using RSG as an example.

# Installation
- Drag and drop into your resources, make sure it is started

# Usage Example
- The following is the data that you can pass to the dialog script. Below I will show you how to implement it.
```
data = {
            name = "Name", -- first part of name, bolded in the UI
            name2 = "Name2", -- second part of name, not bolded
            dialog = "Text Here", -- main dialog text here, will appear under the name
            options = {
                { "Option1", "event", "event-type" }, --event is the name of the client or server event to trigger, event type is client, server or update (update must be used if you are linking to a second data pool to continue dialog and not triggering another event.)
                { "Option2", "event", "event-type" },
                { "Option3", "event", "event-type" },
                { "Option4", "", "close" }, -- This option closes the dialog
            },
            camCoords = vector3(x, y, z),
            camRotation = vector3(rotX, rotY, rotZ),
        }
        exports["as-dialog"]:DisplayDialog(data)
```
The following is an example to use in one of your client files to trigger the interaction menu with prompt (using rsg-banking as an example)
```
exports['rsg-core']:createPrompt(v.id, v.coords, RSGCore.Shared.Keybinds[Config.Keybind], 'Open '..v.name, {
            type = 'client',
            event = 'rsg-banking:client:Interact', -- this is from rsg-banking and will trigger another client event called 'rsg-banking:client:Interact'
        })
```
Below is the event handler to add into the same client
```
AddEventHandler("rsg-banking:client:Interact", function()
        data = {
            name = "Saint Denis",
            surname = "Bank",
            dialog = "What can I help you with?",
            options = {
                { "Talk To Teller", "event", "client" },
                { "Access Bank", "rsg-banking:client:OpenBanking", "client" },
                { "View Cheques", "event", "client" },
                { "Leave Conversation", "", "close" },
            },
            camCoords = vector3(x, y, z),
            camRotation = vector3(rotX, rotY, rotZ),
        }
        exports["as-dialog"]:DisplayDialog(data)
end)
```
To trigger a second dialog box with more options, simply change the event type to update and trigger another event like below:
```
AddEventHandler("rsg-banking:client:Interact", function()
        data = {
            name = "Saint Denis",
            surname = "Bank",
            dialog = "What can I help you with?",
            options = {
                { "Talk To Teller", "rsg-banking:teller", "update" },
                { "Access Bank", "rsg-banking:client:OpenBanking", "client" },
                { "View Cheques", "event", "client" },
                { "Leave Conversation", "", "close" },
            },
            camCoords = vector3(x, y, z),
            camRotation = vector3(rotX, rotY, rotZ),
        }
        exports["as-dialog"]:DisplayDialog(data)
end)
```
And the event being triggered
```
AddEventHandler("rsg-banking:teller", function()
        data = {
            name = "Saint Denis",
            surname = "Bank",
            dialog = "What can I help you with?",
            options = {
                { "Bla bla bla", "event", "client" },
                { "Bla bla bla", "event", "client" },
                { "Bla bla bla", "event", "client" },
                { "Leave Conversation", "", "close" },
            },
            camCoords = vector3(x, y, z),
            camRotation = vector3(rotX, rotY, rotZ),
        }
        exports["as-dialog"]:DisplayDialog(data)
end)
```
To use with a target system, the change is simply. Inside of the target export, simply trigger the interact event like below:
```
exports['rsg-target']:AddCircleZone("horseheist", vector3(2644.579, -1283.313, 52.24956), 1, {
    name = "Stranger",
    debugPoly = false,
    }, {
        options = {
        {
            type = "client",
            event = "Interact:Stranger",
            icon = "fas fa-comment",
            label = "Talk To Stranger",
        },
    },
    distance = 4.0,
})
```
And the events being triggered
```
AddEventHandler("Interact:Stranger", function()
    local playerPed = PlayerPedId()
    local pcoords = GetEntityCoords(playerPed)
    data = {
        name = "Mysterious",
        surname = "Stranger",
        dialog = "Shh. Keep it down. I've got something lined up and maybe just maybe, we can help each other.",
        options = {
            { "Tell me more...", "Interact:Stranger2", "update" },
            { "I don't think so buddy.", "", "close" }, -- just closing dialouge
        },
            camCoords = vector3(x, y, z),
            camRotation = vector3(rotX, rotY, rotZ),
    }
    exports["as-dialog"]:DisplayDialog(data)
end)
```
2nd part of interaction
```
AddEventHandler("Interact:Stranger2", function()
    local playerPed = PlayerPedId()
    local pcoords = GetEntityCoords(playerPed)
    data2 = {
        name = "Mysterious",
        surname = "Stranger",
        dialog = "This bastard wronged the wrong bastard and I want payback. I know the secret location of his prized and VERY expensive horse. You take his horse, sell it, keep the money and I get my revenge.",
        options = {
            { "Okay, I'm interested.", "Interact:Stranger3", "update" },
            { "How expensive...?", "Interact:Stranger4", "update" }, -- just closing dialouge
            { "No, I'll pass.", "", "close" }, -- just closing dialouge
        },
            camCoords = vector3(x, y, z),
            camRotation = vector3(rotX, rotY, rotZ),
    }
    exports["as-dialog"]:DisplayDialog(data2)
end)
```
3rd part of interaction
```
AddEventHandler("Interact:Stranger3", function()
    local playerPed = PlayerPedId()
    local pcoords = GetEntityCoords(playerPed)
    data2 = {
        name = "Mysterious",
        surname = "Stranger",
        dialog = "I have a feeling this is going to be an amazing partnership. Hand over your map and I'll mark the location that the horse is being kept. Keep in mind, there may be guards. Be ready to fight.",
        options = {
            { "*hand over map*", "Interact:Stranger3", "update" },
            { "Nevermind actually.", "", "close" },
        },
            camCoords = vector3(x, y, z),
            camRotation = vector3(rotX, rotY, rotZ),
    }
    exports["as-dialog"]:DisplayDialog(data2)
end)
```
4th part of interaction
```
AddEventHandler("Interact:Stranger4", function()
    local playerPed = PlayerPedId()
    local pcoords = GetEntityCoords(playerPed)
    data2 = {
        name = "Mysterious",
        surname = "Stranger",
        dialog = "Very expensive, life changing expensive. So are you in or out?.",
        options = {
            { "I'm in.", "Interact:Stranger3", "update" },
            { "I'm out.", "", "close" },
        },
            camCoords = vector3(x, y, z),
            camRotation = vector3(rotX, rotY, rotZ),
    }
    exports["as-dialog"]:DisplayDialog(data2)
end)
```
