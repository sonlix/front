# Tags
Операции с тегами(метками)
___
### Table of Contents
* [Получение тегов пользователя](#getting-tags-user)
* [Получение тегов кастомеров](#getting-tags-customers)
* [Прикрепление тегов](#attaching-tags)
* [Открепление тегов](#detaching-tags)
* [Возможные ошибки](#error)


## Получение тегов пользователя <a name="getting-tags-user"></a>

#### Description:
Ответ запроса присылает все имеющиеся теги авторизованного пользователя, в т.ч. и те которые не используются.

#### Method & Route:
`GET /ajax/users/tags`

#### Parameters:
Параметры не передаются.

#### Example:
*Request*
``` http
GET /ajax/users/tags
```
*Response*
``` http
Status:
200 OK

Body:
["tag1","tag2","tag3"]
```



## Получение тегов кастомеров<a name="getting-tags-customers"></a>
#### Description:
Ответ запроса присылает теги указанных кастомеров. Если у одного кастомера тег есть, а у второго его нет, то в ответе тег все-равно приходит. Если к двум кастомерам прикреплен одиновый тег, то в ответе придет один тег.

#### Method & Route:
`GET /ajax/customers/tags`

#### Parameters:
Параметры передаются в строке запроса(query string).

| **Name** | **Type** | **Description**|  
|----------|----------|----------------|  
| ids  | Строка | **Required** id'шники кастомеров. Передаются в одной строке через  запятую |

#### Example:
К первому кастомеру прикреплен тег `tagName1` ко второму `tagName2`, а к третьему кастомеру прикреплены три тега `tagName1`, `tagName2`, `tagName3`.

*Request*
``` http
GET /ajax/customers/tags?ids=customerId1,customerId2,customerId3
```
*Response*
``` http
Status:
200 OK

Body:
["tagName1","tagName2","tagName3"]
```


## Прикрепление тегов <a name="attaching-tags"></a>
#### Description:
Если запрос успешен прикрепляет тег(или несколько тегов) к указанным кастомерам.

#### Method & Route:
`PATCH /ajax/customers/tags`

#### Parameters:
Параметры передаются в теле запроса в JSON виде.

| **Name** | **Type** | **Description**|  
|----------|----------|----------------|  
| ids  | коллекция из строк | **Required** Коллекция id'шников кастомеров. |
| tags | коллекция из строк | Коллекция тэгов.

#### Example:
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


## Открепление тегов<a name="detaching-tags"></a>
#### Description:
Если запрос успешен открепляет теги от указанных кастомеров.

#### Method & Route:
`DELETE /ajax/customers/tags`

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

## Возможные ошибки <a name="error"></a>
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
