import mysql.connector
import json

dbconparamsjson = None

def get_db_con_params():
    global dbconparamsjson
    jsondata = open("./common/DBConParams.json").read()
    dbconparamsjson = json.loads(jsondata)

def activecontacts():
    connection, cursor = None, None
    try:
        contacts = []
        connection = mysql.connector.connect(host=dbconparamsjson["host"], user=dbconparamsjson["username"],
                                             password=dbconparamsjson["password"], database=dbconparamsjson["db"])
        # Get all contacts
        sql = "SELECT * FROM Contacts WHERE DNDEmailBounce=0"
        cursor = connection.cursor()
        cursor.execute(sql)
        columns = [column[0] for column in cursor.description]
        for row in cursor.fetchall():
            contacts.append(dict(zip(columns, row)))
        if len(contacts) > 0:
            return {"contacts": contacts}
        else:
            return {"contacts": None}
    except mysql.connector.Error as err:
        return {"contacts": err}
    finally:
        if connection:
            connection.close()
        if cursor:
            cursor.close()


def lambda_handler(event, context):
    get_db_con_params()
    return activecontacts()
