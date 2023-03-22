(function($) {

	function displayItemsNumber() {
		$('#total').text($('.todo-list-item:not(.completed):not(.hidden)').length);
	}

	function firstItemInList() {
		$('.todo-list-item').removeClass('rounded');
		$('.todo-list-item:not(.hidden)').eq(0).addClass('rounded');
	}

	$(document).ready( function() {
		
		// initialize
		displayItemsNumber();
		firstItemInList();
		$(".sortable").sortable();

		// switch between light and dark mode
		$('.site-mode').on('click', function(e) {
			e.preventDefault();
			$('body').toggleClass('dark-mode');
			$(this).find('.mode-icon').toggleClass('icon-moon').toggleClass('icon-sun');
		});

		// add new item in the to-do-list
		$('.form-field').on('keypress', function(e) {
			var $itemLabel = $(this).val();
			if(e.keyCode == '13') {
				if( $itemLabel.length > 0 ) {
					var newItem = '<li class="todo-list-item">';
					newItem += '<span class="todo-list-item--label">';
					newItem += $itemLabel;
					newItem += '</span>';
					newItem += '<img class="todo-list-item--remove" src="./images/icon-cross.svg" alt="Delete"/>';
					newItem += '</li>';
					$('.todo-list').append(newItem);
					$(this).val('');
				} else {
					alert('The text cannot be empty!');
				}
			}
		});

		// complete/uncomplete item from the to-do-list
		$(document).on('click', '.todo-list-item', function(e) {
			e.preventDefault();
			$(this).toggleClass('completed');
			displayItemsNumber();
		});

		// remove item from the to-do-list
		$(document).on('click', '.todo-list-item--remove', function(e) {
			e.preventDefault();
			$(this).parent().unbind('click');
			$(this).parent().toggleClass('hidden');
			displayItemsNumber();
			firstItemInList();
		});

		// remove all completed items from the to-do-list
		$('.btn-clear-list').on('click', function(e) {
			e.preventDefault();
			$('.todo-list-item.completed').remove();
		});

		// filter items from the to-do-list
		$('.todo-list-filter-link').on('click', function(e) {
			e.preventDefault();
			$('.todo-list-filter-item.active').removeClass('active');
			$(this).parent().addClass('active');
			switch($(this).data('filter')) {
				case 0 : 
					$('.todo-list-item').removeClass('hidden'); 
					break;
				case 1 : 
					$('.todo-list-item').removeClass('hidden'); 
					$('.todo-list-item.completed').addClass('hidden'); 
					break;
				case 2 : 
					$('.todo-list-item').removeClass('hidden'); 
					$('.todo-list-item:not(.completed)').addClass('hidden'); 
					break;
			}
			displayItemsNumber();
			firstItemInList();
		});

	});
})(jQuery);