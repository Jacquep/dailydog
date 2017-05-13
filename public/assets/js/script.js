(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $(".dropdown-button").dropdown();

    $('.modal').modal();

    $('#post-body').val();
    $('#post-body').trigger('autoresize');
    $('input#input_text, textarea#post-body').characterCounter();
    $('select').material_select();
          
    var options = [{
    	selector: '#all-posts', 
    	offset: 400, 
    	callback: function(el) {Materialize.showStaggeredList($(el));} 
   	}];

	  Materialize.scrollFire(options);

  }); // end of document ready
})(jQuery); // end of jQuery name space