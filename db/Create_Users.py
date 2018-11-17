import mysql.connector

def create_users():
    connection, cursor = None, None
    try:
        #Database Connection Parameters - Replace this with your DB endpoint
        lambda101_cnx_str = {'host': 'dbnode.cemnrzna330w.ap-south-1.rds.amazonaws.com',
           'username': 'user',
           'password': 'password',
           'db': 'dbname'}
        connection = mysql.connector.connect(host=lambda101_cnx_str['host'], user=lambda101_cnx_str['username'],
                                             password=lambda101_cnx_str['password'], database=lambda101_cnx_str['db'])
        cursor = connection.cursor()
        cursor.execute('CREATE TABLE Users('
                       'User_ID DOUBLE NOT NULL AUTO_INCREMENT PRIMARY KEY,'
                       'FullName VARCHAR(35) NOT NULL,'
                       'Email_Address VARCHAR(35) NOT NULL,'
                       'Password VARCHAR(70) NOT NULL,'
                       'Location VARCHAR(25) NOT NULL,'
                       'Comments VARCHAR(155) NOT NULL)'
                       ';')
        print("Table Users created successfully.")
    except mysql.connector.Error as err:
        print(err)
    finally:
        if connection:
            connection.close()
        if cursor:
            cursor.close()

if __name__ == '__main__':
    create_users()
