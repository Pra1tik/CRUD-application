# CRUD-application
Web application that allows users to create, read, update, and delete (CRUD) blog posts.

##Installation

##Clone the repository:
```bash
https://github.com/Pra1tik/CRUD-application.git
```

##Create virtual environment and activate it
```bash
##Install requirements.txt
pip install -r requirements.txt
```

##Add postgres username, password in settings.py
```bash
'NAME': 'db_name',
'USER': 'user_name',
'PASSWORD': 'password',
'HOST': 'localhost',
'PORT': '5432'
```

##Run the following commands to start the server
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

##For Frontend

##Change to the frontend directory

##Run the following commands
```bash
npm install
npm start
```
