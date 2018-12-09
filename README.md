### LOGIN

*/auth/login*
POST

Body:

       {
         email: <value:String>,
         password: <value:String>
       }

 Response:

      {
          "id": <value:String>,
          "name": <value:String>,
          "surname": <value:String>,
          "email": <value:String>,
      }

### REGISTRATION

*/auth/register*
POST

Body:

       {
         email: <value:String>,
         name: <value:String>,
         surname: <value:String>,
       }

 Response:
 Status 200

### Get all board info

*/board/info*
GET

Returns big object of board.

###EXAPMLE:

      {
          "name": "Мой день!",
          "description": "Эта доска для расписания моего дня.",
          "id": "5c0d0bb8fd5a8619806ca479",
          "columns": [
              {
                  "id": "5c0d0bb8fd5a8619806ca477",
                  "tasks": [
                      {
                          "id": "5c0d0bb8fd5a8619806ca473",
                          "name": "Еда:",
                          "description": "Приготовить себе сытный завтрак, чтобы зарядиться энергией на целый день."
                      },
                      {
                          "id": "5c0d0bb8fd5a8619806ca474",
                          "name": "Одежда:",
                          "description": "Выбрать оджеду по погоде и погладить её."
                      }
                  ],
                  "name": "Расписание на утро:"
              },
              {
                  "id": "5c0d0bb8fd5a8619806ca478",
                  "tasks": [
                      {
                          "id": "5c0d0bb8fd5a8619806ca475",
                          "name": "Прийти домой:",
                          "description": "Закинуть одежду в стирку, поужинать."
                      },
                      {
                          "id": "5c0d0bb8fd5a8619806ca476",
                          "name": "Сон:",
                          "description": "Умыться, принять душ, лечь спать."
                      },
                      {
                          "id": "5c0d0bf8a9a16c311c152bc6",
                          "name": "После сна:",
                          "description": "Нужно почистить зубы, сделать зарядку, застелить кровать."
                      }
                  ],
                  "name": "Расписание на вечер:"
              }
          ]
      }

### Add column
POST
*/add-column*

Body:

      {
        name: <value:String>
      }

### Add task
POST
*/add-task/:columnId*

Body:

      {
        name: <value:String>,
        description: <value:String>,
      }

### Edit column
POST
*/column-edit/:columnId*

Body:

      {
        name: <value:String>,
      }

### Edit task
POST
*/task-edit/:taskId*

Body:

        {
          name: <value:String>,
          description: <value:String>,
        }

### Board edit
POST
*/board-edit*

Body:

        {
          name: <value:String>,
        }

### Delete task
POST
*/delete-task/:columnId/:taskId*

### Delete column
POST
*/delete-column/:columnId*

### Move task
POST
*/move/:taskId*

Body:

      {
        columnFrom: id,
        columnTo: id,
      }
