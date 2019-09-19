//contacts
if ($('#map').length) {
    ymaps.ready(function () {
        var myMap = new ymaps.Map('map', {
                center: [59.930336, 30.374097],
                zoom: 17
            }, {
                searchControlProvider: 'yandex#search'
            }),

            // Создаём макет содержимого.
            MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
            ),

            myPlacemark = new ymaps.Placemark([59.930336, 30.374097] , {
                hintContent: 'Клиника-ЮВТ',
                balloonContent: 'Санкт-Петербург, ул. Мытнинская, д. 1/20'
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: './img/map-placeholder.png',
                // Размеры метки.
                iconImageSize: [83, 65],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-41, -55]
            });

        myMap.geoObjects
            .add(myPlacemark)
    });
}

