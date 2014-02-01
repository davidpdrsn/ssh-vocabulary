var addWordToList = function(word) {
  var markup =
    '<li data-id=' + word.id + '>' +
      '<div class="german-word">' + word.german + '</div>' +
      '<div class="korean-word hide">' + word.korean + '</div>' +
    '</li>';

  $(markup).appendTo('ul.voc-list');
};

var serializedForm = function() {
  return { word: { german: $('input.de').val(), korean: $('input.kr').val() } };
};

var hideAndShowClass = 'hide';

var showWord = function(_, word) {
  $(word).removeClass(hideAndShowClass);
};

var hideWord = function(_, word) {
  $(word).addClass(hideAndShowClass);
};

var toggleWord = function() {
  $(this).find('.korean-word, .german-word').each(function(_, word) {
    $(word).toggleClass(hideAndShowClass);
  });
};

$(function() {

  $.ajax({
    url: '/words.json',
    type: 'GET'
  }).done(function(words) {
    words.forEach(addWordToList);
  }).fail(function(d) {
    alert("Failed loading words from database");
  });

  $('form.new-word').on('submit', function(e) {
    e.preventDefault();

    $.ajax({
      url: "/words",
      type: "POST",
      data: serializedForm(),
    }).done(addWordToList).fail(function() {
      alert("Failed adding word to database");
    });

    this.reset();
    $('input.de').focus();
  });

  $(document).on('dblclick', 'ul.voc-list li', function() {
    var id = $(this).data('id');

    $.ajax({
      url: '/words/'+id+'.json',
      type: 'POST',
      data: {'_method':'DELETE'}
    }).done(function() {
      $('[data-id='+id+']').slideUp(function() {
        $(this).remove();
      });
    }).fail(function(d) {
      console.log(d);
      alert('Failed to delete the word');
    });
  });

  $('button.de').on('click', function() {
    $('.voc-list li .korean-word').each(hideWord);
    $('.voc-list li .german-word').each(showWord);
  });

  $('button.kr').on('click', function() {
    $('.voc-list li .korean-word').each(showWord);
    $('.voc-list li .german-word').each(hideWord);
  });

  $(document).on('click', '.voc-list li', toggleWord);

});
