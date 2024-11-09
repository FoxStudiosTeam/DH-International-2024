### FoxStudios - AnimalDetect Api v1
### ApiDocs v1

#### Report - /api/v1/report


#### GetAll - получение всего

```
GET http://localhost:8080/api/v1/report/all
```


```bash
curl --request GET \
  --url http://localhost:8080/api/v1/report/all \
  --header 'User-Agent: insomnia/10.1.1'

```

#### Get Report - получить отчет (1)

```
GET http://localhost:8080/api/v1/report/get/<uid>
```

где - uid код отчёта

```bash
curl --request GET \
  --url http://localhost:8080/api/v1/report/get/<uid> \
  --header 'User-Agent: insomnia/10.1.1'
```

#### Create Report - создание отчета

```
POST http://localhost:8080/api/v1/report/create
```

```bash
curl --request POST \
  --url http://localhost:8080/api/v1/report/create \
  --header 'User-Agent: insomnia/10.1.1'
```


#### Update Report - обновление отчета

```http request
PUT http://localhost:8080/api/v1/report/update/<uid>
```

```
{
    "title": "123"
}
```

где - uid код отчёта, а title - заголовок отчета (текст из плитки)

```bash
curl --request PUT \
  --url http://localhost:8080/api/v1/report/update/<uid> \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/10.1.1' \
  --data '{
	"title": "123"
}'
```


#### Delete Report - удаление отчета
```
DELETE http://localhost:8080/api/v1/report/delete/<uid>
```
где uid код отчёта
```bash
curl --request DELETE \
  --url http://localhost:8080/api/v1/report/delete/<uid> \
  --header 'User-Agent: insomnia/10.1.1'
```