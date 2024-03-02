local cam = nil
inMenu = false

RegisterNUICallback('action', function(data, cb)
	if data.action == 'close' then
		SetNuiFocus(false, false)
		EndCam()
		inMenu = false
	elseif data.action == 'option' then
		if data.options[3] == 'client' then
			TriggerEvent(data.options[2])
		elseif data.options[3] == 'server' then
			TriggerServerEvent(data.options[2])
		elseif data.options[3] == "update" then
			TriggerEvent(data.options[2])
		elseif data.options[3] == "close" then
			SendNUIMessage({
				action = 'closeDialog'
			})
			SetNuiFocus(false, false)
			EndCam()
			inMenu = false
		end	

		if data.options[3] == 'client' or data.options[3] == 'server' then
			SendNUIMessage({
				action = 'closeDialog',
			})
			SetNuiFocus(false, false)
			EndCam()
			inMenu = false
		end
	end
end)

function DisplayDialog(data)
	inMenu = true
	SetNuiFocus(true, true)
	StartCam(data.camCoords, data.camRotation)
	SendNUIMessage({
		action = 'openDialog',
		name = data.name,
		name2 = data.name2,
		profession = data.profession,
		rep = data.rep or nil,
		dialog = data.dialog,
		options = data.options,
	})
end
exports('DisplayDialog', DisplayDialog)

function UpdateDialogue(data)
	SendNUIMessage({
		action = 'updateDialog',
		name = data.name,
		name2 = data.name2,
		profession = data.profession,
		rep = data.rep or nil,
		dialog = data.dialog,
		options = data.options,
	})
end
exports('UpdateDialogue', UpdateDialogue)

-- CAMERA

function StartCam(coords, rotation)
	ClearFocus()

	cam = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", coords, rotation, GetGameplayCamFov())

	SetCamActive(cam, true)
	RenderScriptCams(true, true, 1000, true, false)
end
exports('StartCam', StartCam)

function EndCam()
	ClearFocus()

	RenderScriptCams(false, true, 1000, true, false)
	DestroyCam(cam, false)

	cam = nil
end
exports('EndCam', EndCam)