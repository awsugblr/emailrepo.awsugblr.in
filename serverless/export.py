import mysql.connector
import json

dbconparamsjson = None

def get_db_con_params():
    global dbconparamsjson
    jsondata = open("./common/DBConParams.json").read()
    dbconparamsjson = json.loads(jsondata)

def export(email, password):
    connection, cursor = None, None
    try:
        #Database Connection Parameters - Replace this with your DB endpoint
        connection = mysql.connector.connect(host=dbconparamsjson["host"], user=dbconparamsjson["username"],
                                             password=dbconparamsjson["password"], database=dbconparamsjson["db"])
        # Check if user/password is a match
        sql = "SELECT User_ID FROM Users WHERE Email_Address='%s' and Password='%s'" % (email, password)
        cursor = connection.cursor(buffered=True)
        cursor.execute(sql)
        user_id = cursor.fetchone()
        if user_id:
            return {"result": True, "uid": user_id[0]}
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
    return export(email, password)
