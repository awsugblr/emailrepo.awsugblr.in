import json

dbconparamsjson = None

def get_db_con_params():
    global dbconparamsjson
    jsondata = open("../db_json/DBConParams.json").read()
    dbconparamsjson = json.loads(jsondata)


# Generate the invokation script (InvokeDropTable.py) which will call the individual DropTable<table_name>.py files in the sequence mentioned in JSON
def write_invoke_drop_table_schema():
    jsondata = open("../db_json/DropTableQuery.json").read()
    droptablejson = json.loads(jsondata)

    f = open("./InvokeDropTable.py", "w+")
    f.write("import mysql.connector" + "\n")
    f.write("import os" + "\n\n")
    f.write("def drop_schema():" + "\n")

    i = 0
    while i < len(droptablejson):
        execute = droptablejson[i]["execute"]
        if execute == "y":
            table = droptablejson[i]["table"]
            f.write("\t" + "os.system('python3 " + "DropTable" + table + ".py')" + "\n")
        i += 1

    f.write("\n")
    f.write("\t" + "print(\"Schema dropped successfully\")" + "\n\n")
    f.write("if __name__ == '__main__':" + "\n")
    f.write("\t" + "drop_schema()" + "\n")
    f.close()


# Generate the individual DropTable<table_name>.py file that executes the respective DROP TABLE query from the DropTableQuery.json file
# The individual DropTable<table_name>.py files gets called in the order mentioned in InvokeDropTable.py script
def write_drop_table_files():
    jsondata = open("../db_json/DropTableQuery.json").read()
    droptablejson = json.loads(jsondata)
    i = 0
    while i < len(droptablejson):
        execute = droptablejson[i]["execute"]
        if execute == "y":
            table = droptablejson[i]["table"]
            f = open("./DropTable" + table + ".py", "w+")
            f.write("import mysql.connector" + "\n\n")
            f.write("def drop_" + table.lower() + "():" + "\n")
            f.write("\t" + "connection, cursor = None, None" + "\n")
            f.write("\t" + "try:" + "\n")
            f.write("\t\t" + "connection = mysql.connector.connect(host='" + dbconparamsjson["host"] 
            + "', user='" + dbconparamsjson["username"] + "', password='" + dbconparamsjson["password"]
            + "', database='" + dbconparamsjson["db"] + "')" + "\n")
            f.write("\t\t" + "cursor = connection.cursor()" + "\n")
            f.write("\t\t" + "cursor.execute('" + droptablejson[i]["sql"] + "')" + "\n")
            f.write("\t\t" + "print(\"Table " + table + " dropped successfully.\")" + "\n")
            f.write("\t" + "except mysql.connector.Error as err:" + "\n")
            f.write("\t\t" + "print(err)" + "\n")
            f.write("\t" + "finally:" + "\n")
            f.write("\t\t" + "if connection:" + "\n")
            f.write("\t\t\t" + "connection.close()" + "\n")
            f.write("\t\t" + "if cursor:" + "\n")
            f.write("\t\t\t" + "cursor.close()" + "\n")
            f.write("\n\n")
            f.write("if __name__ == '__main__':" + "\n")
            f.write("\t" + "drop_" + table.lower() + "()" + "\n")
            f.close()

        i += 1


if __name__ == '__main__':
    # Read the DB Params
    get_db_con_params()

    # Make the individual "DROP TABLE" funnelconfig scripts and the invocation script
    print("Making drop table schema...")
    write_drop_table_files()
    write_invoke_drop_table_schema()

    print("Emailrepo Schema DROP TABLE files generation complete!")
