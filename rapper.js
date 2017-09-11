$(function(){
	$("#question1 button").on('click', function(){
		$("#question1").fadeOut();
		$("#question2").fadeIn();
	})
	$("#question2 button").on('click', function(){
		$("#question2").fadeOut();
		$("#question3").fadeIn();
	})
	$("#question3 button").on('click', function(){
		$("#question3").fadeOut();
		$("#result").fadeIn();
	});



	$("#Tupac").on('click', function(){
		$("#Club").on('click', function(){
			$("#Lyrics").on('click', function(){
				$("#rapper1").removeClass('invisible')
			});
			$("#Flow").on('click', function(){
				$("#rapper2").removeClass('invisible')
			});
		});
		$("#Deep").on('click', function(){
			$("#Lyrics").on('click', function(){
				$("#rapper3").removeClass('invisible')
			});
			$("#Flow").on('click', function(){
				$("#rapper4").removeClass('invisible')
			});
		});
	})
	$("#Biggie").on('click', function(){
		$("#Club").on('click', function(){
			$("#Lyrics").on('click', function(){
				$("#rapper5").removeClass('invisible')
			});
			$("#Flow").on('click', function(){
				$("#rapper6").removeClass('invisible')
			});
		});
		$("#Deep").on('click', function(){
			$("#Lyrics").on('click', function(){
				$("#rapper7").removeClass('invisible')
			});
			$("#Flow").on('click', function(){
				$("#rapper8").removeClass('invisible')
			});
		});
	})


});

