# Формы
Работа с формами, получение/отправка данных из формы.
___
### <a id="table-of-contents"></a> Table of Contents
* [Введение](#intro)
* [Утилита forms](#utility)
* [Типы](#types)
* [Текстовые поля](#text)
* [Radio кнопки](#radio)
* [Одиночные поля(single field)](#sigle)
* [Группы полей(fieldset)](#fieldset)


## <a id="intro"></a> Введение
Для работы с формами используется утилити-объект `forms`. В разметке группы полей(fieldset) и мультиполя добавляются по особым правилам. В API учитываются особенности полей.

## <a id="utility"></a> Утилити-объект forms
jQuery в очередной раз соснул, пришлось по-фасту наваять утилиту для работы с формами.
В будущем планирую проапгрейдить этот объект и реворкнуть работу с формами.
Утилити-объект `forms` распологается по пути `Scripts\utility\forms.js`.

У этого объекта 3 публичных метода.

Так же этот объект связан с [типом данных](#types).

### Метод getParams
Вытаскивает из формы параметры и распределяет их по [типу полей](#types).

#### Аргументы
Принимает один аргумент:
- HTML-форма(`HTMLFormElement`)

#### returns
Возвращает объект с данными и типами.

*Пример:*
``` javascript
{
    buy_dates: [
        {
            _type: "fieldset"
            action: "not_buying"
            begin: "2015.11.02"
            end: "2015.11.18"
        },
        {
            _type: "fieldset"
            action: "buying"
            begin: "2015.11.17"
            end: "2015.11.20"
        }
        _type: "fieldsetArray"
    ],
    max_amount: "4",
    max_order_count: "2",
    socials: [
        "vk",
        "fb",
        "not_set"
        _type: "array"
    ]
}
```

Если передать не HTML-форму, то вернется `null`.

### Метод fillData
Заполняет форму данными.

#### Аргументы
Принимает два аргумента:
- HTML-форма `HTMLFormElement`
- Объект с параметрами

#### returns
Возвращает HTML-форму(`HTMLFormElement`)

### Метод addIndexBox
Добавляет индекс к полю, делая поля с одинаковыми именами уникальными(нужно для radio/checkbox'ов).

#### Аргументы
Принимает 2 аргумента:
- HTML-поле `HTMLInputElement`
- индекс(`int`)

#### returns
Возвращает HTML-поле(`HTMLinputElement`)

## <a id="types"></a> Типы







## <a id="text"></a> Текстовые поля(text field)
К таким полям относятся текстовые поля(text, search, date, number и т.п.).

Тут все просто.
*Добавление:*
``` HTML
<form class="form">
    <input type="text" name="text_field" value="some text" />
</form>
```
*Получение данных из формы:*
``` javascript
var
    form   = document.querySelector('.form'),
    Params = Forms.getParams(form);

console.log(Params);
{
    text_field: "some text"
}
```
### Отправка данных через API
*Обращение к API:*
``` javascript
API.segment(Params);
```
*request*
``` http
POST /ajax/segments/

Body:
{"text_field": "some text"}
```

## <a id="radio"></a> Radio кнопки(Radio button)
Радио кнопки уже стилизованны.
Стили для радио кнопок находятся тут `Content\less\ui\ui_dev.less`.

*Добавление:*
``` HTML
<form class="form">
    <label class="ui-box">
        <input type="radio" name="radio_name" value="value1" />
        <div class="ui-box__box"></div><div class="ui-box__opt">Cовершали покупки</div>
    </label>

    <label class="ui-box">
        <input type="radio" name="radio_name" value="value2" />
        <div class="ui-box__box"></div><div class="ui-box__opt">Не совершали покупки</div>
    </label>

    <label class="ui-box">
        <input type="radio" name="radio_name" value="value3" />
        <div class="ui-box__box"></div><div class="ui-box__opt">Последняя покупка - неудача</div>
    </label>
</form>

*Получение данных из формы:*
``` javascript
// Допустим пользователь выбрал второе значение
var
    form   = document.querySelector('.form'),
    Params = Forms.getParams(form);

console.log(Params);
{
    radio_name: "value2"
}
```

### Отправка данных через API
*Обращение к API:*
``` javascript
API.segment(Params);
```
*request*
``` http
POST /ajax/segments/

Body:
{"radio_name": "value2"}
```


## <a id="sigle"></a> Одиночные поля(single field)
## <a id="fieldset"></a> Группы полей(fieldset)
## <a id="multi"></a> Мультиполя
