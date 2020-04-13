$(function () {
  mixitup(".tabs", {
    load: {
      filter: ".category-a"
    }
  });

  $(".humburger").on("click", function () {
    $(".nav").slideToggle(), $(this).toggleClass("active");
    $("html").toggleClass("sticky");
  });

  $(window).scroll(function () {
    if ($(window).scrollTop() > 70) {
      $(".header").addClass("sticky");
    } else {
      $(".header").removeClass("sticky");
    }
  });

  new WOW().init();

  // Cache selectors
  let topMenu = $(".nav"),
    topMenuHeight = topMenu.outerHeight() + 1,
    // All list items
    menuItems = topMenu.find("a");

  // Bind click handler to menu items
  // so we can get a fancy scroll animation
  menuItems.click(function (e) {
    let href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
    $("html, body").stop().animate(
      {
        scrollTop: offsetTop
      },
      850
    );
    e.preventDefault();
  });
});
