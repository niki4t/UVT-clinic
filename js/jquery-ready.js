$(document).ready(function () {
    var _w = $(window).width();



    $(".filter-btn").on("click", function (e) {
        e.preventDefault();
        $(".filter-more").slideDown();
        $(this).fadeOut(300);
    });

    $(".cancel-btn", ".filter-more").click(function (e) {
        e.preventDefault();
        $(".filter-more").slideUp();
        $(".filter-btn").fadeIn(300);
    });


    var wrapper = $(".file_upload"),
        inp = wrapper.find("input"),
        btn = wrapper.find("button"),
        lbl = wrapper.find("div");
    btn.focus(function () {
        inp.focus()
    });
    // Crutches for the :focus style:
    inp.focus(function () {
        wrapper.addClass("focus");
    }).blur(function () {
        wrapper.removeClass("focus");
    });

    var file_api = (window.File && window.FileReader && window.FileList && window.Blob) ? true : false;

    inp.change(function () {
        var file_name;
        if (file_api && inp[0].files[0])
            file_name = inp[0].files[0].name;
        else
            file_name = inp.val().replace("C:\\fakepath\\", '');

        if (!file_name.length)
            return;

        if (lbl.is(":visible")) {
            lbl.text(file_name);
            btn.text("Выбрать");
        } else
            btn.text(file_name);
    }).change();

    $(window).resize(function () {
        $(".file_upload input").triggerHandler("change");
    });

    var $search = $('.search-menu');
    var elem = $('.navbar');
    $('.mobile-toggle').click(function (e) {
        e.preventDefault();

        $('body').toggleClass('overlayed');
        $('.mobile-menu').toggleClass('active');
        $('.header-top .header-info').slideToggle();
        $('.eye').toggleClass('active-block');
        $('.header-btmBtn').toggleClass('active-inline-block');
        $('.header-btm').slideToggle();
        // $('.header-btm__wrapper').slideToggle();
        $('.navbar .logo').fadeToggle();
        // $('.mobile-menu').animate({
        //     right: "0"
        // }, 500);

        $('.btn_mob').toggleClass('open');

    });
    // $('.btn_mob.open').click(function () {
    //     $('.btn_mob').removeClass('open');
    //     $('.mobile-menu').removeClass('active');
    //     $('.mobile-menu').slideUp();
    // });

    $(".files .add-more__btn").click(function (e) {
        e.preventDefault();
        $(".files .file-input:first").clone().appendTo(".files").find("input[type='file']").val("");
    });


    $(document).on('click', ".delete-place", function () {
        $(this).parent().remove();
    });

    if (_w > 991) {
        $('.search-icon').click(function (e) {
            e.preventDefault();
            $search.addClass('active');
            $('.search__input').fadeToggle().focus();
        });


        $(document).click(function (e) {
            if (e.target !== $search[0] && !$search.has(e.target).length) {
                $('.search__input').fadeOut(200, function () {
                    $search.removeClass('active');
                });
            }
        });

    }
    // $('.drop-menu').hover(
    //     function () {
    //         $(this).addClass('active');
    //         $('.submenu-block', this).stop(true, true).fadeIn();
    //     }, function () {
    //         $('.submenu-block', this).stop(true, true).fadeOut();
    //         $(this).removeClass('active');
    //     }
    // );

    $('article.truncate').truncate({
        lines: 4,
    });
    $('article.description').truncate({
        lines: 3,
    });

    $(".full-link").click(function (e) {
        e.preventDefault();
        $article_parent = $(this).siblings(".test-text");
        if ($(this).hasClass('open')) {
            $(this).text("Читать полностью");
            $(this).removeClass("open");
            $('article', $article_parent).truncate('collapse');
        } else {
            $('article', $article_parent).truncate('expand');
            $(this).text("Свернуть");
            $(this).addClass("open");
        }
    });

    $('select').selectric();


    $('.zagotovka__items .item[data-zagotovka]').click(function () {
        $("#zagotovka").val($(this).data("zagotovka"));
        $("#zagotovka-image").attr("src", $(".img-container img", this).attr('src'));
        $('#zagotovka-modal').modal('toggle');
        $('.zagotovka__items .item').removeClass("active");
        $(this).addClass("active");
    });

    $('#zagotovka-delete').click(function (e) {
        e.preventDefault();
        $("#zagotovka").val("");
        $("#zagotovka-image").attr("src", "");
    });
    Tab = (function () {
        var _activeClass = 'active';
        return {
            init: function (tabs, control, callback) {
                var $tabs = (tabs instanceof jQuery ? tabs : $(tabs)),
                    $control = (control instanceof jQuery ? control : $(control));

                if (!$tabs.is('[data-tab]') || !$control.is('[data-tab]')) return false;

                $tabs.hide().filter(':first').show();
                $control.filter(':first').addClass(_activeClass);

                $control.on('click', function () {
                    var $this = $(this);
                    if (!$this.hasClass(_activeClass)) {
                        $control.removeClass(_activeClass);
                        $this.addClass(_activeClass);
                        $tabs.hide().filter('[data-tab=' + $this.data('tab') + ']').show();
                        if (callback instanceof Function) callback($this);
                    }
                })
            }
        }
    }());
    Tab.init('.team__tab-content', '.team__tab');
    Tab.init('.info-list__tab-content', '.info-list__tab');


    function equal_height($elem, $parent) {
        var highestBox = 0;
        $($elem, $parent).each(function () {
            if ($(this).height() > highestBox) {
                highestBox = $(this).height();
            }
        });
        $($elem, $parent).height(highestBox);
    }

    $(".phone").mask("99999999999");

    $(".incr-input__div").append('<div class="inc input-button"><img src="./img/incr.png"></div><div class="dec input-button"><img src="./img/dec.png"></div>');

    $(".input-button").on("click", function () {

        var $button = $(this);
        var oldValue = $button.parent().find("input").val();

        if ($button.hasClass('inc')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        $button.parent().find("input").val(newVal);
    });

    $('input.timepicker').timepicker({timeFormat: 'HH:mm', startHour: 6, scrollbar: true});

    $('.datepicker').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        autoUpdateInput: true,

        minYear: 2019,
        locale: {
            cancelLabel: 'Clear',
            format: 'DD/MM/YYYY'
        }
        // }, function(chosen_date) {
        //     $(this).val(chosen_date.format('YYYY-MM-DD'));
    });


    $('.questions__list ul li').click(function () {
        $('.answer', this).slideToggle();
        $(this).toggleClass('open');
    });

    function slider_custom($slickElement, $navigate, $slideToShow, $fade, sibl_slider) {
        // var $slickElement = $('.jumbotron__slider');
        var $active__number = $('.active-slide__number', $navigate);
        var $slide__count = $('.slide__count', $navigate);


        $slickElement.on('init reInit beforeChange', function (event, slick, currentSlide, nextSlide) {
            //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
            var i = (nextSlide ? nextSlide : 0) + 1;
            $active__number.text(i);
            $slide__count.text(slick.slideCount);

        });

        $slickElement.slick({
            slidesToShow: $slideToShow,
            slidesToScroll: 1,
            fade: $fade,
            arrows: false,
            autoplay: false,
            dots: false,
            adaptiveHeight: false,
            asNavFor: sibl_slider === "" ? false : sibl_slider,
            responsive: [
                {
                    breakpoint: 1220,
                    rtl: false,
                    settings: {
                        slidesToShow: $slideToShow < 5 ? $slideToShow : $slideToShow - 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 991,
                    rtl: false,
                    settings: {
                        slidesToShow: $slideToShow < 2 ? 1 : $slideToShow - 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 768,
                    rtl: false,
                    settings: {
                        slidesToShow: $slideToShow < 3 ? 1 : $slideToShow - 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 600,
                    rtl: false,
                    settings: {
                        slidesToShow: $slideToShow < 4 ? 1 : $slideToShow - 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 450,
                    rtl: false,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });

        $('.slide-nav-arrow.left', $navigate).click(function (e) {
            e.preventDefault();
            $slickElement.slick('slickPrev');
        });

        $('.slide-nav-arrow.right', $navigate).click(function (e) {
            e.preventDefault();
            $slickElement.slick('slickNext');
        });
    }


    $('.fancybox').fancybox({
        arrows : true,

    });


    slider_custom($(".main-about__slider"), $(".main-about__slider-navigate"), 1, false, "");

    $('.jumbotron__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: false,
        autoplay: false,
        autoplay: true,
        autoplaySpeed: 6000,
        dots: true,
        adaptiveHeight: false
    });
    // $('.jumbotron__slider-left', '.jumbotron__nav').click(function (e) {
    //     e.preventDefault();
    //     $('.jumbotron__slider').slick('slickPrev');
    // });

    // $('.jumbotron__slider-right', '.jumbotron__nav').click(function (e) {
    //     e.preventDefault();
    //     $('.jumbotron__slider').slick('slickNext');
    // });


    $('.clients__slider').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 1220,
                rtl: false,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 991,
                rtl: false,
                settings: {
                    slidesToShow:4,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                rtl: false,
                settings: {
                    slidesToShow:3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                rtl: false,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 425,
                rtl: false,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    $('.slide-nav-arrow.left', '.clients__slider__nav').click(function (e) {
        e.preventDefault();
        $('.clients__slider').slick('slickNext');
    });

    $('.slide-nav-arrow.right', '.clients__slider__nav').click(function (e) {
        e.preventDefault();
        $('.clients__slider').slick('slickNext');
    });

    // slider_custom($(".clients__slider"), $(".clients__slider__nav"), 6, false, "");
    slider_custom($(".portfolio__slider"), $(".portfolio__slider__nav"), 4, false, "");
    slider_custom($(".shop__slider"), $(".shop__slider__nav"), 3, false, "");
    slider_custom($(".services_detail__slider"), $(".services_detail__slider__nav"), 4, false, "");
    slider_custom($(".blog_detail__slider"), $(".blog_detail__slider__nav"), 4, false, "");


    $('.processes__steps-slider .slide:first-child a').addClass('current');
    $('.processes__steps-slider .slide a').click(function (e) {
        e.preventDefault();
        var a = $(this);
        // if (!_so_slide) {
        //     return ;
        // }
        // _so_slide = false;
        $('.processes__steps-slider .slide a.current').removeClass('current');
        $('.processes__steps-slider .slide a').each(function () {
            if ($(this).data('n') == a.data('n')) {
                $(this).addClass('current');
            }
        });
        $('.processes__slider').slick('slickGoTo', a.data('n'));
    });


    $('.processes__steps-slider').slick({
        infinite: false,
        vertical: false,
        slidesToShow: 8,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        focusOnSelect: true,
        autoplay: false,
        adaptiveHeight: false,
        responsive: [
            {
                breakpoint: 1200,

                settings: {
                    slidesToShow: 8,
                    slidesToScroll: 1,
                    draggable: false,
                    swipe: false,
                    touchMove: false
                }
            }
        ]
    });

    slider_custom($(".processes__slider"), $(".processes__slider__nav"), 1, false, '.processes__steps-slider');

    // var processes_slider = $('.processes__slider').slick({
    //     infinite: false,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     dots: false,
    //     arrows: false,
    //     fade: true,
    //     adaptiveHeight: false,
    //     speed: 100,
    //     focusOnSelect: false,
    //     asNavFor: $('.processes__steps-slider')
    // });
    // $('.processes__slider-left', '.processes__slider__nav').click(function (e) {
    //     e.preventDefault();
    //     $('.processes__slider').slick('slickPrev');
    // });
    //
    // $('.processes__slider-right', '.processes__slider__nav').click(function (e) {
    //     e.preventDefault();
    //     $('.processes__slider').slick('slickNext');
    // });


    // $('.ctrl .slide_one a').click(function (e) {
    //     e.preventDefault();
    //     var a = $(this);
    //     // if (!_so_slide) {
    //     //     return ;
    //     // }
    //     // _so_slide = false;
    //     $('div.solutions div.ctrl div.slide_one a.current').removeClass('current');
    //     $('div.solutions div.ctrl div.slide_one a').each(function () {
    //         if ($(this).data('n') == a.data('n')) {
    //             $(this).addClass('current');
    //         }
    //     });
    //     sol_slider.slick('slickGoTo', a.data('n'));
    // });





    $('.sol_slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.sol_slider-other'
    });
    $('.sol_slider-left', '.sol_slider__nav').click(function (e) {
        e.preventDefault();
        $('.sol_slider').slick('slickPrev');
    });

    $('.sol_slider-right', '.sol_slider__nav').click(function (e) {
        e.preventDefault();
        $('.sol_slider').slick('slickNext');
    });
    $('.sol_slider-other').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.sol_slider',
        dots: false,
        centerMode: true,
        focusOnSelect: true,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 440,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }


            ]
    });




    //
    // var sol_slider = $('.sol_slider').slick({
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     dots: false,
    //     arrows: false,
    //     fade: true,
    //     asNavFor: '.sol_slider-other'
    // });
    // $('.sol_slider-left', '.sol_slider__nav').click(function (e) {
    //     e.preventDefault();
    //     $('.sol_slider').slick('slickPrev');
    // });
    //
    // $('.sol_slider-right', '.sol_slider__nav').click(function (e) {
    //     e.preventDefault();
    //     $('.sol_slider').slick('slickNext');
    // });
    //
    //
    // $('.sol_slider-other').slick({
    //     slidesToShow: 5,
    //     slidesToScroll: 1,
    //     centerMode: true,
    //     focusOnSelect: true,
    //     asNavFor: '.sol_slider',
    //     responsive: [
    //         {
    //             breakpoint: 1200,
    //             settings: {
    //                 slidesToShow: 5,
    //                 slidesToScroll: 1
    //             }
    //         },
    //         {
    //             breakpoint: 1000,
    //             settings: {
    //                 vertical: false,
    //                 slidesToShow: 5,
    //                 slidesToScroll: 1
    //             }
    //         },
    //         {
    //             breakpoint: 900,
    //             settings: {
    //                 slidesToShow: 4,
    //                 vertical: false,
    //                 slidesToScroll: 1
    //             }
    //         },
    //         {
    //             breakpoint: 800,
    //             settings: {
    //                 slidesToShow: 5,
    //                 vertical: false,
    //                 slidesToScroll: 1
    //             }
    //         },
    //         {
    //             breakpoint: 600,
    //             settings: {
    //                 slidesToShow: 4,
    //                 vertical: false,
    //                 slidesToScroll: 1
    //             }
    //         },
    //         {
    //             breakpoint: 440,
    //             settings: {
    //                 slidesToShow: 3,
    //                 vertical: false,
    //                 slidesToScroll: 1
    //             }
    //         }
    //
    //
    //     ]
    // });


    // $(window).on("scroll load resize", function () {
    // $(window).on(" load ", function () {
    $(function () {
        // var _w = $(window).width();
        var $navbar = $('.navbar');
        if (_w < 991) {
            // $(".header-menu").detach().appendTo('.menu-block ');
            $(".drop-menu>a").append("<a href='#' class='mobile-more'><img src='./img/v.png'></a>")
            // $(".header-menu").wrap("<div class='wrapper'></div>")
            // $(".header-btn").detach().appendTo('.mobile-menu .wrapper');
            $(".eye").detach().insertBefore('.header-menu');
            $(".header-info").detach().appendTo('.header-btm__wrapper');

            // $(".header-info .tel").detach().appendTo('.header-btm__wrapper');
            // console.log(1);
            $(".header-btmBtn").detach().appendTo('.header-top-wrapper');

            // $(".eye-version").detach().appendTo('.mobile-menu');


            // $(".header-lang").detach().appendTo('.mobile-menu ');
            $('.mobile-more').click(function (e) {
                e.preventDefault();
                $parent = $(this).parents(".drop-menu");

                $('.submenu', $parent).slideToggle();
                // $('.submenu').slideToggle();
            });
        }

    });
    // hide #back-top first
    $("#back-top").hide();

    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 200) {
                $('#back-top').fadeIn();
            } else {
                $('#back-top').fadeOut();
            }
        });

        $('#back-top a').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 600);
            return false;
        });
    });

    $('.datepicker').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        autoUpdateInput: true,
        minYear: 2019,
        locale: {
            format: 'DD/MM/YYYY',
            daysOfWeek: [
                "ВС",
                "ПН",
                "ВТ",
                "СР",
                "ЧТ",
                "ПТ",
                "СБ"
            ],
            monthNames: [
                "Январь",
                "Февраль",
                "Март",
                "Апрель",
                "Май",
                "Июнь",
                "Июль",
                "Август",
                "Сентябрь",
                "Октябрь",
                "Ноябрь",
                "Декабрь"
            ],
            "firstDay": 1
        }
    });
    $('.article-button').click(function () {
        $('.article-button').removeClass('article-active-button');
        $(this).addClass('article-active-button');
    });
    $('.article-button-1').click(function () {
        $parent_patient = $('.patient').parent();
        $parent_doctor = $('.doctor').parent();
        $($parent_patient).show();
        $($parent_doctor).show();
        $('.publ-list .sml-btn').css("display", "inline-block");
    });
    $('.article-button-2').click(function () {
        $parent_patient = $('.patient').parent();
        $parent_doctor = $('.doctor').parent();
        $($parent_doctor).hide();
        $($parent_patient).show();
        $('.publ-list .sml-btn').hide();
    });
    $('.article-button-3').click(function () {
        $parent_patient = $('.patient').parent();
        $parent_doctor = $('.doctor').parent();
        $($parent_patient).hide();
        $($parent_doctor).show();
        $('.publ-list .sml-btn').hide();
    });
    if (_w < 1220) {
        $(".pagination-pages .next-page img").detach().insertBefore('.pagination-pages .next-page p');
    }


    $('.speaker-btn').click(function () {
        $('.speaker-btn').removeClass('speaker-btn-active');
        $(this).addClass('speaker-btn-active');
    });
    $('.speaker-1-btn').click(function () {
        $('.speaker-2').hide();
        $('.speaker-1').show();
    });
    $('.speaker-2-btn').click(function () {
        $('.speaker-1').hide();
        $('.speaker-2').show();
    });



    $('.worker-button').click(function () {
        $('.worker-button').removeClass('worker-active-button');
        $(this).addClass('worker-active-button');
    });
    $('.worker-button-1').click(function () {
        $parent_ophthalmologist = $('[data-prof="ophthalmologist"]').parent();
        $parent_nurse = $('[data-prof="nurse"]').parent();
        $parent_admin = $('[data-prof="admin"]').parent();
        $($parent_ophthalmologist).show();
        $($parent_nurse).show();
        $($parent_admin).show();
    });
    $('.worker-button-2').click(function () {
        $parent_ophthalmologist = $('[data-prof="ophthalmologist"]').parent();
        $parent_nurse = $('[data-prof="nurse"]').parent();
        $parent_admin = $('[data-prof="admin"]').parent();
        $($parent_ophthalmologist).show();
        $($parent_nurse).hide();
        $($parent_admin).hide();
    });
    $('.worker-button-3').click(function () {
        $parent_ophthalmologist = $('[data-prof="ophthalmologist"]').parent();
        $parent_nurse = $('[data-prof="nurse"]').parent();
        $parent_admin = $('[data-prof="admin"]').parent();
        $($parent_ophthalmologist).hide();
        $($parent_nurse).show();
        $($parent_admin).hide();
    });
    $('.worker-button-4').click(function () {
        $parent_ophthalmologist = $('[data-prof="ophthalmologist"]').parent();
        $parent_nurse = $('[data-prof="nurse"]').parent();
        $parent_admin = $('[data-prof="admin"]').parent();
        $($parent_ophthalmologist).hide();
        $($parent_nurse).hide();
        $($parent_admin).show();
    });


    function slider_custom2($slickElement, $navigate, $slideToShow, $fade, sibl_slider) {
        // var $slickElement = $('.jumbotron__slider');
        var $active__number = $('.active-slide__number', $navigate);
        var $slide__count = $('.slide__count', $navigate);


        $slickElement.on('init reInit beforeChange', function (event, slick, currentSlide, nextSlide) {
            //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
            var i = (nextSlide ? nextSlide : 0) + 1;
            $active__number.text(i);
            $slide__count.text(slick.slideCount);

        });

        $slickElement.slick({
            slidesToShow: $slideToShow,
            slidesToScroll: 1,
            fade: $fade,
            arrows: false,
            autoplay: false,
            dots: false,
            adaptiveHeight: false,
            asNavFor: sibl_slider === "" ? false : sibl_slider,
            responsive: [
                {
                    breakpoint: 768,
                    rtl: false,
                    settings: {
                        slidesToShow: $slideToShow < 2 ? 1 : $slideToShow - 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 450,
                    rtl: false,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });

        $('.slide-nav-arrow.left', $navigate).click(function (e) {
            e.preventDefault();
            $slickElement.slick('slickPrev');
        });

        $('.slide-nav-arrow.right', $navigate).click(function (e) {
            e.preventDefault();
            $slickElement.slick('slickNext');
        });
    }
    slider_custom2($(".about__admin-slider"), $(".about__admin-slider-navigate"), 1, false, "");

    
});

var n = 1;
function currentSlide(n) {
    var ind;
    var delSlides = document.getElementsByClassName("delivery-main");
    var delButton = document.getElementsByClassName("delivery-btn");

    for (ind = 0; ind < delSlides.length; ind++) {
        delSlides[ind].style.display = "none";
    }
    for (ind = 0; ind < delButton.length; ind++) {
        delButton[ind].className = delButton[ind].className.replace("activeBtn", "");
    }
    delSlides[n - 1].style.display = "block";
    delButton[n - 1].className += " activeBtn";
};

