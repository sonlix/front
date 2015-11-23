# Формы
Работа с формами, получение/отправка данных из формы.
___
### <a id="table-of-contents"></a> Table of Contents
* [Введение](#intro)
* [Утилита forms](#utility)
* [Типы](#types)
* [Текстовые поля](#text)
* [Radio кнопки](#radio)
* [Checkbox](#checkbox)
* [Select](#select)
* [Кнопки(buttons)](#buttons)
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
```

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

## <a id="checkbox"></a> Checkbox
Checkbox - кнопки стилизованы по тому же принципу, что и радио кнопки.
Файл с стилями находится там же `Content\less\ui\ui_dev.less`.
Отличается только тип данных, получаемых из формы.

*Добавление:*
``` HTML
<form class="form">
    <label class="ui-box">
        <input type="checkbox" name="checkbox_name" value="value1" />
        <div class="ui-box__box"></div><div class="ui-box__opt">Вконтакте</div>
    </label>

    <label class="ui-box">
        <input type="checkbox" name="checkbox_name" value="value2" />
        <div class="ui-box__box"></div><div class="ui-box__opt">Facebook</div>
    </label>

    <label class="ui-box">
        <input type="checkbox" name="checkbox_name" value="value3" />
        <div class="ui-box__box"></div><div class="ui-box__opt">Нет аккаунта</div>
    </label>
</form>
```

*Получение данных из формы:*
``` javascript
// Допустим пользователь выбрал первое и второе значение
var
    form   = document.querySelector('.form'),
    Params = Forms.getParams(form);

console.log(Params);
{
    checkbox_name: ['value1', 'value2']
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
{"checkbox_name": "['value1', 'value2']"}
```

## <a id="select"></a> Select
Селект-поля сыроваты, сейчас работает отправка только с типом "select-one"(выбор одного значения). "select-multiple"(выбор нескольких значений) сейчас не работает.

Селект-поля добавляются с помощью плагина `Selectize`, в будущем планирую его выпилить из селект-полей. CSS-класс `select`, используется при инициализации плагина `Selectize`.
*Добавление:*
``` HTML
<form class="form">
    <select name="interval" class="select">
        <option value="month">Месяц</option>
        <option value="week">Неделя</option>
        <option value="day">День</option>
    </select>
</form>
```

*Получение данных из формы:*
``` javascript
// Допустим пользователь выбрал третье значение
var
    form   = document.querySelector('.form'),
    Params = Forms.getParams(form);

console.log(Params);
{
    interval: 'day'
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
{"interval": 'day'}
```

## <a id="buttons"></a> Кнопки(buttons)
Кнопки сброса/отправки в объект с параметрами не попападают.

*Пример:*
``` HTML
<form class="form">
    <input type="text" name="text_field" value="some text" />
    <input type="reset" value="reset" />
    <button type="submit">Отправить</button>
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

## <a id="fieldset"></a> Группы полей(fieldset)
Поля внутри тегов `<fieldset>` считаются группой полей.
Для таких групп можно применить некоторые фичи "Именные группы" и "Мультиполя".

*Добавление:*
``` HTML
<form class="form">
    <fieldset>
        <input type="text" name="field1" value="text1" />
        <input type="text" name="field2" value="text2" />
        <input type="text" name="field3" value="text3" />
        <input type="text" name="field4" value="text4" />
    </fieldset>
</form>
```

*Получение данных из формы:*
``` javascript
var
    form   = document.querySelector('.form'),
    Params = Forms.getParams(form);

console.log(Params);
{
    field1: 'text1',
    field2: 'text2',
    field3: 'text3',
    field4: 'text4'
}
```

## <a id="multi"></a> Мультиполя
