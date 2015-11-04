# Tags
Операции с тегами(метками)
___

### <a id="table-of-contents"></a> Table of Contents
* [Получение тегов пользователя](#getting-tags-user)
* [Получение тегов кастомеров](#getting-tags-customers)
* [Прикрепление тегов](#attaching-tags)
* [Открепление тегов](#detaching-tags)
* [Возможные ошибки](#error)
* [Есть вопросы?](#questions)

## <a id="getting-tags-user"></a> Получение тегов пользователя
[Table of Contents](#table-of-contents)

#### Description:
Ответ запроса присылает все имеющиеся теги авторизованного пользователя, в т.ч. и те которые не используются.

#### Method & Route:
``` http
GET /ajax/users/tags
```

#### Parameters:
Параметры не передаются.

#### Example:
*Request*
``` http
GET /ajax/users/tags
```
*Response*
```http
Status:
200 OK

Body:
["tagName1","tagName2","tagName3"]
```


## <a id="getting-tags-customers"></a> Получение тегов кастомеров
[Table of Contents](#table-of-contents)

#### Description:
Ответ запроса присылает коллекцию тегов, прикрепленных к указанным кастомерам. Тег попадает в коллекцию по условию `OR`, т.е. если тег прикреплен хотя бы к одному из указанных кастомеров он попадает в коллекцию.

#### Method & Route:
```http
GET /ajax/customers/tags
```

#### Parameters:
Параметры передаются в строке запроса(query string).

| **Name** | **Type** | **Description**|
|----------|----------|----------------|
| ids  | Строка | **Required** id'шники кастомеров. Передаются в одной строке через  запятую |

#### Example:
К первому кастомеру прикреплен тег `tagName1` ко второму `tagName2`, а к третьему кастомеру прикреплены два тега `tagName2`, `tagName3`.

*Request*
```http
GET /ajax/customers/tags?ids=customerId1,customerId2,customerId3
```
*Response*
```http
Status:
200 OK

Body:
["tagName1","tagName2","tagName3"]
```


## <a id="attaching-tags"></a> Прикрепление тегов
[Table of Contents](#table-of-contents)

#### Description:
Если запрос успешен прикрепляет тег(или несколько тегов) к указанным кастомерам. Если к кастомеру уже прикреплен указанный тег, повторного прикрепления не произойдет.

#### Method & Route:
```http
PATCH /ajax/customers/tags
```

#### Parameters:
Параметры передаются в теле запроса в JSON виде.

| **Name** | **Type** | **Description**|
|----------|----------|----------------|
| ids  | коллекция из строк | **Required** Коллекция id'шников кастомеров. |
| tags | коллекция из строк | Коллекция тэгов.

#### Example:
Изначально первый кастомер без прекрепленных тегов, второй с одним прикрепленным тегом `tagName1`, а у третьего кастомера прикрепленны три тега `tagName1`, `tagName2` и `tagName3`.

*Request*
``` http
PATCH /ajax/customers/tags

Body:
{
    "ids": ["customerId1", "customerId2", "customerId3"],
    "tags": ["tagName1", "tagName2"]
}
```
*Response*
``` http
Status:
204 No Content
```
После успешного запроса, у первых двух кастомеров в прикрепленных тегах есть `tagName1` и `tagName2`, а у третьего три тега `tagName1`, `tagName2` и `tagName3`.


## <a id="detaching-tags"></a> Открепление тегов
[Table of Contents](#table-of-contents)

#### Description:
Если запрос успешен открепляет указанные теги от указанных кастомеров. Если к указанному кастомеру не прикреплен указанный тег, ошибки не возникнет.

#### Method & Route:
```http
DELETE /ajax/customers/tags
```

#### Parameters:
Параметры передаются в теле запроса в JSON виде.

| **Name** | **Type** | **Description**|
|----------|----------|----------------|
| ids  | коллекция из строк | **Required** Коллекция id'шников кастомеров. |
| tags | коллекция из строк | Коллекция тэгов.

#### Example:
*Request*
``` http
DELETE /ajax/customers/tags

Body:
{
    "ids": ["customerId1", "customerId2", "customerId3"],
    "tags": ["tagName1", "tagName2"]
}
```
*Response*
``` http
Status:
204 No Content
```


## <a id="error"></a> Возможные ошибки
[Table of Contents](#table-of-contents)

#### Неверный формат id

*Request*
``` http
GET /ajax/customers/tags?ids=шняга
```
*Response*
``` http
Status:
500 Internal Server Error

Body:
{
    "message": "'шняга' is not a valid 24 digit hex string."
}
```


## <a id="questions"></a> Есть вопросы?
[Table of Contents](#table-of-contents)
