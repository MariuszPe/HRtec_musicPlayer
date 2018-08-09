$(function () {
  playListView();
  events();
  defaultSongSetting(0);
});



function events() { 
    $('#play').click(function () {
      
    if($('#play').hasClass('fa-play')) {
      $('#play').removeClass('fa-play').addClass('fa-pause');
    } else {
      $('#play').removeClass('fa-pause').addClass('fa-play');
    }
  });


  $('#next').click(function () {
    let actualListNumber = parseInt($('div .playerMiddle').attr('actualListNumber'));
    if(actualListNumber < playListJSON.playlist.length-1) {
      defaultSongSetting(actualListNumber+1);
    }
  });


  $('#prev').click(function () {
    let actualListNumber = parseInt($('div .playerMiddle').attr('actualListNumber'));
    if (actualListNumber > 0) {
      defaultSongSetting(actualListNumber-1);
    }
  });


  $('li').click(function() {

    let selectedSong = $(this).children().children().html();
    let length = selectedSong.slice(selectedSong.indexOf('top')+5, selectedSong.indexOf('top')+9);
    let author = selectedSong.slice(selectedSong.indexOf('| ')+1, selectedSong.indexOf('<br>'));
    let song = selectedSong.slice(selectedSong.indexOf('bottom')+8, selectedSong.length);
    mainView();
    $( "#navigateToMainView" ).click();
    $('.playerMiddle').html(author + "<br> <span class='songTitle'>" + song + "</span>");
  });
}



function defaultSongSetting(actualListNumber) {
  $('.playerMiddle').html(playListJSON.playlist[actualListNumber].author + "<br>" +
    "<span class='songTitle'>" + playListJSON.playlist[actualListNumber].songName + "</span>");

  $('div .playerMiddle').attr('actualListNumber', actualListNumber);
   
}


function playListView() {
  
  $('#navigateToPlaylist').click(function () {
    let listHtml = [];
    $.each(playListJSON.playlist, function (i, song) {
      listHtml.push(
        "<li><div class='rectangle__playlist--Li'>" +
          "<div class='rectangle__playlist--LiLeft'>" +
            "<span class='LiLeft--top'>" + song.length + " | " + song.author + "</span> <br>" +
            "<span class='LiLeft--bottom'>" + song.songName + "</span>" +
          "</div>" +
          "<div class='rectangle__playlist--LiRight'>" +
            "<i class='fas fa-share-alt'></i><i class='fas fa-heart'></i>" +
          "</div><br><br><hr>" +
        "</div></li>");
    });


    $('#container').html(
      "<div class = 'rectangle'>" +
        "<div class = 'rectangle__background--Top playlistTop'>" +
          "<div class = 'topLeft'>" +
            "<i id='navigateToMainView' class='fas fa-reply'></i>" +
          "</div>" +
          "<div class = 'topCenter'> Playlist </div>" +
        "</div>" +
        "<div class = 'rectangle__playlist'><ul data-simplebar>" + listHtml.join("") + 
          "<li><i class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star'></i></li></ul></div>" +
        "<div class='rectangle__playlist--blurry'></div>" +
      "</div>");
    events();
    mainView();
  });
}



function mainView() {
  $('#navigateToMainView').click(function () {

    $('#container').html(
      "<div class='rectangle rectangle__backgroundPlaylist'>" +
        "<div class='rectangle__background--Top playerTop'>" +
          "<i class='fas fa-retweet'></i>" +
          "<i class='fas fa-random'></i>" +
          "<i class='fas fa-redo'></i>" +
          "<i id='navigateToPlaylist' class='fas fa-bars'></i>" +
        "</div>" +
        "<div class='rectangle__background--Top playerMiddle'>" +
        "</div>" +
        "<div class='rectangle__background--progresBar'>" +
          "<progress id='progresBar' max='100' value='80'></progress>" +
        "</div>" +
        "<div class='rectangle__background--playerControl'>" +
          "<i class='fas fa-share-alt'></i>" +
          "<i id='prev' class='fas fa-step-backward'></i>" +
          "<i id='play' class='fas fa-play'></i>" +
          "<i id='next' class='fas fa-step-forward'></i>" +
          "<i class='fas fa-heart'></i>" +
        "</div>" +
      "</div>");

    if($('.playerMiddle').html() == "") { 
      defaultSongSetting(0);
    }

    events();
    playListView();
  });



}

