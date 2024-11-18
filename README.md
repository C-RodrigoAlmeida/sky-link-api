# Installation

Run the following commands to install dependencies:

```bash
# Python
pip install poetry #if not already installed
poetry install #install dependencies
poetry shell #activate virtual environment
python manage.py migrate #create tables
python manage.py seed_demo_data #optional - for testing
python manage.py createsuperuser #create superuser
python manage.py runserver #start server

# Node
npm install #install dependencies
npm start #start server
ng serve #alternatively if ng cli is installed
```