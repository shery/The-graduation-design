$(function(){
	//init
	$('#go').click(function(){
		var goVal = $(this).text();
		if(goVal == '返回'){
			$('#code').slideDown(300);
			$('#result').slideUp(300);
			$('#go').text('分析代码');
		}else{
			var codeStr = $('#code').val();
			$('#go').text('正在分析代码...');
			$.ajax({
				type: 'POST',
				url: '/upload',
				dataType: 'json',
				data: {
					code: codeStr
				},
				success: function(data){
					$('#go').fadeOut(100);
					$('#go').text('返回');
					$('#code').slideUp(300);
					$('#result').val(data.result);
					$('#result').slideDown(300);
					$('#go').fadeIn(100);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert(errorThrown);
				}
			});
		}
	});
});