var options = undefined;
var hasCreatedButtons = false;
var theme = 'rdr' //normal or rdr - rdr uses a more red dead look



window.addEventListener('message', function(event) {
	item = event.data;
	switch (event.data.action) {
		case 'openDialog':
			options = item.options;
			$('#npc-name').html(item.name);
			$('#npc-second-name').html(item.name2)
			$('#npc-profession').html(item.profession);
			$('#npc-rep').html(item.rep);
			$('#dialog').html(item.dialog);
			for (let i = 0; i < item.options.length; i++) {
				if(i <= 4){
					if (item.rep) {
						$("#npc-rep").show();
					}
					$("#btn"+i).show();
					$("#option"+i).html(item.options[i][0]);
					if(!hasCreatedButtons){
						$(document).on('click', "#option"+i, function() {
							$.post('https://as-dialogs/action', JSON.stringify ({
								action: "option",
								options: options[i],
							}));
						});
					}
				}
				if(i < 4){
					for (let i = item.options.length; i < 4; i++){
						$("#btn"+i).hide();
					}
				}
			}
			hasCreatedButtons = true
			$('body').fadeIn();
		break
		case 'updateDialog':
			options = item.options;
			$("#npc-rep").hide();
			$('#npc-name').html(item.name);
			$('#npc-second-name').html(item.name2)
			$('#npc-profession').html(item.profession);
			$('#npc-rep').html(item.rep);
			$('#dialog').html(item.dialog);
			for (let i = 0; i < item.options.length; i++) {
				if(i <= 4){
					if (item.rep) {
						$("#npc-rep").show();
					}
					$("#btn"+i).show();
					$("#option"+i).html(item.options[i][0]);
					if(!hasCreatedButtons){
						$(document).on('click', "#option"+i, function() {
							$.post('https://as-dialogs/action', JSON.stringify ({
								action: "option",
								options: options[i],
							}));
						});
					}
				}
				if(i < 4){
					for (let i = item.options.length; i < 4; i++){
						$("#btn"+i).hide();
					}
				}
			}
			hasCreatedButtons = true
		break
		case 'closeDialog':
			$("#npc-rep").fadeOut();
			$('body').fadeOut();
		break
	}
});
