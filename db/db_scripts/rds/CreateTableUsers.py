import mysql.connector

def create_users():
	connection, cursor = None, None
	try:
		connection = mysql.connector.connect(host='emailrepo.cxz70el1sxbh.ap-south-1.rds.amazonaws.com', user='root', password='awsugblr123#', database='emailrepo')
		cursor = connection.cursor()
		cursor.execute('CREATE TABLE Users (UserID DOUBLE NOT NULL AUTO_INCREMENT PRIMARY KEY, FullName VARCHAR(35) NOT NULL, EmailAddress VARCHAR(35) NOT NULL, Password VARCHAR(70) NOT NULL);')
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
