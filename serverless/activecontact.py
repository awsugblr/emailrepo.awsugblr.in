import mysql.connector
import json

dbconparamsjson = None

def get_db_con_params():
    global dbconparamsjson
    jsondata = open("./common/DBConParams.json").read()
    dbconparamsjson = json.loads(jsondata)

def activecontact(email):
    connection, cursor = None, None
    try:
        # Database connection parameters - replace this with your DB endpoint
        connection = mysql.connector.connect(host=dbconparamsjson["host"], user=dbconparamsjson["username"],
                                             password=dbconparamsjson["password"], database=dbconparamsjson["db"])
        # Active Contact
        sql = "UPDATE Contacts SET DNDEmailBounce=0 WHERE EmailAddress='" + email + "';"
        cursor = connection.cursor()
        cursor.execute(sql)
        connection.commit()
        return {"result": "success"}
    except mysql.connector.Error as err:
        return {"result": err}
    finally:
        if connection:
            connection.close()
        if cursor:
            cursor.close()

def lambda_handler(event, context):
    email = event['email']
    get_db_con_params()
    return activecontact(email)
