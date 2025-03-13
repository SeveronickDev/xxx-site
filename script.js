import { Column } from "./column.js";


const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const FONT_SIZE = 16;
let columns = [];
let columnsCount = 0;

initCanvasSize();
initColumns();

animate();

function initCanvasSize() {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
}

function initColumns() {
  columnsCount = canvas.width / FONT_SIZE;
  columns = [];
  for (let i = 0; i < columnsCount; i++) {
    columns.push(new Column(i * FONT_SIZE, FONT_SIZE, canvas.height, context));
  }
}

function animate() {
  context.fillStyle = 'rgba(0, 0, 0, 0.05)';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // set symbols color
  context.fillStyle = 'red';
  context.font = `bold ${FONT_SIZE}px monospace`;
  columns.forEach(column => column.drawSymbol());

  setTimeout(() => requestAnimationFrame(animate), 50);
}

window.addEventListener('resize', () => {
  initCanvasSize();
  initColumns();
  context.clearRect(0, 0, canvas.width, canvas.height);
});


$(function () {
  // init feather icons
  feather.replace();

  // init tooltip & popovers
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();

  //page scroll
  $('a.page-scroll').bind('click', function (event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
          scrollTop: $($anchor.attr('href')).offset().top - 20
      }, 1000);
      event.preventDefault();
  });

  // slick slider
  $('.slick-about').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      dots: true,
      arrows: false
  });

  //toggle scroll menu
  var scrollTop = 0;
  $(window).scroll(function () {
      var scroll = $(window).scrollTop();
      //adjust menu background
      if (scroll > 80) {
          if (scroll > scrollTop) {
              $('.smart-scroll').addClass('scrolling').removeClass('up');
          } else {
              $('.smart-scroll').addClass('up');
          }
      } else {
          // remove if scroll = scrollTop
          $('.smart-scroll').removeClass('scrolling').removeClass('up');
      }

      scrollTop = scroll;

      // adjust scroll to top
      if (scroll >= 600) {
          $('.scroll-top').addClass('active');
      } else {
          $('.scroll-top').removeClass('active');
      }
      return false;
  });

  // scroll top top
  $('.scroll-top').click(function () {
      $('html, body').stop().animate({
          scrollTop: 0
      }, 1000);
  });

  function Clipboard_CopyTo(value) {
    var tempInput = document.createElement("input");
    tempInput.value = value;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  }
  
  document.querySelector('#Copy').onclick = function() {
    Clipboard_CopyTo('0xd90c6cec4b9c6c07d7a275833c72b8a4673e0f1a');
  }
});