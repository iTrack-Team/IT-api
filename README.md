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

### Creating new Board

*/board/create*
POST

Body:

      {
        name: <value:String>,
      }

### Get all board info

*/board/info/boardId*
GET

Returns big object of board.
