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

### getParams
Вытаскивает из формы параметры и распределяет их по [типу полей](#types).

#### Аргументы
Принимает один аргумент, HTML-форму.

#### returns
Возвращает объект с данными.
* Пример: *
```
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

### fillData

### addIndexBox

## <a id="types"></a> Типы
## <a id="sigle"></a> Одиночные поля(single field)
## <a id="fieldset"></a> Группы полей(fieldset)
## <a id="multi"></a> Мультиполя
