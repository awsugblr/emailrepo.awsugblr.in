import mysql.connector
import json

dbconparamsjson = None

def get_db_con_params():
    global dbconparamsjson
    jsondata = open("./common/DBConParams.json").read()
    dbconparamsjson = json.loads(jsondata)

def addnewcontact(email, fullname):
    connection, cursor = None, None
    try:
        contact = 0
        #Database Connection Parameters - Replace this with your DB endpoint
        connection = mysql.connector.connect(host=dbconparamsjson["host"], user=dbconparamsjson["username"],
                                             password=dbconparamsjson["password"], database=dbconparamsjson["db"])
        query = "SELECT ContactID FROM Contacts WHERE EmailAddress='" + email + "'"
        cursor = connection.cursor()
        cursor.execute(query)
        for row in cursor.fetchall():
            contact = row[0]
        if contact != 0:
            return {"result" : False}
        else:
            connection = mysql.connector.connect(host=dbconparamsjson["host"], user=dbconparamsjson["username"],
                                             password=dbconparamsjson["password"], database=dbconparamsjson["db"])
            query = "INSERT INTO Contacts(EmailAddress, FullName, DNDEmailBounce) VALUES ('" + email + "','" + fullname + "', 0)"
            cursor = connection.cursor()
            cursor.execute(query)
            connection.commit()
            return {"result": True}
    except mysql.connector.Error as err:
        return {"result" : err}
    finally:
        if connection:
            connection.close()
        if cursor:
            cursor.close()


def lambda_handler(event, context):
    email = event['email']
    fullname = event['fullname']
    get_db_con_params()
    return addnewcontact(email, fullname)
