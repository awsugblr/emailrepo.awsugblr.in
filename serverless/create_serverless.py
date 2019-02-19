import os

files = ["login.py", "activecontacts.py", "invalidcontacts.py", "addnewcontact.py", "activecontact.py", "invalidcontact.py"]

try:
    # remove mysql unzipped folder if exist
    os.system("rm -rf mysql")
    # unzip mysql
    os.system("unzip mysql")

    for file in files:
        temp = file.split(".")[0]
        # remove root zipped folder if exist
        os.system("rm -rf " + temp)
        #remove existing folders
        os.system("rm -rf " + temp + "; rm -rf " + temp + ".zip")
        #create root folder
        os.makedirs(temp)
        #copy common and mysql folders to root
        os.system('cp -a common ' + temp + '; cp -a mysql ' + temp + '; cp ' + file + ' ' + temp)
        #move to root folder and zip contents
        os.system('cd ' + temp + '; zip -r ' + temp + '.zip *; mv ' + temp + '.zip ../')
        #remove root folder
        os.system("rm -rf " + temp)
    #remove mysql unzipped folder if exist
    os.system("rm -rf mysql")
except Exception as e:
    print(e)
