### FoxStudios - AnimalDetect Api v1
### ApiDocs v1

#### Report - /api/v1/report


#### GetAll - получение всего

```http request
GET http://localhost:8080/api/v1/report/all
```


```bash
curl --request GET \
  --url http://localhost:8080/api/v1/report/all \
  --header 'User-Agent: insomnia/10.1.1'

```
---
#### Get Report - получить отчет (1)

```http request
GET http://localhost:8080/api/v1/report/get/<uid>
```

где - uid код отчёта

```bash
curl --request GET \
  --url http://localhost:8080/api/v1/report/get/<uid> \
  --header 'User-Agent: insomnia/10.1.1'
```

---

#### Create Report - создание отчета

```http request
POST http://localhost:8080/api/v1/report/create
```

```bash
curl --request POST \
  --url http://localhost:8080/api/v1/report/create \
  --header 'User-Agent: insomnia/10.1.1'
```

---
#### Update Report - обновление отчета

```http request
PUT http://localhost:8080/api/v1/report/update/<uid>
```

```json
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
---

#### Delete Report - удаление отчета
```http request
DELETE http://localhost:8080/api/v1/report/delete/<uid>
```
где uid код отчёта
```bash
curl --request DELETE \
  --url http://localhost:8080/api/v1/report/delete/<uid> \
  --header 'User-Agent: insomnia/10.1.1'
```

---


#### Neural / Report_data - /api/v1/neural/

#### Update Report - отправка файла-ов на обработку нейросети
```http request
POST http://localhost:8080/api/v1/neural/upload_report/<uid>
```

где uid код отчёта (родительской плитки)
```bash
curl --request POST \
  --url http://localhost:8080/api/v1/neural/upload_report/<uid> \
  --header 'Content-Type: multipart/form-data' \
  --header 'User-Agent: insomnia/10.1.1' \
  --form 'file=@path_to_file'
```
---
#### Get Report Data - получение контента отчёта
```http request
POST http://localhost:8080/api/v1/neural/reports/all/<uid>
```

где uid код отчёта (родительской плитки)
```bash
curl --request GET \
  --url http://localhost:8080/api/v1/neural/reports/all/<uid> \
  --header 'Content-Type: multipart/form-data' \
  --header 'User-Agent: insomnia/10.1.1' \
  --form 'file=@C:\Users\Endie\Desktop\DH-International-2024\neural_service_py\images.zip'
```
---
#### Remove Report Data - удаление одной строки из контента отчёта
```http request
DELETE http://localhost:8080/api/v1/neural/reports/remove/<uid>
```

где uid код строки сгенерированного отчёта (родительской плитки)
```bash
curl --request DELETE \
  --url http://localhost:8080/api/v1/neural/reports/remove/<uid> \
  --header 'User-Agent: insomnia/10.1.1'
```
---
#### CSV Report Data - получение контента отчёта в формате csv
```http request
GET http://localhost:8080/api/v1/neural/reports/csv/<uid>
```

где uid код строки сгенерированного отчёта (родительской плитки)
```bash
curl --request DELETE \
  --url http://localhost:8080/api/v1/neural/reports/csv/<uid> \
  --header 'User-Agent: insomnia/10.1.1'
```