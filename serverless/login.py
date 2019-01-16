import mysql.connector
import json
import os

dbconparamsjson = None

def get_db_con_params():
    global dbconparamsjson
    jsondata = open("./common/DBConParams.json").read()
    dbconparamsjson = json.loads(jsondata)

def login(email, password):
    connection, cursor = None, None
    try:
        #Database Connection Parameters - Replace this with your DB endpoint
        connection = mysql.connector.connect(host=dbconparamsjson["host"], user=dbconparamsjson["username"],
                                             password=dbconparamsjson["password"], database=dbconparamsjson["db"])
        # Check if user/password is a match
        sql = "SELECT UserID FROM Users WHERE EmailAddress='%s' and Password='%s'" % (email, password)
        cursor = connection.cursor(buffered=True)
        cursor.execute(sql)
        userid = cursor.fetchone()
        if userid:
            return {"result": True, "uid": userid[0]}
        else:
            return {"result": False}
    except mysql.connector.Error as err:
        return {"result": err}
    finally:
        if connection:
            connection.close()
        if cursor:
            cursor.close()


def lambda_handler(event, context):
    email = event['email']
    password = event['password']
    get_db_con_params()
    return login(email, password)
