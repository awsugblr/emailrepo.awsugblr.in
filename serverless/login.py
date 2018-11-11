import mysql.connector

def login(email, password):
    connection, cursor = None, None
    try:
        #Database Connection Parameters - Replace this with your DB endpoint
        lambda101_cnx_str = {'host': 'dbnode.cemnrzna330w.ap-south-1.rds.amazonaws.com',
           'username': 'user',
           'password': 'password',
           'db': 'dbname'}
        connection = mysql.connector.connect(host=lambda101_cnx_str['host'], user=lambda101_cnx_str['username'],
                                             password=lambda101_cnx_str['password'], database=lambda101_cnx_str['db'])
        # Check if user exists
        sql = "SELECT User_ID FROM Users WHERE Email_Address='%s' and Password='%s'" % (email, password)
        cursor = connection.cursor()
        cursor.execute(sql)
        (user_id, ) = cursor.fetchall()
        if user_id:
            return {"result": "true", "uid": user_id[0]}
        else:
            return {"result": "false"}
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
    return login(email, password)
