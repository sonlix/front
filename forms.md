# Формы
Работа с формами, получение/отправка данных из формы.
___
### <a id="table-of-contents"></a> Table of Contents
* [Введение](#intro)
* [Утилита forms](#utility)
* [Типы](#types)
* [Одиночные поля(single field)](#sigle)
* [Группы полей(fieldset)](#fieldset)


## <a id="intro"></a> Введение
Для работы с формами используется утилити-объект `forms`. В разметке группы полей(fieldset) и мультиполя добавляются по особым правилам. В API учитываются особенности полей.

## <a id="utility"></a> Утилита forms
Утилити-объект `forms` распологается по пути `Scripts\utility\forms.js`.
У этого объекта 3 публичных метода.

### Метод getParams
Вытаскивает из формы параметры и распределяет их по [типу полей](#types).

#### Аргументы
Принимает один аргумент, HTML-форму(`HTMLFormElement`)

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
}
```

Если в аргумент передать не HTML-форму, то вернется `null`.

### Метод fillData
Заполняет форму данными.

#### Аргументы
Принимает 2 аргумента:
- 1. HTML-форма `HTMLFormElement`
- 2. Объект с параметрами

#### returns
Возвращает HTML-форму(`HTMLFormElement`)

### Метод addIndexBox
Добавляет индекс к полю, делая поля с одинаковыми именами уникальными.

#### Аргументы
Принимает 2 аргумента:
1. HTML-поле `HTMLInputElement`
2. индекс(`int`)

#### returns
Возвращает HTML-поле(`HTMLinputElement`)

## <a id="types"></a> Типы
## <a id="sigle"></a> Одиночные поля(single field)
## <a id="fieldset"></a> Группы полей(fieldset)
## <a id="multi"></a> Мультиполя
